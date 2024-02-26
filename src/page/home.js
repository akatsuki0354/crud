import React from 'react'

function home() {
    return (
        <div>
            <nav>
                <div className="p-3 flex flex-wrap justify-center md:justify-between text-white mb-3 bg-sky-500">
                    <h1 className='text-2xl mb-2 font-bold'>CRUD React</h1>
                    <div className='gap-3 nav  flex md:text-xl'>
                        <a href="/" className='active'>Home </a>|
                        <a href="/form">Order </a>|
                        <a href="/table" >Table </a>|
                        <a href="/inventory" >Inventory</a>
                    </div>
                </div>
            </nav>

            <div>
                <div className='text-xl lg:text-3xl text-center mt-10'>
                    <h1>Hello! Thanks For Visiting in my Webpage</h1>
                </div>
                <div className='flex justify-center  mt-10 '>
                    <p className='w-96 text-center'>This Web Page is not Completely build but this is my my 70% of my skills, To this page 
                        im gonna show you how i code, and What i can do.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default home