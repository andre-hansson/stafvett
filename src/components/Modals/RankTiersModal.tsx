import { FC, useMemo } from 'react';
import { useActiveGameStore } from '../../store';
import { calculateScoreLevels } from '../../utils/points';
import { RankTiers } from '../Progress/RankTiers';

export const RankTiersModal: FC = () => {
  const { answers, score } = useActiveGameStore();
  const tiers = useMemo(() => calculateScoreLevels(answers), [answers]);

  const currentRank = useMemo(() => {
    const closest = tiers.reverse().find((t) => t <= score);
    return RankTiers[tiers.reverse().indexOf(closest ?? 0) ?? 0];
  }, [score, tiers]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-heading text-xl mb-4 text-center">Nivåer</h2>
      <div>
        Din rank baseras på en procentandel av möjliga poäng i ett pussel.
        Minsta poäng för att nå varje rang för dagens är:
      </div>
      <ol className="list-decimal ml-5">
        {RankTiers.map((name, index) => (
          <li key={index} className="font-heading text-xl">
            {name === currentRank ? (
              <span className="text-purple-800 dark:text-purple-300">
                {name}
              </span>
            ) : (
              name
            )}{' '}
            (
            <span className="text-purple-800 dark:text-purple-300 text-base font-medium">
              {tiers[index]}
            </span>
            )
          </li>
        ))}
      </ol>
    </div>
  );
};
RankTiersModal.displayName = 'RankTiersModal';
