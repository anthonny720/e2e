import React from 'react';
import {map, orderBy} from "lodash";
import generateRandomColor from "../util/colors";
import {TrashIcon} from "@heroicons/react/24/outline";

const TableUsers = ({data, update, remove}) => {

    const RandomColoredText = ({text}) => {
        const randomColor = generateRandomColor();
        const style = {
            backgroundColor: randomColor + '1A',
            color: randomColor,
            padding: '0.2rem 0.5rem',
            borderRadius: '0.5rem',
            textColor: 'black'
        };
        return <div style={style}
                    className={"w-12 h-12 rounded-full  flex items-center justify-center rounded-full "}>
            <p>{text}</p></div>;
    };


    const columns = ['Nombre', 'Area', 'Cargo', 'Operaciones']

    return (<div className="w-full">
        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white ">
                    <thead className="sticky top-0 bg-white ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  pr-6  text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && map(orderBy(data, ['first_name'], ['asc']), (value, index) => {
                        return (<tr className="h-10 border-gray-300  border-b  " key={index}>
                            <td className="text-sm  pr-6 whitespace-no-wrap text-gray-800 font-bold  leading-4 text-center flex gap-2 p-2 items-center justify-center">
                                <RandomColoredText text={value?.get_full_name?.[0]}/>
                                <div>
                                    <p className={"font-light"}>{value?.get_full_name}</p>
                                    <span className={"text-xs"}>{value?.email}</span>
                                </div>
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-normal   leading-4 text-center ">{value?.get_area_name}</td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-normal   leading-4 text-center ">{value?.get_role_name}</td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-normal   leading-4 text-center flex justify-center items-center gap-2">
                                <svg onClick={() => update(value)} xmlns="http://www.w3.org/2000/svg"
                                     className={"w-6 h-6 text-blue-500 cursor-pointer"} width={20}
                                     height={20}
                                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                                    <line x1={16} y1={5} x2={19} y2={8}/>
                                </svg>

                                <TrashIcon onClick={() => remove(value?.id)}
                                           className={"w-6 h-6 text-red-500 cursor-pointer"}/>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableUsers;
