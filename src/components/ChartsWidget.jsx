import {BarChart, Bar, Tooltip, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

function ChartsWidget ({ solutions }) {

    // sort the data date by date for the line chart to make sense
    const timeData = [...solutions].sort((a, b) => new Date(a.date) - new Date(b.date))

    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Bar Chart */}
            <div className='bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-64 border border-white/40 overflow-y-auto'>
                <h3 className='text-sm font-semibold mb-4'>Solution List Concentration</h3>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={solutions}>
                        <CartesianGrid strokeDasharray = '3 3' />
                        <XAxis dataKey = 'name'/>
                        <YAxis label ={{ value : 'Mol/L', position: 'insideLeft', angle: -90}}/>
                        <Tooltip/>
                        <Bar dataKey= "concentration" fill='#9ca3af' stroke='#4b5563'/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className='bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-64 border border-white/40 overflow-y-auto'>
                <h3 className='text-sm font-semibold mb-4'> Solution Concentration Over Time</h3>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={timeData}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey = 'date'/>
                            <YAxis label = {{ value: 'Mol/L', angle: -90, position: 'insideLeft'}}/>
                            <Tooltip/>
                            <Line type='monotone' dataKey = 'concentration' stroke="#4b5563" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ChartsWidget