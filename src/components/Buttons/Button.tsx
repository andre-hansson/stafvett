import { FC, ReactNode } from 'react';

type ButtonProps = {
  label: string | ReactNode;
  onClick: () => void;
} & React.ComponentProps<'button'>;
export const Button: FC<ButtonProps> = ({ label, onClick, ...props }) => {
  return (
    <button
      className="px-4 py-1.5 rounded-md uppercase text-sm border-0 text-neutral-200 bg-purple-800 dark:text-darkneutral-300 dark:bg-purple-300 disabled:opacity-70"
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
Button.displayName = 'Button';
