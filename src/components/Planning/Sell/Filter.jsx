import React, {useEffect, useState} from 'react';
import {Switch} from "@headlessui/react";

const Filter = ({dispatch, action}) => {


    const getCurrentMonth = () => {
        const currentDate = new Date();
        const options = {month: 'long'}; // 'long' devuelve el nombre completo del mes
        const currentMonthName = currentDate.toLocaleString('en-US', options);
        return currentMonthName;
    };

    const getCurrentYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        return String(currentYear);
    };

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push({value: String(i), label: String(i)});
        }
        return options;
    };
    const years = generateOptions(2020, 2030);

    const renderOptions = (options) => {
        return options.map((option) => (<option key={option.value} value={option.value}>
            {option.label}
        </option>));
    };

    const [formData, setFormData] = useState({
        sku: '', client_name: '', month: getCurrentMonth(), year: getCurrentYear(), fcl_name: '', type_sale: true
    })

    const searchFilter = () => {
        dispatch(action(formData))
    }

    useEffect(() => {
        dispatch(action(formData))
    }, []);


    return (<div className={"sm:flex hidden gap-2 bg-white rounded-full"}>


        <div className="relative text-gray-600 hidden   xl:block  xl:flex items-center">

            <Switch
                title={'Plan/Real'}
                checked={formData.type_sale}
                onChange={(e) => setFormData({...formData, type_sale: e})}
                className={`${formData.type_sale ? 'bg-green-400' : 'bg-green-200'}
                relative ml-2 inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out `}>
                <span aria-hidden="true"
                      className={`${formData.type_sale ? 'translate-x-5' : 'translate-x-0.5'} pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}/>
            </Switch>
            <select value={formData.month}
                    className={`bg-white h-10 px-5  rounded-full text-sm focus:outline-none`}
                    onChange={(e) => setFormData({...formData, month: e.target.value})}>
                <option value={'January'}>Enero</option>
                <option value={'February'}>Febrero</option>
                <option value={'March'}>Marzo</option>
                <option value={'April'}>Abril</option>
                <option value={'May'}>Mayo</option>
                <option value={'June'}>Junio</option>
                <option value={'July'}>Julio</option>
                <option value={'August'}>Agosto</option>
                <option value={'September'}>Septiembre</option>
                <option value={'October'}>Octubre</option>
                <option value={'November'}>Noviembre</option>
                <option value={'December'}>Diciembre</option>
            </select>
            <select
                value={formData.year}
                className={`bg-white h-10 px-5  rounded-full text-sm focus:outline-none`}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
            >
                {renderOptions([...years])}
            </select>
            <input
                type="search"
                name="search"
                placeholder="SKU"
                value={formData?.sku || ''}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="bg-white h-10 px-5  rounded-full text-sm focus:outline-none"
            />
            <input
                type="search"
                name="search"
                placeholder="FCL"
                value={formData?.fcl_name || ''}
                onChange={(e) => setFormData({...formData, fcl_name: e.target.value})}
                className="bg-white h-10 px-5 rounded-full text-sm focus:outline-none"
            />
            <input
                type="search"
                name="search"
                placeholder="Cliente"
                value={formData?.client_name || ''}
                onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                className="bg-white h-10 px-5 mr-3 rounded-full text-sm focus:outline-none"
            />
            <button onClick={() => searchFilter()} type="button" className="absolute right-0 top-0 mt-3 mr-4">
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


    </div>);
};

export default Filter;
