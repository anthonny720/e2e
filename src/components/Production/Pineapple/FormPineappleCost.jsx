import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, round} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {add_costs} from "../../../redux/actions/finances";


const FormPineappleCost = ({close, data, category,params}) => {

    const sales = useSelector(state => state.Operations.sales)
    const skus = useSelector(state => state.Operations.products)

    const dispatch = useDispatch()
    const columns = [{name: 'exchange_rate', title: 'Tipo de cambio', type: 'text', maxLength: 5}, {
        name: 'price_sale', title: 'Precio de venta', type: 'text', maxLength: 7
    }, {name: 'mp', title: 'Kg MP', type: 'text', maxLength: 8}, {name: 'glp', title: 'GLP', type: 'text', maxLength: 7}, {
        name: 'participation', title: '% Participación', type: 'text', maxLength: 6
    }, {name: 'cost_materials', title: 'Costo embalajes', type: 'text', maxLength: 7}, {
        name: 'cost_bags', title: 'Costo envase', type: 'text', maxLength: 4
    }, {name: 'cost_boxes', title: 'Costo empaque', type: 'text', maxLength: 7}, {
        name: 'cost_mod_conditioning', title: 'MOD Acondicionado', type: 'text', maxLength: 7
    }, {name: 'cost_mod_packing', title: 'MOD Envasado', type: 'text', maxLength: 7},]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.category = category
            dispatch(add_costs(form,category,params))
            close()
        }
    })


    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4 ">

            <div className={"grid gap-2 grid-cols-2"}>
                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))}
            </div>
            <div>
                <p className={`${formik.errors.sku && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>SKU:</p>
                <select onChange={(value) => formik.setFieldValue('sku', value.target.value)}
                        defaultValue={formik.values.sku}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                >
                    <option value={null}>Seleccione un sku</option>
                    {skus !== null && map(skus, sku => (<option key={sku.id} value={sku.id}>{sku.name}</option>))}
                </select>
            </div>
            <div>
                <p className={`${formik.errors.full_load_container && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>FCL:</p>
                <select onChange={(value) => formik.setFieldValue('full_load_container', value.target.value)}
                        defaultValue={formik.values.full_load_container}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                >
                    <option value={null}>Seleccione un FCL</option>
                    {sales !== null && map(sales, sale => (<option key={sale.id} value={sale.id}>{sale.full_container_load_name}</option>))}
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
const initialValues = (data) => {
    return {
        id_process: data?.id,
        glp: '',
        exchange_rate: '',
        price_sale: '',
        participation: round((data?.kg_net / data?.mod_day?.[0]?.total_kg) * 100, 2) || 0,
        mp: '',
        cost_bags: data?.bags_price || 0,
        cost_boxes: data?.boxes_price || 0,
        cost_materials: '',
        cost_mod_conditioning: data?.mod_day?.[0]?.total_conditioning || 0,
        cost_mod_packing: data?.mod_day?.[0]?.total_packing || 0,
        date: data?.date || '',
        sku: '',
        customer: data?.client || '',
        full_load_container: null,
        cut: data?.cut || '',
        lot: data?.lot_id || '',
        kg_processed: data?.kg_processed || '',
        kg_pt: data?.kg_net || '',
        humidity: data?.humidity || '',


    }
}
const newSchema = () => {
    return {
        glp: Yup.number().positive().min(0).required('Este campo es requerido'),
        exchange_rate: Yup.number().positive().min(0).required('Este campo es requerido'),
        price_sale: Yup.number().positive().min(0).required('Este campo es requerido'),
        participation: Yup.number().positive().min(0).required('Este campo es requerido'),
        mp: Yup.number().min(0).required('Este campo es requerido'),
        cost_bags: Yup.number().positive().min(0).required('Este campo es requerido'),
        cost_boxes: Yup.number().positive().min(0).required('Este campo es requerido'),
        cost_materials: Yup.number().positive().min(0).required('Este campo es requerido'),
        cost_mod_conditioning: Yup.number().positive().min(0).required('Este campo es requerido'),
        cost_mod_packing: Yup.number().positive().min(0).required('Este campo es requerido'),
        date: Yup.string().required('Este campo es requerido'),
        sku: Yup.number().positive().min(0).required('Este campo es requerido'),
        customer: Yup.number().positive().min(0).required('Este campo es requerido'),
        cut: Yup.number().positive().min(0).required('Este campo es requerido'),
        lot: Yup.number().positive().min(0).required('Este campo es requerido'),
        kg_processed: Yup.number().positive().min(0).required('Este campo es requerido'),
        kg_pt: Yup.number().positive().min(0).required('Este campo es requerido'),
        humidity: Yup.number().positive().min(0).required('Este campo es requerido'),


    }
}
export default FormPineappleCost;