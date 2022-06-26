import React from 'react';

export function UserData(props) {
    const { user } = props;

    return (
        <>
            <h4>{user.Username}</h4>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
        </>
    )
}