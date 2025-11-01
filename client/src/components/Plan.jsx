import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='max-w-2xl mx-auto z-20 my-30 '>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Plan</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>
                    Start for free and scale up as u grow.
                    Find the perfect fir your content creations need.
                </p>
            </div>
            <div className='mt-10'>
                <PricingTable />
            </div>

        </div>
    )
}

export default Plan
