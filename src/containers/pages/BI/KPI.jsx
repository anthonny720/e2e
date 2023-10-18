import React from 'react';
import Layout from "../../../hocs/Layout";
import {Helmet} from "react-helmet";


const KPI = () => {


    return (<Layout>
        <Helmet>
            <title>KPI</title>
        </Helmet>

        <div className={"flex gap-4 w-full flex-col  md:flex-col   md:px-16 mt-8 px-4"}>
            <div className={"bg-white w-full rounded-lg p-4 mt-2 relative"}>
                <h1 className={"text-black font-bold text-start  pt-4 text-xl md:text-2xl "}>KPI</h1>
                <iframe title="Greenbox" width="100%" height="630" src="https://app.powerbi.com/reportEmbed?reportId=a3acaffa-061a-426c-aec4-44e6e63d731b&autoAuth=true&ctid=6c52845c-0b26-4ce8-b0aa-c65bd25bee29" frameBorder="0" allowFullScreen="true"></iframe>
            </div>
        </div>


    </Layout>);
};

export default KPI;
