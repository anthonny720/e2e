import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import _, {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_packing_process} from "../../../redux/actions/production";


const FormProcessPackingPineapple = ({close, data, category, params, customers, cuts, materials}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'lot_pt', title: 'Lote PT', type: 'text', maxLength: 15},
        {name: 'finished_product', title: 'Kg PT', type: 'text', maxLength: 7},
        {name: 'sale_local', title: 'Venta local (kg)', type: 'text', maxLength: 7},
        {name: 'detriment', title: 'Merma (kg)', type: 'text', maxLength: 7},
        {name: 'quality', title: 'Calidad (kg)', type: 'text', maxLength: 7},
        {name: 'aggregates', title: 'Agregados (kg)', type: 'text', maxLength: 7},
        {name: 'sub_product', title: 'Subproducto (kg)', type: 'text', maxLength: 7},
        {name: 'lots_aggregates', title: 'Lotes agregados', type: 'text', maxLength: 50},
        {name: 'humidity', title: 'Humedad %', type: 'text', maxLength: 5},
        {name: 'boxes_qt', title: '# Cajas', type: 'text', maxLength: 5},
        {name: 'bags_qt', title: '# Bolsas', type: 'text', maxLength: 5},
    ]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_packing_process(data?.id, category, form, params))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4 ">

                <div className={"grid gap-2 grid-cols-2"}>
                    {map(columns, (column, index) => (<div key={index}>
                        <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))}
                    <div>
                        <p className={`${formik.errors.cut && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Corte:</p>
                        <select onChange={(value) => formik.setFieldValue('cut', value.target.value)}
                                defaultValue={formik.values.cut}
                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                                aria-label="Default select example">
                            <option value={null}>Seleccione una caja</option>
                            {cuts !== null && map(cuts, cut => (
                                <option key={cut.id} value={cut.id}>{cut.name}</option>))}
                        </select>
                    </div>
                    <div>
                        <p className={`${formik.errors.client && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Cliente:</p>
                        <select onChange={(value) => formik.setFieldValue('client', value.target.value)}
                                defaultValue={formik.values.client}
                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                                aria-label="Default select example">
                            <option value={null}>Seleccione un cliente</option>
                            {customers !== null && map(customers, client => (
                                <option key={client.id} value={client.id}>{client.business_name}</option>))}
                        </select>
                    </div>
                    <div>
                        <p className={`${formik.errors.boxes && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Caja:</p>
                        <select onChange={(value) => formik.setFieldValue('boxes', value.target.value)}
                                defaultValue={formik.values.boxes}
                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                                aria-label="Default select example">
                            <option value={null}>Seleccione una caja</option>
                            {materials !== null &&
                                _.chain(materials)
                                    .filter(box => _.includes(box.name.toLowerCase(), 'caja'))
                                    .map(box => <option key={box.id} value={box.id}>{box.name}</option>)
                                    .value()
                            }
                        </select>
                    </div>
                    <div>
                        <p className={`${formik.errors.bags && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Bolsa:</p>
                        <select onChange={(value) => formik.setFieldValue('bags', value.target.value)}
                                defaultValue={formik.values.bags}
                                className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                                aria-label="Default select example">
                            <option value={null}>Seleccione una bolsa</option>
                            {materials !== null &&
                                _.chain(materials)
                                    .filter(bag => _.includes(bag.name.toLowerCase(), 'bolsa'))
                                    .map(bag => <option key={bag.id} value={bag.id}>{bag.name}</option>)
                                    .value()
                            }
                        </select>
                    </div>
                </div>


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};
const initialValues = (data) => {
    return {
        lot_pt: data?.lot_pt || '',
        finished_product: data?.finished_product || 0,
        sale_local: data?.sale_local || 0,
        detriment: data?.detriment || 0,
        quality: data?.quality || 0,
        aggregates: data?.aggregates || 0,
        sub_product: data?.sub_product || 0,
        lots_aggregates: data?.lots_aggregates || '',
        cut: data?.cut || '',
        client: data?.client || '',
        humidity: data?.humidity || 0,
        boxes_qt: data?.boxes_qt || 0,
        bags_qt: data?.bags_qt || 0,
        boxes: data?.boxes || '',
        bags: data?.bags || '',
        information: data?.information || '',

    }
}
const newSchema = () => {
    return {
        lot_pt: Yup.string().min(5).required(),
        finished_product: Yup.number().min(0).required(),
        sale_local: Yup.number().min(0).required(),
        detriment: Yup.number().min(0).required(),
        quality: Yup.number().min(0).required(),
        aggregates: Yup.number().min(0).required(),
        sub_product: Yup.number().min(0).required(),
        lots_aggregates: Yup.string(),
        cut: Yup.number().min(1).required(),
        client: Yup.number().min(1).required(),
        humidity: Yup.number().min(0).required(),
        boxes_qt: Yup.number().min(1).required(),
        bags_qt: Yup.number().min(1).required(),
        boxes: Yup.number().min(1).required(),
        bags: Yup.number().min(1).required(),
        information: Yup.string()


    }
}
export default FormProcessPackingPineapple;