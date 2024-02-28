import { Container } from '@mui/material'
import React from 'react'

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
          <div>
                <div className='text-xl lg:text-6xl  mt-10'>
                    <h1>Welcome to FOODS <span className='text-orange-500'>CRUD</span></h1>
                </div>
                <div className='flex  mt-10 '>
                    <p className='w-96 '>This Web Page is not Completly build but this is my 70% of my skills, To this page 
                        im gonna show you how i code, and What i can do.
                    </p> 
                </div>

            </div>
          </Container>
        </div>
    )
}

export default home