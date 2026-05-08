class Student {
    constructor(
        public lastName: string,
        public firstName: string,
        public course: number,
        public cityCode: number,
        public hasHomePhone: boolean,
        public academicDebts: number
    ) {}
}

function printStudents(title: string, students: Student[]) {
    console.log('\n' + title);
    for (const s of students) {
        console.log(`${s.lastName} ${s.firstName}, course: ${s.course}, cityCode: ${s.cityCode}, phone: ${s.hasHomePhone ? 'yes' : 'no'}, debts: ${s.academicDebts}`);
    }
}

function insertOrderedByCityCode(arr: Student[], student: Student) {
    let index = 0;

    while (index < arr.length && arr[index].cityCode <= student.cityCode) {
        index++;
    }

    arr.splice(index, 0, student);
}

function sequentialSearchStudentsToDelete(arr: Student[], lvivCode: number): Student[] {
    const result: Student[] = [];

    for (const student of arr) {
        if (student.course === 1 && student.cityCode === lvivCode && !student.hasHomePhone) {
            result.push(student);
        }
    }

    return result;
}

function deleteFirstCourseLvivWithoutPhone(arr: Student[], lvivCode: number) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const student = arr[i];

        if (student.course === 1 && student.cityCode === lvivCode && !student.hasHomePhone) {
            arr.splice(i, 1);
        }
    }
}

class TreeNode {
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    constructor(public student: Student) {}
}

class BSTreeRootInsert {
    root: TreeNode | null = null;

    rotateRight(node: TreeNode): TreeNode {
        const leftNode = node.left;
        if (!leftNode) return node;

        node.left = leftNode.right;
        leftNode.right = node;

        return leftNode;
    }

    rotateLeft(node: TreeNode): TreeNode {
        const rightNode = node.right;
        if (!rightNode) return node;

        node.right = rightNode.left;
        rightNode.left = node;

        return rightNode;
    }

    insert(student: Student) {
        this.root = this.insertToRoot(this.root, student);
        this.printBFS('Tree after adding ' + student.lastName);
    }

    private insertToRoot(node: TreeNode | null, student: Student): TreeNode {
        if (!node) return new TreeNode(student);

        if (student.academicDebts < node.student.academicDebts) {
            node.left = this.insertToRoot(node.left, student);
            return this.rotateRight(node);
        }

        if (student.academicDebts > node.student.academicDebts) {
            node.right = this.insertToRoot(node.right, student);
            return this.rotateLeft(node);
        }

        return node;
    }

