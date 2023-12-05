import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filter, map} from "lodash";
import {get_products} from "../../redux/actions/collection";

const Summary = ({onTableChange}) => {
    const products = useSelector(state => state.Collection.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_products())
    }, []);

    return (<div className="w-full mx-auto pt-6  ">
        <div
            className="flex flex-col lg:flex-row w-full space-y-2 lg:space-y-0 mb-2 lg:mb-4 flex-wrap gap-2 justify-center">
            {products && map(filter(products, {enable: true}), (product, index) => {
                return (<div key={index} className="w-full lg:w-1/4 cursor-pointer  " onClick={() => {
                    onTableChange(product?.name)
                }}>
                    <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-green-400 ">
                        <div className="flex items-center">
                            <div className="icon w-14 p-3.5 bg-green-400 bg-opacity-80 text-white rounded-full mr-3">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center text-gray-500 hover:text-black">
                                <div className="lg:text-lg md:text-md text-sm">{product?.name}</div>
                                <div className="text-sm text-gray-400">{product?.pending} lotes</div>
                            </div>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    </div>);
};

export default Summary;
