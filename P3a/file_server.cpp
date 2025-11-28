#include <iostream>
#include <fstream>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12346  // Different port than the message server

int main() {
    WSADATA wsa;
    SOCKET server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        std::cerr << "WSAStartup failed: " << WSAGetLastError() << std::endl;
        return 1;
    }

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        std::cerr << "Socket creation failed: " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    // Set SO_REUSEADDR to allow reuse of local addresses
    int opt = 1;
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt)) == SOCKET_ERROR) {
        std::cerr << "setsockopt failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    // Bind
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) == SOCKET_ERROR) {
        std::cerr << "Bind failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    // Listen
    if (listen(server_fd, 3) == SOCKET_ERROR) {
        std::cerr << "Listen failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    std::cout << "File server listening on port " << PORT << std::endl;
    std::cout << "Waiting for file request..." << std::endl;

    // Accept connection
    if ((new_socket = accept(server_fd, (struct sockaddr*)&address, &addrlen)) == INVALID_SOCKET) {
        std::cerr << "Accept failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    // Receive file name
    char filename[256] = {0};
    int bytes_received = recv(new_socket, filename, sizeof(filename), 0);
    if (bytes_received <= 0) {
        std::cerr << "Failed to receive filename" << std::endl;
        closesocket(new_socket);
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    std::cout << "Requested file: " << filename << std::endl;

    // Open and send file
    std::ifstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::string error = "Error: Could not open file: " + std::string(filename);
        send(new_socket, error.c_str(), error.length(), 0);
        std::cerr << error << std::endl;
    } else {
        // Send file size first
        file.seekg(0, std::ios::end);
        int file_size = file.tellg();
        file.seekg(0, std::ios::beg);
        
        std::string size_msg = "FILE_SIZE:" + std::to_string(file_size);
        send(new_socket, size_msg.c_str(), size_msg.length(), 0);

        // Send file content
        char file_buffer[1024];
        while (!file.eof()) {
            file.read(file_buffer, sizeof(file_buffer));
            int bytes_read = file.gcount();
            if (bytes_read > 0) {
                send(new_socket, file_buffer, bytes_read, 0);
            }
        }
        std::cout << "File sent successfully: " << filename << " (" << file_size << " bytes)" << std::endl;
        file.close();
    }

    // Cleanup
    closesocket(new_socket);
    closesocket(server_fd);
    WSACleanup();
    return 0;
}

/*
g++ file_server.cpp -o file_server -lws2_32
.\file_server
*/