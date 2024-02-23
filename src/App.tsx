import { FC, useCallback, useEffect, useState } from 'react';
import { HexagonGrid } from './components/Hexagon';
import { shuffleArray } from './utils';
import answersFile from '../game-data/answers/all-answers.json';
import { createGameObject } from './utils/createGameObject';
import dayjs from 'dayjs';
import { useActiveGameStore } from './store';
import { Button } from './components/Buttons';
import { Header } from './components/Header';
// import { Answers } from './components/Answers';
import { Guess } from './components/Guess';
import { Toaster, toast } from 'sonner';
import { calculateWordScore } from './utils/points';
import { Icon } from './icons';
import { ModalProvider } from './components/Modals';
import { CorrectGuesses } from './components/CorrectGuesses';
import { CorrectGuessesWeb } from './components/CorrectGuessesWeb';

const App: FC = () => {
  const {
    main,
    characters,
    answers,
    correctGuesses,
    gameDate,
    score,
    startGame,
    storeYesterdayProgress,
    addCorrectGuess,
    updateScore
  } = useActiveGameStore();

  const [guess, setGuess] = useState('');
  const [charArray, setCharArray] = useState<string[]>([]);

  useEffect(() => {
    const date = dayjs();

    // Only create one game per day
    if (date.isSame(gameDate, 'day')) return;

    storeYesterdayProgress(score, correctGuesses);
    const d = date.format('YYYY-MM-DD');

    const { today, yesterday } = createGameObject(answersFile, d);
    startGame({ today, yesterday, date: d });
  }, [correctGuesses, score, gameDate, startGame, storeYesterdayProgress]);

  const handleAddCharacterToGuess = useCallback(
    (char: string) => {
      setGuess((current) => current + char);
    },
    [setGuess]
  );

  useEffect(() => {
    setCharArray(characters.split('').filter((c) => c !== main));
  }, [characters, main, setCharArray]);

  const handleDeleteChar = useCallback(() => {
    setGuess((prev) => prev.slice(0, -1));
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
          <div className="toast warn">{`🙃 Ordet har redan hittats`}</div>
        ));

        setGuess('');
        return;
      }

      addCorrectGuess(guess);
      const { score, message } = calculateWordScore(guess);
      updateScore(score);
      toast.custom(() => (
        <div className="toast success">{`${message} +${score}`}</div>
      ));
    } else {
      toast.custom(() => (
        <div className="toast warn">{`🤦 Ordet finns inte med i listan`}</div>
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

  useEffect(() => {
    // Add keyboard support
    const handleEvent = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        handleGuess();
      } else if (event.code === 'Backspace') {
        handleDeleteChar();
      } else if (characters.includes(event.key)) {
        handleAddCharacterToGuess(event.key);
      }
    };

    window.addEventListener('keydown', handleEvent, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleEvent);
    };
  }, [characters, handleGuess, handleDeleteChar, handleAddCharacterToGuess]);

  return (
    <ModalProvider>
      <div className="flex flex-col items-center h-screen">
        <Header />
        {/* <Answers /> */}

        {/* Mobile */}
        <div className="w-full flex md:hidden flex-col md:flex-row flex-1 bg-neutral-200 dark:bg-darkneutral-300 pt-4 gap-2 items-center">
          <Guess currentGuess={guess} />
          <HexagonGrid
            characters={charArray}
            onHexagonClick={handleAddCharacterToGuess}
          />
          <div className="flex gap-4 mt-3 mb-3">
            <Button label={<Icon.Backspace />} onClick={handleDeleteChar} />
            <Button label={<Icon.Shuffle />} onClick={handleShuffle} />
            <Button
              label={<Icon.Check />}
              onClick={handleGuess}
              disabled={!(guess.length > 3)}
            />
          </div>
          <CorrectGuesses />
        </div>

        {/* Desktop */}
        <div className="w-full hidden md:flex flex-row flex-1 bg-neutral-200 dark:bg-darkneutral-300 pt-4 gap-2 items-center justify-center">
          <div className="flex flex-col flex-1 items-center max-w-[600px]">
            <Guess currentGuess={guess} />
            <HexagonGrid
              characters={charArray}
              onHexagonClick={handleAddCharacterToGuess}
            />
            <div className="flex gap-4 mt-3 mb-3">
              <Button label={<Icon.Backspace />} onClick={handleDeleteChar} />
              <Button label={<Icon.Shuffle />} onClick={handleShuffle} />
              <Button
                label={<Icon.Check />}
                onClick={handleGuess}
                disabled={!(guess.length > 3)}
              />
            </div>
          </div>
          <CorrectGuessesWeb />
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </ModalProvider>
  );
};

export default App;
