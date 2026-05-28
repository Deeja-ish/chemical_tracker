import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard';

function App() {

  const [solutions, setSolutions] = useState(() => {
    const saved = localStorage.getItem('chemicalData')
    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {
    localStorage.setItem('chemicalData', JSON.stringify(solutions))
  }, [solutions]);

  const addSolution = (data) => {

    const newSolutions = { ...data, id: crypto.randomUUID() }
    setSolutions([...solutions, newSolutions])
  }

  const deleteSolution = (id) => {
    setSolutions(solutions.filter(sol => sol.id !== id))
  }

  return(
    <div className='min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-800 p-8 font-sans selection:bg-cyan-300 selection:text-cyan-900'>
      <header className='mb-10 text-center'>
        <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100 drop-shadow-sm tracking-tight'>Chemical Solution Concentration Tracker</h1>
      </header>
      <Dashboard className='max-w-7xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-8 border border-white/30'
      solutions={solutions}
      onAdd = {addSolution}
      onDelete = {deleteSolution}
      />
    </div>
  )
}

export default App 