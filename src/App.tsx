import { FC, useCallback, useEffect, useState } from 'react';
import { HexagonGrid } from './components/Hexagon';
import { shuffleArray } from './utils';
import answersFile from '../game-data/answers/all-answers.json';
import { createGameObject } from './utils/createGameObject';
import dayjs from 'dayjs';
import { useActiveGameStore } from './store';
import { Button } from './components/Buttons';
import { Header } from './components/Header';
import { Answers } from './components/Answers';
import { Guess } from './components/Guess';
import { Toaster, toast } from 'sonner';
import { calculateWordScore } from './utils/points';

const App: FC = () => {
  const {
    main,
    characters,
    answers,
    correctGuesses,
    gameDate,
    startGame,
    addCorrectGuess,
    updateScore
  } = useActiveGameStore();

  const [guess, setGuess] = useState('');
  const [charArray, setCharArray] = useState(
    characters.split('').filter((c) => c !== main)
  );

  useEffect(() => {
    const date = dayjs();
    if (date.isSame(gameDate, 'day')) return;
    const d = date.format('YYYY-MM-DD');

    const { today, yesterday } = createGameObject(answersFile, d);
    startGame({ today, yesterday, date: d });
  }, [gameDate, startGame]);

  const handleClear = useCallback(() => {
    setGuess('');
  }, [setGuess]);

  const handleShuffle = useCallback(() => {
    setCharArray(shuffleArray(charArray));
  }, [charArray]);

  const handleGuess = useCallback(() => {
    if (!guess.split('').includes(main)) {
      toast.custom(() => (
        <div className="toast error">
          {`🚫 Ordet saknar`}
          <span className="ml-1 text-red-900 font-bold">
            {main.toUpperCase()}
          </span>
        </div>
      ));
      return;
    }

    if (answers.includes(guess)) {
      if (correctGuesses.includes(guess)) {
        toast.custom(() => (
          <div className="toast warn">{`Ordet har redan hittats`}</div>
        ));
      }

      addCorrectGuess(guess);
      const { score, message } = calculateWordScore(guess);
      updateScore(score);
      toast.custom(() => (
        <div className="toast success">{`${message} +${score}`}</div>
      ));
    } else {
      toast.custom(() => (
        <div className="toast warn">{`Ordet finns inte med i listan`}</div>
      ));
    }
    setGuess('');
  }, [
    answers,
    correctGuesses,
    guess,
    main,
    addCorrectGuess,
    updateScore,
    setGuess
  ]);

  return (
    <div className="flex flex-col h-screen w-full max-w-[600px] mx-auto">
      <Header />
      {/* <Answers /> */}
      <div className="flex flex-col flex-1 bg-neutral-200 dark:bg-darkneutral-300 justify-between pb-4 gap-2 items-center">
        <div className="flex-1 flex flex-col gap-2 justify-center relative">
          <Guess currentGuess={guess} />
          <HexagonGrid
            characters={charArray}
            main={main}
            onHexagonClick={(char) => setGuess((current) => current + char)}
          />
        </div>
        <div className="flex gap-4">
          <Button label="Clear" onClick={handleClear} />
          <Button label="Shuffle" onClick={handleShuffle} />
          <Button label="Enter" onClick={handleGuess} />
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;
