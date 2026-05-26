function fIntegral(x: number): number {
    return Math.sqrt(1 - 0.25 * Math.sin(x) ** 2);
}

function rectangles(a: number, b: number, h: number): number {
    let sum = 0;

    for (let x = a; x < b; x += h) {
        const nextX = Math.min(x + h, b);
        const middle = (x + nextX) / 2;
        sum += fIntegral(middle) * (nextX - x);
    }

    return sum;
}

function trapezoids(a: number, b: number, h: number): number {
    let sum = 0;

    for (let x = a; x < b; x += h) {
        const nextX = Math.min(x + h, b);
        sum += ((fIntegral(x) + fIntegral(nextX)) / 2) * (nextX - x);
    }

    return sum;
}

function simpson(a: number, b: number, h: number): number {
    let sum = 0;

    for (let x = a; x < b; x += h) {
        const nextX = Math.min(x + h, b);
        const middle = (x + nextX) / 2;

        sum += ((nextX - x) / 6) *
            (fIntegral(x) + 4 * fIntegral(middle) + fIntegral(nextX));
    }

    return sum;
}

function y(x: number): number {
    return 3 - x ** 3 + Math.sin(Math.PI * x / 2);
}

function derivativeY(x: number): number {
    return -3 * x ** 2 + (Math.PI / 2) * Math.cos(Math.PI * x / 2);
}

function bisection(a: number, b: number, eps: number): number | null {
    if (y(a) * y(b) > 0) return null;

    while (Math.abs(b - a) > eps) {
        const mid = (a + b) / 2;

        if (y(a) * y(mid) <= 0) {
            b = mid;
        } else {
            a = mid;
        }
    }

    return (a + b) / 2;
}

function newton(x0: number, eps: number): number {
    let x = x0;

    while (Math.abs(y(x)) > eps) {
        x = x - y(x) / derivativeY(x);
    }

    return x;
}

function chords(a: number, b: number, eps: number): number | null {
    if (y(a) * y(b) > 0) return null;

    let x = a;

    while (Math.abs(y(x)) > eps) {
        x = a - (y(a) * (b - a)) / (y(b) - y(a));

        if (y(a) * y(x) < 0) {
            b = x;
        } else {
            a = x;
        }
    }

    return x;
}

function diff(x: number, y: number): number {
    return 3 * x - 2 * y + 5;
}

function rungeKutta2(x0: number, y0: number, xEnd: number, h: number): void {
    let x = x0;
    let yValue = y0;

    console.log("x\t\ty");

    while (x <= xEnd + 0.000001) {
        console.log(`${x.toFixed(2)}\t\t${yValue.toFixed(6)}`);

        const k1 = diff(x, yValue);
        const k2 = diff(x + h, yValue + h * k1);

        yValue = yValue + (h / 2) * (k1 + k2);
        x = x + h;
    }
}

const a = 1;
const b = Math.PI / 2;
const h = 0.2;

console.log("Метод прямокутників:", rectangles(a, b, h));
console.log("Метод трапецій:", trapezoids(a, b, h));
console.log("Метод Сімпсона:", simpson(a, b, h));

console.log("Метод половинчастого ділення:", bisection(1, 2, 0.0001));
console.log("Метод дотичних:", newton(1.5, 0.0001));
console.log("Метод хорд:", chords(1, 2, 0.0001));

rungeKutta2(0, 1, 1, 0.1);