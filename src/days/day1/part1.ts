// Utiliser un iterator pour l'opti ?
export function runPart1(input: string) {
  const leftList: number[] = [];
  const rightList: number[] = [];
  for (const line of input.trim().split(/\n/)) {
    const [leftItem, rightItem] = line.split(/\s\s\s/);
    leftList.push(Number(leftItem));
    rightList.push(Number(rightItem));
  }

  leftList.sort((first, second) => first - second);
  rightList.sort((first, second) => first - second);

  let total = 0;
  for (let i = 0; i < leftList.length; i++) {
    const leftItem = leftList[i]!;
    const rightItem = rightList[i]!;
    total += Math.abs(leftItem - rightItem);
  }
  return total;
}

// Je pense qu'il doit y avoir un moyen d'optimiser les boucles. Pour chaque
// ligne du fichier, on vient ajouter la valeur au bon endroit dans la liste (
// pour qu'elle soit triée), tout en recalculant le total pour la nouvelle paire
// et les paires suivantes (soustraction de l'ancien résultat et addition du
// nouveau).
// export function runPart1() {
//   const lines = input.trim().split(/\n/);
//   // à voir pour tout mettre dans une seule map ? avec "left,right" en clé
//   const leftList: number[] = [];
//   const rightList: number[] = [];
//   let total = 0;

//   for (let i = 0; i < lines.length; i++) {
//     const read = lines[i]!.split(/\s\s\s/);
//     const leftRead = Number(read[0]);
//     const rightRead = Number(read[1]);

//     if (leftList.length === 0) {
//       leftList.push(leftRead);
//       continue;
//     }

//     if (rightList.length === 0) {
//       rightList.push(rightRead);
//       continue;
//     }

//     let j = 0;
//     while (j < i) {
//       const leftItem = leftList[j] ?? 0;
//       const rightItem = rightList[j] ?? 0;
//       console.log(leftList, leftRead, leftItem);

//       if (leftRead < leftItem) {
//         console.log("allo");
//         // swappedIl = il;
//         // // const prevResult = (leftList[il] ?? 0) + (rightList[il] ?? 0)
//         // boucle infinie je comprends pas pourquoi
//         leftList.splice(j, 0, leftRead);
//         // // const newResult = (leftList[il] ?? 0) + (rightList[il] ?? 0)
//         // // total -= prevResult
//         // // total += newResult
//       }

//       if (j === leftList.length - 1) {
//         leftList.push(leftRead);
//       }

//       j++;
//     }
//   }

//   return total;
// }
