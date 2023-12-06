import React, {useEffect, useState} from 'react';
import Planning from "../Home";
import NavSales from "../../../../components/Planning/Sell/Nav";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {get_skus, search_simulator} from "../../../../redux/actions/operations";
import {setAlert} from "../../../../redux/actions/alert";
import {map, sumBy} from "lodash";
import Humanize from "humanize-plus";

const SellSimulator = () => {
    const dispatch = useDispatch();
    const sku_s = useSelector(state => state.Operations.products)
    const payload = useSelector(state => state.Operations.simulator)
    const loading = useSelector(state => state.Operations.simulator_loading)

    const totalPrice = payload && sumBy(payload, item => item?.calculate * item?.price);
    const totalPriceEmb = payload && sumBy(payload.filter(item => item.category !== 'Envases' && item.category !== 'Empaques' && item.category !== 'Producto Terminado'), item => item?.calculate * item?.price);
    const totalPriceEnvEmp = payload && sumBy(payload.filter(item => item.category === 'Envases' || item.category === 'Empaques'), item => item?.calculate * item?.price);
    const totalPriceMP = payload && sumBy(payload.filter(item => item.category === 'Producto Terminado'), item => item?.calculate * item?.price);


    const [formData, setFormData] = useState({
        sku: '', quantity: '',
    })

    useEffect(() => {
        dispatch({type: 'GET_SIMULATOR_FAIL'})
        dispatch(get_skus())
    }, []);

    const handleSearch = () => {
        if (formData?.sku === '' || formData?.quantity === '') {
            dispatch(setAlert('Todos los campos son requeridos', 'error'))
        } else {
            dispatch(search_simulator(formData))
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Prevent the default behavior of the Enter key
            e.preventDefault();
            handleSearch();
        }
    };

    return (<Planning>
        <Helmet>
            <title>Simulador</title>
        </Helmet>
        <NavSales/>
        <div className={"w-full flex justify-center p-4"}>
            <div
                className="border w-max border-gray-200 rounded-r-full text-black text-xs bg-white rounded-l-full overflow-hidden shadow-sm relative flex justify-center mt-4">

                <select name="sku" id="sku" onChange={(e) => setFormData({...formData, sku: e.target.value})}
                        className="h-auto py-4 text-xs px-4 focus:outline-none text-black whitespace-pre-wrap w-9/12">
                    <option value={''}>Seleccionar</option>
                    {sku_s && sku_s.map((item) => (<option key={item?.id} value={item?.id}>
                        {item?.name}
                    </option>))}
                </select>
                <input
                    type="number"
                    name="quantity"
                    min={0}
                    placeholder="Cantidad"
                    value={formData?.quantity || ''}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="bg-white  px-5 pr-10 rounded-full text-sm focus:outline-none"
                />
                <button type="button" className="absolute right-0 top-0 mt-4 mr-4 text-black"
                        onClick={handleSearch}
                >
                    <svg
                        className="h-4 w-4 fill-current"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        width="420px"
                        height="420px"
                    >
                        <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                    </svg>
                </button>
            </div>
        </div>
        {loading ? <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-400 mb-2"/>
            <p className="text-green-400 text-lg font-semibold animate-pulse">Cargando...</p>
        </div> : <div className={"w-full p-4 "}>
            <div className="p-4 shadow-md bg-white text-black ">
                <div className="space-y-2">
                    <div className="grid grid-cols-4 w-full text-center text-xs text-black border-b-2">
                        <p>Item</p>
                        <p>Cantidad</p>
                        <p>Precio</p>
                        <p>Total</p>
                    </div>

                    {payload && map(payload, (item) => (
                        <div key={item?.id} className="grid grid-cols-4 w-full text-center text-xs hover:bg-green-100">
                            <p className="text-gray-600 text-start ">{item?.name}</p>
                            <p className="text-gray-600 ">{Humanize.formatNumber(item?.calculate, 2)} {item?.unit}</p>
                            <p className="text-gray-600 ">S/ {Humanize.formatNumber(item?.price, 4)}</p>
                            <p className="text-gray-600 ">S/ {Humanize.formatNumber(item?.calculate * item?.price, 2)}</p>
                        </div>))}

                    <div className="grid grid-cols-4 w-full text-center text-xs text-black border-b-2">
                        <p></p>
                        <p></p>
                        <p>Materia Prima</p>
                        <p>S/ {Humanize.formatNumber(totalPriceMP, 2)}</p>
                    </div>
                    <div className="grid grid-cols-4 w-full text-center text-xs text-black border-b-2">
                        <p></p>
                        <p></p>
                        <p>Envases y empaques</p>
                        <p>S/ {Humanize.formatNumber(totalPriceEnvEmp, 2)}</p>
                    </div>
                    <div className="grid grid-cols-4 w-full text-center text-xs text-black border-b-2">
                        <p></p>
                        <p></p>
                        <p>Embalajes</p>
                        <p>S/ {Humanize.formatNumber(totalPriceEmb, 2)}</p>
                    </div>
                    <div className="grid grid-cols-4 w-full text-center text-xs text-black border-b-2 font-bold">
                        <p></p>
                        <p></p>
                        <p>Total</p>
                        <p>S/ {Humanize.formatNumber(totalPrice, 2)}</p>
                    </div>
                </div>
            </div>
        </div>

        }
        
    </Planning>);
};

export default SellSimulator;
