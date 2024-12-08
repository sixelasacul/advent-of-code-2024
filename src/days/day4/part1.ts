type Coordinates = [number, number];
type InputMap = string[][];
type GetLine = (map: InputMap, [x, y]: Coordinates) => string;

function getCoordinates(length: number, index: number): Coordinates {
  return [index % length, Math.floor(index / length)];
}

const getHorizontalLine: GetLine = (map, [x, y]) => {
  let chars = "";
  for (let i = x - 3; i <= x + 3; i++) {
    chars += map[y]?.[i] ?? "";
  }
  return chars;
};

const getVerticalLine: GetLine = (map, [x, y]) => {
  let chars = "";
  for (let i = y - 3; i <= y + 3; i++) {
    chars += map[i]?.[x] ?? "";
  }
  return chars;
};

const getDiagonalLineLeftToRight: GetLine = (map, [x, y]) => {
  let chars = "";
  let xi = x - 3;
  let yi = y - 3;
  while (xi <= x + 3 && yi <= y + 3) {
    chars += map[yi]?.[xi] ?? "";
    xi++;
    yi++;
  }
  return chars;
};

const getDiagonalLineRightToLeft: GetLine = (map, [x, y]) => {
  let chars = "";
  let xi = x + 3;
  let yi = y - 3;
  while (xi >= x - 3 && yi <= y + 3) {
    chars += map[yi]?.[xi] ?? "";
    xi--;
    yi++;
  }
  return chars;
};

function checkLine(line: string) {
  if (/samxmas/gi.test(line)) return 2;
  if (/xmas|samx/gi.test(line)) return 1;
  return 0;
}

export function runPart1(input: string) {
  const text = input.trim().replace(/\n/g, "");
  // y, x
  const map: InputMap = input
    .trim()
    .split(/\n/)
    .map((line) => line.trim().split(""));
  const length = map[0]!.length;
  let total = 0;

  for (const { index } of text.matchAll(/x/gi)) {
    const coord = getCoordinates(length, index);
    for (const getLine of [
      getHorizontalLine,
      getVerticalLine,
      getDiagonalLineLeftToRight,
      getDiagonalLineRightToLeft,
    ] as const) {
      total += checkLine(getLine(map, coord));
    }
  }
  return total;
}
