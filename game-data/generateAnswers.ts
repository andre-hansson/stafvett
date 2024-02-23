import { Answer } from '../types/Answer';
import { convertFileToArray, removeInvalidWords } from './generatationUtils';
import { createGameObject } from '../src/utils/createGameObject';
import { shuffleArray } from '../src/utils/shuffleArray';
import { writeFileSync } from 'fs';
import cliProgress from 'cli-progress';
import currentAnswers from './answers/all-answers.json';
import readlineSync from 'readline-sync';

const minimumAnswerCount = 20;
const numPuzzlesPerFile = 3650; // 10 years...

const words = convertFileToArray('./game-data/words/all-words.txt');
const validWords = removeInvalidWords(words);
const pangrams = validWords.filter((word) => new Set(word).size === 7);

const uniqueCombinations = pangrams.reduce(
  (combinations: Set<string>, pangram: string) => {
    // Sort and store unique characters
    const unique = new Set(pangram.split('').sort());
    combinations.add([...unique].join(''));

    return combinations;
  },
  new Set()
);
const uniqueCombinationsShuffled = shuffleArray(Array.from(uniqueCombinations));

const answersCreationDate = new Date().toISOString();
const currentGame = createGameObject(currentAnswers, answersCreationDate);

let allAnswers: Answer[] = [];
const createProgressbar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic
);
createProgressbar.start(uniqueCombinations.size * 7, 0);
let completed = 0;

for (let offset = 0; offset < 7; offset++) {
  uniqueCombinationsShuffled.forEach((characters, index) => {
    const main = characters[(index + offset) % 7];
    const answers = validWords.filter((word) => {
      // Only keep words with main char
      if (!word.includes(main)) {
        return false;
      }

      // Keep all words that is constructed with the chars of the current combination
      return word.split('').every((char) => characters.includes(char));
    });

    // Only store game if minimumAnswerCount is reached
    if (answers.length >= minimumAnswerCount) {
      allAnswers.push({ answers, main, characters } as Answer);
    }

    // Start on new file if limit is reached
    if (completed % numPuzzlesPerFile === 0) {
      const currentAnswersFile = convertFileToArray(
        './game-data/answers/current-answerfile.txt'
      ).pop()!;
      const fileNum = completed / numPuzzlesPerFile;

      // validation today and yesterdays puzzle hasn't changed
      const fileName = `./game-data/answers/all-answers${fileNum === 1 ? '' : `-${fileNum}`}.json`;
      if (fileName.endsWith(currentAnswersFile)) {
        console.log(
          `\nChecking file currently in use by the game: ${fileName}`
        );
        const newCurrentGame = createGameObject(
          allAnswers,
          answersCreationDate
        );
        const newCurrentGameJson = JSON.stringify(newCurrentGame);
        const currentGameJson = JSON.stringify(currentGame);

        if (newCurrentGameJson !== currentGameJson) {
          console.log(
            `currentGameJson: ${currentGameJson.substring(0, 100)} ...`
          );
          console.log(
            `newCurrentGameJson: ${newCurrentGameJson.substring(0, 100)} ...`
          );
          if (
            !readlineSync.keyInYN(
              "Today's and yesterday's puzzles have changed. Continue?"
            )
          ) {
            process.exit();
          }
        } else {
          console.log(
            `Checks passed. Today's and yesterday's puzzles have not changed.`
          );
        }
      }

      writeFileSync(fileName, `${JSON.stringify(allAnswers, null, 2)}`);
      allAnswers = [];
    }

    completed++;
    createProgressbar.update(completed);
  });
}
console.log('allAnswers', allAnswers);
createProgressbar.stop();
console.log(
  `Processed ${completed} puzzles, and ${Math.floor(completed / numPuzzlesPerFile)} files.`
);
console.log(`${Math.floor(completed / 365)} years of puzzles.`);
