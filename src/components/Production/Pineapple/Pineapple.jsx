import React from 'react';
import Tabs from "../Tabs";
import TableProduction from "./TableProcess";
import TablePacking from "./TablePacking";


const PineappleProcess = ({reference}) => {


    return (<>

        <div className={"relative"}>

            <Tabs table1={<TableProduction reference={reference}
            />}
                  table2={<TablePacking reference={reference}/>}/>
        </div>

    </>);
};


export default PineappleProcess;
