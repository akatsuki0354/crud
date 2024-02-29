import { Container } from '@mui/material'
import React from 'react'
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function home() {
    return (
        <div className='home'>
            <nav>
                <div className="p-3 flex flex-wrap justify-center md:justify-between text-white mb-3 bg-gray-800">
                    <h1 className='text-2xl mb-2 font-bold'>FOODS <span className="text-orange-500">CRUD</span></h1>
                    <div className='gap-3 nav  flex md:text-xl'>
                        <a href="/" className='active'>Home </a>|
                        <a href="/form">Order </a>|
                        <a href="/table" >Table </a>|
                        <a href="/inventory" >Inventory</a>
                    </div>
                </div>
            </nav>

            <Container>
                <div className='flex justify-center lg:justify-start'>
                    <div>
                        <div className='mt-24 lg:mt-32'>
                            <h1 className='text-5xl lg:text-8xl' >FOODS <span className=' text-orange-500'>CRUD</span></h1>
                            <p className='text-2xl sm:text-center lg:text-left lg:text-4xl' >Enjoy my CRUD Web page.</p>
                        </div>
                    </div>
                </div>
               <div className=' w-full border-gray-400 border-1 mb-3 mt-3'>

               </div>
                <div className='flex gap-3'>
                    <button className='bg-yellow-700 hover:bg-yellow-600 drop-shadow-2xl p-3 rounded'>
                        <ShoppingCartIcon/> Order Now
                    </button>
                    <button className='bg-gray-900 hover:bg-gray-800 drop-shadow-2xl   p-3 rounded'>
                       <ReviewsIcon/>  Review
                    </button>
                </div>
            </Container>
        </div>
    )
}

export default home