type Coordinates = [number, number];
type InputMap = string[][];
type GetLine = (map: InputMap, [x, y]: Coordinates) => string;

function getCoordinates(length: number, index: number): Coordinates {
  return [index % length, Math.floor(index / length)];
}

const getDiagonalLineLeftToRight: GetLine = (map, [x, y]) => {
  let chars = "";
  let xi = x - 1;
  let yi = y - 1;
  while (xi <= x + 1 && yi <= y + 1) {
    chars += map[yi]?.[xi] ?? "";
    xi++;
    yi++;
  }
  return chars;
};

const getDiagonalLineRightToLeft: GetLine = (map, [x, y]) => {
  let chars = "";
  let xi = x + 1;
  let yi = y - 1;
  while (xi >= x - 1 && yi <= y + 1) {
    chars += map[yi]?.[xi] ?? "";
    xi--;
    yi++;
  }
  return chars;
};

function checkLine(line: string) {
  if (/mas|sam/gi.test(line)) return 1;
  return 0;
}

export function runPart2(input: string) {
  const text = input.trim().replace(/\n/g, "");
  // y, x
  const map: InputMap = input
    .trim()
    .split(/\n/)
    .map((line) => line.trim().split(""));
  const length = map[0]!.length;
  let total = 0;

  for (const { index } of text.matchAll(/a/gi)) {
    const coord = getCoordinates(length, index);
    const result =
      checkLine(getDiagonalLineLeftToRight(map, coord)) +
      checkLine(getDiagonalLineRightToLeft(map, coord));
    if (result === 2) {
      total++;
    }
  }
  return total;
}
