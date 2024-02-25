import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove, update } from 'firebase/database';
import './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import '../page/home.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
const YourFormComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [address, setAdress] = useState('')
    const [contact, setContact] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [total, setTotal] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isHide, setHide] = useState(true)





    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        const getUsers = () => {
            onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const usersArray = Object.entries(data).map(([id, user]) => ({ id, ...user }));
                    const filteredUsers = usersArray.filter((user) =>
                        user.username.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setUsers(filteredUsers);
                }
            });
        };

        getUsers();

        // Cleanup the event listener
        return () => {

            getUsers();
        };
    }, [searchQuery]);

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

    const handleDeleteUser = (userId) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');

        // Check if the user confirmed
        if (isConfirmed) {
            const db = getDatabase();
            const userRef = ref(db, `users/${userId}`);

            remove(userRef)
                .then(() => {
                    alert('User deleted successfully!');
                })
                .catch((error) => {
                    console.error('Failed to delete user:', error);
                });
        } else {
            // User clicked "Cancel" or said no
            alert('User deletion canceled.');
        }
    };

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        XLSX.writeFile(workbook, 'users.xlsx');
    };


    const handleEditUser = (userId, field, value) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        const updatedUser = {
            [field]: value,
        };

        update(userRef, updatedUser)
            .then(() => {
                console.log('User updated successfully!');
                // Update the form inputs with the existing user 
                setIsVisible(!isVisible);
                const editedUser = users.find(user => user.id === userId);
                setName(editedUser.username);
                setAdress(editedUser.address);
                setContact(editedUser.contact);
                setQuantity(editedUser.quantity);
            })
            .catch((error) => {
                console.error('Failed to update user:', error);
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

    const toggleVisibility = () => {
        const confirmDiscard = window.confirm("Do you want to disregard?");
        if (confirmDiscard) {
            setHide(!isHide);
            window.location.reload();
        }
    };

    const handleDeleteAll = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete all orders?');
        if (isConfirmed) {
            const db = getDatabase();
            const usersRef = ref(db, 'users');
            remove(usersRef)
                .then(() => {
                    alert('All orders deleted successfully!');
                    window.location.reload()
                })
                .catch((error) => {
                    console.error('Failed to delete all orders:', error);
                });
        } else {
            // User clicked "Cancel" or said no
            alert('Deletion canceled.');
        }
    };





    return (
        <div>
            {/* edit */}
            <div className={isVisible ? 'block' : 'hidden'}>
                <div className={isHide ? 'block w-full h-full edit-form absolute' : 'hidden'} >
                    <div className='flex items-center justify-center h-full'>
                        <div className='relative'>
                            <div className=''>
                                <div className='cursor-pointer p-1 absolute'>
                                    <button onClick={toggleVisibility}> <CloseIcon className='text-white z-1' /></button>
                                </div>
                                <h1 className='text-2xl text-center p-2 mt-10 font-bold text-white bg-sky-500 form'>Edit Order</h1>
                            </div>
                            <form onSubmit={handleSubmit} className='p-3 w-96 bg-white'>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
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
                                        className="form-control mb-3"
                                    />
                                </div>
                                <select className='form-select mb-3' onChange={(e) => setFavoriteFood(e.target.value)} >
                                    <option value="" className='hidden'></option>
                                    <option value='no' disabled>Select Food</option>
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
            </div>


            <div className="p-3 flex justify-between text-white mb-3 bg-sky-600">
                <h1 className='text-2xl font-bold'>CRUD React</h1>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="form-control w-96"
                />
            </div>
            <div className="flex justify-center">
                <div>
                    <div className=''>
                        <h1 className='text-2xl text-center p-2 mt-10 font-bold text-white bg-sky-500 form'>Order</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='p-3 w-96 bg-white'>
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
                                className="form-control mb-3"
                            />
                        </div>
                        <select className='form-select mb-3' onChange={(e) => setFavoriteFood(e.target.value)} >
                            <option value="" className='hidden'></option>
                            <option value='no' disabled>Select Food</option>
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


            <div className="flex justify-center mt-20">
                <table className="table table-dark table-bordered" style={{ width: '80%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Food</th>
                            <th className='w-0 text-center'>Price</th>
                            <th className='w-0 text-center'>Quantity</th>
                            <th className='w-0 text-center'>Total</th>
                            <th className='w-0 text-center'>Delete</th>
                            <th className='w-0 text-center'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.favoriteFood}</td>
                                <td className='text-center '>{user.price}</td>
                                <td className='text-center'>{user.quantity}</td>
                                <td className='text-center'>{user.total}</td>
                                <td style={{ width: '103px' }} className='text-center' >
                                    <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 p-2"><DeleteIcon className='-mt-1' />Delete</button>
                                </td>
                                <td style={{ width: '84px' }} className='text-center'>
                                    <button onClick={() => handleEditUser(user.id, 'username', user.username, 'address', user.address)} className="bg-green-500 p-2">
                                        <ModeEditIcon className='-mt-1' />Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr >
                            <td colSpan="7" >

                                <div className='flex justify-center gap-3'>
                                    <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
                                        <DownloadIcon /> Download as Excel
                                    </button>

                                    <button onClick={handleDeleteAll} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                        <DeleteIcon className='-mt-1' /> Delete All Order
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default YourFormComponent;
