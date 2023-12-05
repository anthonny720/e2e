import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Dropdown from "../../../components/Production/Dropdown";
import {useDispatch} from "react-redux";
import {get_conditioning_pineapple, get_packing_pineapple,} from "../../../redux/actions/production";
import Filter from "../../../components/Production/Filter";
import PineappleProcess from "../../../components/Production/Pineapple/Pineapple";

const Process = () => {
    const [params, setParams] = useState({'start_date': '', 'end_date': '', lot: ''});
    const tableRef = useRef(null);
    const [model_name, setModel_name] = useState('Piña');
    const dispatch = useDispatch()


    const get_process_conditioning = (params) => {
        let dispatch = null
        if (model_name === 'Piña') {
            dispatch = get_conditioning_pineapple(params)
        }
        return dispatch
    }
    const get_process_packing = (params) => {
        let dispatch = null
        if (model_name === 'Piña') {
            dispatch = get_packing_pineapple(params)
        }
        return dispatch
    }

    useEffect(() => {
        if (get_process_packing() !== null && get_process_conditioning() !== '') {
            dispatch(get_process_conditioning(params))
            dispatch(get_process_packing(params))
        }
    }, [model_name]);


    return (<Layout>
        <Helmet>
            <title>Procesos</title>
        </Helmet>


        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4 "}>
            <Dropdown setSelect={setModel_name}/>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>{model_name}</h1>
                <Filter action_one={get_process_conditioning} action_two={get_process_packing}
                        category={model_name} setParams={setParams}
                        reference={tableRef.current}/>
                {model_name === 'Piña' &&
                    <PineappleProcess reference={tableRef} params={params} category={model_name}/>}


            </div>
        </div>
    </Layout>);
};

export default Process;
