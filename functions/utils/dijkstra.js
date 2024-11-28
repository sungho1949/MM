// dijkstra.js

class Graph {
    constructor() {
      this.nodes = new Set();
      this.edges = new Map();
    }
  
    addNode(node) {
      this.nodes.add(node);
      this.edges.set(node, []);
    }
  
    addEdge(start, end, weight) {
      this.edges.get(start).push({ node: end, weight });
      this.edges.get(end).push({ node: start, weight }); // 양방향 그래프
    }
  
    findShortestPath(start, end) {
      const distances = new Map();
      const previous = new Map();
      const queue = new Set(this.nodes);
  
      // 모든 거리를 무한대로 초기화, 시작 노드는 0으로 설정
      this.nodes.forEach(node => distances.set(node, Infinity));
      distances.set(start, 0);
  
      while (queue.size > 0) {
        // 현재 거리에서 가장 짧은 노드를 선택
        const current = [...queue].reduce((minNode, node) =>
          distances.get(node) < distances.get(minNode) ? node : minNode
        );
  
        // 종료 노드에 도달했다면 경로를 반환
        if (current === end) {
          const path = [];
          let temp = end;
          while (temp) {
            path.unshift(temp);
            temp = previous.get(temp);
          }
          return { path, distance: distances.get(end) };
        }
  
        // 현재 노드를 큐에서 제거
        queue.delete(current);
  
        // 인접 노드를 순회하며 거리 계산
        this.edges.get(current).forEach(neighbor => {
          const alt = distances.get(current) + neighbor.weight;
          if (alt < distances.get(neighbor.node)) {
            distances.set(neighbor.node, alt);
            previous.set(neighbor.node, current);
          }
        });
      }
  
      // 도달할 수 없는 경우 null 반환
      return null;
    }
  }
  
  module.exports = Graph;
  