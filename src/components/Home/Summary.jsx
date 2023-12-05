import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {getDayOfYear} from 'date-fns';
import Humanize from 'humanize-plus';
import {get_products} from "../../redux/actions/collection";
import {useDispatch, useSelector} from "react-redux";
import {filter, map} from "lodash";
import {Link} from "react-router-dom";

const Summary = () => {

    const [day, setDay] = useState(0);
    const products = useSelector(state => state.Collection.products)
    const dispatch = useDispatch()

    useEffect(() => {
        setDay(getDayOfYear(new Date()));
        dispatch(get_products())
    }, []);

    return (<div className={"w-full flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0 justify-center"}>
            <div className="w-full p-2 lg:w-1/6 md:w-1/3  w-1/2">
                <div
                    className="flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                    <div className="flex flex-row justify-between items-center">
                        <div className="bg-gray-300  rounded-xl bg-opacity-30">
                            <FontAwesomeIcon icon={faClock} className="h-6 w-6 group-hover:text-gray-50 text-gray-700"/>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl xl:text-4xl font-bold text-gray-700  group-hover:text-gray-50">{day}</h1>
                    <div className="flex flex-row justify-center text-gray-700 group-hover:text-gray-200  ">
                        <h1 className="text-center">Dia del año</h1>
                    </div>
                </div>
            </div>
            {products && map(filter(products, {enable: true}), (item, index) => {
                return (<Link to={`/operations/records/${item?.name}`} className="w-full p-2 lg:w-1/6 md:w-1/3  w-1/2"
                              key={index}>
                    <div
                        className="flex flex-col p-4 text-center overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                        <div className="flex flex-row justify-between items-center">
                            <div className="bg-gray-300  rounded-xl bg-opacity-30">
                                {item?.thumbnail && <img src={process.env.REACT_APP_API_URL + item?.thumbnail} alt={''}
                                                         className="h-6 w-6 group-hover:text-gray-50"/>}
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-4xl font-bold text-gray-700  group-hover:text-gray-50">{Humanize.formatNumber(item?.stock, 2)}</h1>
                        <div className="flex flex-row justify-center text-gray-700 group-hover:text-gray-200  ">
                            <h1 className="text-center">{item?.name}</h1>
                        </div>
                    </div>
                </Link>)
            })}
        </div>

    );
};

export default Summary;
