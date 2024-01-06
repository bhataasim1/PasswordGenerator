import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const App: React.FC = () => {

  const [length, setLength] = useState<number>(8);
  const [password, setPassword] = useState<string>("");
  const [numsAllowd, setNumsAllowd] = useState<boolean>(false);
  const [specialChars, setSpecialChars] = useState<boolean>(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklimnopqrstuvwxyz";

    if (numsAllowd) alphabet += "0123456789";
    if (specialChars) alphabet += "!@#$%^&*()+{}[]";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * alphabet.length);
      pass += alphabet.charAt(char);

    }
    setPassword(pass)
  }, [length, numsAllowd, specialChars, setPassword]);

  useEffect(() => {
    passwordGenerator();

  }, [length, numsAllowd, specialChars, passwordGenerator]);

  const passwordRef = useRef<HTMLInputElement>(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      <h1 className='w-full flex justify-center text-2xl mt-5'>Password Generator</h1>
      <div className='bg-gray-700 p-10 m-10 rounded'>
        <input
          type="text"
          className='w-full p-2 mb-4 text-center bg-gray-800 text-white outline-none rounded'
          placeholder='Password'
          value={password}
          ref={passwordRef}
          readOnly
        />

        <button
          className='bg-blue-500 text-white p-2 rounded-md'
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>

        <div className="mt-4">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLength(Number(e.target.value));
            }}
            className="w-full"
          />
          <label htmlFor="range" className="block mt-2 text-white">Length ({length})</label>
        </div>

        <div className="mt-4">
          <input
            type="checkbox"
            onChange={() => {
              setNumsAllowd((prev) => !prev);
            }}
            className="mr-2"
          />
          <label htmlFor="checkbox" className="text-white">Numbers</label>
        </div>

        <div className="mt-2">
          <input
            type="checkbox"
            onChange={() => {
              setSpecialChars((prev) => !prev);
            }}
            className="mr-2"
          />
          <label htmlFor="checkbox" className="text-white">Special Chars</label>
        </div>
      </div>
    </>
  );
};

export default App
