#include <iostream>
#include <vector>
#include <queue>
#include <utility>

using namespace std;

const int INF = 1e9;

void dijkstra(int start, vector<vector<pair<int, int>>>& adj, vector<int>& dist, int n) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int currDist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (currDist > dist[u]) continue;

        for (auto edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    int n, m;
    cout << "Enter number of nodes and edges: ";
    cin >> n >> m;

    vector<vector<pair<int, int>>> adj(n);

    cout << "Enter edges in the format: u v weight\n";
    for (int i = 0; i < m; ++i) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }

    int start;
    cout << "Enter starting node: ";
    cin >> start;

    vector<int> dist(n, INF);

    dijkstra(start, adj, dist, n);

    cout << "Shortest distances from node " << start << ":\n";
    for (int i = 0; i < n; ++i) {
        if (dist[i] == INF)
            cout << "Node " << i << ": Unreachable\n";
        else
            cout << "Node " << i << ": " << dist[i] << "\n";
    }

    return 0;
}

/*
$ .\dijkstra
Enter number of nodes and edges: 5 7
Enter edges in the format: u v weight
0 1 4
0 2 2
1 2 1
1 3 5
2 3 8
2 4 10
3 4 2
Enter starting node: 0
*/

/*
g++ dikstras_priority_queue.cpp -o dijkstra
.\dijkstra
*/