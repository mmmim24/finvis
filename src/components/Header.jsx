import React from 'react'

const Header = () => {
    return (
        <div className='mt-2 h-[50px] md:h-[150px] lg:h-[200px] flex items-center justify-center'>
            <p className='text-lg md:text-2xl lg:text-4xl font-bold'>
                Stock, Currency & Crypto Dashboard
                <p className='mt-4 text-xs md:text-md lg:text-xl italic'>For better view please use tablet or personal computer</p>
            </p>
        </div>
    )
}

export default Header