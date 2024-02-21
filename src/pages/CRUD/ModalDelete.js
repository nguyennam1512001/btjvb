import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import style from './CRUD.module.scss';
import axios from 'axios';
import { changeError } from '../../store/CRUDSlice';

const ModalDelete = ({ setIsDelete, user }) => {
    let dispatch = useDispatch();
    const deleteUser = async () => {
        try {
            let res = await axios.delete(`https://65bc3e5652189914b5bdb24c.mockapi.io/api/v1/users/${user.id}`);
            setIsDelete(false);
            dispatch(changeError('delete success'));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={clsx(style.modalDelete, 'modal')} aria-labelledby="exampleModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Delete
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setIsDelete(false)}
                        ></button>
                    </div>
                    <div className="modal-body">Are you sure to delete {user.name}?</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => setIsDelete(false)}
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => deleteUser()}>
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
