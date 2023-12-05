import React, {useState} from 'react';
<<<<<<< HEAD
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const Filter = ({dispatch, action,dateField}) => {
    const [formData, setFormData] = useState({name: '', start_date: '', end_date: ''})
    const [date, setDate] = useState();

    const searchFilter = (e) => {
        e.preventDefault();
        dispatch(action(formData))
    }
    const onDateChange = (e) => {
        setDate(e)
        setFormData({
            ...formData,
            start_date: e?.[0] ? new Date(e?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            end_date: e?.[1] ? new Date(e?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        })
    }

    return (<div className={"sm:flex hidden gap-2 bg-white rounded-full"}>
        {dateField &&  <DateRangePicker
            className={`z-[100] rounded-2xl bg-white w-max text-gray-400 text-xs h-10 px-10 pr-10 rounded-full text-sm focus:outline-none   `}
            calendarClassName={"border-1"} onChange={onDateChange}
            value={date}/>}

        <div className="relative text-gray-600">
            <input
                type="search"
                name="search"
                placeholder="Buscar"
                value={formData?.name || ''}
                onChange={(e) => searchFilter({...formData, name: e.target.value})}
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button onClick={(e) => searchFilter(e)} type="submit" className="absolute right-0 top-0 mt-3 mr-4">
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
=======
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {map} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";
import RangeDate from "../util/RangeDate";

const Filter = ({providers, action, category, setParams, reference}) => {
    const loader = useSelector(state => state.Operations.loading);

    const dispatch = useDispatch()
    const [date, setDate] = useState();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            form['start_date'] = date ? new Date(date?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
            form['end_date'] = date ? new Date(date?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
            setParams(form)
            dispatch(action(category, form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black z-20">

        <div className="flex items-center justify-end gap-2 mt-4">

            <div className={"flex  items-center md:gap-2"}>
                <DownloadTableExcel
                    filename={`Reporte ${category}`}
                    sheet="Reporte"
                    currentTableRef={reference}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="icon cursor-pointer icon-tabler icon-tabler-edit text-black" width={20}
                         height={20}
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>

                </DownloadTableExcel>

                <button onClick={formik.handleSubmit} type={'button'}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md flex justify-center items-center">
                    {loader ? <svg className="animate-spin  h-5 w-5 text-black"
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg> : 'Buscar'}
                </button>
            </div>


        </div>

        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">

                <select value={formik.values.provider}
                        onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Todos los proveedores</option>
                    {providers && map(providers, (provider, index) => {
                        return <option key={index} value={provider.id}>{provider.business_name}</option>
                    })}
                </select>
                <RangeDate value={date} onChange={setDate}/>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        start_date: "", end_date: "", provider: ""
    }
}

>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

export default Filter;
