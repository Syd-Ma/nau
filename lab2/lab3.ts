class Student {
    lastName: string;
    firstName: string;
    course: number;
    studentId: number;
    scholarship: boolean;

    constructor(lastName: string, firstName: string, course: number, studentId: number, scholarship: boolean) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.course = course;
        this.studentId = studentId;
        this.scholarship = scholarship;
    }
}

class Node {
    student: Student;
    left: Node | null = null;
    right: Node | null = null;

    constructor(student: Student) {
        this.student = student;
    }
}

class Tree {
    root: Node | null = null;

    insert(student: Student) {
        const node = new Node(student);

        if (!this.root) {
            this.root = node;
            return;
        }

        let cur = this.root;

        while (true) {
            if (student.studentId < cur.student.studentId) {
                if (!cur.left) {
                    cur.left = node;
                    return;
                }
                cur = cur.left;
            } else if (student.studentId > cur.student.studentId) {
                if (!cur.right) {
                    cur.right = node;
                    return;
                }
                cur = cur.right;
            } else {
                return;
            }
        }
    }

    bfs() {
        const res: Student[] = [];
        if (!this.root) return res;

        const q: Node[] = [this.root];

        while (q.length) {
            const n = q.shift()!;
            res.push(n.student);

            if (n.left) q.push(n.left);
            if (n.right) q.push(n.right);
        }

        return res;
    }

    print(arr: Student[]) {
        for (let s of arr) {
            console.log(s.lastName, s.firstName, s.course, s.studentId, s.scholarship);
        }
    }

    find() {
        const res: Student[] = [];

        function dfs(node: Node | null) {
            if (!node) return;

            if (node.student.course === 4 && node.student.scholarship === false) {
                res.push(node.student);
            }

            dfs(node.left);
            dfs(node.right);
        }

        dfs(this.root);
        return res;
    }

    removeByCondition() {
        const list = this.find();

        for (let s of list) {
            this.root = this.remove(this.root, s.studentId);
        }
    }

    remove(node: Node | null, id: number): Node | null {
        if (!node) return null;

        if (id < node.student.studentId) {
            node.left = this.remove(node.left, id);
            return node;
        }

        if (id > node.student.studentId) {
            node.right = this.remove(node.right, id);
            return node;
        }

        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let min = node.right;
        while (min.left) min = min.left;

        node.student = min.student;
        node.right = this.remove(node.right, min.student.studentId);

        return node;
    }
}

const t = new Tree();

t.insert(new Student("Іваненко", "Олег", 2, 50, true));
t.insert(new Student("Петренко", "Марія", 4, 30, false));
t.insert(new Student("Сидоренко", "Ігор", 1, 70, true));
t.insert(new Student("Коваленко", "Анна", 4, 20, false));
t.insert(new Student("Мельник", "Ірина", 3, 40, true));
t.insert(new Student("Ткаченко", "Дмитро", 4, 60, false));
t.insert(new Student("Бондар", "Олена", 5, 80, true));
t.insert(new Student("Шевченко", "Андрій", 4, 35, true));
t.insert(new Student("Гнатюк", "Назар", 4, 65, false));

console.log("дерево:");
t.print(t.bfs());

console.log("знайдені:");
t.print(t.find());

console.log("після видалення:");
t.removeByCondition();
t.print(t.bfs());