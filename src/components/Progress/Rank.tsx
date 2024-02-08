import { FC, useMemo } from 'react';
import { calculateScoreLevels } from '../../utils/points';
import { useActiveGameStore } from '../../store';

const ranks = [
  'Noob',
  'Nybörjare',
  'Bra början',
  '## Moving up ##',
  'Bra',
  '## Solid ##',
  'Nice',
  'Grymt',
  'Fantastiskt',
  'Geni'
];

export const Rank: FC = () => {
  const { answers, score } = useActiveGameStore();
  const tiers = useMemo(() => calculateScoreLevels(answers), [answers]);

  const currentRank = useMemo(() => {
    // Get tier closest to score, floored.
    const closest = tiers.reverse().find((t) => t <= score);
    return ranks[tiers.reverse().indexOf(closest ?? 0) ?? 0];
  }, [score, tiers]);

  return (
    <div className="font-heading text-xl text-center uppercase">
      <span className="text-xl font-bold text-purple-800 dark:text-purple-300 invisible">
        ({score})
      </span>
      {currentRank} (
      <span className="text-xl font-bold text-purple-800 dark:text-purple-300">
        {score}
      </span>
      )
    </div>
  );
};
Rank.displayName = 'Rank';
