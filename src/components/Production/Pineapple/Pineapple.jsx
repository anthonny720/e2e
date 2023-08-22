import React from 'react';
import Tabs from "../Tabs";
import TableProduction from "./TableProcess";
import TablePacking from "./TablePacking";
import Modal from "../../util/Modal";
import ModalHook from "../../util/hooks";
import FormProcessPineapple from "./FormPineappleProcess";
import {useDispatch, useSelector} from "react-redux";
import {add_packing_process} from "../../../redux/actions/production";
import FormProcessPackingPineapple from "./FormPineapplePacking";


const PineappleProcess = ({params, category, reference}) => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const materials = useSelector(state => state.Operations.materials)
    const customers = useSelector(state => state.Management.customers)
    const cuts = useSelector(state => state.Management.cuts)

    const dispatch = useDispatch()

    const handleUpdateProcess = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormProcessPineapple data={data} close={openModal} params={params} category={category}/>
        </div>)
    }

    const handleUpdatePackingProcess = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormProcessPackingPineapple
                materials={materials}
                customers={customers}
                cuts={cuts}
                data={data} close={openModal} params={params} category={category}/>
        </div>)
    }
    const handleAddPacking = (data) => {
        const form = {
            lot: data?.id, date: data?.date, lot_pt: 'SIN LOTE',
        }
        dispatch(add_packing_process(category, form, params))
    }


    return (<>

        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"relative"}>

            <Tabs table1={<TableProduction reference={reference} update={handleUpdateProcess}
                                           add_packing={handleAddPacking}/>}
                  table2={<TablePacking reference={reference} update={handleUpdatePackingProcess}/>}/>
        </div>

    </>);
};


export default PineappleProcess;
