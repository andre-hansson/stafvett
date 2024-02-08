import { FC } from 'react';
import { useActiveGameStore } from '../store';

export const Answers: FC = () => {
  const { answers } = useActiveGameStore();
  return (
    <div className="flex flex-nowrap overflow-x-scroll w-full gap-2 bg-white text-black py-4">
      {answers.map((answer, index) => (
        <div key={index}>{answer}</div>
      ))}
    </div>
  );
};
Answers.displayName = 'Answers';
