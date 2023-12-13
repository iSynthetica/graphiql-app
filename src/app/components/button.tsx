import { IButton } from '@/types/interfaces';

export const Button = ({ title, type, btnClass }: IButton) => {
  return (
    <button className={`btn ${btnClass}`} type={type}>
      {title}
    </button>
  );
};
