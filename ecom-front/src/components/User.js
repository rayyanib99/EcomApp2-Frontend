import React from 'react'
import {useEffect, useState} from 'react';
import userServices from '../services/userServices';
import '../user.css';

export const User = () => 
{
    const [users, setUsers] = useState([]);
 
    const init = () => 
    {
        userServices.getAllUsers()
        .then(response => 
        {
            console.log('Printing all the Users in Console', response.data);
            setUsers(response.data);
        })
        .catch(error => 
        {
            console.log('Something went wrong ', error);
        })
    }
 
    useEffect(() => 
    {
        init();
    }, []);
 
    const removeUser = (id) => 
    {
        console.log('Printing id', id);
        userServices.deleteUser(id)
        .then(response => 
        {
            console.log("User removed successfully", response.data);
            init();
        })
        .catch(error => 
        {
            console.log("Something went wrong", error);
        })
    }

    const editUser = (data) => 
    {
        console.log('Printing id', data);
        userServices.update(data)
        .then(response => 
        {
            console.log("User updated successfully", response.data);
            init();
        })
        .catch(error => 
        {
            console.log("Something went wrong", error);
        })
    }

    const Edit = (data, id) =>
    {
        if(data === "Yes")
        {
            alert("Cannot Edit Admin Account.")
        }

        else
        {
            editUser(id)
        }
    }

    const Delete = (admin, id, fName, lName) =>
    {
        if(admin === "Yes")
        {
            alert("Cannot Delete Admin Account.")
        }

        else
        {
            var message = window.confirm("CAUTION: " + fName + " " + lName + " will be deleted permanently.");
            if(message === true)
            {
                removeUser(id)
            }
        }
    }

  return (
    <div>
        <div className='container'>
        <div><h3 id='title1'>Users</h3></div>
        <a href="http://localhost:3000/add-user" className="btn btn" id='addbtn'>Add User</a>
        <hr/>
        <div>
            <table className="table">
                <thead className='thead-dark'>
                  <tr id='tableHeader'>
                    <th>UserID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Zipcode</th>
                    <th>Administrator</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => 
                        (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <td>{user.zipCode}</td>
                                <td>{user.isAdmin}</td>
                                <td>
                                    <button className='btn btn' id="editbtn" onClick={() => 
                                    {
                                        Edit(user.isAdmin, user.userId)
                                    }}>
                                    Edit
                                    </button>

                                    <button className='btn btn' id='deletebtn' onClick={() => 
                                    {
                                        Delete(user.isAdmin, user.userId, user.firstName, user.lastName)
                                    }}>
                                    Delete
                                    </button>
                                </td>
 
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}
export default User