    search(key: number): Student | null {
        let current = this.root;

        while (current) {
            if (key === current.student.academicDebts) return current.student;

            if (key < current.student.academicDebts) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    printBFS(title: string) {
        console.log('\n' + title);

        if (!this.root) {
            console.log('empty tree');
            return;
        }

        const queue: TreeNode[] = [this.root];
        const result: string[] = [];

        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(`${node.student.lastName}(${node.student.academicDebts})`);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        console.log(result.join(' -> '));
    }
}

class OptimizedBSTree {
    root: TreeNode | null = null;

    private height(node: TreeNode | null): number {
        if (!node) return 0;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    private balanceFactor(node: TreeNode | null): number {
        if (!node) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    rotateRight(node: TreeNode): TreeNode {
        const leftNode = node.left;
        if (!leftNode) return node;

        node.left = leftNode.right;
        leftNode.right = node;

        return leftNode;
    }

    rotateLeft(node: TreeNode): TreeNode {
        const rightNode = node.right;
        if (!rightNode) return node;

        node.right = rightNode.left;
        rightNode.left = node;

        return rightNode;
    }

    insert(student: Student) {
        this.root = this.insertBalanced(this.root, student);
        this.printBFS('Optimized tree after adding ' + student.lastName);
    }

    private insertBalanced(node: TreeNode | null, student: Student): TreeNode {
        if (!node) return new TreeNode(student);

        if (student.academicDebts < node.student.academicDebts) {
            node.left = this.insertBalanced(node.left, student);
        } else if (student.academicDebts > node.student.academicDebts) {
            node.right = this.insertBalanced(node.right, student);
        } else {
            return node;
        }

        const balance = this.balanceFactor(node);

        if (balance > 1 && node.left && student.academicDebts < node.left.student.academicDebts) {
            return this.rotateRight(node);
        }

        if (balance < -1 && node.right && student.academicDebts > node.right.student.academicDebts) {
            return this.rotateLeft(node);
        }

        if (balance > 1 && node.left && student.academicDebts > node.left.student.academicDebts) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        if (balance < -1 && node.right && student.academicDebts < node.right.student.academicDebts) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    search(key: number): Student | null {
        let current = this.root;

        while (current) {
            if (key === current.student.academicDebts) return current.student;

            if (key < current.student.academicDebts) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    printBFS(title: string) {
        console.log('\n' + title);

        if (!this.root) {
            console.log('empty tree');
            return;
        }

        const queue: TreeNode[] = [this.root];
        const result: string[] = [];

        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(`${node.student.lastName}(${node.student.academicDebts})`);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        console.log(result.join(' -> '));
    }
}

const students: Student[] = [];

const data = [
    new Student('Shevchenko', 'Ivan', 1, 322, false, 5),
    new Student('Bondarenko', 'Petro', 2, 380, true, 1),
    new Student('Koval', 'Oleg', 1, 322, true, 3),
    new Student('Tkachenko', 'Andrii', 3, 456, false, 7),
    new Student('Melnyk', 'Roman', 1, 322, false, 2),
    new Student('Kravchenko', 'Maksym', 4, 441, true, 9),
    new Student('Boyko', 'Dmytro', 2, 335, false, 4),
    new Student('Savchenko', 'Artem', 1, 322, false, 8),
    new Student('Polishchuk', 'Ihor', 5, 480, true, 6),
    new Student('Rudenko', 'Vlad', 1, 380, false, 10),
    new Student('Lysenko', 'Nazar', 2, 322, false, 11),
    new Student('Marchenko', 'Yurii', 1, 390, true, 12),
    new Student('Oliinyk', 'Taras', 3, 450, false, 13),
    new Student('Moroz', 'Bogdan', 1, 322, true, 14),
    new Student('Pavlenko', 'Denys', 4, 499, false, 15),
    new Student('Sydorenko', 'Mykola', 1, 430, true, 16),
    new Student('Honchar', 'Serhii', 2, 322, false, 17),
    new Student('Mazur', 'Pavlo', 1, 325, false, 18),
    new Student('Danyliuk', 'Viktor', 3, 378, true, 19),
    new Student('Zhuk', 'Oleksii', 1, 322, false, 20),
];

for (const student of data) {
    insertOrderedByCityCode(students, student);
}

const lvivCode = 322;

printStudents('Level 1. Initial array ordered by city code', students);

const foundForDeleting = sequentialSearchStudentsToDelete(students, lvivCode);
printStudents('Students found by sequential search and deleted', foundForDeleting);

deleteFirstCourseLvivWithoutPhone(students, lvivCode);
printStudents('Array after deleting first course Lviv students without home phone', students);

console.log('\nLevel 2. BST with insertion into root');
const tree = new BSTreeRootInsert();
for (const student of data.slice(0, 10)) {
    tree.insert(student);
}

const key = 7;
const foundNode = tree.search(key);
console.log('\nFound by key ' + key + ':');
console.log(foundNode);

console.log('\nLevel 3. Optimized balanced BST');
const optimizedTree = new OptimizedBSTree();
for (const student of data.slice(0, 10)) {
    optimizedTree.insert(student);
}

const foundOptimizedNode = optimizedTree.search(key);
console.log('\nFound in optimized tree by key ' + key + ':');
console.log(foundOptimizedNode);
