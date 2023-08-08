import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {add_sales_order, update_sales_order} from "../../../redux/actions/operations";

const FormSell = ({
                      close, data
                  }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Operations.loading_purchase)

    const customer = useSelector(state => state.Management.customers)
    const process_plant = useSelector(state => state.Management.outsourcings)
    const sku = useSelector(state => state.Operations.products)
    const currency = useSelector(state => state.Management.currencies)
    const tax_rate = useSelector(state => state.Management.taxes)


    const columns = [

        {name: 'year', title: 'Año ', type: 'text', maxLength: 4,}, {
            name: 'full_container_load_name', title: 'FCL ', type: 'text', maxLength: 50,
        }, {
            name: 'order_id', title: '# OC ', type: 'text', maxLength: 15,
        }, {name: 'order_date', title: 'Fecha de orden ', type: 'date', maxLength: 10,}, {
            name: 'quote_id', title: '# PFI', type: 'text', maxLength: 15,
        }, {
            name: 'shipping_date', title: 'Fecha de envío ', type: 'date', maxLength: 10,
        }, {name: 'etd', title: 'ETD ', type: 'date', maxLength: 10,}, {
            name: 'eta', title: 'ETA ', type: 'date', maxLength: 10,
        }, {name: 'drive', title: 'Drive ', type: 'text', maxLength: 200,}, {
            name: 'quantity', title: 'Cantidad ', type: 'text', maxLength: 9,
        }, {name: 'price_per_unit', title: 'Precio unitario ', type: 'text', maxLength: 5,},]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_sales_order(form, data?.slug)) : dispatch(add_sales_order(form))
            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className={"grid grid-cols-2 gap-2"}>
                {customer && customer !== null && customer !== undefined && size(customer) > 0 && <div>
                    <p className={`${formik.errors.customer && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Cliente</p>
                    <select onChange={(value) => formik.setFieldValue('customer', value.target.value)}
                            defaultValue={formik.values.customer}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={''}>Seleccione un cliente</option>
                        {map(customer, (item, index) => <option key={index}
                                                                value={item.id}>{item?.display_name}</option>)}
                    </select>
                </div>}
                {sku && sku !== null && sku !== undefined && size(sku) > 0 && <div>
                    <p className={`${formik.errors.sku && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>SKU</p>
                    <select onChange={(value) => formik.setFieldValue('sku', value.target.value)}
                            defaultValue={formik.values.sku}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={''}>Seleccione un sku</option>
                        {map(sku, (item, index) => <option key={index} value={item.id}>{item?.name}</option>)}
                    </select>
                </div>}
                {process_plant && process_plant !== null && process_plant !== undefined && size(process_plant) > 0 &&
                    <div>
                        <p className={`${formik.errors.process_plant && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Planta
                            de proceso</p>
                        <select onChange={(value) => formik.setFieldValue('process_plant', value.target.value)}
                                defaultValue={formik.values.process_plant}
                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        >
                            <option value={''}>Seleccione una planta de proceso</option>
                            {map(process_plant, (item, index) => <option key={index}
                                                                         value={item.id}>{item?.display_name}</option>)}
                        </select>
                    </div>}
                <div>
                    <p className={`${formik.errors.market && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Mercado</p>
                    <select onChange={(value) => formik.setFieldValue('market', value.target.value)}
                            defaultValue={formik.values.market}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={undefined}>Seleccione un mercado</option>
                        <option value={'national'}>Nacional</option>
                        <option value={'international'}>Internacional</option>
                    </select>
                </div>
                <div>
                    <p className={`${formik.errors.month && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Mes</p>
                    <select onChange={(value) => formik.setFieldValue('month', value.target.value)}
                            defaultValue={formik.values.month}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                        <option value={''}>Seleccione un mes</option>
                        <option value={'01'}>Enero</option>
                        <option value={'02'}>Febrero</option>
                        <option value={'03'}>Marzo</option>
                        <option value={'04'}>Abril</option>
                        <option value={'05'}>Mayo</option>
                        <option value={'06'}>Junio</option>
                        <option value={'07'}>Julio</option>
                        <option value={'08'}>Agosto</option>
                        <option value={'09'}>Septiembre</option>
                        <option value={'10'}>Octubre</option>
                        <option value={'11'}>Noviembre</option>
                        <option value={'12'}>Diciembre</option>
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
                    <p className={`${formik.errors.color && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Color: </p>

                    <input type={'color'}
                           className="w-full  mt-4"
                           value={formik.values.color}
                           onChange={text => formik.setFieldValue('color', text.target.value)}/>
                </div>


                {currency && currency !== null && currency !== undefined && size(currency) > 0 && <div>
                    <p className={`${formik.errors.currency && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Moneda</p>
                    <select onChange={(value) => formik.setFieldValue('currency', value.target.value)}
                            defaultValue={formik.values.currency}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={undefined}>Seleccione una moneda</option>
                        {map(currency, (item, index) => <option key={index} value={item.id}>{item?.name}</option>)}
                    </select>
                </div>}
                {tax_rate && tax_rate !== null && tax_rate !== undefined && size(tax_rate) > 0 && <div>
                    <p className={`${formik.errors.tax_rate && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Impuesto</p>
                    <select onChange={(value) => formik.setFieldValue('tax_rate', value.target.value)}
                            defaultValue={formik.values.tax_rate}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={undefined}>Seleccione un impuesto</option>
                        {map(tax_rate, (item, index) => <option key={index} value={item.id}>{item?.name}</option>)}
                    </select>
                </div>}
                <div>
                    <p className={`${formik.errors.management && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Gestión</p>
                    <select onChange={(value) => formik.setFieldValue('management', value.target.value)}
                            defaultValue={formik.values.management}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={undefined}>Seleccione la gestión</option>
                        <option value={'30'}>30 %</option>
                        <option value={'60'}>60 %</option>
                        <option value={'90'}>90 %</option>
                        <option value={'100'}>100 %</option>
                    </select>
                </div>


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
        month: data?.month || '',
        year: data?.year || '',
        customer: data?.customer || '',
        order_id: data?.order_id || '',
        order_date: data?.order_date || '',
        quote_id: data?.quote_id || '',
        full_container_load_name: data?.full_container_load_name || '',
        process_plant: data?.process_plant || '',
        sku: data?.sku || '',
        quantity: data?.quantity || '',
        price_per_unit: data?.price_per_unit || '',
        market: data?.market || '',
        currency: data?.currency || '',
        shipping_date: data?.shipping_date || undefined,
        etd: data?.etd || undefined,
        eta: data?.eta || undefined,
        tax_rate: data?.tax_rate || '',
        management: data?.management || '',
        drive: data?.drive || '',
        color: data?.color || '#000000',

    }
}
const newSchema = () => {
    return {
        month: Yup.string().min(1).required(),
        year: Yup.string().min(4).required(),
        customer: Yup.number().min(1).required(),
        order_id: Yup.string().min(2).required(),
        order_date: Yup.date().required(),
        quote_id: Yup.string().min(1).required(),
        full_container_load_name: Yup.string().min(1).required(),
        process_plant: Yup.number().min(1).required(),
        sku: Yup.number().min(1).required(),
        quantity: Yup.number().min(0).required(),
        price_per_unit: Yup.number().required(),
        market: Yup.string().min(1).required(),
        currency: Yup.number().min(1).required(),
        shipping_date: Yup.string(),
        etd: Yup.string(),
        eta: Yup.string(),
        tax_rate: Yup.number().min(1).required(),
        management: Yup.string().min(1).required(),
        drive: Yup.string().min(1),
        color: Yup.string().min(7).required(),

    }
}

export default FormSell;

