import React from 'react';
import {useSelector} from "react-redux";
import {map} from "lodash";

const Summary = () => {
    const locations = useSelector(state => state.Management.locations)


    return (<div className="flex  pb-3 p-4 justify-center gap-2 w-full flex-row flex-wrap">
        {map(locations, (value, index) => {
            return (<div key={index}
                className="  lg:w-1/3  xl:w-1/4  w-full sm:w-5/12  rounded-sm shadow-lg bg-white overflow-scroll scrollbar-hide">
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center justify-between px-4 py-4">
                        <div className="flex mr-4">
                            <span
                                className="items-center px-4 py-4 m-auto bg-green-200 rounded-full hover:bg-green-300 flex justify-center">
                              <h1 className={"text-green-500 hover:text-green-600 w-8 h-8 text-center text-2xl"}>{value?.name[0]}</h1>
                            </span>
                        </div>
                        <div className="flex-1 pl-1">
                            <div className="text-xl font-medium text-gray-600 w-max">{value?.stock}
                                <div className="h-2 bg-green-500 rounded-md hover:bg-green-600 w-full"></div>
                            </div>

                            <div className="text-sm text-gray-400 sm:text-base md:text-xs lg:text-base">
                                {value?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        })}

    </div>);
};

export default Summary;
