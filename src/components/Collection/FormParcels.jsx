import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {add_parcels, update_parcels} from "../../redux/actions/collection";

const FormParcels = ({dispatch, close, data, providers, params}) => {
    const columns = [{name: 'parcel', title: 'Parcela', type: 'text', maxLength: 50,}, {
        name: 'property_name',
        title: 'Propietario',
        type: 'text',
        maxLength: 50,
    }, {name: 'area', title: 'Area', type: 'text', maxLength: 7,}, {
        name: 'sector',
        title: 'Sector',
        type: 'text',
        maxLength: 50,
    }, {name: 'variety', title: 'Variedad', type: 'text', maxLength: 50,}, {
        name: 'latitude',
        title: 'Latitud',
        type: 'text',
        maxLength: 50,
    }, {name: 'longitude', title: 'Longitud', type: 'text', maxLength: 50,},]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            data ? dispatch(update_parcels(form, data?.id, params)) : dispatch(add_parcels(form, params))
            close()
        }
    })
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">

            <div className={"grid md:grid-cols-2 gap-2 mt-2"}>
                <div className={"w-full "}>
                    <p className={`${formik.errors.status && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Estado:</p>
                    <select value={formik.values.status}
                            onChange={(value) => formik.setFieldValue('status', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                        <option value={"P"}>Presencia</option>
                        <option value={"C"}>Limpio</option>
                    </select>
                </div>
                <div className={"w-full"}>
                    <p className={`${formik.errors.provider && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Proveedor:</p>
                    <select onChange={(value) => formik.setFieldValue('provider', value.target.value)}
                            defaultValue={formik.values.provider}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={null}>Seleccione un proveedor</option>
                        {providers !== null && map(providers, provider => (
                            <option key={provider.id} value={provider.id}>{provider.business_name}</option>))}
                    </select>
                </div>
                <div className={"w-full "}>
                    <p className={`${formik.errors.type_mp && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Tipo
                        de MP:</p>
                    <select value={formik.values.type_mp}
                            onChange={(value) => formik.setFieldValue('type_mp', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                        <option value={"O"}>Orgánico</option>
                        <option value={"C"}>Convencional</option>
                    </select>
                </div>
                <div className={"w-full "}>
                    <p className={`${formik.errors.sample_type && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Muestra:</p>
                    <select value={formik.values.sample_type}
                            onChange={(value) => formik.setFieldValue('sample_type', value.target.value)}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                        <option value={"F"}>Fresco</option>
                        <option value={"PT"}>Producto Terminado</option>
                    </select>
                </div>
                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))}
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
        provider: data?.provider || '',
        property_name: data?.property_name || '',
        parcel: data?.parcel || '',
        sector: data?.sector || '',
        latitude: data?.latitude || '',
        longitude: data?.longitude || '',
        variety: data?.variety || '',
        status: data?.status || 'P',
        area: data?.area || 0,
        type_mp: data?.type_mp || 'C',
        sample_type: data?.sample_type || 'F',
    }
}
const newSchema = () => {
    return {
        provider: Yup.number(),
        property_name: Yup.string(),
        parcel: Yup.string().required(),
        sector: Yup.string(),
        latitude: Yup.string(),
        longitude: Yup.string(),
        variety: Yup.string(),
        status: Yup.string().required(),

        area: Yup.number(),
        type_mp: Yup.string().max(1).required(),
        sample_type: Yup.string().max(2).required(),

    }
}

export default FormParcels;

