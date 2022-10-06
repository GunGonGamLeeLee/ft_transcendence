import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { Routes } from './Routes';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={Routes} />
    </RecoilRoot>
  );
}

export default App;
