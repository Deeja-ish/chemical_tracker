import { useState } from 'react'

function AddSolutionForm ({onAdd}) {

    const [formData, setFormData ] = useState({ name: '', category: 'Acid', concentration: "", volumn: '', date: '', pH: '', temperature: '', viscosity: ''})

    const handleSubmit = (e) =>  {
        e.preventDefault()

        if(!formData.name || !formData.concentration) return

        onAdd({ ...formData, 
            concentration: parseFloat(formData.concentration),
            volumn: parseFloat(formData.volumn) || 0,
            pH: formData.pH ? parseFloat(formData.pH) : 'N/A',
            viscosity: formData.viscosity ? parseFloat(formData.viscosity) : 'N/A',
            temperature: formData.temperature ? parseFloat(formData.temperature) : 'N/A'

        })

        // RESET THE FORM
        setFormData({ name: "", category: "Acid", concentration: "", volumn: "", date: "", pH: "", temperature: "", viscosity: ""})
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={handleSubmit} className='space-y-4'>
            <h3 className='border-b pb-4 text-xl font-semibold'>Add New Solution</h3>

            <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider"> Basic Info</h4>
                <div className="grid grid-col-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Solution Name</label>
                        <input type="text" value={formData.name} placeholder='e.g HCL' onChange={handleChange} required name='name' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Formula Category</label>
                        <select name="category" onChange={handleChange} value={formData.category} className='bg-white/80 border border-white/50 p-2 w-full outline-none h-fit focus:ring-2 focus:ring-cyan-500 mt-1 rounded-lg'>
                        <option value="Acid">Acid</option>
                        <option value="Base">Base</option>
                        <option value="Buffer">Buffer</option>
                        <option value="Compound">Compound</option>
                        <option value="Mixture">Mixture</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Conc mol/L</label>
                            <input type="number" value={formData.concentration} placeholder='e.g 0.5' step={0.01} onChange={handleChange} required name='concentration' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vol (ml)</label>
                            <input type="number" value={formData.volumn} placeholder='e.g 100' onChange={handleChange} required name='volumn' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                        </div>
                    </div>
                </div>
            </div>

            {/* optional information */}
            <div className="space-y-4 pt-2 border-t border-white/40">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider"> Stablity Metric (Optional)</h4>

                <div className='grid grid-cols-3 gap-2'>
                    <div>
                        <label className="block text-xs font-medium text-gray-700" title='Acidity/Alkalinity'>pH</label>
                        <input type="number" value={formData.pH} placeholder='e.g 2.4' step={0.1} onChange={handleChange}  name='pH' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700" title='Temperature in degree celcius'>Temperature (°C)</label>
                        <input type="number" value={formData.temperature} placeholder='e.g 45' step={0.1} onChange={handleChange}  name='temperature' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700" title='Viscosity in centripose'>Viscosity (cP)</label>
                        <input type="number" value={formData.viscosity} placeholder='e.g 1.0' step={0.1} onChange={handleChange}  name='viscosity' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-600 mt-2'>Log Date*</label>
                    <input type="date" value={formData.date} required  onChange={handleChange}  name='date' className='p-2 border border-white/20 rounded-lg bg-white/80 w-full mt-1 focus:ring-2 focus:ring-cyan-500 outline-none' />
                </div>
            </div>
            <button type='submit' className='w-full bg-cyan-600 hover:bg-cyan-700 py-3 px-2 rounded-lg shadow-md text-white font-bold transition-colors'>
                Log Solution
            </button>
        </form>
    )
}

export default AddSolutionForm