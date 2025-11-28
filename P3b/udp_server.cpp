// udp_server.cpp
#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12345

int main() {
    WSADATA wsa;
    SOCKET server_fd;
    struct sockaddr_in server, client;
    char buffer[1024] = {0};
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

    std::cout << "UDP Server listening on port " << PORT << std::endl;

    while (true) {
        // Receive message
        int bytes_received = recvfrom(server_fd, buffer, sizeof(buffer), 0, 
                                    (struct sockaddr*)&client, &client_len);
        if (bytes_received == SOCKET_ERROR) {
            std::cerr << "recvfrom failed: " << WSAGetLastError() << std::endl;
            continue;
        }

        buffer[bytes_received] = '\0';
        std::cout << "Client: " << buffer << std::endl;

        // Send response
        std::string response = "Server received: " + std::string(buffer);
        sendto(server_fd, response.c_str(), response.length(), 0,
              (struct sockaddr*)&client, client_len);
    }

    closesocket(server_fd);
    WSACleanup();
    return 0;
}


/*
g++ udp_server.cpp -o udp_server -lws2_32
.\udp_server
*/