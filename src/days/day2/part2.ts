function checkLevel(diff: number, baseSign: number) {
  return diff < 1 || diff > 3 || Math.sign(diff) !== Math.sign(baseSign);
}

export function runPart2(input: string) {
  const reports = input.trim().split(/\n/);
  let validReports = 0;

  for (const report of reports) {
    const levels = report.split(/\s/);
    const levelsAsNumbers: number[] = [];
    const original = report.split(/\s/);

    const diffs: number[] = [];
    let sign = 0;

    for (let i = 0; i < levels.length - 1; i++) {
      const level = (levelsAsNumbers[i] = Number(levels[i]));
      const nextLevel = (levelsAsNumbers[i + 1] = Number(levels[i + 1]));
      const diff = level - nextLevel;
      diffs.push(diff);
      sign += Math.sign(diff);
    }

    // On peut faire une diff sur les longueurs pour savoir combien de corrections on a fait
    let hasCorrected = false;

    for (let i = 0; i < diffs.length - 1; i++) {
      const diff = diffs[i]!;
      const nextDiff = diffs[i + 1]!;
      const isWrong = checkLevel(diff, sign);
      const isNextWrong = checkLevel(nextDiff, sign);

      if (!isWrong) {
        continue;
      }

      const previousLevel = levelsAsNumbers[i - 1];
      const firstLevel = levelsAsNumbers[i];
      const secondLevel = levelsAsNumbers[i + 1];
      const nextLevel = levelsAsNumbers[i + 2];

      // Si 2 diffs d'affilée sont mauvais, c'est que le chiffre central entre
      // les 3 est mauvais. On peut supprimer le chiffre directement, et la
      // prochaine diff.
      // Exemple : 2 9 3 4 5 => -7 6 -1 -1
      if (isWrong && isNextWrong) {
        levels.splice(i + 1, 1);
        diffs.splice(i + 1, 1);
      }

      // Si c'est la toute première diff, et que la suivante a pas de souci,
      // c'est que c'est le premier chiffre qui pose problème
      // Exemple : 8 2 3 4 5 => 6 -1 -1 -1
      if (isWrong && !isNextWrong && previousLevel) {
        levels.splice(i, 1);
        diffs.splice(i, 1);
      }

      // Plus qu'à savoir lequel des deux parents de la diff a un meilleur match
      // avec les voisins
      const prevWrong = checkLevel(previousLevel! - secondLevel!, sign);
      const nextWrong = checkLevel(firstLevel! - nextLevel!, sign);

      if (prevWrong && !nextWrong) {
        levels.splice(i, 1);
        diffs.splice(i, 1);
      }

      if (!prevWrong && nextWrong) {
        levels.splice(i + 1, 1);
        diffs.splice(i, 1);
      }
    }

    console.log(
      original.join(", "),
      "=>",
      diffs.join(", "),
      "=>",
      levels.join(", ")
    );
  }

  return validReports;
}
