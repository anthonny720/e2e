import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../hocs/Layout";
import TableCosts from "../../../components/Finance/Table";
import {Helmet} from "react-helmet";
import {get_costs} from "../../../redux/actions/finances";
import {DownloadTableExcel} from "react-export-table-to-excel";
import RangeDate from "../../../components/util/RangeDate";


const Costs = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch();
    const costs = useSelector(state => state.Finance.records);
    const [params, setParams] = useState();


    useEffect(() => {
        const data = {
            'start_date': params ? new Date(params?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            'end_date': params ? new Date(params?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
        }
        dispatch(get_costs(data))
    }, [params]);

    console.log(costs)

    return (<Layout>
        <Helmet>
            <title>Costos</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-xl md:text-2xl "}>COSTOS
                    DIARIOS</h1>
                <RangeDate value={params} onChange={setParams}/>
                <DownloadTableExcel
                    filename={`Reporte de costos ${params ? new Date(params?.[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : ''} - ${params ? new Date(params?.[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : ''}`}
                    sheet="Reporte"
                    currentTableRef={tableRef.current}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                         width={25}
                         height={25}
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>

                </DownloadTableExcel>
                <TableCosts reference={tableRef} data={costs ? costs : []}
                />
            </div>
        </div>


    </Layout>);
};

export default Costs;
