import { FC, useMemo } from 'react';
import { useDarkModeStore } from '../../store';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tailwindcssConfig = resolveConfig(tailwindConfig) as any;

const light = tailwindcssConfig.theme.colors.neutral[400];
const dark = tailwindcssConfig.theme.colors.darkneutral[400];
const mainLight = tailwindcssConfig.theme.colors.purple[300];
const mainDark = tailwindcssConfig.theme.colors.purple[800];

type HexagonProps = {
  middle?: boolean;
  character: string;
  onHexagonClick: (char: string) => void;
};
export const Hexagon: FC<HexagonProps> = ({
  character,
  middle = false,
  onHexagonClick
}) => {
  const { isDarkMode } = useDarkModeStore();

  const color = useMemo(() => {
    if (isDarkMode) {
      return middle ? mainDark : dark;
    } else {
      return middle ? mainLight : light;
    }
  }, [middle, isDarkMode]);

  return (
    <div className="flex" onClick={() => onHexagonClick(character)}>
      <div className="flex">
        <div className="hexagon-left" style={{ borderColor: color }} />
        <div
          className="hexagon-middle text-darkneutral-300 dark:text-neutral-300 uppercase font-heading font-medium"
          style={{ backgroundColor: color }}
        >
          {character}
        </div>
        <div className="hexagon-right" style={{ borderColor: color }} />
      </div>
    </div>
  );
};
Hexagon.displayName = 'Hexagon';
