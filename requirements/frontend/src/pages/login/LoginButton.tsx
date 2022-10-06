export function LoginButton() {
  return (
    <>
      <a href={`${import.meta.env.VITE_BACKEND_EP}/login/oauth`}>
        <button>login</button>
      </a>
    </>
  );
}
