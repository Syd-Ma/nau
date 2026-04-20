class Student {
    lastName: string;
    firstName: string;
    cityCode: number;
    phone: number;

    constructor(lastName: string, firstName: string, cityCode: number, phone: number) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.cityCode = cityCode;
        this.phone = phone;
    }
}

function print(arr: Student[]) {
    for (let s of arr) {
        console.log(s.cityCode, s.lastName, s.firstName, s.phone);
    }
    console.log("");
}

function clone(arr: Student[]) {
    return arr.map(s => new Student(s.lastName, s.firstName, s.cityCode, s.phone));
}

function countingSort(arr: Student[]) {
    let max = arr[0].cityCode;

    for (let s of arr) {
        if (s.cityCode > max) max = s.cityCode;
    }

    const count = new Array(max + 1).fill(0);

    for (let s of arr) {
        count[s.cityCode]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    const output = new Array(arr.length);

    for (let i = arr.length - 1; i >= 0; i--) {
        const s = arr[i];
        const pos = count[s.cityCode] - 1;
        output[pos] = s;
        count[s.cityCode]--;
    }

    return output;
}

function countingSortByDigit(arr: Student[], exp: number) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (let s of arr) {
        const digit = Math.floor(s.cityCode / exp) % 10;
        count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i].cityCode / exp) % 10;
        const pos = count[digit] - 1;
        output[pos] = arr[i];
        count[digit]--;
    }

    return output;
}

function radixSort(arr: Student[]) {
    let max = arr[0].cityCode;

    for (let s of arr) {
        if (s.cityCode > max) max = s.cityCode;
    }

    let res = clone(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        res = countingSortByDigit(res, exp);
    }

    return res;
}

function bucketSort(arr: Student[]) {
    let min = arr[0].cityCode;
    let max = arr[0].cityCode;

    for (let s of arr) {
        if (s.cityCode < min) min = s.cityCode;
        if (s.cityCode > max) max = s.cityCode;
    }

    const bucketCount = 10;
    const buckets: Student[][] = [];

    for (let i = 0; i < bucketCount; i++) {
        buckets.push([]);
    }

    const range = max - min + 1;
    const size = Math.ceil(range / bucketCount) || 1;

    for (let s of arr) {
        let index = Math.floor((s.cityCode - min) / size);
        if (index >= bucketCount) index = bucketCount - 1;
        buckets[index].push(s);
    }

    for (let i = 0; i < buckets.length; i++) {
        for (let j = 1; j < buckets[i].length; j++) {
            let cur = buckets[i][j];
            let k = j - 1;

            while (k >= 0 && buckets[i][k].cityCode > cur.cityCode) {
                buckets[i][k + 1] = buckets[i][k];
                k--;
            }

            buckets[i][k + 1] = cur;
        }
    }

    const res: Student[] = [];

    for (let bucket of buckets) {
        for (let s of bucket) {
            res.push(s);
        }
    }

    return res;
}

const students: Student[] = [
    new Student("Іваненко", "Олег", 320, 123456),
    new Student("Петренко", "Марія", 101, 555555),
    new Student("Сидоренко", "Ігор", 320, 222222),
    new Student("Коваленко", "Анна", 205, 999999),
    new Student("Мельник", "Ірина", 101, 888888),
    new Student("Ткаченко", "Дмитро", 450, 777777),
    new Student("Бондар", "Олена", 150, 454545),
    new Student("Шевченко", "Андрій", 275, 676767),
    new Student("Гнатюк", "Назар", 399, 232323)
];

console.log("1 рівень");
console.log("до");
print(students);

const sorted1 = countingSort(clone(students));

console.log("після");
print(sorted1);

console.log("2 рівень");
console.log("до");
print(students);

const sorted2 = radixSort(clone(students));

console.log("після");
print(sorted2);

console.log("3 рівень");
console.log("до");
print(students);

const sorted3 = bucketSort(clone(students));

console.log("після");
print(sorted3);