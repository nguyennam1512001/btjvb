import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeError } from '../store/CRUDSlice';

const usePut = (initialUrl) => {
    let dispatch = useDispatch();
    const [putLoading, setIsLoading] = useState(false);
    const [putErr, setError] = useState(null);

    const putData = async (url, newData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(url, newData);
            setIsLoading(false);
            dispatch(changeError('New user update successfully'));
            return response.data;
        } catch (error) {
            setIsLoading(false);
            dispatch(changeError(error));
            setError(error);
            throw error;
        }
    };

    return [putLoading, putErr, putData];
};

export default usePut;
