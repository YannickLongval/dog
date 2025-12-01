import { useState } from 'react'
import dog from './assets/dog.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={dog} className="dog" alt="Dog" />
      </div>
      <h1>dog</h1>
    </>
  )
}

export default App
