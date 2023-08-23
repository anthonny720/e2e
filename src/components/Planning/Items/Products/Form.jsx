import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {add_sku, update_sku} from "../../../../redux/actions/operations";
import {TailSpin} from "react-loader-spinner";

const FormProduct = ({
                         close,
                         units,
                         groups,
                         products,
                         conditions,
                         families,
                         subfamilies,
                         cuts,
                         packings,
                         containers,
                         data,
                         params
                     }) => {
    const dispatch = useDispatch();

    const list = [{
        payload: units,
        name: 'unit_of_measurement',
        title: 'Unidad de medida',
        subtitle: 'Seleccione una unidad de medida',
    }, {
        payload: groups, name: 'group', title: 'Grupo', subtitle: 'Seleccione un grupo',
    }, {
        payload: products, name: 'raw_material', title: 'Materia prima', subtitle: 'Seleccione una materia prima',
    }, {
        payload: conditions, name: 'condition', title: 'Condición', subtitle: 'Seleccione una condición',
    }, {
        payload: families, name: 'family', title: 'Familia', subtitle: 'Seleccione una familia',
    }, {
        payload: subfamilies, name: 'subfamily', title: 'Subfamilia', subtitle: 'Seleccione una subfamilia',
    }, {
        payload: cuts, name: 'cut', title: 'Corte', subtitle: 'Seleccione un corte',
    }, {payload: packings, name: 'packing', title: 'Empaque', subtitle: 'Seleccione un empaque',},
        {payload: containers, name: 'container', title: 'Envase', subtitle: 'Seleccione un envase',}

    ]


    const loading = useSelector(state => state.Operations.loading_products)

    const columns = [{name: 'net_weight', title: 'Peso neto', type: 'text', maxLength: 5,},
        {name: 'weight_box', title: 'Peso neto (caja)', type: 'text', maxLength: 5,},
        {
        name: 'brand', title: 'Marca', type: 'text', maxLength: 50,
    }, {
        name: 'performance', title: 'Rendimiento %', type: 'text', maxLength: 3,
    }, {name: 'capacity', title: 'Capacidad', type: 'text', maxLength: 5,},]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_sku(data?.id, form, params)) : dispatch(add_sku(form, params))
            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">

            <div className={"grid grid-cols-2 gap-2"}>

                {map(list, (item, index) => <div key={index}>
                    <p className={`${formik.errors[item.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>{item.title}</p>
                    <select onChange={(value) => formik.setFieldValue(item.name, value.target.value)}
                            defaultValue={formik.values[item.name]}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={null}>{item.subtitle}</option>
                        {map(item.payload, i => <option key={i.id} value={i.id}>{i.name}</option>)}
                    </select>
                </div>)

                }
                {map(columns, (column, index) => <div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)}
            </div>


            <div>
                <p className={`${formik.errors.information && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Información</p>
                <textarea
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    value={`${formik.values.information}`}
                    onChange={text => formik.setFieldValue('information', text.target.value)}/>
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
        raw_material: data?.raw_material || '',
        condition: data?.condition || '',
        family: data?.family || '',
        subfamily: data?.subfamily || '',
        cut: data?.cut || '',
        packing: data?.packing || '',
        container: data?.container || '',
        net_weight: data?.net_weight || 0,
        weight_box: data?.weight_box || 0,
        performance: data?.performance || '',
        capacity: data?.capacity || '',
        group: data?.group || '',
        unit_of_measurement: data?.unit_of_measurement || '',
        information: data?.information || '',
        brand: data?.brand || '',

    }
}
const newSchema = () => {
    return {
        raw_material: Yup.number().integer().min(1).required(),
        condition: Yup.number().integer().min(1).required(),
        family: Yup.number().integer().min(1).required(),
        subfamily: Yup.number().integer().min(1).required(),
        cut: Yup.number().integer().min(1).required(),
        packing: Yup.number().integer().min(1).required(),
        container: Yup.number().integer().min(1).required(),
        net_weight: Yup.number().min(0).required(),
        weight_box: Yup.number().min(0).required(),
        performance: Yup.number().min(1).required(),
        capacity: Yup.number().min(1).required(),
        group: Yup.number().integer().min(1).required(),
        unit_of_measurement: Yup.number().integer().min(1).required(),
        information: Yup.string().min(10),
        brand: Yup.string().min(1),
    }
}

export default FormProduct;

