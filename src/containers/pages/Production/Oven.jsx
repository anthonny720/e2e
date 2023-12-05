import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import {useDispatch} from "react-redux";
import Filter from "../../../components/Production/Filter";
import {get_ovens} from "../../../redux/actions/production";
import TableOven from "../../../components/Production/TableOven";


const Oven = () => {
    const tableRef = useRef(null);


    const [params, setParams] = useState({'start_date': '', 'end_date': ''});
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(get_ovens(params))
    }, [params]);


    return (<Layout>
        <Helmet>
            <title>Oven</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Hornos:</h1>
                <Filter setParams={setParams} action_one={get_ovens}
                        reference={tableRef.current}/>
                <TableOven reference={tableRef}/>

                />
            </div>
        </div>
    </Layout>);
};

export default Oven;
