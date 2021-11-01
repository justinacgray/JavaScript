const alphabet = "abcdefghijklmnopqrstuvwxyz";
const vowels = "aeiou";
const constonant = "bcdfghjklmnqrstvwxz";

//checking is char in a vowel
const isVowel = (char) => {
    // -1 does not exist
    if (vowels.indexOf(char) !== -1) {
        return true;
    }
    return false;
};

//checking is char in a consonant
const isConsonant = (char) => {
    // -1 does not exist
    if (constonant.indexOf(char) !== -1) {
        return true;
    }
    return false;
};

//Rule 4- sometimes Y is a vowel
const sometimesY = (char) => {
    //if the char has "y" in it AND if the char is not a vowel push the "y" in the vowels
    if (char.indexOf("y") && vowels.indexOf(char) !== -1) {
        vowels.concat("y");
    }
    return vowels;
};
// console.log(sometimesY("b"));

//Counting Repeated Letter Function
const countedRepeatedLetters = (chars, letter) => {
    const letterCount = chars.filter((char) => {
        return char === letter;
    });
    return letterCount.length;
};

//gets value of index in the alphabet e.g. a, b, c  => 1,2,3
const getIndex = (char) => alphabet.indexOf(char);

const wordScores = (term) => {
    //make letters lowercase
    const word = term.toLowerCase();
    //storing word sum
    let wordSum = 0;

    //counting how many instances of a word
    let repeatLetterCount = 0;

    //loop through word-
    //refactoring thoughts- use forEach
    for (let x = 0; x < word.length; x++) {
        let letterValue = 0;
        // represents a letter within the word
        const currLetter = word[x];
        const prevLetter = word[x - 1];
        const nextLetter = word[x + 1];

        //indexOf finds the FRIST specified value in a string
        //does any of the alphabet index exist in letter
        const letterIndex = alphabet.indexOf(currLetter);
        // Ensure that the letterIndx > -1 (-1 means it's not there)
        //checks for valid word
        if (letterIndex == -1) {
            continue;
        }

        //refactoring thought use ternary operations s
        //  Rule 2: consonant precedes vowel
        // checks any index EXCEPT the last index AND the currentletter is a consonant AND next letter is a vowel
        if (
            x !== word.length &&
            isConsonant(currLetter) &&
            isVowel(nextLetter)
        ) {
            // halfing the value and random up
            const half = (getIndex(currLetter) + 1) / 2;
            letterValue += Math.round(half);
            // console.log(x, "= ", Math.round(half));
        } else if (
            x !== word.length &&
            isVowel(currLetter) &&
            isVowel(nextLetter)
        ) {
            // Rule 3: vowels next to one another
            const squared = getIndex(currLetter) + 1;
            letterValue += squared ** 2;
            // console.log(x, "= ", squared ** 2);
        } else if (
            x !== word.length &&
            isVowel(currLetter) &&
            isVowel(prevLetter)
        ) {
            // Rule 3: vowels next to one another
            const squared = getIndex(currLetter) + 1;
            letterValue += squared ** 2;
            // console.log(x, "= ", squared ** 2);
        } else {
            // console.log(x, "= ", getIndex(currLetter) + 1);
            letterValue += getIndex(currLetter) + 1;
        }
        wordSum += letterValue;
    }
    return wordSum;
};

console.log(wordScores("agree")); //67 (a= 1; g = 7; r = 18/2=9; e = 5^2 + e = 5^2)

//  console.log('value of b', getValue('b') + 1);

// 0 - a -
// 1 - g -
// 2 - r -  18/2 = 9
// 3 - e -  5^2 = 25
// 4 - e -  5^2 = 25

// - agree
// a g r e e
// (1 + 7 + 18/2 + 5^2 + 5^2)^2 = 4489
// - intelligently
// i n t e l l i g e n t l y
// (9 + 14 + 20/2 + 5 + 12 + 12/2 + 9 + 7/3 + 5 + 14 + 20 + 12 + 25)^3 = 3048625

// So if a consonant is followed by a vowel => divide the consonant by 2
