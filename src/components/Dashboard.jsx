import AddSolutionForm from './AddSolutionForm'
import ChartsWidget from './ChartsWidget'
import SolutionTable from './SolutionTable'

function Dashboard({solutions, onAdd, onDelete}) {

    const handleExportCSV = () => {
        if (solutions.length === 0) {
            alert('No solution is logged in yet')
            return
        }

        const csvHeaders = [
            'Name', 'Category', 'Concentration (mol/L)', 'Volumn (mL)', 'pH', 'Viscosity (cP)', 'Temperature (°C)', 'Date'
        ]

        const csvRows = solutions.map(sol => [
            `"${sol.name}"`,
            `"${sol.category}"`,
            sol.concentration,
            sol.volumn,
            sol.pH,
            sol.viscosity,
            sol.temperature,
            sol.date
        ].join(','))

        const csvContent = [csvHeaders.join(','), ...csvRows].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url

        const today = new Date().toISOString().split('T')[0]
        link.setAttribute('download', `chemical_tracker_log_${today}.csv`)

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }


    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {/* left column  charts and table*/}
          <div className='lg:col-span-2 space-y-6'>
              <div className='bg-white/60 backdrop-blur-md p-4 rounded-xl shadow border border-white/40 flex justify-between items-center'>
              <div>
                  <h2 className='text-lg font-bold text-gray-800'>Main Dashboard</h2>
                  <p className='mt-1 text-gray-600 text-sm'>Total Solution <span className='text-cyan-600 font-extrabold text-base'>{solutions.length}</span></p>
              </div>
              <button onClick={handleExportCSV} className='px-2.5 py-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center shadow-md transition-all active:scale-95 gap-1 '>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap='round' strokeLinejoin='round' d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Export CSV
              </button>
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
