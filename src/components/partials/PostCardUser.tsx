import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostCardUser({ userId }) {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => {
                setUserName(response.data.name);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    return <span>{userName ? userName : 'Loading user name...'}</span>;
}

export default PostCardUser;