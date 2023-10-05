import React, {useEffect} from 'react';
import Layout from "../hocs/Layout";
import Summary from "../components/Home/Summary";
import TableSummary from "../components/Home/Table";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "../components/Home/Calendar";
import {get_calendar_samples} from "../redux/actions/sales";
import {get_suppliers_rm} from "../redux/actions/management";

const Home = () => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.Management.suppliers_rm)
    const products = useSelector(state => state.Collection.products)
    const calendar = useSelector(state => state.Sales.calendar)


    useEffect(() => {
        dispatch(get_calendar_samples())
        dispatch(get_suppliers_rm())
    }, []);


    return (<Layout>

        <Summary/>

        <div className={"flex gap-4 w-full p-4 flex-col lg:flex-row items-center"}>
            <div className={"lg:w-2/3 w-full relative"}>
                <TableSummary/>
            </div>
            <div className={"lg:w-1/3 hidden md:block w-full bg-white text-black py-4 px-2 rounded-xl"}>
                <Calendar data={calendar ? calendar : []}/>
            </div>
        </div>


    </Layout>);
};
export default Home;
