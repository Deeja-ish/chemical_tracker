import { useState } from "react"

function SolutionTable ({solutions, onDelete}) {

    const [ searchTerm, setSearchTerm ] = useState('')

    const filteredSolutions = solutions.filter( sol => 
        sol.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="bg-white/60 backdrop-blur-md rounded-xl shadow overflow-x-auto border-b border-white/40">

            <div className="flex flex-col sm:flex-row bg-white/30 gap-4 border-b items-start sm:items-center boder-white/20 justify-between">
                <h3 className="text-lg font-semibold border-b p-4">Solution List</h3>

                <input type="text"
                value={searchTerm}  placeholder='Search by name (e.g HCL)' onChange={(e) => setSearchTerm(e.target.value)}
                className='placeholder-gray-400 focus:outline-none border-white/50 bg-white-80 p-2 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm w-full sm:w-64 transition-all m-3' />

            </div>
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-white/40 border border-white/40 whitespace-nowrap text-gray-700" >
                <td className="p-3 font-medium">Name</td>
                <td className="p-3 font-medium">Category</td>
                <td className="p-3 font-medium">Conc (mol/L)</td>
                <td className="p-3 font-medium">Volumn (mL)</td>
                <td className="p-3 font-medium" title="pH">pH</td>
                <td className="p-3 font-medium" title="Viscosity (cP)"> Viscosity</td>
                <td className="p-3 font-medium" title="Temperature (°C)">Temp</td>
                <td className="p-3 font-medium">Date</td>
                <td className="p-3 font-medium text-center">Action</td>
                </tr>
            </thead>
            <tbody>
                {filteredSolutions.length === 0 ? (
                    <tr><td colSpan={5} className="text-center p-6 text-gray-200 italic align-middle">
                        {solutions.length === 0 ? "No Solutions Logged yet" : "No matching Solutions" }
                        </td>
                    </tr>
                ) : filteredSolutions.map((sol) => (
                    <tr key={sol.id} className="border-b bg-white/20 hover:bg-white/40 transition-colors" >
                        <td className="p-3 text-gray-800 font-medium">{sol.name}</td>
                        <td className="p-3 text-gray-800 font-medium">{sol.category}</td>
                        <td className="p-3 text-gray-500">{sol.concentration} mol/L</td>
                        <td className="p-3 text-gray-500">{sol.volumn}</td>
                        {/* Optional */}
                        <td className="p-3 text-gray-600">{sol.pH}</td>
                        <td className="p-3 text-gray-600">{sol.viscosity}</td>
                        <td className="p-3 text-gray-600">{sol.temperature}</td>

                        {/* Not optional */}
                        <td className="p-3 text-gray-500">{sol.date}</td>
                        <td className="p-3 text-center">
                            <button onClick={() => onDelete(sol.id)} className="text-sm transition-colors bg-red-400 hover:bg-red-700 text-gray-700 hover:text-gray-900 border rounded-md border-gray-200 px-3 py-1">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default SolutionTable