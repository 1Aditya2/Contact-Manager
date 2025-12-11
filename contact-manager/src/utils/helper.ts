export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export function generateId() {
    return Math.floor(Math.random() * 9000) + 1000;
}