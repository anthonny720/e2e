import React, {useEffect, useState} from 'react';
import Layout from "../../../hocs/Layout";
import TableStock from "../../../components/Logistic/Stock/Table";
import {useDispatch, useSelector} from "react-redux";
import {delete_output_stock, get_output_stock, get_stock} from "../../../redux/actions/logistic";
import Sidebar from "../../../components/Logistic/Stock/Sidebar";
import {map, sum} from "lodash";
import Humanize from "humanize-plus";
import ModalHook from "../../../components/util/hooks";
import Modal from "../../../components/util/Modal";
import FormStock from "../../../components/Logistic/Stock/Form";
import {MySwal} from "../../../components/util/colors";
import RangeDate from "../../../components/util/RangeDate";
import {Helmet} from "react-helmet";

const Stock = () => {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.Logistic.stocks)
    const output = useSelector(state => state.Logistic.output)
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const [params, setParams] = useState()


    useEffect(() => {
        dispatch(get_stock())
        dispatch(get_output_stock())
    }, []);

    useEffect(() => {
        const data = {
            'start_date': params ? new Date(params?.[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
            'end_date': params ? new Date(params?.[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
        }
        dispatch(get_output_stock(data))
    }, [params]);


    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormStock lot={stocks} close={openModal}/>
        </div>)
    }


    const handleDeleteStock = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_output_stock(id))
            }
        })
    }

    return (<Layout>
        <Helmet>
            <title>Stock MP</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <h1 className={"text-black font-bold w-full px-16 pt-4 text-2xl"}>STOCK</h1>
        <div className={"flex gap-4 w-full flex-col  md:flex-row   md:px-16 mt-2 px-4"}>
            <div className={"md:w-2/3 w-full rounded-lg h-max p-4 relative"}>
                <div className={"bg-white w-full rounded-lg p-4"}>
                    <div
                        className={"flex justify-between z-[100] bg-red-400 p-4 text-black bg-white text-md font-semi-bold hidden md:block"}>
                        <span>Movimientos</span>

                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleAddForm()}
                             className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                             width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                             fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1={12} y1={5} x2={12} y2={19}/>
                            <line x1={5} y1={12} x2={19} y2={12}/>
                        </svg>
                        <RangeDate value={params} onChange={setParams}/>

                    </div>
                    <div
                        className={"flex justify-center w-full  text-black text-md font-semi-bold md:bg-gray-200 rounded-lg h-max flex-col md:flex-row"}>
                        <div className={"w-full md:w-1/2 bg-white rounded-l-lg pl-6 md:pl-8 py-2"}>
                            <p className={"text-sm font-normal text-gray-400"}>Salida</p>
                            <p className={"text-2xl font-bold"}>{Humanize.formatNumber(sum(map(output, (item) => parseFloat(item.kg))), 2)}</p>
                        </div>
                        <div
                            className={"w-full md:w-1/2 bg-gray-400 bg-opacity-10  rounded-r-lg pl-6  md:pl-8 py-2 overflow-hidden"}>
                            <p className={"text-sm font-normal text-white "}>Stock</p>
                            <p className={"text-2xl font-bold"}>{Humanize.formatNumber(sum(map(stocks, (item) => parseFloat(item.stock))), 2)}</p>
                        </div>
                    </div>
                </div>
                <div className={"bg-white w-full rounded-lg p-4 mt-2 flex flex-col justify-center items-center"}>

                    <TableStock data={output ? output : []} remove={handleDeleteStock}/>
                </div>
            </div>

            <div className={"bg-white md:w-1/3 w-full rounded-lg max-h-screen overflow-y-scroll scrollbar-hide p-4 "}>
                <Sidebar data={stocks ? stocks : []}/>
            </div>

        </div>

    </Layout>);
};

export default Stock;
