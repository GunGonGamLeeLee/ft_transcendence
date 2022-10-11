import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import './App.css';
import { Routes } from './Routes';

function DebugObserver(): JSX.Element {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return <></>;
}

function App() {
  return (
    <RecoilRoot>
      {import.meta.env.DEV ? <DebugObserver /> : null}
      <RouterProvider router={Routes} />
    </RecoilRoot>
  );
}

export default App;
