import React, {useRef} from 'react';
import Planning from "../Home";
import NavContacts from "../../../../components/Planning/Contacts/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Contacts/Table";
import {useSelector} from "react-redux";
import {get_customers} from "../../../../redux/actions/management";
import {size} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";

const Customers = () => {
    const tableRef = useRef(null);
    const payload = useSelector(state => state.Management.customers);


    return (<Planning>
        <NavContacts/>
        <Helmet>
            <title>Clientes</title>
        </Helmet>

        <div className={'p-2 flex justify-between relative'}>

            <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)}</span><span
                className={"font-medium text-sm text-gray-800"}> Clientes</span></p>

            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <DownloadTableExcel
                    filename={`Clientes ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                </DownloadTableExcel>

            </p>
        </div>

        <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2 max-h-[450px] md:max-h-[550px]">
            <Table reference={tableRef} data={payload} onLoad={get_customers} path={'customers'}
            />
        </div>

    </Planning>);
};

export default Customers;
