import { useState } from 'react'

function AddSolutionForm ({onAdd}) {

    const [formData, setFormData ] = useState({ name: '', concentration: '', volumn: '', date: ''})

    const handleSubmit = (e) =>  {
        e.preventDefault()

        if(!formData.name || !formData.concentration) return

        onAdd({ ...formData, 
            concentration: parseFloat(formData.concentration),
            volumn: parseFloat(formData.volumn) || 0
        })

        // RESET THE FORM
        setFormData({ name: "", concentration: "", volumn: "", date: ""})
    }

    return(
        <form onSubmit={handleSubmit} className='space-y-4'>
            <h3 className='border-b pb-4 text-xl font-semibold'>Add New Solution</h3>

            <div>
                <label className='block font-medium text-sm text-gray-700'> Solution Name: </label>
                <input type="text" placeholder='e.g HCL or Hydrocloric acid' required value={formData.name} className='mt-1 w-full border rounded p-4' 
                onChange={e => setFormData({...formData, name:e.target.value})}/>
            </div>
            <div>
                <label className='block font-medium text-sm text-gray-700'>Solution Concentration: </label>
                <input type="number" placeholder='e.g 0.05' step='0.5' required value={formData.concentration} 
                onChange={e => setFormData({...formData, concentration: e.target.value})} className='mt-1 w-full border rounded p-4' />
            </div>
            <div>
                <label className='block font-medium text-sm text-gray-700'>Volumn (ml)</label>
                <input type="number" required placeholder='e.g 500' value={formData.volumn}
                onChange={e => setFormData({...formData, volumn:e.target.value})} className='mt-1 w-full border rounded p-4' />
            </div>
            <div>
                <label className='block font-medium text-sm text-gray-700'>Date:</label>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className='mt-1 w-full border rounded p-4' />
            </div>

            <button type='submit' className='bg-gray-200 hover:bg-gray-300 text-gray-800 border rounded py-2 px-4 font-bold w-full border-gray-400'>
                Submit
            </button>
        </form>
    )
}

export default AddSolutionForm