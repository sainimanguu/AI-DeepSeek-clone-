import React, { useState } from 'react'
import { Scissors, Sparkles } from 'lucide-react'

const RemoveObject = () => {

    const [input, setInput] = useState("");

    const onSubmitHandler = async (e) => {
        e.prevent.default();
    }

    const [object, setObject] = useState()


    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

            <form onSubmit={onSubmitHandler} className='w-full p-4 max-w-lg bg-white rounded-lg border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#4A7AFF]' />
                    <h1 className='text-xl font-semibold'>Object Removal</h1>
                </div>

                <p className='mt-6 text-sm font-medium'>Upload Image</p>

                <input onChange={(e) => setInput(e.target.files[0])} accept='image/*' type="file" placeholder="Future scope of AI" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required />

                <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>

                <textarea onChange={(e) => setObject(e.target.value)} value={object} rows={4} type="text" placeholder="e.g. watch or spoon, Only single object name..." className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' required />

                <button className='w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
                    <Scissors className='w-5' />
                    Remove Object
                </button>


            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
                <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5 text-[#4A7AFF]' />
                    <h1 className='text-xl font-semibold'>
                        Processed Image
                    </h1>
                </div>

                <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                        <Scissors className='w-9 h-9' />
                        <p>Upload an Image and press "Remove Object" to get started</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveObject
