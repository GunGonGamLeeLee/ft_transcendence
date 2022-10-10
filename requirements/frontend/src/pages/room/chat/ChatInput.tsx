import React from 'react';
import styles from './ChatInput.module.css';

export function ChatInput() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form className={styles.chat__form} onSubmit={onSubmit}>
      <input className={styles.chat__input} />
      <button className={styles.chat__submit}>전송</button>
    </form>
  );
}
