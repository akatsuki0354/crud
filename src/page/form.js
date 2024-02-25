import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove, update } from 'firebase/database';
import './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import '../page/style/home.css';
import '../page/style/form.css'

function Contact() {

    const [name, setName] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [address, setAdress] = useState('')
    const [contact, setContact] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [foodPrice, setFoodPrice] = useState(0);
    const [total, setTotal] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();

        const contactRegex = /^\d{11}$/; // Regular expression for 10-digit contact number
        if (!contactRegex.test(contact)) {
            alert('Please enter a valid 10-digit contact number.');
            return;
        }

        const userId = uuidv4();

        const db = getDatabase();
        const usersRef = ref(db, 'users');

        const newUser = {
            username: name,
            quantity: quantity,
            total: total,
            price: foodPrice,
            favoriteFood: favoriteFood,
            address: address,
            contact: contact
        };

        push(usersRef, newUser)
            .then(() => {
                console.log('User added successfully!');
                // Reset form fields
                setName('');
                setQuantity('')
                setTotal('')
                setContact('')
                setAdress('')
                setFavoriteFood('');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Failed to add user:', error);
            });
    };





    const handleQuantityChange = (e) => {
        const quantityValue = parseInt(e.target.value);
        const price = getPriceByFood(favoriteFood);
        const totalPrice = quantityValue * price;
        setFoodPrice(price);
        setQuantity(quantityValue);
        setTotal(totalPrice);
    };

    const getPriceByFood = (food) => {
        switch (food) {
            case 'Cake':
                return 120;
            case 'Chocolate':
                return 75;
            case 'Ice Cream':
                return 90;
            case 'Cookies':
                return 40;
            case 'Bread':
                return 95;
            case 'Strawberry':
                return 75;
            case 'Hamburger':
                return 80;
            case 'Milk tea':
                return 45;
            case 'Egg':
                return 9;
            default:
                return 0;
        }
    };




    return (
        <div className="Contact">
            <div className="t-0 w-full h-full bg-gray-300 order-form absolute">
                <div className="flex items-center justify-center h-full">
                    <div>
                        <div className=''>
                            <h1 className='text-2xl text-center p-2 font-bold text-white bg-sky-500 form'>Order Form</h1>
                        </div>
                        <form onSubmit={handleSubmit} className='p-3 bg-white'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="form-control mb-3"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAdress(e.target.value)}
                                placeholder="Adress"
                                required
                                className="form-control mb-3"
                            />
                            <div className="flex gap-3">
                                <div className='flex gap-2'>
                                    <label htmlFor="" className='mt-2'>+63</label>
                                    <input
                                        type="text"
                                        value={contact}
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            const regex = /^[0-9]{0,11}$/;
                                            if (regex.test(input)) {
                                                setContact(input);
                                            }
                                        }}
                                        placeholder="Contact Number"
                                        required
                                        className="form-control w-64 mb-3"
                                    />
                                </div>
                                <select className='form-select mb-3 ' onChange={(e) => setFavoriteFood(e.target.value)} >
                                    <option disabled selected>Select Food</option>
                                    <option value="Cake">Cake ₱120</option>
                                    <option value="Chocolate">Chocolate ₱75</option>
                                    <option value="Ice Cream">Ice Cream ₱90</option>
                                    <option value="Cookies">Cookies ₱40</option>
                                    <option value="Bread">Bread ₱95</option>
                                    <option value="Strawberry">Strawberry ₱75</option>
                                    <option value="Hamburger">Hamburger ₱80</option>
                                    <option value="Milk tea">Milk tea ₱45</option>
                                    <option value="Egg">Egg ₱9</option>
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <input type="number" placeholder='quantity' className='form-control ' onChange={handleQuantityChange} required></input>
                                <input type="number" placeholder='₱ total' className='form-control ' value={total} disabled></input>

                            </div>
                            <br />
                            <button type="submit" className="bg-green-600 hover:bg-green-500 text-white p-2 rounded">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <nav>
                <div className="p-3 flex justify-between text-white bg-sky-500">
                    <h1 className='text-2xl font-bold'>CRUD React</h1>
                    <div className='gap-3 nav flex text-xl'>
                        <a href="/">Home </a>|
                        <a href="/table" >Table </a>|
                        <a href="/form" className='active'>Order </a>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Contact;