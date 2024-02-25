import React from 'react'

function home() {
    return (
        <div>
            <nav>
                <div className="p-3 flex justify-between text-white mb-3 bg-sky-500">
                    <h1 className='text-2xl font-bold'>CRUD React</h1>
                    <div className='gap-3 nav flex text-xl'>
                        <a href="/" className='active'>Home </a>|
                        <a href="/table" >Table </a>|
                        <a href="/form">Order </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default home