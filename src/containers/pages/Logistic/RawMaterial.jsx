import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {faFile, faTable, faTicket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Layout from "../../../hocs/Layout";
import TableData from "../../../components/Logistic/RawMaterial/Table";
import Badge from "../../../components/Logistic/RawMaterial/Badge";
import Summary from "../../../components/Logistic/RawMaterial/Summary";
import Information from "../../../components/Logistic/RawMaterial/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {delete_data, get_data, get_lot, get_output_items, get_pallets} from "../../../redux/actions/logistic";
import ModalHook from "../../../components/util/hooks";
import ReportViewer from "../../../components/Logistic/RawMaterial/Report";
import Modal from "../../../components/util/Modal";
import LabelViewer from "../../../components/Logistic/RawMaterial/Label";
import FormData from "../../../components/Logistic/RawMaterial/Form";
import {MySwal} from "../../../components/util/colors";
import RegisterViewer from "../../../components/Logistic/RawMaterial/Register";
import FormOutput from "../../../components/Logistic/RawMaterial/FormOutput";
import Output from "../../../components/Logistic/RawMaterial/Output";
import {get_storage_areas} from "../../../redux/actions/management";
import FormUpdateLot from "../../../components/Logistic/RawMaterial/FormUpdateLot";


const RawMaterial = () => {
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const dispatch = useDispatch();
    const {lot} = useParams();
    const info = useSelector(state => state.Logistic.lot)
    const data = useSelector(state => state.Logistic.data)
    const pallets = useSelector(state => state.Logistic.pallets)
    const zones = useSelector(state => state.Management.storage)

    useEffect(() => {
        dispatch({type:'GET_LOT_FAIL'})
        dispatch({type:'GET_DATA_LOT_FAIL'})
        dispatch(get_lot(lot))
        dispatch(get_storage_areas())
        dispatch(get_pallets())
        dispatch(get_data(lot))
        dispatch(get_output_items(lot))
    }, []);

    const handleReport = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <ReportViewer data={info}/>
        </div>)
    }
    const handleLabel = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <LabelViewer data={info}/>
        </div>)
    }
    const handleRegister = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <RegisterViewer info={info} data={data}/>
        </div>)
    }
    const handleOutputReport = (date) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <Output date={date} info={info}/>
        </div>)
    }


    const handleForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormData zones={zones} pallets={pallets} close={openModal} lot={lot}/>
        </div>)
    }
    const handleOutput = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormOutput items={data} close={openModal} lot={lot}/>
        </div>)
    }
    const handleUpdateForm = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormData zones={zones} pallets={pallets} data={data} close={openModal} lot={lot}/>
        </div>)
    }

    const handleDeleteLot = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este item?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_data(lot, id))
            }
        })
    }

    const handleOpenModalUpdate = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}>
            <FormUpdateLot data={data} close={openModal}/>
        </div>)
    }


    return (<Layout>
        <Helmet>
            <title>{lot}</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"flex gap-2 w-full flex-col  xl:flex-row items-start justify-center   md:px-16 mt-8 px-4"}>
            <div className={"w-full  lg:2/3 scrollbar-hide flex flex-col items-center relative "}>
                <div className={"w-full flex flex-wrap justify-start     "}>
                    {info?.closed && <button onClick={handleReport}
                                             className="bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-white font-bold py-2 px-2 rounded-r w-full sm:w-max">Informe<FontAwesomeIcon
                        className={"ml-2 hover:cursor-pointer"} icon={faFile}
                        color={"black"}/></button>
                    }

                    <button onClick={handleLabel}
                            className="bg-gray-100 hover:bg-gray-400 text-gray-800 hover:text-white font-bold py-2 px-2 rounded-r w-full sm:w-max">Rótulos<FontAwesomeIcon
                        className={"ml-2 hover:cursor-pointer"} icon={faTicket}
                        color={"black"}/></button>
                    <button onClick={handleRegister}
                            className="bg-gray-50 hover:bg-gray-400 text-gray-800 hover:text-white font-bold py-2 px-2 rounded-r w-full sm:w-max">Registro<FontAwesomeIcon
                        className={"ml-2 hover:cursor-pointer"} icon={faTable}
                        color={"black"}/></button>
                </div>
                <>
                    {info?.closed === false &&
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleForm()}
                             className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                             width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1={12} y1={5} x2={12} y2={19}/>
                            <line x1={5} y1={12} x2={19} y2={12}/>
                        </svg>}
                    {info?.closed &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             onClick={() => handleOutput()}
                             stroke="currentColor"
                             className="text-white bg-blue-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 top-36 sm:top-14  p-1 left-2 h-8 w-8 flex items-center justify-center"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
                        </svg>}


                </>


                <TableData lot={info ? info : []} data={data ? data : []} update={handleUpdateForm}
                           remove={handleDeleteLot}/>
                <Badge data={info ? info : []}/>
                <Summary data={info ? info : []}/>
            </div>
            <div className={"w-full xl:w-1/3 flex justify-center  flex-col items-center lg:flex-col items-center"}>
                <Information data={info ? info : []} handleReport={handleOutputReport}
                             handleUpdate={handleOpenModalUpdate}/>
            </div>
        </div>


    </Layout>)

};

export default RawMaterial;
