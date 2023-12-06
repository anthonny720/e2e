import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {map} from "lodash";
import {get_products} from "../../redux/actions/collection";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";

const Summary = ({onTableChange,selected}) => {
    const products = useSelector(state => state.Collection.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_products())
    }, []);

    return (<div className="w-full mx-auto pt-6 ">
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    {selected}
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5 text-green-200 hover:text-green-100"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute left-0 mt-2 w-56 z-20   origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        {products && map(products, (product, index) => {
                            return <Menu.Item key={index}>
                                {({active}) => (<button
                                        onClick={() => onTableChange(product.name)}
                                        className={`${active ? 'bg-green-300 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (<p>{product.name}</p>) : (<p>{product.name}</p>)}
                                    </button>)}
                            </Menu.Item>
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    </div>);
};

export default Summary;
