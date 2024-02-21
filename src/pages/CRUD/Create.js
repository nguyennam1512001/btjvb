import React, { useState, useEffect } from 'react';
import usePost from '../../hooks/usePost';
import usePut from '../../hooks/usePut';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import useFetch from '../../hooks/useFetch';
import style from './CRUD.module.scss';

const Create = ({ setIsOpen, user }) => {
    let [data, load, errorMessage, setUrl] = useFetch('https://65bc3e5652189914b5bdb24c.mockapi.io/api/v1/users');
    let dispatch = useDispatch();
    const [isLoading, error, postData] = usePost('');
    const [putLoading, putErr, putData] = usePut('');
    const [name, setName] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    let { isUpdate } = useSelector((state) => state.CRUD);
    useEffect(() => {
        if (user && isUpdate) {
            setName(user.name);
            setUsername(user.userName);
            setEmail(user.email);
        }
    }, [user]);

    const [valid, setValid] = useState({
        name: '',
        userName: '',
        email: '',
    });
    const validate = () => {
        let errors = {
            name: '',
            username: '',
            email: '',
        };

        if (!name) {
            errors.name = `Please fill in name field`;
        }
        if (!userName) {
            errors.username = `Please fill in username field`;
        }
        if (!email) {
            errors.email = `Please fill in email field`;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.email = 'Please enter a valid email address';
            }
        }

        setValid(errors);
        return Object.values(errors).every((error) => !error);
    };

    const newUser = {
        name: name,
        userName: userName,
        email: email,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            postData('https://65bc3e5652189914b5bdb24c.mockapi.io/api/v1/users', newUser);
            if (error) {
                setIsOpen(true);
            } else {
                setName('');
                setUsername('');
                setEmail('');
                setIsOpen(false);
            }
        }
    };

    const handleUpdate = () => {
        putData(`https://65bc3e5652189914b5bdb24c.mockapi.io/api/v1/users/${user.id}`, newUser);

        if (error) {
            setIsOpen(true);
        } else {
            setName('');
            setUsername('');
            setEmail('');
            setIsOpen(false);
        }
    };
    return (
        <div className={clsx(style.modal)}>
            <form onSubmit={handleSubmit}>
                <div className={clsx(style.close)}>
                    <i className={clsx('material-icons')} onClick={() => setIsOpen(false)}>
                        close
                    </i>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control fs-4"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {valid.name && <span>{valid.name}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control fs-4"
                        id="username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {valid.userName && <span>{valid.userName}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control fs-4"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {valid.email && <span>{valid.email}</span>}
                </div>
                {!isUpdate && (
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                )}
                {isUpdate && (
                    <button className="btn btn-primary" onClick={() => handleUpdate()}>
                        Update
                    </button>
                )}
            </form>
        </div>
    );
};

export default Create;
