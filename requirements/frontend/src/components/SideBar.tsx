import { useState, useEffect } from 'react';
import styles from './SideBar.module.css';

interface ChatLogInterface {
  userName: string;
  message: string;
}

interface ChatLogProps {
  chatInfo: ChatLogInterface;
  key: number;
}

const array: Array<ChatLogInterface> = [];

function ChatLog({ chatInfo }: ChatLogProps) {
  return (
    <div>
      <b>{chatInfo.userName}</b> <span>{chatInfo.message}</span>
    </div>
  );
}

export default function SideBar() {
  const [isLeft, setIsLeft] = useState(true);

  const onLeftClick = () => {
    if (!isLeft) {
      setIsLeft(true);
    }

    if (array.length % 2) {
      array.push({ userName: 'me', message: 'chat' });
    } else {
      array.push({ userName: 'other', message: 'chatchat' });
    }

    console.log(array.length);
    if (array.length > 10) {
      array.shift();
    }
  };

  const onRightClick = () => {
    if (isLeft) {
      setIsLeft(false);
    }
  };

  return (
    <>
      <div>
        <h1 onClick={onLeftClick}>left</h1>
        <div className={isLeft ? styles.revealContent : styles.hideContent}>
          {array.map((chat, index) => (
            <ChatLog chatInfo={chat} key={index} />
          ))}
        </div>
      </div>
      <div>
        <h1 onClick={onRightClick}>right</h1>
        <h2>right content</h2>
      </div>
    </>
  );
}
