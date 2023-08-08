import React from 'react';
import {Helmet} from "react-helmet";
import Layout from "../../../hocs/Layout";
import Navbar from "../../../components/Planning/Navbar";


const Planning = ({children}) => {

    return (<Layout>
        <Helmet>
            <title>Planificación</title>
        </Helmet>
        <Navbar/>
        <div className={"w-full"}>
            <h1 className={"text-gray-400 text-center"}>
                {window.location.pathname === '/planning' &&
                    <>
                        <p>
                            ¡Bienvenido!
                        </p>
                        <p>Dirigir tu negocio es ahora mucho más fácil</p>
                    </>
                }
            </h1>
            {children}
        </div>
    </Layout>);
};


export default Planning;
