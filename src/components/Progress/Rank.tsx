import { FC, useCallback, useMemo } from 'react';
import { calculateScoreLevels } from '../../utils/points';
import { useActiveGameStore } from '../../store';
import { RankTiers } from './RankTiers';
import { useModal } from '../../hooks';
import { RankTiersModal } from '../Modals';

export const Rank: FC = () => {
  const { answers, score } = useActiveGameStore();
  const { setModal } = useModal();
  const tiers = useMemo(() => calculateScoreLevels(answers), [answers]);

  const currentRank = useMemo(() => {
    // Get tier closest to score, floored.
    const closest = tiers.reverse().find((t) => t <= score);
    return RankTiers[tiers.reverse().indexOf(closest ?? 0) ?? 0];
  }, [score, tiers]);

  const showAllRanks = useCallback(() => {
    setModal(<RankTiersModal />);
  }, [setModal]);

  return (
    <div
      className="font-heading text-lg md:text-xl text-center uppercase"
      onClick={showAllRanks}
    >
      <span className="font-bold text-purple-800 dark:text-purple-300 invisible">
        ({score})
      </span>
      {currentRank} (
      <span className="text-base md:text-lg font-bold text-purple-800 dark:text-purple-300">
        {score}
      </span>
      )
    </div>
  );
};
Rank.displayName = 'Rank';
