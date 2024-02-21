import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import style from './CRUD.module.scss';
import useFetch from '../../hooks/useFetch';
import Create from './Create';
import { toast, ToastContainer } from 'react-toastify';
import { setIsupdate } from '../../store/CRUDSlice';
import ModalDelete from './ModalDelete';

const CRUD = () => {
    let dispatch = useDispatch();
    let { error } = useSelector((state) => state.CRUD);
    let [data, isLoading, errorMessage, setUrl] = useFetch('https://65bc3e5652189914b5bdb24c.mockapi.io/api/v1/users');

    let [isOpen, setIsOpen] = useState(false);
    let [user, setUser] = useState({});
    let [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        if (error) {
            toast.success(error);
        }
    }, [error]);

    const handleCreate = () => {
        setIsOpen(true);
        dispatch(setIsupdate(false));
    };

    const handleUpdate = (item) => {
        setUser(item);
        setIsOpen(true);
        dispatch(setIsupdate(true));
    };

    const handleDelete = (item) => {
        setIsDelete(true);
        setUser(item);
    };

    return (
        <div className="container mt-5">
            {isLoading && (
                <div className={clsx(style.spinner, 'spinner-border text-secondary')} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {isDelete && <ModalDelete setIsDelete={setIsDelete} user={user} />}
            <ToastContainer />
            {isOpen && <Create setIsOpen={setIsOpen} user={user} />}
            <div className="btn btn-primary" onClick={() => handleCreate()}>
                Create User
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">email</th>
                        <th scope="col" colSpan={2}>
                            handle
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <i className="material-icons" onClick={() => handleUpdate(item)}>
                                            create
                                        </i>
                                    </td>
                                    <td>
                                        <i className="material-icons" onClick={() => handleDelete(item)}>
                                            delete
                                        </i>
                                    </td>
                                    <td></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default CRUD;
