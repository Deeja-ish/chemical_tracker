import AddSolutionForm from './AddSolutionForm'
import ChartsWidget from './ChartsWidget'
import SolutionTable from './SolutionTable'

function Dashboard({solutions, onAdd, onDelete}) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {/* left column  charts and table*/}
          <div className='lg:col-span-2 space-y-6'>
              <div className='bg-white/60 backdrop-blur-md p-4 rounded-xl shadow border border-white/40'>
                  <h2 className='text-lg font-semibold border-b pb-2'>Main Dashboard</h2>
                  <p className='mt-7 text-gray-500'>Total Solution <span className='font-bold'>{solutions.length}</span></p>
              </div>
              <ChartsWidget solutions={solutions}/>
              <SolutionTable solutions={solutions} onDelete={onDelete}/>
          </div>

          {/* Right column */}
          <div className='bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-fit border border-white/40'>
              <AddSolutionForm onAdd={onAdd}/>
          </div>
      </div>
    )
}

export default Dashboard
