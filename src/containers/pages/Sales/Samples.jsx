import React, {useEffect} from 'react';
import Layout from "../../../hocs/Layout";
import Board from "../../../components/Sales/Board";
import Modal from "../../../components/util/Modal";
import ModalHook from "../../../components/util/hooks";
import RequestDocument from "../../../components/Sales/Request";
import {useDispatch, useSelector} from "react-redux";
import {get_samples} from "../../../redux/actions/sales";
import {Helmet} from "react-helmet";

const Samples = () => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const samples=useSelector(state=>state.Sales.samples);
    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(get_samples())
    }, []);

    const handleFilter = (data) => {
        dispatch(get_samples(data))
    }



    const handleView = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <RequestDocument data={data}/>
        </div>)
    }

    return (<Layout>
        <Helmet>
            <title>Muestras</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-4 w-full h-screen flex-col"}>
            <Board handleFilter={handleFilter} data={samples?samples:[]} view={handleView}/>


        </div>

    </Layout>);
};

export default Samples;
