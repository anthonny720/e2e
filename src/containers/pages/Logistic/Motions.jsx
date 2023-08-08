import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import Summary from "../../../components/Logistic/Motions/Summary";
import TableMotions from "../../../components/Logistic/Motions/Table";
import {useDispatch, useSelector} from "react-redux";
import {delete_motion_boxes, get_motion_boxes} from "../../../redux/actions/logistic";
import motionLogistic from "../../../assets/delivery-service.svg";
import {MySwal} from "../../../components/util/colors";
import FormMotion from "../../../components/Logistic/Motions/Form";
import ModalHook from "../../../components/util/hooks";
import Modal from "../../../components/util/Modal";
import RangeDate from "../../../components/util/RangeDate";
import {Helmet} from "react-helmet";

const Motions = () => {
    const dispatch = useDispatch();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const motion = useSelector(state => state.Logistic.motion)
    const location = useSelector(state => state.Management.locations)

    const [params, setParams] = useState()

    useEffect(() => {
        const data = {
            'start_date': params ? new Date(params?.[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
            'end_date': params ? new Date(params?.[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
        }
        dispatch(get_motion_boxes(data))
    }, [params]);


    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormMotion location={location} close={openModal}/>
        </div>)
    }


    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_motion_boxes(id))
            }
        })
    }

    return (<Layout>
        <Helmet>
            <title>Movimiento de jabas</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-4 w-full flex-col  md:flex-row p-4 items-center"}>
            <div className={"bg-green-600 md:w-1/3 w-full h-max p-4 relative rounded-lg bg-opacity-60 "}>
                <h1 className={"text-white text-md font-light"}>Movimientos de jabas</h1>
                <p className={"text-white text-sm z-10   w-8/12"}>Control eficiente de inventarios y seguimiento
                    desde la planta hasta el destino final.</p>
                <img src={motionLogistic} alt=""
                     className={" lg:z-10 sm:w-40 w-32 absolute sm:-top-4 md:top-16 md:-right-12 sm:-right-8 -right-4 top-6 md:top-2"}/>
            </div>
            <div className={"md:w-2/3 w-full  relative rounded-lg bg-opacity-60"}>
                <Summary/>
            </div>
        </div>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <RangeDate value={params} onChange={setParams}/>

                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleAddForm()}
                     className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                     width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1={12} y1={5} x2={12} y2={19}/>
                    <line x1={5} y1={12} x2={19} y2={12}/>
                </svg>

                <TableMotions data={motion ? motion : []} remove={handleDelete}
                              add={handleAddForm}/>
            </div>
        </div>


    </Layout>);
};

export default Motions;
