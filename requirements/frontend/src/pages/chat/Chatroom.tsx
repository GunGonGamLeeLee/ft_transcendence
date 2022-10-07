import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Chatroom.module.css';
import pagestyles from '../pages.module.css';

interface ChatroomInterface {
  title: string;
  owner: number;
  operators: Array<number>;
  users: Array<number>;
  password: boolean;
  private: boolean;
}

export default function Chatroom({
  roomInfo,
}: {
  roomInfo: ChatroomInterface;
}) {
  return (
    <>
      <div className={styles.page}>
        <div className={pagestyles.page__header}>
          <Link to='/channel'>뒤로가기!</Link>
        </div>
        <div className={pagestyles.page__main}></div>
        <div className={pagestyles.page__footer}></div>
      </div>
    </>
  );
}
