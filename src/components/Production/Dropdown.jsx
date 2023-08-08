import {Popover, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWorm} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";

export default function Dropdown({setSelect}) {
    const products = useSelector(state => state.Collection.products)

    return (<div className="relative w-full max-w-sm px-4">
            <Popover className="relative">
                {({open}) => (<>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2  rounded-xl bg-green-500  px-3  text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <p className={"font-normal text-[10px] uppercase"}>▼</p>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 w-max  transform  sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid  bg-white   ">


                                        {products && map(products, (product, index) => {
                                            return (<button key={index}
                                                    onClick={() => setSelect(product?.name)}
                                                    className="space-x-4 p-2  text-xs flex items-center py-2  justify-start font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"
                                                >

                                                    <FontAwesomeIcon className={"text-green-400 bg-white rounded-full"}
                                                                     size={"1x"} icon={faWorm}/>

                                                    <div className={"flex flex-col justify-start"}>
                                                        <p className={"text-black font-normal"}>{product?.name}</p>
                                                    </div>

                                                </button>)

                                        })}

                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>)}
            </Popover>
        </div>)


}

