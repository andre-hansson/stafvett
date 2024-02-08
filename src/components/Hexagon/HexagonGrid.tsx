import { FC } from 'react';
import { Hexagon } from './Hexagon';

type HexagonGridProps = {
  main: string;
  characters: string[];
  onHexagonClick: (char: string) => void;
};
export const HexagonGrid: FC<HexagonGridProps> = (props) => {
  const { characters, main, onHexagonClick } = props;

  return (
    <div className="pt-[56px]">
      <div className="flex">
        <div>
          <Hexagon character={characters[0]} onHexagonClick={onHexagonClick} />
        </div>
        <div className="-mx-[22px] -mt-[56px]">
          <Hexagon character={characters[1]} onHexagonClick={onHexagonClick} />
        </div>
        <div>
          <Hexagon character={characters[2]} onHexagonClick={onHexagonClick} />
        </div>
      </div>
      <div className="flex justify-center -mt-[48px] -mb-[56px]">
        <Hexagon character={main} middle onHexagonClick={onHexagonClick} />
      </div>
      <div className="flex mt-2">
        <div>
          <Hexagon character={characters[3]} onHexagonClick={onHexagonClick} />
        </div>
        <div className="-mx-[22px] mt-[56px]">
          <Hexagon character={characters[4]} onHexagonClick={onHexagonClick} />
        </div>
        <div>
          <Hexagon character={characters[5]} onHexagonClick={onHexagonClick} />
        </div>
      </div>
    </div>
  );
};
HexagonGrid.displayName = 'HexagonGrid';
