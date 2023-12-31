import React, {useEffect} from 'react';
import Planning from "../Home";
import PDFSell from "../../../../components/Planning/Sell/PDF";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {get_sales_order} from "../../../../redux/actions/commercial";


const SellDetail = () => {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const payload = useSelector(state => state.Commercial.sale_order);

    useEffect(() => {
        dispatch(get_sales_order(slug));
    }, []);

    return (<Planning>
        <Helmet>
            <title>{slug}</title>
        </Helmet>
        <div className={"h-screen"}>
            <PDFSell data={payload ? payload : []}/>
        </div>

    </Planning>);
};

export default SellDetail;
