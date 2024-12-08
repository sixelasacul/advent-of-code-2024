export function runPart2(input: string) {
  const regex = /(don't\(\)|do\(\))|mul\((\d*),(\d*)\)/gi;
  let total = 0;
  let enabled = true;
  for (const [, verb, leftOperand, rightOperand] of input.matchAll(regex)) {
    if (verb === "don't()") {
      enabled = false;
    }
    if (verb === "do()") {
      enabled = true;
    }
    if (enabled && leftOperand && rightOperand) {
      total += Number(leftOperand) * Number(rightOperand);
    }
  }
  return total;
}
