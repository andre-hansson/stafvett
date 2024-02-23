# Puzzle generation

## How it works

To generate puzzles requires the following steps:

To prepare what letters to use when generating puzzles we first need to extract all words with 7 unique letters from the list of words. Each of these words has its letters sorted alphabetically and non unique combinations are removed. This list is then shuffled to make the puzzles a little more random from day to day

All the puzzles are then created by iterating over the list, using each letter in every combination as the main one. This creates 7 puzzles per combination, any puzzle with an answer count less than the minimum requirement (20) is discarded.

When the number of usable puzzles generated reaches the puzzles per file count we write the answer list to a json file and continue.

## Word list

The list of words used to generate puzzles is created with a large base file, `svenska-ord.txt`.

Words that are missing from this list is added using `added-words.txt`.

Words that shouldn't be included are filtered using `removed-words.txt`.

To generate the complete list of words run

```bash
yarn generate-word-list
```

## Answers

Each file contains 3650 puzzles, each puzzle contains a minimum of 20 words. This mean a single file hold one puzzle a day for 10 years. A puzzle has 7 letters, 1 main letter and a list of words that can be created using the letters.

To generate the json files with answers. Run the following

```bash
yarn generate-answers
```
