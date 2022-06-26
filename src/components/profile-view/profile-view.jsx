import React, { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { updateUser } from '../../actions/actions';


import Button from 'react-bootstrap/Button';

import { UserData } from './user-data';
import { UpdateUserForm } from './update-user';
import { FavoriteMoviesList } from './favorite-movies';

function ProfileView(props) {
    const { user, onBackClick, favoriteMovies } = props;

    // constant to hold the data that the user updates through the form
    const [updatedUser, setUpdatedUser] = useState({});

    // Set default Authorization for axios requests
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    /* Update userdata through API */
    /* TBD: Validation? */
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

        // Sending request to server, if successful, update userdata
        axios.put(`https://samcinema2022.herokuapp.com/users/${user.Username}`,
            updatedUser
        )
            .then(response => {
                // Update userdata with the new userdata from the server
                props.updateUser(response.data);
                alert('Profile successfully updated');
            })
            .catch(e => {
                console.log(e);
            });
    }

    /* Function to handle the updates in the form input fields, adding to updatedUser variable which will be passed to server in handleSubmit */
    const handleUpdate = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    }

    /* Allow users to deregister !!! TBD: ADD 'Are you sure?'-MODAL !!! */
    const deleteProfile = (e) => {
        axios.delete(`https://samcinema2022.herokuapp.com/users/${user.Username}`)
            .then(() => {
                alert('Your profile was deleted!');
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                window.open('/', '_self');
            })
            .catch(e => {
                console.log(e);
            });
    }


    return (
        <>
            {/* Display userdata */}
            <UserData user={user} />

            {/* Form to update user data */}
            <UpdateUserForm handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

            {/* Button to delete user */}
            <div>
                <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
                    Delete Profile
                </Button>
            </div>

            {/* List of favorite movies */}
            <FavoriteMoviesList favoriteMovies={favoriteMovies} user={user} />


            <div>
                <Button variant="outline-light" onClick={() => { onBackClick() }}>Back to full list</Button>
            </div>
        </>
    );
}


export default connect(null, { updateUser })(ProfileView);