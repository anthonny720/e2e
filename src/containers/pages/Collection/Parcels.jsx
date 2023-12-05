import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";
import TableParcels from "../../../components/Collection/TableParcels";
import {useDispatch, useSelector} from "react-redux";
import {get_parcels} from "../../../redux/actions/collection";
import Filter from "../../../components/Collection/Filter";
import Modal from "../../../components/util/Modal";
import ModalHook from "../../../components/util/hooks";
import FormParcels from "../../../components/Collection/FormParcels";
import {maxBy} from "lodash";


const Parcels = () => {
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const parcels = useSelector(state => state.Collection.parcels)
    const products = useSelector(state => state.Collection.products)
    const providers = useSelector(state => state.Management.suppliers_rm)
    const [params, setParams] = useState({parcel: '', product: ''});

    const latestObject = maxBy(parcels, 'updated_at');

    useEffect(() => {
        dispatch(get_parcels(params))
    }, []);

    const handleUpdateForm = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}><FormParcels data={data} params={params} providers={providers}
                                                            dispatch={dispatch} close={openModal}/>
        </div>)
    }

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-screen"}><FormParcels params={params} providers={providers}
                                                            dispatch={dispatch} close={openModal}/>
        </div>)
    }

    return (<Layout>
        <Helmet>
            <title>Parcelas</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>


        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-2xl overflow-scroll scrollbar-hide"}>Parcelas</h1>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleAddForm()}
                     className="text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-10 -top-2 -right-2 h-8 w-8 flex items-center justify-center"
                     width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1={12} y1={5} x2={12} y2={19}/>
                    <line x1={5} y1={12} x2={19} y2={12}/>
                </svg>
                <Filter reference={tableRef} latestObject={latestObject} action={get_parcels} setParams={setParams}
                        products={products} providers={providers}/>
                <TableParcels data={parcels ? parcels : []} update={handleUpdateForm} reference={tableRef}/>
            </div>
        </div>
    </Layout>);
};

export default Parcels;
