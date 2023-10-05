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
    get_transport
} from "../../../../redux/actions/management";
import PeopleForm from "../../../../components/Planning/Contacts/People";
import {Helmet} from "react-helmet";

const ContactDetail = () => {
    const {path, id} = useParams();
    const dispatch = useDispatch();
    const payload = useSelector((state) => state.Management.contact);
    const loading = useSelector((state) => state.Management.loading);


    useEffect(() => {
        dispatch({type: 'GET_CUSTOMER_FAIL'});
        if (path === 'customers') dispatch(get_customer(id));
        if (path === 'transports') dispatch(get_transport(id));
        if (path === 'suppliers') dispatch(get_supplier(id));
        if (path === 'suppliers_rm') dispatch(get_supplier_rm(id));
        if (path === 'outsourcings') dispatch(get_outsourcing(id));
    }, []);


    const [formData, setFormData] = useState({}); // Inicializar con null

    useEffect(() => {
        setFormData(payload)
    }, [payload]);

    const {display_name, ruc, address, email, business_name, web} = formData || {}; // Desestructurar formData solo si no es null


    return (<Planning>
        <Helmet>
            <title>{business_name}</title>
        </Helmet>
        <div className={'p-2 flex h-[550px] '}>
            <div className={"bg-white w-full shadow-2xl relative"}>

                <div className={"flex justify-start"}>
                    <p className={"text-black p-2"}>{business_name}</p>
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
                                disabled
                                required={true}
                                value={display_name}
                                autoComplete={'off'}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>RUC</label>
                            <input
                                name={'ruc'}
                                id={'ruc'}
                                type="number"
                                disabled
                                value={ruc}
                                autoComplete={'off'}
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
                                disabled
                                autoComplete={'off'}
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
                                disabled
                                autoComplete={'off'}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>
                        <div>
                            <label className={"text-gray-800 text-xs"}>Web</label>
                            <input
                                name={'web'}
                                id={'web'}
                                type="web"
                                value={web}
                                disabled
                                autoComplete={'off'}
                                className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                            />
                        </div>

                    </div>
                </form>

                <div className={" max-h-60 overflow-auto scrollbar-hide  relative"}>
                    <PeopleForm data={payload?.contacts ? payload.contacts : []}
                    />
                </div>
            </div>
        </div>
    </Planning>);
};

export default ContactDetail;
