export function runPart2(input: string) {
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

    const sortedPageNumbers = pageNumbers.toSorted((first, second) => {
      return (
        (orderMinMap.get(Number(second))?.length ?? 0) -
        (orderMinMap.get(Number(first))?.length ?? 0)
      );
    });
    // console.log(sortedPageNumbers);

    if (sortedPageNumbers.join(",") !== update) {
      console.log("allo");
      const middleIndex = Math.round((sortedPageNumbers.length - 1) / 2);
      const middleValue = Number(sortedPageNumbers[middleIndex]);
      total += middleValue;
    }
  }
  return total;
}
