const scrabble = (word = "") => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
    const pointsForWord = word.toUpperCase().split("").map((x) => points[alphabet.indexOf(x)]);
    console.log(pointsForWord);
    console.log(pointsForWord.reduce((acc,x) => (acc+x)));
}

scrabble("Code");
