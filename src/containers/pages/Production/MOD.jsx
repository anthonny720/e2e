import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Dropdown from "../../../components/Production/Dropdown";
import {useDispatch} from "react-redux";
import Tabs from "../../../components/Production/Tabs";
import TableMODPacking from "../../../components/Production/TableMODPacking";
import Filter from "../../../components/Production/Filter";
import TableMODConditioning from "../../../components/Production/TableMOD";
import {get_mod} from "../../../redux/actions/production";
import TableBreak from "../../../components/Production/TableBreak";


const MOD = () => {
    const tableRef = useRef(null);

    const [model_name, setModel_name] = useState('Piña');

    const [params, setParams] = useState({'start_date': '', 'end_date': ''});
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(get_mod(params))
    }, [params]);


    return (<Layout>
        <Helmet>
            <title>MOD</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <Dropdown setSelect={setModel_name}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>MOD: {model_name}</h1>
                <Filter setParams={setParams} category={model_name} exclude={true} action_one={get_mod}
                        reference={tableRef.current}/>
                <Tabs table1={<TableMODConditioning reference={tableRef}/>}
                      table2={<TableMODPacking reference={tableRef}/>}
                      table3={<TableBreak reference={tableRef}/>}
                />
            </div>
        </div>
    </Layout>);
};

export default MOD;
