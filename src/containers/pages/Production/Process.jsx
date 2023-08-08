import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Dropdown from "../../../components/Production/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {get_packing_process, get_process} from "../../../redux/actions/production";
import Filter from "../../../components/Production/Filter";
import {get_providers_category} from "../../../redux/actions/collection";
import PineappleProcess from "../../../components/Production/Pineapple/Pineapple";
import {get_customers, get_cuts} from "../../../redux/actions/management";
import {get_materials, get_sales_orders, get_sales_pending, get_skus} from "../../../redux/actions/operations";

const Process = () => {
    const [params, setParams] = useState({'provider': '', 'start_date': '', 'end_date': ''});
    const tableRef = useRef(null);
    const [model_name, setModel_name] = useState('Piña');
    const providers = useSelector(state => state.Collection.providers_category)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(get_process(model_name))
        dispatch(get_packing_process(model_name))
        dispatch(get_providers_category(model_name))
    }, [model_name]);

    useEffect(() => {
        dispatch(get_cuts())
        dispatch(get_customers())
        dispatch(get_materials())
        dispatch(get_skus())
        dispatch(get_sales_orders())
    }, []);


    return (<Layout>
        <Helmet>
            <title>Procesos</title>
        </Helmet>


        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4 "}>
            <Dropdown setSelect={setModel_name}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>{model_name}</h1>
                <Filter providers={providers} action={get_process} action_two={get_packing_process}
                        category={model_name} setParams={setParams}
                        reference={tableRef.current}/>
                {model_name === 'Piña' &&
                    <PineappleProcess reference={tableRef} params={params} category={model_name}/>}

            </div>
        </div>
    </Layout>);
};

export default Process;
