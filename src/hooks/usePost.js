import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeError } from '../store/CRUDSlice';

const usePost = (initialUrl) => {
    let dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (url, newData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, newData);
            setIsLoading(false);
            dispatch(changeError('New user created successfully'));
            return response.data;
        } catch (error) {
            setIsLoading(false);
            dispatch(changeError(error));
            setError(error);
            throw error;
        }
    };

    return [isLoading, error, postData];
};

export default usePost;
