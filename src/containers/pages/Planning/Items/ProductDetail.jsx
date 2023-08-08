import React, {useEffect, useState} from 'react';
import Planning from "../Home";
import {useLocation, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import {get_sku} from "../../../../redux/actions/operations";
import {map} from "lodash";
import FormRecipe from "../../../../components/Planning/Items/Products/FormRecipe";
import Recipe from "../../../../components/Planning/Items/Products/Recipe";
import {Tab} from '@headlessui/react'
import {Helmet} from "react-helmet";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetail = () => {
    const {id} = useParams();
    const location = useLocation();
    const {state} = location;
    const dispatch = useDispatch();
    const payload = useSelector((state) => state.Operations.product);
    const loading = useSelector((state) => state.Operations.loading_products);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();


    useEffect(() => {
        dispatch({type: 'GET_SKU_FAIL'});
        dispatch(get_sku(state));
        setFormData(payload)
    }, []);


    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormRecipe close={openModal} dispatch={dispatch} parent_id={state}/>
        </div>)
    }


    const [formData, setFormData] = useState({undefined}); // Inicializar con null


    const {
        name, unit_of_measurement_name, group_name, information, created_at, updated_at, performance, capacity
    } = formData || {}; // Desestructurar formData solo si no es null


    const list = [{
        object: created_at, label: 'Creado'
    }, {object: updated_at, label: 'Actualizado'}, {object: performance, label: 'Rendimiento'}, {
        object: unit_of_measurement_name, label: 'U.M.'
    }, {object: group_name, label: 'Grupo'}, {object: information, label: 'Información'}, {
        object: capacity, label: 'Capacidad'
    },]

    let panels = ['Información general', 'Recetas/BOM']


    return (<Planning>
        <Helmet>
            <title>{name}</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={'p-2 flex relative'}>
            <PlusCircleIcon onClick={handleAddForm}
                            className={"w-8 text-green-400 bg-white rounded-full cursor-pointer top-0 left-[45%] md:left-[50%] absolute z-[100]"}/>
            <div className={"bg-white w-full shadow-2xl "}>

                <div className={"flex justify-between"}>
                    <p className={"text-black p-2 text-xs md:text-sm"}>{name}</p>
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
                    <Skeleton height={5} highlightColor={!loading ? "#22C55E" : "#F1C40F"}/>
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
