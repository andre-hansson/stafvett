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
import { FormProvider, useForm } from 'react-hook-form';

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

  const formMethods = useForm<{ guess: string }>({
    defaultValues: {
      guess: ''
    }
  });
  const { setValue, watch } = formMethods;
  const guess = watch('guess');

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
      setValue('guess', guess + char);
    },
    [guess, setValue]
  );

  useEffect(() => {
    setCharArray(characters.split('').filter((c) => c !== main));
  }, [characters, main, setCharArray]);

  const handleDeleteChar = useCallback(() => {
    setValue('guess', guess.slice(0, -1));
  }, [guess, setValue]);

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

        setValue('guess', '');
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
        <div className="toast warn">{`🤦 Ordet finns inte med i ordlistan`}</div>
      ));
    }
    setValue('guess', '');
  }, [
    answers,
    correctGuesses,
    guess,
    main,
    addCorrectGuess,
    updateScore,
    setValue
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
    <FormProvider {...formMethods}>
      <ModalProvider>
        <div className="flex flex-col items-center h-full">
          <Header />
          {/* <Answers /> */}

          {/* Mobile */}
          <div className="w-full flex md:hidden flex-col pb-4 md:flex-row flex-1 bg-neutral-200 dark:bg-darkneutral-300 gap-6 items-center">
            <div className="flex-1 flex w-full">
              <CorrectGuesses />
            </div>

            <div className="flex-0 flex flex-col gap-1 justify-end items-center">
              <Guess currentGuess={guess} />
              <HexagonGrid
                characters={charArray}
                onHexagonClick={handleAddCharacterToGuess}
              />
              <div className="flex gap-4 pt-4 pb-2">
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Backspace size={32} />}
                  onClick={handleDeleteChar}
                />
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Shuffle size={32} />}
                  onClick={handleShuffle}
                />
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Check size={32} />}
                  onClick={handleGuess}
                  disabled={!(guess.length > 3)}
                />
              </div>
              <div className="flex flex-col items-center select-none">
                <div className="text-xs">Hittade ord</div>
                <div className="text-xl">
                  {correctGuesses.length} / {answers.length}
                </div>
              </div>
            </div>
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
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Backspace size={32} />}
                  onClick={handleDeleteChar}
                />
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Shuffle size={32} />}
                  onClick={handleShuffle}
                />
                <Button
                  className="px-5 py-2.5"
                  label={<Icon.Check size={32} />}
                  onClick={handleGuess}
                  disabled={!(guess.length > 3)}
                />
              </div>
              <div className="flex flex-col items-center select-none">
                <div className="text-xs">Hittade ord</div>
                <div className="text-xl">
                  {correctGuesses.length} / {answers.length}
                </div>
              </div>
            </div>
            <CorrectGuessesWeb />
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </ModalProvider>
    </FormProvider>
  );
};

export default App;
