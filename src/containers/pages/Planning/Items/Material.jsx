import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import NavItems from "../../../../components/Planning/Items/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {useDispatch, useSelector} from "react-redux";
import {get_materials} from "../../../../redux/actions/operations";
import Table from "../../../../components/Planning/Items/Materials/Table";
import {size} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";

const Material = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.materials)


    useEffect(() => {
        dispatch(get_materials())
    }, [])


    return (<Planning>

            <Helmet>
                <title>Materiales</title>
            </Helmet>

            <NavItems/>


            <div className={'p-2 flex justify-between relative'}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"font-medium text-sm text-gray-800"}> Materiales</span></p>

                <p className={"absolute right-0 pr-2 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`Materiales ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}>
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
                    </DownloadTableExcel>
                </p>

            </div>

            <div
                className="relative overflow-x-scroll scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <Table reference={tableRef}
                       payload={payload}
                />
            </div>

        </Planning>

    );
};


export default Material;
