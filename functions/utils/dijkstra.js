class Graph {
  constructor() {
    this.nodes = new Set();
    this.edges = new Map();
    this.stationLines = new Map(); // 역의 노선 정보를 저장
  }

  // 노드를 그래프에 추가
  addNode(node, lines) {
    this.nodes.add(node);
    this.edges.set(node, []);
    this.stationLines.set(node, lines); // 노선 정보 추가
  }

  // 두 노드 간의 엣지를 추가 (양방향)
  addEdge(start, end, time, distance, cost) {
    this.edges.get(start).push({ node: end, time, distance, cost });
    this.edges.get(end).push({ node: start, time, distance, cost });
  }

  // 다익스트라 알고리즘으로 최적 경로를 찾음 (환승 가중치 포함)
  findShortestPath(start, end, criteria) {
    const distances = new Map();
    const previous = new Map();
    const queue = new Set(this.nodes);

    this.nodes.forEach(node => distances.set(node, Infinity));
    distances.set(start, 0);

    while (queue.size > 0) {
      const current = [...queue].reduce((minNode, node) =>
        distances.get(node) < distances.get(minNode) ? node : minNode
      );

      if (current === end) {
        const path = [];
        let temp = end;
        while (temp) {
          path.unshift(temp);
          temp = previous.get(temp);
        }
        return { path, distance: distances.get(end) };
      }

      queue.delete(current);

      this.edges.get(current).forEach(neighbor => {
        const weight = neighbor[criteria];
        const currentLines = this.stationLines.get(current);
        const nextLines = this.stationLines.get(neighbor.node);

        // 환승 가중치 추가 (다른 노선으로 환승 시 가중치를 증가)
        let transferWeight = 0;
        if (!currentLines.some(line => nextLines.includes(line))) {
          transferWeight = 5; // 환승 가중치 (5를 임의로 설정, 필요에 따라 조정 가능)
        }

        const alt = distances.get(current) + weight + transferWeight;
        if (alt < distances.get(neighbor.node)) {
          distances.set(neighbor.node, alt);
          previous.set(neighbor.node, current);
        }
      });
    }

    return null;
  }
}
