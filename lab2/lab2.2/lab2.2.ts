import * as fs from "fs";

const regex = /^\^[A-Z]+\*\^[A-Z0-9]+\^$/;

enum State {
    Start,
    FirstPart,
    Star,
    SecondStart,
    SecondPart,
    End,
    Error
}

function isUpper(ch: string): boolean {
    return ch >= "A" && ch <= "Z";
}

function isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
}

function checkBySwitch(word: string): boolean {
    let state = State.Start;

    for (const ch of word) {
        switch (state) {
            case State.Start:
                if (ch === "^") state = State.FirstPart;
                else state = State.Error;
                break;

            case State.FirstPart:
                if (isUpper(ch)) state = State.FirstPart;
                else if (ch === "*") state = State.Star;
                else state = State.Error;
                break;

            case State.Star:
                if (ch === "^") state = State.SecondStart;
                else state = State.Error;
                break;

            case State.SecondStart:
                if (isUpper(ch) || isDigit(ch)) {
                    state = State.SecondPart;
                } else {
                    state = State.Error;
                }
                break;

            case State.SecondPart:
                if (isUpper(ch) || isDigit(ch)) {
                    state = State.SecondPart;
                } else if (ch === "^") {
                    state = State.End;
                } else {
                    state = State.Error;
                }
                break;

            case State.End:
                state = State.Error;
                break;
        }

        if (state === State.Error) {
            return false;
        }
    }

    return state === State.End;
}

function getType(ch: string): string {
    if (ch === "^") return "^";
    if (ch === "*") return "*";
    if (isUpper(ch)) return "LETTER";
    if (isDigit(ch)) return "DIGIT";

    return "OTHER";
}

const table = new Map<State, Map<string, State>>();

table.set(
    State.Start,
    new Map([
        ["^", State.FirstPart]
    ])
);

table.set(
    State.FirstPart,
    new Map([
        ["LETTER", State.FirstPart],
        ["*", State.Star]
    ])
);

table.set(
    State.Star,
    new Map([
        ["^", State.SecondStart]
    ])
);

table.set(
    State.SecondStart,
    new Map([
        ["LETTER", State.SecondPart],
        ["DIGIT", State.SecondPart]
    ])
);

table.set(
    State.SecondPart,
    new Map([
        ["LETTER", State.SecondPart],
        ["DIGIT", State.SecondPart],
        ["^", State.End]
    ])
);

function checkByTable(word: string): boolean {
    let state = State.Start;

    for (const ch of word) {
        const type = getType(ch);

        const next = table.get(state)?.get(type);

        if (next === undefined) {
            return false;
        }

        state = next;
    }

    return state === State.End;
}

function firstLevel(): void {
    console.log("=== ПЕРШИЙ РІВЕНЬ ===");

    const text = fs.readFileSync("words.txt", "utf-8");

    const words = text.split(/\r?\n/);

    for (const word of words) {
        if (regex.test(word)) {
            console.log(word);
        }
    }
}

function secondLevel(): void {
    console.log("\n=== ДРУГИЙ РІВЕНЬ ===");

    const word = "^ABC*^A12^";

    const result = checkBySwitch(word);

    console.log(word, "->", result ? "правильне" : "неправильне");
}

function thirdLevel(): void {
    console.log("\n=== ТРЕТІЙ РІВЕНЬ ===");

    const text = fs.readFileSync("text.txt", "utf-8");

    const words = text
        .split(/[$,.]+/)
        .map(word => word.trim())
        .filter(word => word.length > 0);

    for (const word of words) {
        const result = checkByTable(word);

        console.log(word, "->", result ? "правильне" : "неправильне");
    }
}

firstLevel();
secondLevel();
thirdLevel();