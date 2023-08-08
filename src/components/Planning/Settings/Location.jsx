import React, {useEffect, useState} from 'react';
import Settings from "../../../containers/pages/Planning/Settings";
import {useDispatch, useSelector} from "react-redux";
import {get_locations} from "../../../redux/actions/management";
import {map, size} from "lodash";
import Skeleton from "react-loading-skeleton";

const Location = () => {

    const payload = useSelector(state => state.Management.locations)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: ''
    })

    const {name} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(get_locations(formData))
    }, [formData]);


    return (<Settings>
        <h1 className={"text-gray-800 flex w-full p-2 text-xs md:text-lg "}>Ubicación</h1>
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
                            name={'name'}
                            id={'name'}
                            type="text"
                            className="w-full bg-transparent focus:border-none focus:outline-none"
                            value={name}
                            onChange={e => onChange(e)}
                            placeholder="Nombre"
                        />
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {payload && payload !== null && payload !== undefined && size(payload) > 0 ? map(payload, (i, index) =>
                    <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {i?.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {i?.name}
                        </td>
                    </tr>) : <tr>
                    <td><Skeleton count={10}/></td>
                    <td><Skeleton count={10}/></td>
                </tr>}

                </tbody>
            </table>
        </div>
    </Settings>);
};

export default Location;
