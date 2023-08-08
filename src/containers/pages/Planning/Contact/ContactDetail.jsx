import React, {useEffect, useState} from 'react';
import Planning from "../Home";
import {useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {
    get_customer,
    get_outsourcing,
    get_supplier,
    get_supplier_rm,
    get_transport,
    update_customer,
    update_outsourcing,
    update_supplier,
    update_supplier_rm,
    update_transport
} from "../../../../redux/actions/management";
import {CloudArrowUpIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import PeopleForm from "../../../../components/Planning/Contacts/People";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import FormPeople from "../../../../components/Planning/Contacts/FormPeople";
import {Helmet} from "react-helmet";

const ContactDetail = () => {
    const {path, id} = useParams();
    const dispatch = useDispatch();
    const payload = useSelector((state) => state.Management.contact);
    const loading = useSelector((state) => state.Management.loading);
    const [editing, setEditing] = useState(false);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleRefresh = () => {
        setEditing(!editing);
    }
    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormPeople close={openModal} dispatch={dispatch} parent_id={payload?.id} model={path}
                        handleRefresh={handleRefresh}/>
        </div>)
    }


    useEffect(() => {
        dispatch({type: 'GET_CUSTOMER_FAIL'});
        if (path === 'customers') dispatch(get_customer(id));
        if (path === 'transports') dispatch(get_transport(id));
        if (path === 'suppliers') dispatch(get_supplier(id));
        if (path === 'suppliers_rm') dispatch(get_supplier_rm(id));
        if (path === 'outsourcings') dispatch(get_outsourcing(id));
    }, []);


    useEffect(() => {
        if (path === 'customers') dispatch(get_customer(id));
        if (path === 'transports') dispatch(get_transport(id));
        if (path === 'suppliers') dispatch(get_supplier(id));
        if (path === 'suppliers_rm') dispatch(get_supplier_rm(id));
        if (path === 'outsourcings') dispatch(get_outsourcing(id));
    }, [editing]);

    const [formData, setFormData] = useState({}); // Inicializar con null

    useEffect(() => {
        setFormData(payload)
    }, [payload]);

    const {display_name, ruc, address, email, business_name} = formData || {}; // Desestructurar formData solo si no es null
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (path === 'customers') dispatch(update_customer(id, formData));
        if (path === 'transports') dispatch(update_transport(id, formData));
        if (path === 'suppliers') dispatch(update_supplier(id, formData));
        if (path === 'suppliers_rm') dispatch(update_supplier_rm(id, formData));
        if (path === 'outsourcings') dispatch(update_outsourcing(id, formData));
    };


    return (<Planning>
        <Helmet>
            <title>{business_name}</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={'p-2 flex h-[550px] '}>
            <div className={"bg-white w-full shadow-2xl relative"}>
                <PlusCircleIcon onClick={handleAddForm}
                                className={"w-8 text-green-400 bg-white rounded-full cursor-pointer -bottom-4 left-[45%] md:left-[50%] absolute z-[100]"}/>
                <div className={"flex justify-between"}>
                    <p className={"text-black p-2"}>{business_name}</p>
                    <CloudArrowUpIcon onClick={(e) => onSubmit(e)} className={"w-8 text-gray-400 cursor-pointer"}/>
                </div>

                <Skeleton height={5} highlightColor={!loading ? "#22C55E" : "#F1C40F"}/>
                <form>
                    <div className={"grid grid-cols-2 gap-4 p-8"}>
                        <div>
                            <label htmlFor="phone" className={"text-gray-800 text-xs"}>Razón social</label>
                            <input
                                name={'business_name'}
                                id={'business_name'}
                                disabled
                                value={business_name}
                                type="text"
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>Nombre</label>
                            <input
                                name={'display_name'}
                                id={'display_name'}
                                type="text"
                                required={true}
                                value={display_name}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>RUC</label>
                            <input
                                name={'ruc'}
                                id={'ruc'}
                                type="number"
                                value={ruc}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>Dirección</label>
                            <input
                                name={'address'}
                                id={'address'}
                                type="text"
                                value={address}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>Correo</label>
                            <input
                                name={'email'}
                                id={'email'}
                                type="email"
                                value={email}
                                autoComplete={'off'}
                                onChange={e => onChange(e)}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>

                    </div>
                </form>

                <div className={" max-h-60 overflow-auto scrollbar-hide  relative"}>
                    <PeopleForm data={payload?.contacts ? payload.contacts : []} handleRefresh={handleRefresh}
                    />
                </div>
            </div>
        </div>
    </Planning>);
};

export default ContactDetail;
