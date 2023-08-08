import React, {useRef} from 'react';
import Planning from "../Home";
import NavContacts from "../../../../components/Planning/Contacts/Nav";
import {CloudArrowDownIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Contacts/Table";
import {add_transport, delete_transport, get_transports} from "../../../../redux/actions/management";
import {useSelector} from "react-redux";
import {size} from "lodash";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import FormContact from "../../../../components/Planning/Contacts/FormContact";
import {Helmet} from "react-helmet";

const TransportBusiness = () => {
    const tableRef = useRef(null);
    const payload = useSelector(state => state.Management.transports);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormContact close={openModal} add_model={add_transport}/>
        </div>)
    }

    return (<Planning>
        <NavContacts/>
        <Helmet>
            <title>Transportes</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={'p-2 flex justify-between relative'}>
            <PlusCircleIcon onClick={handleAddForm}
                            className={"w-8 text-green-400 bg-white rounded-full cursor-pointer top-2 left-[45%] md:left-[50%] absolute z-[100]"}/>
            <p><span className={"font-bold text-sm text-gray-800"}> {size(payload)} </span><span
                className={"font-medium text-sm text-gray-800"}> Transportes</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
            </p>
        </div>
        <div class="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2 max-h-[450px] md:max-h-[550px]">
            <Table reference={tableRef} data={payload} onLoad={get_transports} path={'transports'} onRemove={delete_transport}/>
        </div>
    </Planning>);
};

export default TransportBusiness;
