import { FC, memo } from 'react';
import { Hexagon } from './Hexagon';

type HexagonGridProps = {
  main: string;
  characters: string[];
  onHexagonClick: (char: string) => void;
};
export const HexagonGrid: FC<HexagonGridProps> = memo((props) => {
  const { characters, main, onHexagonClick } = props;

  return (
    <div className="pt-[43px] md:pt-[56px]">
      <div className="flex">
        <div>
          <Hexagon character={characters[0]} onHexagonClick={onHexagonClick} />
        </div>
        <div className="-mx-[17px] -mt-[43px] md:-mx-[22px] md:-mt-[56px]">
          <Hexagon character={characters[1]} onHexagonClick={onHexagonClick} />
        </div>
        <div>
          <Hexagon character={characters[2]} onHexagonClick={onHexagonClick} />
        </div>
      </div>
      <div className="flex justify-center -mt-[35px] -mb-[43px] md:-mt-[48px] md:-mb-[56px]">
        <Hexagon character={main} middle onHexagonClick={onHexagonClick} />
      </div>
      <div className="flex mt-[7px] md:mt-2">
        <div>
          <Hexagon character={characters[3]} onHexagonClick={onHexagonClick} />
        </div>
        <div className="-mx-[17px] mt-[43px] md:-mx-[22px] md:mt-[56px]">
          <Hexagon character={characters[4]} onHexagonClick={onHexagonClick} />
        </div>
        <div>
          <Hexagon character={characters[5]} onHexagonClick={onHexagonClick} />
        </div>
      </div>
    </div>
  );
});
HexagonGrid.displayName = 'HexagonGrid';
