import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Dropdown from "../../../components/Production/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {get_mod} from "../../../redux/actions/production";
import Tabs from "../../../components/Production/Tabs";
import TableMODPacking from "../../../components/Production/TableMODPacking";
import Filter from "../../../components/Production/Filter";
import {get_providers_category} from "../../../redux/actions/collection";
import TableMODConditioning from "../../../components/Production/TableMOD";
import ModalHook from "../../../components/util/hooks";
import Modal from "../../../components/util/Modal";
import FormMOD from "../../../components/Production/FormMOD";


const MOD = () => {
    const tableRef = useRef(null);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const [model_name, setModel_name] = useState('Piña');
    const [params, setParams] = useState({'provider': '', 'start_date': '', 'end_date': ''});
    const providers = useSelector(state => state.Collection.providers_category)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(get_mod(model_name))
        dispatch(get_providers_category(model_name))
    }, []);

    useEffect(() => {
        dispatch(get_mod(model_name))
        dispatch(get_providers_category(model_name))
    }, [model_name]);


    const handleOpenModalUpdate = (data, type) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormMOD data={data} close={openModal} params={params} category={model_name} typeform={type}/>
        </div>)
    }

    return (<Layout>
        <Helmet>
            <title>MOD</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <Dropdown setSelect={setModel_name}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>MOD: {model_name}</h1>
                <Filter providers={providers} setParams={setParams} category={model_name} action={get_mod}
                        reference={tableRef.current}/>
                <Tabs table1={<TableMODConditioning reference={tableRef} update={handleOpenModalUpdate}/>}
                      table2={<TableMODPacking reference={tableRef} update={handleOpenModalUpdate}/>}/>
            </div>
        </div>
    </Layout>);
};

export default MOD;
