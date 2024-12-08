// Utiliser un iterator pour l'opti ?
export function runPart1(input: string) {
  const reports = input.trim().split(/\n/);
  let validReports = 0;

  for (const report of reports) {
    const levels = report.split(/\s/);
    let sign = 0;
    let isSafe = true;

    for (let i = 0; i < levels.length - 1; i++) {
      const diff = Number(levels[i]) - Number(levels[i + 1]);
      const absDiff = Math.abs(diff);

      if (absDiff < 1 || absDiff > 3) {
        isSafe = false;
        break;
      }

      if (sign === 0) {
        sign = Math.sign(diff);
        continue;
      }

      if (sign !== Math.sign(diff)) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      validReports++;
    }
  }

  return validReports;
}
