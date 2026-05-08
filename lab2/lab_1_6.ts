class TimerResult {
    size: number;
    basicQuickSort: number;
    medianQuickSort: number;

    constructor(size: number, basicQuickSort: number, medianQuickSort: number) {
        this.size = size;
        this.basicQuickSort = basicQuickSort;
        this.medianQuickSort = medianQuickSort;
    }
}

function generateArray(size: number) {
    const arr: number[] = [];

    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000000));
    }

    return arr;
}

function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function quickSortBasic(arr: number[]) {
    const stack: [number, number][] = [[0, arr.length - 1]];

    while (stack.length > 0) {
        const [left, right] = stack.pop()!;

        if (left >= right) continue;

        let i = left;
        let j = right;

        const pivot = arr[Math.floor((left + right) / 2)];

        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;

            if (i <= j) {
                swap(arr, i, j);
                i++;
                j--;
            }
        }

        if (left < j) stack.push([left, j]);
        if (i < right) stack.push([i, right]);
    }
}

function medianOfThree(arr: number[], left: number, right: number) {
    const middle = Math.floor((left + right) / 2);

    const a = arr[left];
    const b = arr[middle];
    const c = arr[right];

    if ((a >= b && a <= c) || (a <= b && a >= c)) return a;
    if ((b >= a && b <= c) || (b <= a && b >= c)) return b;
    return c;
}

function quickSortMedian(arr: number[]) {
    const stack: [number, number][] = [[0, arr.length - 1]];

    while (stack.length > 0) {
        const [left, right] = stack.pop()!;

        if (left >= right) continue;

        let i = left;
        let j = right;

        const pivot = medianOfThree(arr, left, right);

        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;

            if (i <= j) {
                swap(arr, i, j);
                i++;
                j--;
            }
        }

        if (left < j) stack.push([left, j]);
        if (i < right) stack.push([i, right]);
    }
}

function measureTime(sortFunction: (arr: number[]) => void, arr: number[]) {
    const start = process.hrtime.bigint();

    sortFunction(arr);

    const end = process.hrtime.bigint();

    return Number(end - start);
}

function testAlgorithms() {
    const N = 100;
    const sizes = [N, N * N, N * N * N];

    const results: TimerResult[] = [];

    for (const size of sizes) {
        const data = generateArray(size);

        const arr1 = [...data];
        const arr2 = [...data];

        const timeBasic = measureTime(quickSortBasic, arr1);
        const timeMedian = measureTime(quickSortMedian, arr2);

        results.push(new TimerResult(size, timeBasic, timeMedian));
    }

    console.log("Результати завдання другого рівня:");
    console.log("Кількість елементів | Швидке базове | Швидке з медіаною трьох");

    for (const r of results) {
        console.log(`${r.size} | ${r.basicQuickSort} | ${r.medianQuickSort}`);
    }
}

function generateBestCase(size: number) {
    const arr: number[] = [];

    for (let i = 0; i < size; i++) {
        arr.push(i);
    }

    return arr;
}

function generateWorstCase(size: number) {
    const arr: number[] = [];

    for (let i = size; i > 0; i--) {
        arr.push(i);
    }

    return arr;
}

function generateAverageCase(size: number) {
    return generateArray(size);
}

function testCases() {
    const size = 10000;

    const best = generateBestCase(size);
    const worst = generateWorstCase(size);
    const average = generateAverageCase(size);

    const best1 = [...best];
    const worst1 = [...worst];
    const average1 = [...average];

    const best2 = [...best];
    const worst2 = [...worst];
    const average2 = [...average];

    console.log("");
    console.log("Результати завдання третього рівня:");
    console.log("Набір даних | Швидке базове | Швидке з медіаною трьох");

    const basicBest = measureTime(quickSortBasic, best1);
    const medianBest = measureTime(quickSortMedian, best2);

    const basicWorst = measureTime(quickSortBasic, worst1);
    const medianWorst = measureTime(quickSortMedian, worst2);

    const basicAverage = measureTime(quickSortBasic, average1);
    const medianAverage = measureTime(quickSortMedian, average2);

    console.log(`Найкращий | ${basicBest} | ${medianBest}`);
    console.log(`Найгірший | ${basicWorst} | ${medianWorst}`);
    console.log(`Середній | ${basicAverage} | ${medianAverage}`);
}

testAlgorithms();
testCases();