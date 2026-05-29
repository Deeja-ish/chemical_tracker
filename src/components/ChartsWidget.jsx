import {BarChart, Bar, Tooltip, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useState, useMemo } from 'react'

function ChartsWidget ({ solutions }) {

    // set the metric to visualise 
    const [ activeMetric, setActiveMetric ] = useState('concentration')

    const configMetric = {
        concentration : {label: 'Concentration (mol/L)', color: '#0891b2' }, // Cyan
        pH: {label: 'pH Level', color: '#10b981'},   //Emerald
        viscosity: {label: "Viscosity (cP)", color: '#f59e0b' },   // Amber
        temperature: {label: 'Temperature (°C)', color: '#ef4444'} // Red


    }

    // using memo to convert N/A into null
    const chartData = useMemo(() => {
        return solutions.map(sol => ({
            ...sol,
            ph: sol.ph === 'N/A' ? null : sol.ph,
            viscosity: sol.viscosity === 'N/A' ? null : sol.viscosity,
            temperature: sol.temperature === 'N/A' ? null : sol.temperature
        }))
    }, [solutions]) 
    // sort the data date by date for the line chart to make sense
    const timeData = [...solutions].sort((a, b) => new Date(a.date) - new Date(b.date))

    const categoryData = useMemo(() => {
            const counts = solutions.reduce((acc, sol) => {
            const cat = sol.category || 'Unknown';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [solutions]);

    const PIE_COLORS = ['#0891b2', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];

    if(solutions.length === 0){
        return(
            <div className='backdrop-blur-md bg-white/40 rounded-xl text-gray-500 p-8 border border-white/40 text-center shadow'></div>
        )
    }

    return(
        <div className='space-y-4'>
             <div className='flex justify-between items-center bg-white/40 rounded-xl border backdrop-blur-md border-white/40 shadow p-4'>
                <h3 className='font-bold text-gray-700'>Data Visualisation</h3>
                <div className='flex items-center gap-2'>
                    <label className='text-sm font-medium text-gray-700'>Analyse:</label>
                    <select value={activeMetric} onChange={(e) => setActiveMetric(e.target.value)} className='text-gray-700 border border-white/40 text-sm text-center outline-none focus:ring-2 focus: ring-cyan-600 p-1.5 bg-white/80 rounded-lg '>
                        <option value="concentration">Concentration</option>
                        <option value="pH">pH</option>
                        <option value="viscosity">Viscosity</option>
                        <option value="temperature">Temperature</option>
                    </select>
                </div>
            </div>

            {/*  chart container */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {/*  *Bar Chart */}
                <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-72 border border-white/40">
                    <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Comparison by Solution</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.5} />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey={activeMetric} fill={configMetric[activeMetric].color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Line Chart */}
                <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-72 border border-white/40">
                    <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Trend Over Time</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.5} />
                        <XAxis dataKey="date" tick={{fontSize: 12}} />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey={activeMetric} stroke={configMetric[activeMetric].color} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} connectNulls />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow h-72 border border-white/40 lg:col-span-1 md:col-span-2">
                    <h3 className="text-sm font-semibold mb-4 text-center text-gray-700">Formula Distribution</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default ChartsWidget;