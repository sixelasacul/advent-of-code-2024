import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(2);

/**
 * Plusieurs problèmes :
 * - Même si ça valide le même rapport, ça supprime pas le même niveau que dans l'exemple
 * - Ça ne détecte pas si c'est le premier le niveau qui est invalide
 */

export function runPart2() {
  const reports = input.trim().split(/\n/);
  let validReports = 0;

  for (const report of reports) {
    const levels = report.split(/\s/);
    let sign = 0;
    let isSafe = true;

    let i = 0;
    let canTolerate = true;
    console.log("------");
    console.log(report);

    while (i < levels.length - 1) {
      const next = i + 1;
      const diff = Number(levels[i]) - Number(levels[next]);
      console.log(levels[i], levels[next], diff);
      const absDiff = Math.abs(diff);

      const outOfRange = absDiff < 1 || absDiff > 3;
      const oppositeSign = sign !== 0 && sign !== Math.sign(diff);

      if (outOfRange || oppositeSign) {
        if (canTolerate) {
          levels.splice(next, 1);
          canTolerate = false;
          continue;
        }
        isSafe = false;
        break;
      }

      sign = Math.sign(diff);
      i++;
    }

    console.log(levels);
    console.log(isSafe);

    if (isSafe) {
      validReports++;
    }
  }

  return validReports;
}
