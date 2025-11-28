#include <iostream>
#include <fstream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <string>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12346  // Must match file server's port

int main() {
    WSADATA wsa;
    SOCKET sock;
    struct sockaddr_in serv_addr;
    char buffer[1024] = {0};

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        std::cerr << "WSAStartup failed: " << WSAGetLastError() << std::endl;
        return 1;
    }

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        std::cerr << "Socket creation failed: " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

    // Connect to server
    std::cout << "Connecting to file server..." << std::endl;
    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) == SOCKET_ERROR) {
        std::cerr << "Connection failed: " << WSAGetLastError() << std::endl;
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    std::cout << "Connected to file server!" << std::endl;
    
    // Get file name from user
    std::string filename;
    std::cout << "Enter file name to request: ";
    std::getline(std::cin, filename);

    // Send file name to server
    if (send(sock, filename.c_str(), filename.length(), 0) == SOCKET_ERROR) {
        std::cerr << "Failed to send file name" << std::endl;
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    // Receive file size first
    char size_buffer[256] = {0};
    int bytes_received = recv(sock, size_buffer, sizeof(size_buffer) - 1, 0);
    if (bytes_received <= 0) {
        std::cerr << "Failed to receive file info" << std::endl;
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    std::string size_str(size_buffer);
    if (size_str.find("FILE_SIZE:") == 0) {
        int file_size = std::stoi(size_str.substr(10));
        std::cout << "Receiving file: " << filename << " (" << file_size << " bytes)" << std::endl;
        
        // Create output file
        std::ofstream outfile("received_" + filename, std::ios::binary);
        if (!outfile.is_open()) {
            std::cerr << "Failed to create output file" << std::endl;
            closesocket(sock);
            WSACleanup();
            return 1;
        }

        // Receive file content
        int total_received = 0;
        while (total_received < file_size) {
            bytes_received = recv(sock, buffer, sizeof(buffer), 0);
            if (bytes_received <= 0) break;
            outfile.write(buffer, bytes_received);
            total_received += bytes_received;
        }

        outfile.close();
        std::cout << "File received successfully: received_" << filename << std::endl;
    } else {
        // If not a file size message, it's an error message
        std::cerr << "Server: " << size_str << std::endl;
    }

    // Cleanup
    closesocket(sock);
    WSACleanup();
    return 0;
}

/*
g++ file_client.cpp -o file_client -lws2_32
.\file_client
*/