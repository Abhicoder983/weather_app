import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState(null);
    const [postData, setPostData] = useState('');
    const [response, setResponse] = useState(null);

    useEffect(() => {
        // Make a GET request
        axios.get('http://127.0.0.1:8000/api/mydata/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handlePost = () => {
        // Make a POST request
        axios.post('http://127.0.0.1:8000/api/mydata/', { data: postData })
            .then(res => {
                setResponse(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            <h1>GET Response</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

            <h1>POST Request</h1>
            <input
                type="text"
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
            />
            <button onClick={handlePost}>Send POST Request</button>

            <h1>POST Response</h1>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default MyComponent;
