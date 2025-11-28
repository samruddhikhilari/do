// udp_calc_server.cpp
#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <sstream>
#include <string>
#pragma comment(lib, "ws2_32.lib")

#define PORT 54321

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

    std::cout << "UDP Calculator Server running on port " << PORT << std::endl;

    while (true) {
        // Receive calculation request
        int bytes_received = recvfrom(server_fd, buffer, sizeof(buffer) - 1, 0,
                                    (struct sockaddr*)&client, &client_len);
        if (bytes_received == SOCKET_ERROR) {
            std::cerr << "recvfrom failed: " << WSAGetLastError() << std::endl;
            continue;
        }

        buffer[bytes_received] = '\0';
        std::string request(buffer);
        std::string response;

        // Parse and process calculation
        std::istringstream iss(request);
        double num1, num2;
        char op;
        if (iss >> num1 >> op >> num2) {
            double result = 0;
            bool valid = true;

            switch (op) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/':
                    if (num2 != 0) result = num1 / num2;
                    else {
                        response = "Error: Division by zero";
                        valid = false;
                    }
                    break;
                default:
                    response = "Error: Invalid operator";
                    valid = false;
            }

            if (valid) {
                response = "Result: " + std::to_string(result);
            }
        } else {
            response = "Error: Invalid input format. Use: number operator number (e.g., 5 + 3)";
        }

        // Send response
        sendto(server_fd, response.c_str(), response.length(), 0,
              (struct sockaddr*)&client, client_len);
    }

    closesocket(server_fd);
    WSACleanup();
    return 0;
}

/*
g++ udp_calc_server.cpp -o udp_calc_server -lws2_32
.\udp_calc_server

*/