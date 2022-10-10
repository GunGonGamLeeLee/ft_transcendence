import * as React from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay === null) return;

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
