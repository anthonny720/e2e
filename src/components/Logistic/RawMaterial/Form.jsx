import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_data, update_data} from "../../../redux/actions/logistic";


const FormData = ({data, lot, pallets, zones,close}) => {
    const columns = [
        {name: 'number', title: 'N°', type: 'text', maxLength: 3},
        {name: 'weight', title: 'Peso', type: 'text', maxLength: 7},
        {name: 'gb', title: 'Greenbox', type: 'text', maxLength: 2},
        {name: 'pa', title: 'PAE', type: 'text', maxLength: 2},
        {name: 't0', title: 'Tibana 0', type: 'text', maxLength: 2},
        {name: 'c6', title: 'C6', type: 'text', maxLength: 2},
        {name: 'c8', title: 'C8', type: 'text', maxLength: 2},
        {name: 'c10', title: 'C10', type: 'text', maxLength: 2},
        {name: 'c12', title: 'C12', type: 'text', maxLength: 2},
        {name: 'c14', title: 'C14', type: 'text', maxLength: 2},
    ]
    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data, lot),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_data(form, lot, data.id), ) : dispatch(add_data(form, lot))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">

        <div className={`grid ${data && 'grid-cols-1'} grid-cols-3 gap-3`}>
            {
                map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name]  && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))
            }
        </div>


        <div className={` mb-4  flex w-full  items-center flex-row gap-2`}>
            <div className={"w-1/2"}>
                <p className={`${formik.errors.pallet  && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Pallet:</p>
                <select value={formik.values.pallet}
                        onChange={(value) => formik.setFieldValue('pallet', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"

                        aria-label="Default select example">
                    <option value={null}>Seleccione un pallet</option>
                    {pallets !== null && map(pallets, pallet => (
                        <option key={pallet.id} value={pallet.id}>{pallet.name}</option>))}
                </select>
            </div>

            <div className={"w-1/2 "}>
                <p className={`${formik.errors.location  && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Ubicación:</p>
                <select value={formik.values.location}
                        onChange={(value) => formik.setFieldValue('location', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={''}>Seleccione una ubicación</option>
                    {zones !== null && map(zones, loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>))}
                </select>
            </div>

        </div>
        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data, lot) => {
    return {
        number: data?.number || 0,
        weight: data?.weight || 0,
        gb: data?.gb || 0,
        pa: data?.pa || 0,
        t0: data?.t0 || 0,
        c6: data?.c6 || 0,
        c8: data?.c8 || 0,
        c10: data?.c10 || 0,
        c12: data?.c12 || 0,
        c14: data?.c14 || 0,
        tare: data?.tare || 0,
        pallet: data?.pallet || "",
        lot: lot,
        location: data?.location || "",
    }
}
const newSchema = () => {
    return {
        number: Yup.number().min(1).positive().required(true),
        weight: Yup.number().min(0).max(1500).required(true),
        gb: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        pa: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        t0: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c6: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c8: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c10: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c12: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        c14: Yup.number().min(0).max(42).integer("Ingrese un número entre 0 - 42").required(true),
        pallet: Yup.number().required(true),
        location: Yup.number().required(true),
    }
}


export default FormData;
