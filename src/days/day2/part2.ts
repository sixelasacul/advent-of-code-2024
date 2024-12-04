import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(2);

export function runPart2() {
  const reports = input.trim().split(/\n/);
  let validReports = 0;

  for (const report of reports) {
    const levels = report.split(/\s/);
    let sign = 0;
    let isSafe = true;

    for (let i = 0; i < levels.length - 1; i++) {
      let shouldCheck = true;
      let j = 1;

      // ah oui alors le problème c'est que si on en saute un, il faut continuer
      // à le sauter pour le reste de la liste, donc faut littéralement le drop
      // et continuer, en flaggant qu'il y a eu un drop, et si le reste fail
      // encore, c'est pas safe.

      while (shouldCheck && j < 3) {
        const diff = Number(levels[i]) - Number(levels[i + j]);
        const absDiff = Math.abs(diff);
        console.log(levels[i], levels[i + j], diff);

        j++;

        if (absDiff < 1 || absDiff > 3) {
          isSafe = shouldCheck || false;
          break;
        }

        if (sign === 0) {
          sign = Math.sign(diff);
          shouldCheck = !shouldCheck;
          continue;
        }

        if (sign !== Math.sign(diff)) {
          isSafe = shouldCheck || false;
          break;
        }

        shouldCheck = !shouldCheck;
      }
    }

    if (isSafe) {
      console.log(report);
      validReports++;
    }
  }

  return validReports;
}
