import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {add_user, update_user} from "../../redux/actions/auth";
import {map} from "lodash";


const Form = ({close, data}) => {
    const dispatch = useDispatch();
    const columns = [{name: 'email', title: 'Email', type: 'email', maxLength: 50,}, {
        name: 'first_name', title: 'Nombre', type: 'text', maxLength: 50,
    }, {name: 'last_name', title: 'Apellidos', type: 'text', maxLength: 50,}, {
        name: 'password', title: 'Contraseña', type: 'password', maxLength: 20,
    }]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_user(form, data.id), close()) : dispatch(add_user(form), close())
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        {map(columns, (column, index) => (<div key={index}>
            <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
            <input type={column.type} maxLength={column.maxLength}
                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                   value={`${formik.values[column.name]}`}
                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
        </div>))}
        <div>
            <p className="text-[10px]  font-extralight leading-none text-blue-400 mt-2">Area:</p>
            <select onChange={(value) => formik.setFieldValue('area', value.target.value)}
                    value={formik.values.area} className="mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value="GERENCIA">Gerencia</option>
                <option value="ADMINISTRACION">Administración</option>
                <option value="GESTION_HUMANA">Gestión Humana</option>
                <option value="LOGISTICA">Logística</option>
                <option value="SEGURIDAD_INDUSTRIAL">Seguridad Industrial</option>
                <option value="COMERCIAL">Comercial</option>
                <option value="OPERACIONES">Operaciones</option>
                <option value="CALIDAD">Calidad</option>
                <option value="MANTENIMIENTO">Mantenimiento</option>
                <option value="PRODUCCION">Producción</option>
                <option value="SUMINISTRO_AGRICOLA">Suministro Agrícola</option>
                <option value="PLANEAMIENTO_Y_PROYECTOS">Planeamiento y Proyectos</option>

            </select>
        </div>
        <div>
            <p className="text-[10px]  font-extralight leading-none text-blue-400 mt-2">Cargo:</p>
            <select onChange={(value) => formik.setFieldValue('role', value.target.value)}
                    value={formik.values.role} className="mt-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300       rounded transition       ease-in-out
                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                <option value="Director">Director</option>
                <option value="Gerente_General">Gerente General</option>
                <option value="Gerente_Administacion_Finanzas">Gerente Administración y Finanzas</option>
                <option value="Jefe_Administracion">Jefe Administración</option>
                <option value="Asistente_Administracion">Asistente Administración</option>
                <option value="Asistente_Tesoreria">Asistente Tesorería</option>
                <option value="Encargado_Logistica_Compras">Encargado Logística y Compras</option>
                <option value="Operario_Logistica_MP">Operario Logística MP</option>
                <option value="Operario_Logistica_Almacen">'Operario Logística Almacén</option>
                <option value="Asistente_Logistica">Asistente Logística</option>
                <option value="Asistente_Compras">Asistente Compras</option>
                <option value="Encargado_Seguridad_Industrial">Encargado Seguridad Industrial</option>
                <option value="Agente_Seguridad_Industrial">Agente Seguridad Industrial</option>
                <option value="Asistente_Seguridad_Industrial">Asistente Seguridad Industrial</option>
                <option value="Gerente_Comercial">Gerente Comercial</option>
                <option value="Jefe_Ventas_Marketing">Jefe Ventas y Marketing</option>
                <option value="Ejecutivo_Regional">Ejecutivo Regional</option>
                <option value="Analista_Inteligencia_Comercial">Analista Inteligencia Comercial</option>
                <option value="Encargado_Unidad_Operaciones">Encargado de la Unidad de Operaciones</option>
                <option value="Encargada_Calidad">Encargada de Calidad</option>
                <option value="Supervisor_Calidad_Campo">Supervisor de Calidad de Campo</option>
                <option value="Analista_Control_Calidad">Analista de Control de Calidad</option>
                <option value="Encargado_Certificaciones">Encargado de Certificaciones</option>
                <option value="Asistentes_Certificaciones">Asistentes de Certificaciones</option>
                <option value="Operario_Gestion_Ambiental">Operario de Gestión Ambiental</option>
                <option value="Jefe_Mantenimiento">Jefe de Mantenimiento</option>
                <option value="Técnico_Mantenimiento">Técnico de Mantenimiento</option>
                <option value="Operario_Mantenimiento">Operario de Mantenimiento</option>
                <option value="Jefe_Produccion">Jefe de Producción</option>
                <option value="Supervisor_Investigacion_Desarrollo">Supervisor de Investigación y Desarrollo</option>
                <option value="Asistente_Investigacion_Desarrollo">Asistente de Investigación y Desarrollo</option>
                <option value="Supervisor_Produccion">Supervisor de Producción</option>
                <option value="Controller_Produccion">Controller de Producción</option>
                <option value="Jefe_Planta_Norte">Jefe de Planta Norte</option>
                <option value="Jefe_Suministro_Agricola">Jefe de Suministro Agrícola</option>
                <option value="Supervisor_Acopio">Supervisor de Acopio</option>
                <option value="Asistente_Acopio">Asistente de Acopio</option>
                <option value="Jefe_Planeamiento_Proyectos">Jefe de Planeamiento y Proyectos</option>
                <option value="Planner_Mantenimiento">Planner de Mantenimiento</option>
                <option value="Planner_Logistica">Planner de Logística</option>
                <option value="Planner_Produccion">Planner de Producción</option>
                <option value="Oficial_Jr_TI">Oficial Jr. de TI</option>
                <option value="Analitico_Data">Analítico de Data</option>


            </select>
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>);
};


const initialValues = (data) => {
    return {
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        password: "",
        area: data?.area || 'GERENCIA',
        role: data?.role || "Director",
    }
}
const newSchema = (data) => {
    return {
        email: Yup.string().email().required(true),
        first_name: Yup.string().required(true),
        last_name: Yup.string().required(true),
        password: data ? Yup.string().min(8) : Yup.string().min(8).required(true),
        area: Yup.string().required(true),
        role: Yup.string().required(true),
    }
}


export default Form;
