import React, {useState} from 'react';
import {useFormik} from "formik";
import {DownloadTableExcel} from "react-export-table-to-excel";
import RangeDate from "../util/RangeDate";
import {useDispatch} from "react-redux";

const Filter = ({category, setParams, reference, exclude, action_one, action_two}) => {

    const dispatch = useDispatch()

    const [date, setDate] = useState();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            form['start_date'] = date ? new Date(date?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
            form['end_date'] = date ? new Date(date?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
            setParams(form)
            dispatch(action_one(form))
            dispatch(action_two(form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black z-20 my-2">

        <div className="flex items-center justify-end mt-4">
            <div className={"flex  items-center gap-2"}>
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
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                    Buscar
                </button>
            </div>


        </div>

        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                {!exclude && <input type={'text'} value={formik.values.lot}
                                    onChange={(value) => formik.setFieldValue('lot', value.target.value)}
                                    placeholder={'Lote'}
                                    className="px-4 py-3 w-full rounded-md bg-gray-100 focus:border-green-500 focus:bg-white focus:ring-2 text-sm"/>}

                <RangeDate value={date} onChange={setDate}/>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        start_date: "", end_date: "", lot: ""
    }
}


export default Filter;
