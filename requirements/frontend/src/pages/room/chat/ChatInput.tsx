import React from 'react';
import styles from './ChatInput.module.css';

export function ChatInput() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className={styles.chat__div}>
      <form className={styles.chat__form} onSubmit={onSubmit}>
        <input type='text' className={styles.chat__input} />
        <button className={styles.chat__submit}>SEND</button>
      </form>
    </div>
  );
}
