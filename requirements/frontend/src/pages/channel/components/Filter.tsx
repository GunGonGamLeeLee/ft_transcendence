import styles from './Filter.module.css';

export default function Filter({
  text,
  filter,
  onClick,
}: {
  text: string;
  filter: boolean;
  onClick(): void;
}) {
  return (
    <button
      className={`${styles.filter} ${filter ? '' : styles.filter__inactive}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
