import React, {useRef, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import Summary from "../../../components/Quality/Summary";
import TableBlueberry from "../../../components/Quality/TableBlueberry";
import TablePineapple from "../../../components/Quality/TablePineapple";
import TableMango from "../../../components/Quality/TableMango";
import TableBanana from "../../../components/Quality/TableBanana";
import TableGoldenberry from "../../../components/Quality/TableGoldenberry";
import Modal from "../../../components/util/Modal";
import ModalHook from "../../../components/util/hooks";
import FormPineapple from "../../../components/Quality/FormPineapple";
import FormMango from "../../../components/Quality/FormMango";
import FormBanana from "../../../components/Quality/FormBanana";
import FormBlueberry from "../../../components/Quality/FormBlueberry";
import FormGoldenberry from "../../../components/Quality/FormGoldenberry";
import {useDispatch} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import RangeDate from "../../../components/util/RangeDate";

const Analysis = () => {
    const [activeTable, setActiveTable] = useState("Piña");
    const tableRef = useRef(null);
    const [params, setParams] = useState();

    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const dispatch = useDispatch()


    const handleTableChange = (table) => {
        setActiveTable(table);
    };
    const handleUpdateForm = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            {activeTable === "Piña" &&
                <FormPineapple data={data} close={openModal} dispatch={dispatch} params={params}/>}
            {activeTable === "Mango" && <FormMango data={data} close={openModal} dispatch={dispatch} params={params}/>}
            {activeTable === "Banano" &&
                <FormBanana data={data} close={openModal} dispatch={dispatch} params={params}/>}
            {activeTable === "Arándano" &&
                <FormBlueberry data={data} close={openModal} dispatch={dispatch} params={params}/>}
            {activeTable === "Aguaymanto" &&
                <FormGoldenberry data={data} close={openModal} dispatch={dispatch} params={params}/>}
        </div>)
    }


    return (<Layout>
        <Helmet>
            <title>Análisis de calidad</title>
        </Helmet>

        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={"flex gap-4 w-full flex-col  md:flex-col  md:px-16 mt-8 px-4"}>
            <Summary onTableChange={handleTableChange} selected={activeTable}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 z-10"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-xl md:text-2xl overflow-scroll scrollbar-hide"}>Análisis
                    de Materia Prima</h1>
                <div className={"flex sm:flex-row flex-col items-center justify-between w-full -z-10"}>
                    <RangeDate value={params} onChange={setParams}/>
                    <DownloadTableExcel
                        filename={`Análisis ${activeTable}`}
                        sheet="Reporte"
                        currentTableRef={tableRef.current}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="icon cursor-pointer icon-tabler icon-tabler-edit text-gray-500" width={25}
                             height={25}
                             viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                        </svg>

                    </DownloadTableExcel>
                </div>

                {activeTable === "Piña" &&
                    <TablePineapple update={handleUpdateForm} reference={tableRef} params={params}/>}
                {activeTable === "Mango" &&
                    <TableMango update={handleUpdateForm} reference={tableRef} params={params}/>}
                {activeTable === "Banana" &&
                    <TableBanana update={handleUpdateForm} reference={tableRef} params={params}/>}
                {activeTable === "Arándano" &&
                    <TableBlueberry update={handleUpdateForm} reference={tableRef} params={params}/>}
                {activeTable === "Aguaymanto" &&
                    <TableGoldenberry update={handleUpdateForm} reference={tableRef} params={params}/>}


            </div>


        </div>
    </Layout>);
};

export default Analysis;
