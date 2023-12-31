import React, {useEffect, useState} from 'react';
import Planning from "../Home";
import {useLocation} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {get_sku} from "../../../../redux/actions/operations";
import {map} from "lodash";
import Recipe from "../../../../components/Planning/Items/Products/Recipe";
import {Tab} from '@headlessui/react'
import {Helmet} from "react-helmet";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetail = () => {
    const location = useLocation();
    const {state} = location;
    const dispatch = useDispatch();
    const payload = useSelector((state) => state.Operations.product);


    useEffect(() => {
        dispatch({type: 'GET_SKU_FAIL'});
        dispatch(get_sku(state));
    }, []);

    useEffect(() => {
        setFormData(payload)
    }, [payload]);


    const [formData, setFormData] = useState({undefined}); // Inicializar con null


    const {
        name, unit_of_measurement_name, group_name, information, created_at, updated_at, performance, capacity, sap
    } = formData || {}; // Desestructurar formData solo si no es null


    const list = [{
        object: created_at, label: 'Creado'
    }, {object: updated_at, label: 'Actualizado'}, {object: sap, label: 'SAP'}, {
        object: group_name,
        label: 'Grupo'
    }, {object: performance, label: 'Rendimiento'}, {
        object: capacity,
        label: 'Capacidad'
    }, {object: unit_of_measurement_name, label: 'U.M.'}, {object: information, label: 'Información'},]

    let panels = ['Información', 'BOM']


    return (<Planning>
        <Helmet>
            <title>{name}</title>
        </Helmet>
        <div className={'p-2 flex relative'}>

            <div className={"bg-white w-full shadow-2xl "}>

                <div className={"flex justify-between"}>
                    <p
                        className={"text-black p-2 text-xs md:text-sm"}>{name}
                    </p>
                </div>


                <Tab.Group>
                    <Tab.List className="flex space-x-1  bg-green-600/20 p-1">
                        {map(panels, (i, index) => (<Tab
                            key={index}
                            className={({selected}) => classNames('w-full  py-2.5 text-sm font-medium text-green-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-green-100 hover:bg-white/[0.12] hover:text-white')}
                        >
                            {i}
                        </Tab>))}
                    </Tab.List>
                    <Skeleton height={5} highlightColor={"rgba(15,241,72,0.4)"}/>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                        >
                            <form>

                                <div className={"grid grid-cols-2 gap-4 px-8"}>
                                    {map(list, (i, index) => (<div key={index}>
                                        <label htmlFor="phone" className={"text-gray-800 text-xs"}>{i.label}</label>
                                        <input
                                            name={i.object}
                                            id={i.object}
                                            disabled
                                            value={i.object}
                                            type="text"
                                            className="w-full bg-transparent focus:bg-white focus:border-green-300 focus:outline-none border-b-2 p-1 text-xs text-gray-800 font-light"
                                        />
                                    </div>))}


                                </div>
                            </form>

                        </Tab.Panel>
                        <Tab.Panel>
                            <p className={"text-gray-600 px-4"}>BOM</p>
                            <div className={"h-max overflow-y-scroll scrollbar-hide "}>
                                <Recipe data={payload?.recipe_list ? payload.recipe_list : []} id={state}
                                        dispatch={dispatch}/>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>


            </div>
        </div>
    </Planning>);
};

export default ProductDetail;
