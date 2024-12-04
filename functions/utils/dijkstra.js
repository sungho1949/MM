// MM/functions/utils/dijkstra.js

class Graph {
  constructor() {
    this.nodes = new Set();
    this.edges = new Map();
  }

  // 노드 추가하기
  addNode(node) {
    this.nodes.add(node);
    this.edges.set(node, []);
  }

  // 엣지 추가하기 (양방향 그래프)
  addEdge(start, end, time, distance, cost) {
    this.edges.get(start).push({ node: end, time, distance, cost });
    this.edges.get(end).push({ node: start, time, distance, cost });
  }

  // 다익스트라 알고리즘을 이용한 최단 경로 찾기
  findShortestPath(start, end, criteria) {
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
        const weight = neighbor[criteria]; // 선택한 기준의 가중치 사용 (time, distance, cost)
        const alt = distances.get(current) + weight;
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
