import * as fs from "fs";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

function factorial(n: bigint): bigint {
    let result = 1n;

    for (let i = 2n; i <= n; i++) {
        result *= i;
    }

    return result;
}

function power(base: bigint, degree: bigint): bigint {
    let result = 1n;

    for (let i = 0n; i < degree; i++) {
        result *= base;
    }

    return result;
}

function firstLevel(): void {
    const books = 12n;
    const authorBooks = 3n;

    const blocks = books - authorBooks + 1n;

    const result = factorial(blocks) * factorial(authorBooks);

    console.log("=== ПЕРШИЙ РІВЕНЬ ===");
    console.log("Тип вибірки: перестановка без повторень");
    console.log(`Кількість способів: ${result}`);
}

function secondLevel(): void {
    const oddDigits = 5n;
    const arraySize = 15n;

    const result = power(oddDigits, arraySize);

    console.log("\n=== ДРУГИЙ РІВЕНЬ ===");
    console.log("Тип вибірки: розміщення з повтореннями");
    console.log(`Кількість способів: ${result}`);
}

function generatePermutations(
    arr: string[],
    callback: (perm: string[]) => void
): void {
    const used = new Array(arr.length).fill(false);

    const current: string[] = [];

    function backtrack(): void {
        if (current.length === arr.length) {
            callback([...current]);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;

            used[i] = true;

            current.push(arr[i]);

            backtrack();

            current.pop();

            used[i] = false;
        }
    }

    backtrack();
}

function thirdLevel(): void {
    console.log("\n=== ТРЕТІЙ РІВЕНЬ ===");

    const otherBooks = [
        "Book4",
        "Book5",
        "Book6",
        "Book7",
        "Book8",
        "Book9",
        "Book10",
        "Book11",
        "Book12"
    ];

    const authorBooks = [
        "Book1",
        "Book2",
        "Book3"
    ];

    const blocks = [
        "AUTHOR_BLOCK",
        ...otherBooks
    ];

    const stream = fs.createWriteStream(
        "permutations.txt",
        "utf-8"
    );

    let count = 0;

    const LIMIT = 100;

    generatePermutations(blocks, blockPermutation => {
        if (count >= LIMIT) return;

        generatePermutations(authorBooks, authorPermutation => {
            if (count >= LIMIT) return;

            const result = blockPermutation.flatMap(item => {
                if (item === "AUTHOR_BLOCK") {
                    return authorPermutation;
                }

                return item;
            });

            stream.write(result.join(" ") + "\n");

            count++;
        });
    });

    stream.end();

    console.log(`Записано ${count} перестановок`);
}

async function main(): Promise<void> {
    const rl = readline.createInterface({
        input,
        output
    });

    firstLevel();

    secondLevel();

    const answer = await rl.question(
        "\nЗаписати перестановки у файл? y/n: "
    );

    if (answer.toLowerCase() === "y") {
        thirdLevel();
    } else {
        console.log("Третій рівень пропущено");
    }

    rl.close();
}

main();