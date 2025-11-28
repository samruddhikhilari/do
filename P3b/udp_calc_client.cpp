// udp_calc_client.cpp
#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <string>
#pragma comment(lib, "ws2_32.lib")

#define PORT 54321
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

    std::cout << "UDP Calculator Client" << std::endl;
    std::cout << "Enter calculations in format: number operator number" << std::endl;
    std::cout << "Example: 5 + 3" << std::endl;
    std::cout << "Enter 'exit' to quit" << std::endl;

    while (true) {
        // Get calculation from user
        std::string message;
        std::cout << "\nEnter calculation: ";
        std::getline(std::cin, message);

        if (message == "exit") break;

        // Send calculation to server
        sendto(sock, message.c_str(), message.length(), 0,
              (struct sockaddr*)&server, sizeof(server));

        // Receive and display result
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
g++ udp_calc_client.cpp -o udp_calc_client -lws2_32
.\udp_calc_client
*/