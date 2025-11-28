// udp_file_server.cpp
#include <iostream>
#include <fstream>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define PORT 23456
#define BUFFER_SIZE 1024

int main() {
    WSADATA wsa;
    SOCKET server_fd;
    struct sockaddr_in server, client;
    char buffer[BUFFER_SIZE] = {0};
    int client_len = sizeof(client);

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        std::cerr << "WSAStartup failed: " << WSAGetLastError() << std::endl;
        return 1;
    }

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        std::cerr << "Socket creation failed: " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    // Bind
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;
    server.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&server, sizeof(server)) == SOCKET_ERROR) {
        std::cerr << "Bind failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    std::cout << "UDP File Server running on port " << PORT << std::endl;

    while (true) {
        // Receive filename
        int bytes_received = recvfrom(server_fd, buffer, BUFFER_SIZE - 1, 0,
                                    (struct sockaddr*)&client, &client_len);
        if (bytes_received == SOCKET_ERROR) {
            std::cerr << "recvfrom failed: " << WSAGetLastError() << std::endl;
            continue;
        }

        buffer[bytes_received] = '\0';
        std::string filename(buffer);
        std::cout << "File requested: " << filename << std::endl;

        // Open file
        std::ifstream file(filename, std::ios::binary | std::ios::ate);
        if (!file.is_open()) {
            std::string error = "Error: Could not open file: " + filename;
            sendto(server_fd, error.c_str(), error.length(), 0,
                  (struct sockaddr*)&client, client_len);
            continue;
        }

        // Get file size
        int file_size = file.tellg();
        file.seekg(0, std::ios::beg);

        // Send file size
        std::string size_msg = "SIZE:" + std::to_string(file_size);
        sendto(server_fd, size_msg.c_str(), size_msg.length(), 0,
              (struct sockaddr*)&client, client_len);

        // Wait for ACK
        char ack[4] = {0};
        recvfrom(server_fd, ack, sizeof(ack) - 1, 0, (struct sockaddr*)&client, &client_len);

        // Send file in chunks
        while (!file.eof()) {
            file.read(buffer, BUFFER_SIZE - 1);
            int bytes_read = file.gcount();
            if (bytes_read > 0) {
                sendto(server_fd, buffer, bytes_read, 0,
                      (struct sockaddr*)&client, client_len);
            }
        }

        file.close();
        std::cout << "File sent: " << filename << " (" << file_size << " bytes)" << std::endl;
    }

    closesocket(server_fd);
    WSACleanup();
    return 0;
}
