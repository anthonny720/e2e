import React, {useEffect} from 'react';
import Layout from "../hocs/Layout";
import Summary from "../components/Home/Summary";
import TableSummary from "../components/Home/Table";
import {useDispatch, useSelector} from "react-redux";
import ModalHook from "../components/util/hooks";
import FormLot from "../components/Logistic/RawMaterial/FormLot";
import Modal from "../components/util/Modal";
import Calendar from "../components/Home/Calendar";
import {get_calendar_samples} from "../redux/actions/sales";
import {get_suppliers_rm} from "../redux/actions/management";
import {filter} from "lodash";

const Home = () => {
    const dispatch = useDispatch();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const providers = useSelector(state => state.Management.suppliers_rm)
    const products = useSelector(state => state.Collection.products)
    const calendar = useSelector(state => state.Sales.calendar)


    useEffect(() => {
        dispatch(get_calendar_samples())
        dispatch(get_suppliers_rm())
    }, []);


    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormLot providers={providers} close={openModal}
                     categories={products ? filter(products, {enable: true}) : []}/>
        </div>)
    }


    return (<Layout>
        <Summary/>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-4 w-full p-4 flex-col lg:flex-row items-center"}>
            <div className={"lg:w-2/3 w-full relative"}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleAddForm()}
                     className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                     width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1={12} y1={5} x2={12} y2={19}/>
                    <line x1={5} y1={12} x2={19} y2={12}/>
                </svg>
                <TableSummary/>
            </div>
            <div className={"lg:w-1/3 hidden md:block w-full bg-white text-black py-4 px-2 rounded-xl"}>
                <Calendar data={calendar ? calendar : []}/>
            </div>
        </div>


    </Layout>);
};
export default Home;
