import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {add_purchase, update_purchase} from "../../../redux/actions/operations";

const FormPurchase = ({
                          close, data, suppliers, taxes, currencies
                      }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Operations.loading_purchase)


    const columns = [

        {name: 'order_id', title: '# Orden ', type: 'text', maxLength: 15,}, {
            name: 'order_date', title: 'Fecha de Orden', type: 'date', maxLength: 10,
        }, {name: 'invoice_id', title: '# Factura', type: 'text', maxLength: 15,}, {
            name: 'guide_number', title: '# Guía', type: 'text', maxLength: 15,
        }, {name: 'shipment_date', title: 'Fecha de envío', type: 'date', maxLength: 10,}, {
            name: 'arrival_date', title: 'Fecha de llegada', type: 'date', maxLength: 10,
        }, {name: 'drive', title: 'Drive url', type: 'text', maxLength: 200,}


    ]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_purchase(form, data?.id)) : dispatch(add_purchase(form))

            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className={"grid grid-cols-2 gap-2"}>

                <div>
                    <p className={`${formik.errors.supplier && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Proveedor</p>
                    <select onChange={(value) => formik.setFieldValue('supplier', value.target.value)}
                            defaultValue={formik.values.supplier}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={undefined}>Seleccione un proveedor</option>
                        {map(suppliers, (supplier, index) => <option key={index}
                                                                     value={supplier.id}>{supplier.display_name}</option>)}
                    </select>
                </div>


                {map(columns, (column, index) => <div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)}

                <div>
                    <p className={`${formik.errors.tax_rate && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Impuesto</p>
                    <select onChange={(value) => formik.setFieldValue('tax_rate', value.target.value)}
                            defaultValue={formik.values.tax_rate}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={undefined}>Seleccione un impuesto</option>
                        {map(taxes, (tax, index) => <option key={index} value={tax.id}>{tax.name}</option>)}
                    </select>
                </div>
                <div>
                    <p className={`${formik.errors.currency && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Moneda</p>
                    <select onChange={(value) => formik.setFieldValue('currency', value.target.value)}
                            defaultValue={formik.values.currency}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={undefined}>Seleccione una moneda</option>
                        {map(currencies, (currency, index) => <option key={index}
                                                                      value={currency.id}>{currency.name}</option>)}
                    </select>
                </div>

            </div>


            <div>
                <p className={`${formik.errors.comment && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Comentario</p>
                <textarea
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    value={`${formik.values.comment}`}
                    onChange={text => formik.setFieldValue('comment', text.target.value)}/>
            </div>

            <div className="w-full flex justify-center">
                {loading ? <button onClick={formik.handleSubmit} type="button"
                                   className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <TailSpin
                        className="mx-2" color="white" height={20} width={20} visible={loading}/>
                </button> : <button onClick={formik.handleSubmit} type="button"
                                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>}

            </div>


        </form>

    </div>;
};

const initialValues = (data) => {
    return {
        supplier: data?.supplier || '',
        order_id: data?.order_id || '',
        order_date: data?.order_date || '',
        invoice_id: data?.invoice_id || '',
        guide_number: data?.guide_number || '',
        shipment_date: data?.shipment_date || null,
        arrival_date: data?.arrival_date || null,
        comment: data?.comment || '',
        tax_rate: data?.tax_rate || '',
        currency: data?.currency || '',
        drive: data?.drive || ''
    }
}
const newSchema = () => {
    return {
        supplier: Yup.number().min(1).required(),
        order_id: Yup.string().min(1).required(),
        order_date: Yup.date().required(),
        invoice_id: Yup.string().min(1),
        guide_number: Yup.string().min(1),
        comment: Yup.string().min(10),
        tax_rate: Yup.number().min(1).required(),
        currency: Yup.number().min(1).required(),
        drive: Yup.string().min(10)
    }
}

export default FormPurchase;

