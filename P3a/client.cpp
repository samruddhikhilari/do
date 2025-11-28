#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <string>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12345  // Must match server's port

int main() {
    WSADATA wsa;
    SOCKET sock = INVALID_SOCKET;
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
    
    // Convert IP address from text to binary form
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    if (serv_addr.sin_addr.s_addr == INADDR_NONE) {
        std::cerr << "Invalid address/Address not supported" << std::endl;
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    // Connect to server
    std::cout << "Connecting to server..." << std::endl;
    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) == SOCKET_ERROR) {
        std::cerr << "Connection failed: " << WSAGetLastError() << std::endl;
        std::cerr << "Make sure the server is running and the port is correct." << std::endl;
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    std::cout << "Connected to server!" << std::endl;
    
    // Get message from user
    std::string message;
    std::cout << "Enter message to send: ";
    std::getline(std::cin, message);

    // Send message to server
    if (send(sock, message.c_str(), message.length(), 0) == SOCKET_ERROR) {
        std::cerr << "Send failed: " << WSAGetLastError() << std::endl;
    } else {
        std::cout << "Message sent to server" << std::endl;
        
        // Clear buffer before receiving
        memset(buffer, 0, sizeof(buffer));
        
        // Receive response from server
        int bytes_received = recv(sock, buffer, sizeof(buffer) - 1, 0);
        if (bytes_received > 0) {
            buffer[bytes_received] = '\0';
            std::cout << "Server response: " << buffer << std::endl;
        } else if (bytes_received == 0) {
            std::cout << "Server closed the connection" << std::endl;
        } else {
            std::cerr << "recv failed: " << WSAGetLastError() << std::endl;
        }
    }

    // Cleanup
    std::cout << "Closing connection..." << std::endl;
    closesocket(sock);
    WSACleanup();
    return 0;
}