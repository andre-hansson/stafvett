import { writeFileSync } from 'fs';
import { convertFileToArray } from './generatationUtils';

const wordFilePath = './game-data/words';

const originalWordsList = convertFileToArray(`${wordFilePath}/svenska-ord.txt`);
const removedWordsList = new Set(
  convertFileToArray(`${wordFilePath}/removed-words.txt`)
);
const addedWordsList = convertFileToArray(`${wordFilePath}/added-words.txt`);

const all = originalWordsList
  .concat(addedWordsList)
  .filter((word) => !removedWordsList.has(word))
  .sort((a, b) => a.localeCompare(b, 'sv'));

writeFileSync(`${wordFilePath}/all-words.txt`, all.join('\n'));
