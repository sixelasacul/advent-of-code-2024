import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(3);

export function runPart1() {
  const regex = /mul\((\d*),(\d*)\)/gi;
  let total = 0;
  for (const [, leftOperand, rightOperand] of input.matchAll(regex)) {
    total += Number(leftOperand) * Number(rightOperand);
  }
  return total;
}
