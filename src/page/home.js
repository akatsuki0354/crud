import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove, update } from 'firebase/database';
import './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import '../page/home.css';

const YourFormComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [favoriteFood, setFavoriteFood] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
            // Unsubscribe from the event listener
            getUsers();
        };
    }, [searchQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = uuidv4(); // Generate a unique user ID

        const db = getDatabase();
        const usersRef = ref(db, 'users');

        const newUser = {
            username: name,
            age: age,
            favoriteFood: favoriteFood,
        };

        push(usersRef, newUser)
            .then(() => {
                console.log('User added successfully!');
                // Reset form fields
                setName('');
                setAge('');
                setFavoriteFood('');
            })
            .catch((error) => {
                console.error('Failed to add user:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        remove(userRef)
            .then(() => {
                console.log('User deleted successfully!');
            })
            .catch((error) => {
                console.error('Failed to delete user:', error);
            });
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
                // Update the form inputs with the existing user data
                const editedUser = users.find(user => user.id === userId);
                setName(editedUser.username);
                setAge(editedUser.age);
                setFavoriteFood(editedUser.favoriteFood);
                // Delete the user data after updating
            const userDeleteRef = ref(db, `users/${userId}`);
            remove(userDeleteRef)
            })
            .catch((error) => {
                console.error('Failed to update user:', error);
            });
    };
    

    return (
        <div>
            <div className="p-3 flex justify-between text-white mb-3 bg-sky-600">
                <h1 className='text-2xl font-bold'>Practice Form</h1>
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
                        <h1 className='text-2xl text-center p-2 mt-10 font-bold text-white bg-sky-500 form'>Form</h1>
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
                            type="number"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            placeholder="Age"
                            required
                            min="1"
                            className="form-control mb-3"
                        />
                        <input
                            type="text"
                            value={favoriteFood}
                            onChange={(e) => setFavoriteFood(e.target.value)}
                            placeholder="Favorite Food"
                            required
                            className="form-control mb-3"
                        />
                        <button type="submit" className="bg-green-600 hover:bg-green-500 text-white p-2 rounded">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* update form */}
            <div className="flex justify-center">
                <div className='absolute top-0 hidden'>
                    <div className=''>
                        <h1 className='text-2xl text-center p-2 mt-10 font-bold text-white bg-sky-500 form'>Update Form</h1>
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
                            type="number"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            placeholder="Age"
                            required
                            min="1"
                            className="form-control mb-3"
                        />
                        <input
                            type="text"
                            value={favoriteFood}
                            onChange={(e) => setFavoriteFood(e.target.value)}
                            placeholder="Favorite Food"
                            required
                            className="form-control mb-3"
                        />
                        <button type="submit" className="bg-yellow-600 hover:bg-green-500 text-white p-2 rounded">
                            Update
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <table className="table table-dark table-bordered" style={{ width: '80%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Favorite Food</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>{user.favoriteFood}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 p-2">
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleEditUser(user.id, 'username', user.username )} className="bg-yellow-500 p-2">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
                    Download as Excel
                </button>
            </div>
        </div>
    );
};

export default YourFormComponent;
