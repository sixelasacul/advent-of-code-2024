type Operator = (first: number, second: number) => number;
const add: Operator = (first, second) => first + second;
const mult: Operator = (first, second) => first * second;
const concat: Operator = (first, second) => Number(`${first}${second}`);

function getOperator(operators: number[], index: number) {
  const operator = operators[index];
  switch (operator) {
    default:
    case 0:
      return add;
    case 1:
      return mult;
    case 2:
      return concat;
  }
}
// jsp comment incrémenter un nombre en base 3, on va faire un tableau
function increaseOperators(operators: number[]) {
  let hasIncreased = false;
  return operators.map((operator) => {
    if (!hasIncreased) {
      if (operator < 2) {
        hasIncreased = true;
        return operator + 1;
      }
      if (operator === 2) {
        return 0;
      }
    }
    return operator;
  });
}

// très clairement pas opti à cause du tableau d'opérations qui est géré à la main
export function runPart2(input: string) {
  let total = 0;

  for (const [, _testValue, _operands] of input.matchAll(
    /(\d+):([\s\d]+)\n/gi
  )) {
    const testValue = Number(_testValue);
    const operands = _operands!.trim().split(/\s/);
    const possibilities = 3 ** operands.length - 1;
    let operators = Array.from<number>({ length: operands.length - 1 }).fill(0);

    for (let i = 0; i < possibilities; i++) {
      let localTotal = Number(operands[0]);

      for (let j = 1; j < operands.length; j++) {
        const operator = getOperator(operators, j - 1);
        const operand = Number(operands[j]);
        localTotal = operator(localTotal, operand);
      }

      if (localTotal === testValue) {
        total += localTotal;
        break;
      }

      operators = increaseOperators(operators);
    }
  }

  return total;
}
