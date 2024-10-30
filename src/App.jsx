import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  // React Hook that cache a function definition between re-renders.
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  // This hooks runs the method when there is any change in any of the dependencies
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800">
      <h1 className='text-white text-center my-3 font-bold text-3xl'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="outline-none w-full py-1 px-3"
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref = {passwordRef}
        />
        <button
        className = 'bg-blue-700 text-white px-4 py-0.5 text-xl outline-none shrink-0'
        onClick = {copyPasswordToClipBoard}>
          Copy
        </button>
    </div>
    <div className = 'flex text-sm flex gap-4'>
      <div className = 'flex gap-x-1 items-center text-white font-medium'>
        <input
        type = 'range'
        min = {6}
        max = {100}
        value = {length}
        className = 'cursor-pointer'
        onChange = {(e => {
          setLength(e.target.value)
        })}
        />
        <label>Length: {length}</label>
      </div>
      
      <div className = 'flex gap-1'>
        <input className = 'outline-none'
        defaultChecked = {numberAllowed}
        type = 'checkbox'
        id = 'number'
        onChange={() => {
          setNumberAllowed(prev => !prev)
        }}
        />

        <label className = 'text-white font-medium'
        for = 'number'>Number</label>
      </div>

      <div className = 'flex gap-1'>
        <input className = 'outline-none'
        defaultChecked = {charAllowed}
        type = 'checkbox'
        id = 'char'
        onChange={() => {
          setCharAllowed(prev => !prev)
        }}
        />

        <label className = 'text-white font-medium'
        for = 'char'>Character</label>
      </div>
    </div>
</div>
    
  )
}

export default App