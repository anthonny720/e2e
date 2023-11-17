import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_lot} from "../../../redux/actions/logistic";
import {Switch} from "@headlessui/react";


const FormUpdateLot = ({close, data}) => {

    const dispatch = useDispatch()
    const columns = [{
        name: 'discount_description', title: 'Descripción', type: 'text', maxLength: 200
    }, {name: 'discount', title: '% Descuento rechazo', type: 'text', maxLength: 16}, {
        name: 'discount_price', title: '% Descuento precio', type: 'text', maxLength: 16
    }, {
        name: 'discount_price_soles', title: 'Precio soles (descuento)', type: 'text', maxLength: 6
    }, {name: 'price_camp', title: 'Precio Campo', type: 'text', maxLength: 6}, {
        name: 'freight', title: 'Flete', type: 'text', maxLength: 10
    }, {name: 'service_downloads', title: 'Estiba', type: 'text', maxLength: 10},]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_lot(data?.lot, form))
            close()
        }
    })


    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <p className={"w-full text-center font-bold text-green-400"}>{data?.lot?.lot}</p>
            {map(columns, (column, index) => (<div key={index}>
                <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
            </div>))}
            <p className={`text-base mt-4 font-medium leading-none text-gray-800 mb-4`}>Finalizado:</p>

            <Switch
                checked={formik.values.disabled_update}
                onChange={(value) => formik.setFieldValue('disabled_update', value)}
                className={`${formik.values.disabled_update ? 'bg-green-500' : 'bg-gray-700'}
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Deshabilitado</span>
                <span
                    aria-hidden="true"
                    className={`${formik.values.disabled_update ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>


            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
        </form>

    </div>);
};

const initialValues = (data) => {
    return {
        discount_description: data?.discount_description || '',
        discount: data?.discount || 0,
        discount_price: data?.discount_price || 0,
        discount_price_soles: data?.discount_price_soles || 0,
        price_camp: data?.price_camp || 0,
        freight: data?.freight || 0,
        service_downloads: data?.service_downloads || 0,
        disabled_update: data?.disabled_update || false

    }
}
const newSchema = () => {
    return {
        discount_description: Yup.string(),
        discount: Yup.number().min(0).required(),
        discount_price: Yup.number().min(0).required(),
        discount_price_soles: Yup.number().min(0).required(),
        price_camp: Yup.number().min(0).required(),
        freight: Yup.number().min(0).required(),
        service_downloads: Yup.number().min(0).required(),
        disabled_update: Yup.boolean().required()

    }
}
export default FormUpdateLot;