import React, {useEffect} from 'react';
import Settings from "../../../containers/pages/Planning/Settings";
import {useDispatch, useSelector} from "react-redux";
import {get_costs} from "../../../redux/actions/management";
import {map, size} from "lodash";

const CostProduction = () => {
    const payload = useSelector(state => state.Management.costs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_costs())
    }, []);


    return (<Settings>
        <h1 className={"text-gray-800 flex w-full p-2 text-xs md:text-lg "}>Costos de producción</h1>
        <div className={"p-2 max-h-96 overflow-scroll scrollbar-hide"}>
            <table className="w-max divide-y divide-gray-200 overflow-scroll scrollbar-hide">
                <thead className="bg-gray-50 ">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                        ID
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                        <input

                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            disabled={true}
                            placeholder="Costo hora día"
                        />
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                        <input

                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            disabled={true}
                            placeholder="Costo hora día 25%"
                        />
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                        <input

                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            disabled={true}
                            placeholder="Costo hora día 35%"
                        />
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                        <input

                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            disabled={true}
                            placeholder="Costo hora noche"
                        />
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {payload && payload !== null && payload !== undefined && size(payload) > 0 && map(payload, (i, index) =>
                    <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {i?.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {i?.cost_hour_day}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {i?.cost_hour_extra_25}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {i?.cost_hour_extra_35}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {i?.cost_hour_night}
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    </Settings>);
};

export default CostProduction;
