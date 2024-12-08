export function runPart1(input: string) {
  const [orderRules, updates] = input.split(/\n\n/);
  const orderMinMap = new Map<number, number[]>();
  const orderMaxMap = new Map<number, number[]>();

  for (const rule of orderRules!.split(/\n/)) {
    const [min, max] = rule.split(/\|/);
    const minNumber = Number(min);
    const maxNumber = Number(max);

    orderMinMap.set(
      minNumber,
      (orderMinMap.get(minNumber) ?? []).concat(maxNumber)
    );
    orderMaxMap.set(
      maxNumber,
      (orderMaxMap.get(maxNumber) ?? []).concat(minNumber)
    );
  }

  let total = 0;
  for (const update of updates!.trim().split(/\n/)) {
    const pageNumbers = update.trim().split(/,/);

    let isCorrect = true;
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageNumber = Number(pageNumbers[i]);
      const minRules = orderMinMap.get(pageNumber) ?? [];

      for (let j = i + 1; j < pageNumbers.length; j++) {
        const nextPageNumber = Number(pageNumbers[j]);
        if (!minRules.includes(nextPageNumber)) {
          isCorrect = false;
          break;
        }
      }

      if (!isCorrect) {
        break;
      }
    }

    if (isCorrect) {
      const middleIndex = Math.round((pageNumbers.length - 1) / 2);
      const middleValue = Number(pageNumbers[middleIndex]);
      total += middleValue;
    }
  }
  return total;
}
