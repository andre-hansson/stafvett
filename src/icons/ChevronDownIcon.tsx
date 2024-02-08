import { FC } from 'react';
import { IconBase, IconBaseProps } from './IconBase';

type ChevronDownIconProps = Omit<IconBaseProps, 'children'>;
export const ChevronDownIcon: FC<ChevronDownIconProps> = (props) => {
  return (
    <IconBase {...props}>
      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
    </IconBase>
  );
};
ChevronDownIcon.displayName = 'ChevronDownIcon';
