import React, {useEffect} from 'react';
import Layout from "../../../hocs/Layout";
import TableUsers from "../../../components/Settings/Table";
import {useDispatch, useSelector} from "react-redux";
import ModalHook from "../../../components/util/hooks";
import Form from "../../../components/Settings/Form";
import {MySwal} from "../../../components/util/colors";
import {delete_user, get_users} from "../../../redux/actions/auth";
import Modal from "../../../components/util/Modal";
import {Helmet} from "react-helmet";

const Users = () => {
    const users = useSelector(state => state.Auth?.users);
    const dispatch = useDispatch();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleOpenModalAdd = () => {
        setIsOpen(true)
        setContent(<Form close={openModal}/>)
    }
    const handleOpenModalUpdate = (row) => {
        setIsOpen(true)
        setContent(<Form data={row} close={openModal}/>)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_user(id));
            }
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(get_users())
    }, []);

    return (<Layout>
        <Helmet>
            <title>Usuarios</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>

            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <div
                    className={" w-full rounded-lg h-max p-4 flex flex-col sm:flex-row justify-between items-center gap-8"}>
                    <h1 className={"text-black font-bold text-start px-16 pt-4 text-2xl"}>Usuarios</h1>
                    <button onClick={handleOpenModalAdd}
                            className={"bg-green-500 bg-opacity-60 text-white rounded-lg px-4 py-2"}>Agregar
                    </button>
                </div>
                <TableUsers data={users} update={handleOpenModalUpdate} remove={handleDelete}/>
            </div>

        </div>

    </Layout>);
};

export default Users;
