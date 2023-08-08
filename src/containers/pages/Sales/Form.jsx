import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_samples} from "../../../redux/actions/sales";
import {Footer} from "../../../components/navigation/Footer";
import {Helmet} from "react-helmet";

const Form = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_samples(form))
            formik.handleReset()
        }
    })

    const columns = [{
        name: 'delivery_date', title: 'Fecha de envío', type: 'date', maxLength: 50,
    }, {name: 'applicant', title: 'Solicitante', type: 'text', maxLength: 50,}, {
        name: 'code', title: 'Código', type: 'text', maxLength: 50,
    }, {name: 'client', title: 'Cliente', type: 'text', maxLength: 150,}, {
        name: 'use', title: 'Uso previsto', type: 'text', maxLength: 50,
    }, {name: 'analysis', title: 'Análisis', type: 'text', maxLength: 50,}, {
        name: 'delivery_address', title: 'Dirección de entrega', type: 'text', maxLength: 100,
    }, {
        name: 'delivery_address_final', title: 'Dirección de entrega final', type: 'text', maxLength: 100,
    }, {name: 'client_data', title: 'Datos del cliente', type: 'text', maxLength: 200,}, {
        name: 'price', title: 'Precio', type: 'number',
    }, {name: 'courier', title: 'Courier', type: 'text', maxLength: 50,},]


    return (<div
            className="relative overflow-hidden scrollbar-hide m-3 text-xl text-gray-900  text-white font-semibold bg-gray-400 bg-opacity-10 rounded-xl max-h-screen   shadow-xl flex flex-col items-center w-full ">
            <Helmet>
                <title>Muestras</title>
            </Helmet>
            <div
                className={"flex md:w-7/12 w-full flex-col  md:px-16 mt-8 px-4 bg-white shadow-lg min-h-screen max-h-screen "}>
                <p className={"text-black text-2xl text-center my-4"}>SOLICITUD DE DESARROLLO DE MUESTRAS</p>
                <form className={"h-full overflow-y-scroll scrollbar-hide mb-5"}>
                    <div className={"flex flex-col gap-4 space-y-4 p-4"}>
                        {map(columns, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                   value={`${formik.values[column.name]}`}
                                   placeholder={column.title}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                        <div>
                            <p className={`${formik.errors.product ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Producto</p>
                            <textarea
                                className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                value={`${formik.values.product}`}
                                placeholder={"Producto"}
                                onChange={text => formik.setFieldValue('product', text.target.value)}/>
                        </div>
                        <div>
                            <p className={`${formik.errors.specifications ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Especificaciones</p>
                            <textarea
                                className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                value={`${formik.values.specifications}`}
                                placeholder={"Especificaciones"}
                                onChange={text => formik.setFieldValue('specifications', text.target.value)}/>
                        </div>

                        <div>
                            <p className={`${formik.errors.packaging_type ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800 "}`}>Empaque
                                final:</p>
                            <select onChange={(value) => formik.setFieldValue('packaging_type', value.target.value)}
                                    defaultValue={formik.values.packaging_type}
                                    className="scrollbar-hide mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                    aria-label="Default select example">
                                <option value="E">Sobre</option>
                                <option value="B">Caja</option>

                            </select>
                        </div>

                        <div>
                            <p className={`${formik.errors.market ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Mercado:</p>
                            <select onChange={(value) => formik.setFieldValue('market', value.target.value)}
                                    defaultValue={formik.values.market}
                                    className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                    aria-label="Default select example">
                                <option value="L">Local</option>
                                <option value="E">Exportación</option>

                            </select>
                        </div>

                        <div>
                            <p className={`${formik.errors.comments ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Comentarios</p>
                            <textarea
                                className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                value={`${formik.values.comments}`}
                                placeholder={"Comentarios"}
                                onChange={text => formik.setFieldValue('comments', text.target.value)}/>
                        </div>
                        <button type={'button'} onClick={formik.handleSubmit}
                                className={"bg-blue-500 bg-opacity-60 text-white rounded-lg px-4 py-2  w-max "}>Enviar
                        </button>
                    </div>


                </form>
            </div>
            <Footer/>
        </div>

    );
};

const initialValues = () => {
    return {
        delivery_date: '',
        applicant: '',
        code: '',
        client: '',
        product: '',
        specifications: '',
        analysis: '',
        delivery_address: '',
        delivery_address_final: '',
        client_data: '',
        packaging_type: 'E',
        market: 'L',
        price: 0,
        comments: '',
        courier: '',
        use: '',
    }

}
const newSchema = () => {
    return {
        delivery_date: Yup.date().required(),
        applicant: Yup.string().required(),
        code: Yup.string().required(),
        client: Yup.string().required(),
        product: Yup.string().required(),
        specifications: Yup.string().required(),
        analysis: Yup.string().required(),
        delivery_address: Yup.string().required(),
        delivery_address_final: Yup.string().required(),
        client_data: Yup.string().required(),
        packaging_type: Yup.string().required(),
        market: Yup.string().required(),
        price: Yup.number().required(),
        comments: Yup.string().required(),
        courier: Yup.string().required(),
        use: Yup.string().required(),
    }
}

export default Form;
