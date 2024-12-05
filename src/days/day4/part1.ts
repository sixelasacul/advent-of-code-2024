import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(4);

/**
 * `-`
 */
function getHorizontalLine(input: string, length: number, index: number) {
  const lineNumber = Math.floor(index / length);
  const start = Math.max(index - 3, lineNumber * length);
  const end = Math.min(index + 3, (lineNumber + 1) * length - 1);
  return input.substring(start, end + 1);
}

/**
 * `|`
 */
function getVerticalLine(input: string, length: number, index: number) {
  const start = Math.max(index - 3 * length, index % length);
  const end = Math.min(
    index + 3 * length,
    input.length - (length - (index % length))
  );
  let chars = "";
  for (let i = start; i <= end; i = i + length) {
    chars += input[i];
  }
  return chars;
}

/**
 * `\`
 */
function getLeftToRightDiagonalLine(
  input: string,
  length: number,
  index: number
) {
  const lineNumber = Math.floor(index / length);
  const start = Math.max(index - 3 - 3 * length, (index % length) - lineNumber);
  const end = Math.min(
    index + 3 + 3 * length,
    input.length - (length - lineNumber)
  );
  let chars = "";

  for (let i = start; i <= end; i = i + length + 1) {
    chars += input[i];
  }
  return chars;
}

/**
 * `/`
 */
function getRightToLeftDiagonalLine(
  input: string,
  length: number,
  index: number
) {
  const lineNumber = Math.floor(index / length);
  const start = Math.max(
    index + 3 - 3 * length,
    input.length - 1 - ((index + 1) % length) * length
  );
  const end = Math.min(index - 3 + 3 * length, input.length - lineNumber);
  let chars = "";
  for (let i = start; i <= end; i = i + length - 1) {
    chars += input[i];
  }
  return chars;
}

export function runPart1() {
  const length = input.search(/\n/);
  const text = input.trim().replace(/\n/g, "");
  let total = 0;
  for (const { index } of text.matchAll(/x/gi)) {
    for (const [method, getLine] of [
      ["horizontal", getHorizontalLine],
      ["vertical", getVerticalLine],
      ["diagLR", getLeftToRightDiagonalLine],
      ["diagRL", getRightToLeftDiagonalLine],
    ] as const) {
      const line = getLine(text, length, index);
      console.log(index, method, line);
      if (/xmas|samx/gi.test(line)) {
        total++;
      }
    }
    console.log("-----");
  }
  return total;
}
