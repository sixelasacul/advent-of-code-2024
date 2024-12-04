import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(1);

export function runPart2() {
  const leftList: number[] = [];
  const rightList: Map<number, number> = new Map();

  for (const line of input.trim().split(/\n/)) {
    const [leftItem, rightItem] = line.split(/\s\s\s/);
    leftList.push(Number(leftItem));
    const rightItemKey = Number(rightItem);
    rightList.set(rightItemKey, (rightList.get(rightItemKey) ?? 0) + 1);
  }

  let total = 0;
  for (const leftItem of leftList) {
    total += leftItem * (rightList.get(leftItem) ?? 0);
  }
  return total;
}
