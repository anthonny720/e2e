import React from 'react';
import {ClockIcon} from "@heroicons/react/24/outline";
import moment from "moment";
import {useDispatch} from "react-redux";
import {update_samples} from "../../redux/actions/sales";

const Cards = ({view, data, filter}) => {
    const dispatch = useDispatch()

    function getTimeDifference(dateStr) {
        const dateFromApi = moment(dateStr);
        const currentDate = moment();
        const difference = dateFromApi.diff(currentDate, "days");

        if (difference === 0) {
            return "Hoy";
        } else if (difference === 1) {
            return "Falta 1 día";
        } else if (difference === -1) {
            return "1 día retrasado";
        } else if (difference > 1) {
            return `Faltan ${difference} días`;
        } else {
            return `${Math.abs(difference)} días tarde`;
        }
    }

    const handleUpdate = (d) => {
        dispatch(update_samples({'status': d}, data?.id))
        setTimeout(() => {
            filter()
        }, 1000)
    }


    return (<div
        className="relative bg-white py-4 px-6 rounded-xl w-full my-4 shadow-md border  hover:border-2 ">
        <div className={"gap-2 flex flex-col"}>
            <div className={"flex justify-between"}>
                <a href={data?.drive} target={'_blank'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={"w-4 h-4 cursor-pointer"}>
                        <path
                            d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"/>
                    </svg>
                </a>

                <p onClick={() => {
                    view(data)
                }}
                   className="text-xs text-black font-semibold  text-center cursor-pointer hover:font-bold">{data?.code}</p>

            </div>

            <div className="flex space-x-2 text-gray-400 text-sm items-center flex-wrap gap-2 justify-center ">
                <div
                    className={`${data?.status === "A" ? 'bg-red-500' : data?.status === 'DP' ? 'bg-orange-500' : data?.status === 'WD' ? 'bg-orange-400' : data?.status === 'ST' ? 'bg-yellow-400' : data?.status === 'RL' ? 'bg-teal-400' : data?.status === 'SC' ? 'bg-cyan-400' : data?.status === 'STC' ? 'bg-green-400' : 'bg-gray-400'}  text-white px-1 rounded-lg text-[8px] w-11/12`}>
                    <select value={data?.status} onChange={(v) => handleUpdate(v.target.value)} id="countries"
                            className={"bg-transparent w-full focus:text-black ring-0"}>
                        <option value="A">Solicitud recepcionada y validada</option>
                        <option value="DP">Entrega producción/calidad</option>
                        <option value="WD">Entrega almacén</option>
                        <option value="ST">Enviado desde Tarma</option>
                        <option value="RL">Recibido en Lima</option>
                        <option value="SC">Programar courier</option>
                        <option value="STC">Enviado al cliente</option>
                    </select>
                </div>
                <div className={"bg-blue-400 text-white px-1 rounded-lg text-[8px] px-4"}><p>{data?.market_name}</p>
                </div>
                <div className={"bg-yellow-400 text-white px-1 rounded-lg text-[8px] px-4"}>
                    <p>{data?.packing_type_name}</p></div>
                <div className={"bg-gray-400 text-white px-1 rounded-lg text-[8px] px-4"}><p>{data?.courier}</p></div>
            </div>
            <div className="border-t-2 "></div>

            <div className="flex space-x-2 text-gray-400 text-sm items-center">
                <ClockIcon className={"w-4 text-black cursor-pointer"}/>
                <div
                    className={"text-black  rounded-lg text-xs  hover:bg-gray-200 hover:bg-opacity-20 hover:text-red-500 p-1"}>
                    <p>
                        {(data?.status === "A" || data?.status === 'DP' || data?.status === 'WD') && getTimeDifference(new Date(data?.delivery_date + "T00:00:00-05:00"))}
                        {(data?.status === "ST" || data?.status === 'RL' || data?.status === 'SC') && 'En ruta'}
                        {data?.status === "STC" && 'Entregado'}

                    </p>
                </div>
            </div>
        </div>
    </div>);
};

export default Cards;
