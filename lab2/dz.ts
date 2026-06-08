class LUPSolver {
    private readonly n: number;
    private readonly L: number[][];
    private readonly U: number[][];
    private readonly P: number[];

    constructor(matrix: number[][]) {
        this.n = matrix.length;

        this.L = Array.from(
            { length: this.n },
            () => Array(this.n).fill(0)
        );

        this.U = matrix.map(row => [...row]);

        this.P = Array.from(
            { length: this.n },
            (_, i) => i
        );
    }

    public decompose(): void {
        for (let k = 0; k < this.n; k++) {
            let pivot = k;

            for (let i = k + 1; i < this.n; i++) {
                if (
                    Math.abs(this.U[i][k]) >
                    Math.abs(this.U[pivot][k])
                ) {
                    pivot = i;
                }
            }

            if (Math.abs(this.U[pivot][k]) < 1e-10) {
                throw new Error("Matrix is singular");
            }

            [this.U[k], this.U[pivot]] =
                [this.U[pivot], this.U[k]];

            [this.P[k], this.P[pivot]] =
                [this.P[pivot], this.P[k]];

            for (let i = 0; i < k; i++) {
                [this.L[k][i], this.L[pivot][i]] =
                    [this.L[pivot][i], this.L[k][i]];
            }

            for (let i = k + 1; i < this.n; i++) {
                this.L[i][k] =
                    this.U[i][k] / this.U[k][k];

                for (let j = k; j < this.n; j++) {
                    this.U[i][j] =
                        this.U[i][j] -
                        this.L[i][k] * this.U[k][j];
                }
            }
        }

        for (let i = 0; i < this.n; i++) {
            this.L[i][i] = 1;
        }
    }

    public solve(b: number[]): number[] {
        const pb: number[] = this.P.map(index => b[index]);

        const y: number[] = Array(this.n).fill(0);

        for (let i = 0; i < this.n; i++) {
            y[i] = pb[i];

            for (let j = 0; j < i; j++) {
                y[i] -= this.L[i][j] * y[j];
            }
        }

        const x: number[] = Array(this.n).fill(0);

        for (let i = this.n - 1; i >= 0; i--) {
            x[i] = y[i];

            for (let j = i + 1; j < this.n; j++) {
                x[i] -= this.U[i][j] * x[j];
            }

            x[i] /= this.U[i][i];
        }

        return x;
    }

    public printMatrices(): void {
        console.log("L:");
        console.table(this.L);

        console.log("U:");
        console.table(this.U);

        console.log("P:");
        console.log(this.P);
    }
}

interface Edge {
    from: string;
    to: string;
}

class Graph {
    private readonly edges: Edge[] = [];

    public addEdge(from: string, to: string): void {
        this.edges.push({ from, to });
    }

    public printEdges(): void {
        console.table(this.edges);
    }

    public bfs(start: string): string[] {
        const adjacency = new Map<string, string[]>();

        for (const edge of this.edges) {
            if (!adjacency.has(edge.from)) {
                adjacency.set(edge.from, []);
            }

            if (!adjacency.has(edge.to)) {
                adjacency.set(edge.to, []);
            }

            adjacency.get(edge.from)?.push(edge.to);
            adjacency.get(edge.to)?.push(edge.from);
        }

        const visited = new Set<string>();
        const queue: string[] = [];
        const traversal: string[] = [];

        visited.add(start);
        queue.push(start);

        while (queue.length > 0) {
            const current = queue.shift();

            if (!current) {
                continue;
            }

            traversal.push(current);

            const neighbours =
                adjacency.get(current) ?? [];

            for (const neighbour of neighbours) {
                if (!visited.has(neighbour)) {
                    visited.add(neighbour);
                    queue.push(neighbour);
                }
            }
        }

        return traversal;
    }
}

const matrix: number[][] = [
    [3, -10, -10],
    [8, -6, 0],
    [2, -10, -10]
];

const vectorB: number[] = [
    129,
    116,
    164
];

const solver = new LUPSolver(matrix);

solver.decompose();
solver.printMatrices();

const solution = solver.solve(vectorB);

console.log("Solution:");
console.log(solution);


const graph = new Graph();

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");

graph.addEdge("B", "E");
graph.addEdge("B", "F");

graph.addEdge("C", "G");
graph.addEdge("C", "H");

graph.addEdge("D", "I");
graph.addEdge("D", "J");

console.log("Edge list:");
graph.printEdges();

const bfsResult = graph.bfs("A");

console.log("BFS:");
console.log(bfsResult.join(" -> "));