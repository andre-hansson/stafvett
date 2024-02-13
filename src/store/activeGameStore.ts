import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Game } from '../../types';

interface ActiveGameState {
  main: string;
  characters: string;
  answers: string[];
  correctGuesses: string[];
  score: number;
  gameDate: string;
  yesterdayMain: string;
  yesterdayCharacters: string;
  yesterdayAnswers: string[];
  yesterdayScore: number;
  yesterdayCorrectGuesses: string[];
  startGame: (game: Game) => void;
  storeYesterdayProgress: (score: number, correctGuesses: string[]) => void;
  addCorrectGuess: (guess: string) => void;
  updateScore: (value: number) => void;
  clearCorrectGuess: () => void;
  resetScore: () => void;
}

export const useActiveGameStore = create<ActiveGameState>()(
  persist(
    (set, get) => ({
      main: '',
      characters: '',
      answers: [],
      correctGuesses: [],
      gameDate: '',
      score: 0,
      yesterdayMain: '',
      yesterdayCharacters: '',
      yesterdayAnswers: [],
      yesterdayScore: 0,
      yesterdayCorrectGuesses: [],
      startGame: (game: Game) => {
        set(() => ({
          main: game.today.main,
          characters: game.today.characters,
          answers: game.today.answers,
          gameDate: game.date,
          correctGuesses: [],
          score: 0,
          yesterdayMain: game.yesterday.main,
          yesterdayCharacters: game.yesterday.characters,
          yesterdayAnswers: game.yesterday.answers
        }));
      },
      storeYesterdayProgress: (score, correctGuesses) => {
        set({
          yesterdayScore: score,
          yesterdayCorrectGuesses: correctGuesses
        });
      },
      addCorrectGuess: (guess: string) => {
        set({
          correctGuesses: [...get().correctGuesses, guess]
        });
      },
      updateScore: (value: number) => {
        set({
          score: get().score + value
        });
      },
      clearCorrectGuess: () => {
        set({
          correctGuesses: []
        });
      },
      resetScore: () => {
        set({
          score: 0
        });
      }
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ...state })
    }
  )
);
