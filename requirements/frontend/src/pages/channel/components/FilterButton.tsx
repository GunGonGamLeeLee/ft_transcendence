import { useSetRecoilState } from 'recoil';
import { filterState, filterType } from '../../../atoms/filterState';
import styles from './Filter.module.css';

export function FilterButton({
  text,
  type,
  isActive,
}: {
  text: string;
  type: filterType;
  isActive: boolean;
}) {
  const setFilter = useSetRecoilState(filterState);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFilter(type);
  };

  return (
    <div
      className={`${styles.filter} ${isActive ? '' : styles.filter__inactive}`}
      onClick={handleButtonClick}
    >
      {text}
    </div>
  );
}
