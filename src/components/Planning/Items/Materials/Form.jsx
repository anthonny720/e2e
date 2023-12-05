import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {add_material, update_material} from "../../../../redux/actions/operations";
import {TailSpin} from "react-loader-spinner";

const FormMaterial = ({
                          close,
                          units,
                          groups,

                          data,
                          params
                      }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Operations.loading_products)
    const columns = [{name: 'name', title: 'Nombre', type: 'text', maxLength: 200,}, {
        name: 'sap', title: 'SAP', type: 'text', maxLength: 10,
    }, {name: 'minimum_quantity', title: 'Cantidad mínima', type: 'text', maxLength: 7,}]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_material(data?.id, form, params)) : dispatch(add_material(form, params))
            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">

            {map(columns, (column, index) => <div key={index}>
                <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
            </div>)}
            {groups && groups !== null && groups !== undefined && size(groups) > 0 && <div>
                <p className={`${formik.errors.group && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Grupo:</p>
                <select onChange={(value) => formik.setFieldValue('group', value.target.value)}
                        defaultValue={formik.values.group}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un grupo</option>
                    {map(groups, i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
            </div>}
            {units && units !== null && units !== undefined && size(units) > 0 && <div>
                <p className={`${formik.errors.unit_of_measurement && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Unidad
                    de medida:</p>
                <select onChange={(value) => formik.setFieldValue('unit_of_measurement', value.target.value)}
                        defaultValue={formik.values.unit_of_measurement}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={null}>Seleccione una unidad de medida</option>
                    {map(units, i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
            </div>}
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
        name: data?.name || '',
        sap: data?.sap || '',
        minimum_quantity: data?.minimum_quantity || '',
        group: data?.group || '',
        unit_of_measurement: data?.unit_of_measurement || '',
        information: data?.information || ''
    }
}
const newSchema = () => {
    return {
        name: Yup.string().min(10).required(),
        sap: Yup.string().min(5).required(),
        minimum_quantity: Yup.number().integer().min(1).required(),
        group: Yup.number().integer().min(1).required(),
        unit_of_measurement: Yup.number().integer().min(1).required(),
        information: Yup.string().min(10),
    }
}

export default FormMaterial;

