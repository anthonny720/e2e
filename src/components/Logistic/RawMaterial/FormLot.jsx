import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_lot} from "../../../redux/actions/logistic";


const FormLot = ({close, providers, categories}) => {
    const dispatch = useDispatch()

    const columns = [{
        name: 'carrier_guide',
        title: 'Guia de transportista',
        type: 'text',
        maxLength: 12
    }, {name: 'provider_guide', title: 'Guia de proveedor', type: 'text', maxLength: 12}, {
        name: 'entry_date',
        title: 'Fecha de ingreso',
        type: 'date',
        maxLength: 10
    }, {name: 'download_date', title: 'Fecha de descarga', type: 'date', maxLength: 10}, {
        name: 'lot',
        title: 'Lote',
        type: 'text',
        maxLength: 13
    }, {name: 'variety', title: 'Variedad', type: 'text', maxLength: 10},]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_lot(form))
            close()
        }
    })
    return (<div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                {/*CATEGORY*/}
                <div>
                    <p className={`${formik.errors.product && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Producto:</p>
                    <select value={formik.values.product}
                            onChange={(value) => formik.setFieldValue('product', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                        <option value={null}>Seleccione un producto</option>
                        {categories !== null && map(categories, category => (
                            <option key={category.id} value={category.id}>{category.name}</option>))}
                    </select>
                </div>

                {/*Provider*/}
                <div>
                    <p className={`${formik.errors.provider && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Proveedor:</p>
                    <select onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                            defaultValue={formik.values.provider}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un proveedor</option>
                        {providers !== null && map(providers, provider => (
                            <option key={provider.id} value={provider.id}>{provider.business_name}</option>))}
                    </select>
                </div>

                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    <p className="text-red-500 text-xs italic">{formik.errors[column.name]}</p>
                </div>))}

                {/*Condition*/}
                <div>
                    <p className={`${formik.errors.condition && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Condición:</p>
                    <select value={formik.values.condition}
                            onChange={(value) => formik.setFieldValue('condition', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={'O'}>Orgánico</option>
                        <option value={'C'}>Convencional</option>
                    </select>
                </div>


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>);
};
const initialValues = () => {
    return {
        provider: '',
        carrier_guide: "",
        provider_guide: "",
        entry_date: '',
        download_date: '',
        lot: "",
        product: '',
        condition: 'O',
        variety: '',
    }
}
const newSchema = () => {
    return {
        provider: Yup.number().required(true),

        carrier_guide: Yup.string().min(6, "Ingrese correctamente un mínimo de 6 caracteres").required(true),
        provider_guide: Yup.string().min(6, "Ingrese correctamente un mínimo de 6 caracteres").required(true),
        entry_date: Yup.string().min(8, "Ingrese correctamente una fecha de ingreso").required(true),
        download_date: Yup.string().min(8, "Ingrese correctamente una fecha de descarga").required(true),
        lot: Yup.string().min(12, "Debe contener un mínimo de 12 caracteres").max(13, "Debe contener un máximo de 13 caracteres").required(true),
        condition: Yup.string().min(1).required(true),
        variety: Yup.string().required(true),
        product: Yup.number().required(true),
    }
}
export default FormLot;