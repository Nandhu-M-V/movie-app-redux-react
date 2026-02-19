import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      {
        <button
          onClick={() => loginWithRedirect()}
          className=" absolute top-4 rounded-2xl shadow-xs
          shadow-black hover:bg-purple-800 text-gray-300
           hover:text-white font-bold bg-purple-700 px-8 py-3 right-15"
        >
          Login
        </button>
      }
    </>
  );
};

export default LoginButton;
