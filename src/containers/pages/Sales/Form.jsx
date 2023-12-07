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
        name: 'delivery_date', title: 'Fecha de envío (Tarma)', type: 'date', maxLength: 50,
    }, {name: 'code', title: 'Código', type: 'text', maxLength: 50,}, {
        name: 'client', title: 'Cliente', type: 'text', maxLength: 150,
    }, {
        name: 'delivery_address', title: 'Dirección de entrega', type: 'text', maxLength: 100,
    }, {
        name: 'delivery_address_final', title: 'Dirección de entrega final', type: 'text', maxLength: 100
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
                                placeholder={"MP/CONDICION/CORTE/CANTIDAD"}
                                rows={10}
                                onChange={text => formik.setFieldValue('product', text.target.value)}/>
                        </div>
                        <div>
                            <p className={`${formik.errors.specifications ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Especificaciones</p>
                            <textarea
                                className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                value={`${formik.values.specifications}`}
                                placeholder={"Categoría/Grosor/Medidas"}
                                onChange={text => formik.setFieldValue('specifications', text.target.value)}/>
                        </div>
                        <div>
                            <p className={`${formik.errors.country ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800 "}`}>País
                                destino: final:</p>
                            <select onChange={(value) => formik.setFieldValue('country', value.target.value)}
                                    defaultValue={formik.values.country}
                                    className="scrollbar-hide mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                    aria-label="Default select example">
                                <option value="AF">Afganistán</option>
                                <option value="AX">Islas Åland</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Argelia</option>
                                <option value="AS">Samoa Americana</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguila</option>
                                <option value="AQ">Antártida</option>
                                <option value="AG">Antigua y Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaiyán</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Baréin</option>
                                <option value="BD">Bangladés</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Bielorrusia</option>
                                <option value="BE">Bélgica</option>
                                <option value="BZ">Belice</option>
                                <option value="BJ">Benín</option>
                                <option value="BM">Bermudas</option>
                                <option value="BT">Bután</option>
                                <option value="BO">Bolivia (Estado Plurinacional de)</option>
                                <option value="BQ">Bonaire, San Eustaquio y Saba</option>
                                <option value="BA">Bosnia y Herzegovina</option>
                                <option value="BW">Botsuana</option>
                                <option value="BV">Isla Bouvet</option>
                                <option value="BR">Brasil</option>
                                <option value="IO">Territorio Británico del Océano Índico</option>
                                <option value="BN">Brunéi Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="CV">Cabo Verde</option>
                                <option value="KH">Camboya</option>
                                <option value="CM">Camerún</option>
                                <option value="CA">Canadá</option>
                                <option value="KY">Islas Caimán</option>
                                <option value="CF">República Centroafricana</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Isla de Navidad</option>
                                <option value="CC">Islas Cocos (Keeling)</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoras</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo (República Democrática del)</option>
                                <option value="CK">Islas Cook</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Costa de Marfil</option>
                                <option value="HR">Croacia</option>
                                <option value="CU">Cuba</option>
                                <option value="CW">Curazao</option>
                                <option value="CY">Chipre</option>
                                <option value="CZ">Chequia</option>
                                <option value="DK">Dinamarca</option>
                                <option value="DJ">Yibuti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">República Dominicana</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egipto</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Guinea Ecuatorial</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="SZ">Esuatini</option>
                                <option value="ET">Etiopía</option>
                                <option value="FK">Islas Malvinas (Falkland)</option>
                                <option value="FO">Islas Feroe</option>
                                <option value="FJ">Fiyi</option>
                                <option value="FI">Finlandia</option>
                                <option value="FR">Francia</option>
                                <option value="GF">Guayana Francesa</option>
                                <option value="PF">Polinesia Francesa</option>
                                <option value="TF">Territorios Franceses del Sur</option>
                                <option value="GA">Gabón</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Alemania</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Grecia</option>
                                <option value="GL">Groenlandia</option>
                                <option value="GD">Granada</option>
                                <option value="GP">Guadalupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GG">Guernsey</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bisáu</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haití</option>
                                <option value="HM">Islas Heard y McDonald</option>
                                <option value="VA">Santa Sede</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungría</option>
                                <option value="IS">Islandia</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Irán (República Islámica de)</option>
                                <option value="IQ">Irak</option>
                                <option value="IE">Irlanda</option>
                                <option value="IM">Isla de Man</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italia</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japón</option>
                                <option value="JE">Jersey</option>
                                <option value="JO">Jordania</option>
                                <option value="KZ">Kazajistán</option>
                                <option value="KE">Kenia</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Corea del Norte (República Popular Democrática de)</option>
                                <option value="KR">Corea del Sur (República de)</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kirguistán</option>
                                <option value="LA">Laos (República Democrática Popular)</option>
                                <option value="LV">Letonia</option>
                                <option value="LB">Líbano</option>
                                <option value="LS">Lesoto</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libia</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lituania</option>
                                <option value="LU">Luxemburgo</option>
                                <option value="MO">Macao</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malaui</option>
                                <option value="MY">Malasia</option>
                                <option value="MV">Maldivas</option>
                                <option value="ML">Malí</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Islas Marshall</option>
                                <option value="MQ">Martinica</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauricio</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">México</option>
                                <option value="FM">Micronesia (Estados Federados de)</option>
                                <option value="MD">Moldova (República de)</option>
                                <option value="MC">Mónaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Marruecos</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Países Bajos</option>
                                <option value="NC">Nueva Caledonia</option>
                                <option value="NZ">Nueva Zelanda</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Níger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Isla Norfolk</option>
                                <option value="MK">Macedonia del Norte (Antigua República Yugoslava de Macedonia)
                                </option>
                                <option value="MP">Islas Marianas del Norte</option>
                                <option value="NO">Noruega</option>
                                <option value="OM">Omán</option>
                                <option value="PK">Pakistán</option>
                                <option value="PW">Palaos</option>
                                <option value="PS">Palestina, Estado de</option>
                                <option value="PA">Panamá</option>
                                <option value="PG">Papúa Nueva Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Perú</option>
                                <option value="PH">Filipinas</option>
                                <option value="PN">Pitcairn</option>
                                <option value="PL">Polonia</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RE">Reunión</option>
                                <option value="RO">Rumania</option>
                                <option value="RU">Federación Rusa</option>
                                <option value="RW">Ruanda</option>
                                <option value="BL">San Bartolomé</option>
                                <option value="SH">Santa Elena, Ascensión y Tristán de Acuña</option>
                                <option value="KN">San Cristóbal y Nieves</option>
                                <option value="LC">Santa Lucía</option>
                                <option value="MF">San Martín (parte francesa)</option>
                                <option value="PM">San Pedro y Miquelón</option>
                                <option value="VC">San Vicente y las Granadinas</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Santo Tomé y Príncipe</option>
                                <option value="SA">Arabia Saudita</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leona</option>
                                <option value="SG">Singapur</option>
                                <option value="SX">Sint Maarten (parte holandesa)</option>
                                <option value="SK">Eslovaquia</option>
                                <option value="SI">Eslovenia</option>
                                <option value="SB">Islas Salomón</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">Sudáfrica</option>
                                <option value="GS">Islas Georgias del Sur y Sandwich del Sur</option>
                                <option value="SS">Sudán del Sur</option>
                                <option value="ES">España</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudán</option>
                                <option value="SR">Surinam</option>
                                <option value="SJ">Svalbard y Jan Mayen</option>
                                <option value="SE">Suecia</option>
                                <option value="CH">Suiza</option>
                                <option value="SY">República Árabe Siria</option>
                                <option value="TW">Taiwán (Provincia de China)</option>
                                <option value="TJ">Tayikistán</option>
                                <option value="TZ">República Unida de Tanzanía</option>
                                <option value="TH">Tailandia</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad y Tobago</option>
                                <option value="TN">Túnez</option>
                                <option value="TR">Turquía</option>
                                <option value="TM">Turkmenistán</option>
                                <option value="TC">Islas Turcas y Caicos</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ucrania</option>
                                <option value="AE">Emiratos Árabes Unidos</option>
                                <option value="GB">Reino Unido de Gran Bretaña e Irlanda del Norte</option>
                                <option value="UM">Islas Ultramarinas Menores de Estados Unidos</option>
                                <option value="US">Estados Unidos de América</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistán</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela (República Bolivariana de)</option>
                                <option value="VN">Viet Nam</option>
                                <option value="VG">Islas Vírgenes (Británicas)</option>
                                <option value="VI">Islas Vírgenes (Estados Unidos)</option>
                                <option value="WF">Wallis y Futuna</option>
                                <option value="EH">Sáhara Occidental</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabue</option>


                            </select>
                        </div>
                        <div>
                            <p className={`${formik.errors.client_data ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>Datos
                                de facturación:</p>
                            <textarea
                                className="mt-1 focus:ring-indigo-200 text-black p-2 font-light focus:border-indigo-200 block w-full shadow-sm sm:text-sm border-1 border-gray-300 rounded-md"
                                value={`${formik.values.client_data}`}
                                placeholder={"Datos de facturación"}
                                rows={5}
                                onChange={text => formik.setFieldValue('client_data', text.target.value)}/>
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
                                rows={5}
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
        code: '',
        client: '',
        product: '',
        specifications: '',

        delivery_address: '',
        delivery_address_final: '',
        client_data: 'Empresa: [nombre de la empresa]\n' + 'Dirección: [dirección]\n' + 'Contacto: [nombre del contacto]\n' + 'Correo: [correo electrónico]\n' + 'Teléfono: [número de teléfono]',
        packaging_type: 'E',

        comments: 'Uso previsto:\n' + 'Análisis requeridos:\n' + 'Precio de facturación:\n' + '',
        courier: '',
        country: 'PE',
    }

}
const newSchema = () => {
    return {
        delivery_date: Yup.date().required(),
        code: Yup.string().required(),
        client: Yup.string().required(),
        product: Yup.string().required(),
        specifications: Yup.string().required(),
        delivery_address: Yup.string().required(),
        delivery_address_final: Yup.string().required(),
        client_data: Yup.string().required(),
        packaging_type: Yup.string().required(),
        comments: Yup.string().required(),
        courier: Yup.string().required(),
        country: Yup.string().required(),
    }
}

export default Form;
