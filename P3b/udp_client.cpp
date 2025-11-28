// udp_client.cpp
#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <string>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12345
#define SERVER_IP "127.0.0.1"

int main() {
    WSADATA wsa;
    SOCKET sock;
    struct sockaddr_in server;
    char buffer[1024] = {0};

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        std::cerr << "WSAStartup failed: " << WSAGetLastError() << std::endl;
        return 1;
    }

    // Create socket
    if ((sock = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        std::cerr << "Socket creation failed: " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr.s_addr = inet_addr(SERVER_IP);

    while (true) {
        // Get message from user
        std::string message;
        std::cout << "Enter message (or 'exit' to quit): ";
        std::getline(std::cin, message);

        if (message == "exit") break;

        // Send message
        sendto(sock, message.c_str(), message.length(), 0,
              (struct sockaddr*)&server, sizeof(server));

        // Receive response
        int server_len = sizeof(server);
        int bytes_received = recvfrom(sock, buffer, sizeof(buffer) - 1, 0,
                                    (struct sockaddr*)&server, &server_len);
        if (bytes_received > 0) {
            buffer[bytes_received] = '\0';
            std::cout << "Server: " << buffer << std::endl;
        }
    }

    closesocket(sock);
    WSACleanup();
    return 0;
}

/*
g++ udp_client.cpp -o udp_client -lws2_32
.\udp_client
*/