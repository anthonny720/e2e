import React from 'react';
import {map} from 'lodash';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";

const Filter = ({products, providers, setParams, action, latestObject, reference}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true,

        onSubmit: (form) => {
            setParams(form)
            dispatch(action(form))
        }
    })
    return (<form className="w-full  rounded-lg bg-white text-black">

        <div className="flex items-center justify-end mt-4">
            <div className={"flex items-center gap-2"}>
                <DownloadTableExcel
                    filename={`Lista de agricultores : ${new Date(latestObject?.updated_at).toLocaleDateString('es-PE', {
                        day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric"
                    })}`}
                    sheet="Reporte"
                    currentTableRef={reference.current}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="icon cursor-pointer icon-tabler icon-tabler-edit text-gray-500" width={25}
                         height={25}
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
            <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-4">
                <input
                    placeholder={"Parcela"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.parcel}
                    onChange={text => formik.setFieldValue('parcel', text.target.value)}/>
                <input
                    placeholder={"Propietario"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={formik.values.property_name}
                    onChange={text => formik.setFieldValue('property_name', text.target.value)}/>

                <select value={formik.values.product}
                        onChange={(value) => formik.setFieldValue('product', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Productos</option>
                    {products && products !== null && map(products, (p, index) => <option key={index}
                                                                                          value={p?.id}>{p?.name}</option>)}
                </select>
                <select value={formik.values.providers}
                        onChange={(value) => formik.setFieldValue('providers', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Proveedores</option>
                    {providers && providers !== null && map(providers, (p, index) => <option key={index}
                                                                                             value={p?.id}>{p?.business_name}</option>)}
                </select>

                <select value={formik.values.type_mp}
                        onChange={(value) => formik.setFieldValue('type_mp', value.target.value)}
                        className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value={''}>Tipo</option>
                    <option value={'C'}>Convencional</option>
                    <option value={'O'}>Orgánico</option>

                </select>
            </div>
        </div>
    </form>);
};
const initialValues = () => {
    return {
        parcel: "", product: "", providers: '', type_mp: '', property_name: ''
    }
}


export default Filter;
