import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
  const [isClicked, setIsClicked] = useState(false);
  console.log('otp');
  console.log(isClicked);

  const onSubmitClick = async () => {
    const navigate = useNavigate();
    console.log('top');
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_EP}/login/otp`,
      {
        method: 'POST',
      },
    );

    console.log('done');

    setIsClicked(true);

    // localStorage.setItem('test', 'ok');
    // if (response.ok) {
    //   response.json().then((json) => {
    //     // localStorage.setItem('token', json.token);
    //     console.log(json.token);
    //     // navigate('http://localhost:4242/lobby');
    //   });
    // }
  };

  return (
    <>
      <p>otp!!</p>
      <form>
        <input placeholder='otp' />
        <button onClick={onSubmitClick}>submit</button>
      </form>
    </>
  );
}
