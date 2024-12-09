export function runPart2(input: string) {
  const reports = input.trim().split(/\n/);
  let validReports = 0;

  for (const report of reports) {
    const levels = report.split(/\s/);
    const original = report.split(/\s/);

    const diffs: number[] = [];
    let sign = 0;

    for (let i = 0; i < levels.length - 1; i++) {
      const level = Number(levels[i]);
      const nextLevel = Number(levels[i + 1]);
      const diff = level - nextLevel;
      diffs.push(diff);
      sign += Math.sign(diff);
    }

    // On peut faire une diff sur les longueurs pour savoir combien de corrections on a fait
    let hasCorrected = false;

    for (let i = 0; i < diffs.length - 1; i++) {
      const diff = diffs[i]!;
      const nextDiff = diffs[i + 1]!;
      const isWrong = diff < 1 || diff > 3 || Math.sign(diff) !== sign;
      const isNextWrong =
        nextDiff < 1 || nextDiff > 3 || Math.sign(nextDiff) !== sign;

      if (!isWrong) {
        continue;
      }

      // Si 2 diffs d'affilée sont mauvais, c'est que le chiffre central entre
      // les 3 est mauvais. On peut supprimer le chiffre directement, et la
      // prochaine diff.
      // Exemple : 2 9 3 4 5 => -7 6 -1 -1
      if (isWrong && isNextWrong) {
        levels.splice(i + 1, 1);
        diffs.splice(i + 1, 1);
      }

      const previousLevel = levels[i];
      const firstLevel = levels[i];
      const secondLevel = levels[i + 1];
      const nextLevel = levels[i + 2];
    }

    console.log(original.join(", "), "=>", diffs.join(", "), "=>", sign);
  }

  return validReports;
}
