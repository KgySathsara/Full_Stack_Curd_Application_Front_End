import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [Users, setUsers]=useState([]);

    const {id}=useParams()

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers =async() =>{
        const result= await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser =async (id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (
        <div className='container'>
            <div className='py-5'>
                <table className=" table border shadow">
                    <thead className="table-secondary">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((user,index)=>(
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                                    <button className="btn btn-outline-danger mx-2" 
                                    onClick={()=>deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
