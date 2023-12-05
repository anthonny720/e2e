import React from 'react';
import Cards from "./Cards";
import {LinkIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {filter, map} from "lodash";
import Filter from "./Filter";

const Board = ({view, data,handleFilter}) => {
    const navigate = useNavigate();
    return (<div className="flex justify-center max-h-screen">
        <div className="w-full max-w-6xl md:mt-10 mt-2 max-h-screen overflow-y-scroll scrollbar-hide">
            <div
                className={"flex md:justify-between flex-col lg:flex-row py-2 justify-center items-center bg-white p-4 rounded-lg  "}>
                <h1 className="text-2xl font-bold text-gray-800 mb-4"><LinkIcon
                    onClick={() => navigate('/sales/samples/form')} className={"w-6 cursor-pointer"}/> Tablero de
                    muestras ({data.length})</h1>
                <Filter action={handleFilter}/>
            </div>

            <div className="grid lg:grid-cols-4  gap-4 ">
                <div className="p-4 w-full border-r-2">
                    <h2 className="text-sm font-semibold mb-4 text-black">Tareas pendientes</h2>
                    <div className={"max-h-40 lg:max-h-96 overflow-y-scroll scrollbar-hide w-full"}>

                        {data && map(filter(data, (item) => item.status === 'A'), (item) => <Cards view={view} filter={handleFilter}
                                                                                                   key={item.id}
                                                                                                   data={item}/>)}
                    </div>

                </div>
                <div className="p-4 w-full border-r-2">
                    <h2 className="text-sm font-semibold mb-4 text-black">En progreso</h2>
                    <div className={"max-h-40 lg:max-h-96 overflow-y-scroll scrollbar-hide w-full"}>
                        {data && map(filter(data, item => item.status === 'DP' || item.status === 'WD'), item => <Cards filter={handleFilter}
                            view={view}
                            key={item.id} data={item}/>)}

                    </div>
                </div>
                <div className="p-4 w-full border-r-2">
                    <h2 className="text-sm font-semibold mb-4 text-black">En ruta</h2>
                    <div className={"max-h-40 lg:max-h-96 overflow-y-scroll scrollbar-hide w-full"}>
                        {data && map(filter(data, item => item.status === 'ST' || item.status === 'RL' || item.status === "SC"), item =>
                            <Cards view={view} filter={handleFilter}
                                   key={item.id} data={item}/>)}
                    </div>
                </div>
                <div className="p-4 w-full ">
                    <h2 className="text-sm font-semibold mb-4 text-black">Recibido por el cliente</h2>
                    <div className={"max-h-40 lg:max-h-96 overflow-y-scroll scrollbar-hide w-full"}>
                        {data && map(filter(data, (item) => item.status === 'STC'), (item) => <Cards key={item.id}
                                                                                                     filter={handleFilter}
                                                                                                     view={view}
                                                                                                     data={item}/>)}
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Board;
