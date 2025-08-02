import React from 'react';

interface OverlayProps {
  isLogin: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverLay: React.FC<OverlayProps> = ({ isLogin, setLogin }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[var(--card-bg-light)] text-[var(--text-dark)] rounded-lg shadow-lg max-w-md">
      <h2 className="text-3xl font-bold mb-2">
        Welcome to <em>School</em>
      </h2>
      <p className="mb-4">Follow your courses.</p>
      {isLogin ? (
        <p>
          <span
            onClick={() => setLogin(false)}
            className="text-[var(--dark-teal)] font-bold cursor-pointer hover:underline"
          >
            Register
          </span>{' '}
          to start learning.
        </p>
      ) : (
        <p>
          <span
            onClick={() => setLogin(true)}
            className="text-[var(--dark-teal)] font-bold cursor-pointer hover:underline"
          >
            Log in
          </span>{' '}
          to access your courses.
        </p>
      )}
    </div>
  );
};

export default OverLay;