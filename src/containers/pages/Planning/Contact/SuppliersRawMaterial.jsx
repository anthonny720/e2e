import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import NavContacts from "../../../../components/Planning/Contacts/Nav";
import {CloudArrowDownIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Contacts/Table";
import {useDispatch, useSelector} from "react-redux";
import {add_supplier_rm, delete_supplier_rm, get_suppliers_rm} from "../../../../redux/actions/management";
import {size} from "lodash";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import FormContact from "../../../../components/Planning/Contacts/FormContact";
import {get_products} from "../../../../redux/actions/collection";
import {Helmet} from "react-helmet";

const SuppliersRawMaterial = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch();
    const payload = useSelector(state => state.Management.suppliers_rm);
    const products = useSelector(state => state.Collection.products);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    useEffect(() => {
        dispatch(get_products());
    }, []);


    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormContact close={openModal} add_model={add_supplier_rm} products={products}/>
        </div>)
    }

    return (<Planning>
        <NavContacts/>
        <Helmet>
            <title>Proveedores MP</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>


        <div className={'p-2 flex justify-between relative'}>
            <PlusCircleIcon onClick={handleAddForm}
                            className={"w-8 text-green-400 bg-white rounded-full cursor-pointer top-2 left-[45%] md:left-[50%] absolute z-[100]"}/>
            <p><span className={"font-bold text-sm text-gray-800"}> {size(payload)} </span>
                <span
                    className={"font-medium text-sm text-gray-800"}> Proveedores de Materia Prima</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
            </p>
        </div>

        <div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2 max-h-[450px] md:max-h-[550px]">
            <Table reference={tableRef} data={payload} onLoad={get_suppliers_rm} path={'suppliers_rm'} onRemove={delete_supplier_rm}/>
        </div>

    </Planning>);
};

export default SuppliersRawMaterial;
