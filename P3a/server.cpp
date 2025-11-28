#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define PORT 12345  // Changed from 8080 to 12345

int main() {
    WSADATA wsa;
    SOCKET server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};
    const char* hello = "Hello from Server!";
    int opt = 1;

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
        std::cerr << "Bind failed with error " << WSAGetLastError() << std::endl;
        std::cerr << "Trying to find an available port..." << std::endl;
        
        // Try to find an available port
        for (int try_port = PORT; try_port < PORT + 100; try_port++) {
            address.sin_port = htons(try_port);
            if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) != SOCKET_ERROR) {
                std::cout << "Successfully bound to port " << try_port << std::endl;
                break;
            }
            if (try_port == PORT + 99) {
                std::cerr << "Could not find an available port." << std::endl;
                closesocket(server_fd);
                WSACleanup();
                return 1;
            }
        }
    }

    // Get the port we're actually using
    int actual_port = ntohs(address.sin_port);
    std::cout << "Server listening on port " << actual_port << std::endl;

    // Listen
    if (listen(server_fd, 3) == SOCKET_ERROR) {
        std::cerr << "Listen failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    std::cout << "Waiting for a client to connect..." << std::endl;

    // Accept
    new_socket = accept(server_fd, (struct sockaddr*)&address, &addrlen);
    if (new_socket == INVALID_SOCKET) {
        std::cerr << "Accept failed: " << WSAGetLastError() << std::endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    std::cout << "Client connected" << std::endl;

    // Receive and send data
    // int valread = recv(new_socket, buffer, 1024, 0);
    // if (valread > 0) {
    //     buffer[valread] = '\0';
    //     std::cout << "Client: " << buffer << std::endl;
        
    //     // Send response
    //     send(new_socket, hello, strlen(hello), 0);
    //     std::cout << "Response sent" << std::endl;
    // }

        // In server.cpp, replace the receive/send section with this:

// Receive and send data
char buffer[1024] = {0};
int valread = recv(new_socket, buffer, sizeof(buffer) - 1, 0);
if (valread > 0) {
    buffer[valread] = '\0';  // Null-terminate the received data
    std::cout << "Received from client: " << buffer << std::endl;
    
    // Prepare and send response
    std::string response = "Server received: ";
    response += buffer;
    send(new_socket, response.c_str(), response.length(), 0);
    std::cout << "Response sent to client" << std::endl;
} else if (valread == 0) {
    std::cout << "Client disconnected" << std::endl;
} else {
    std::cerr << "recv failed: " << WSAGetLastError() << std::endl;
}

    // Cleanup
    closesocket(new_socket);
    closesocket(server_fd);
    WSACleanup();
    return 0;
}

/*
g++ server.cpp -o server -lws2_32
./server
*/