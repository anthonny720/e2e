import React from 'react';
import {map} from "lodash";
import generateRandomColor from "../../util/colors";
import {TrashIcon} from "@heroicons/react/24/outline";

const TableMotions = ({data, remove}) => {


    const RandomColoredText = ({text}) => {
        const randomColor = generateRandomColor();
        const style = {
            backgroundColor: randomColor + '1A',
            color: randomColor,
            padding: '0.5rem',
            borderRadius: '0.5rem',
            textColor: 'black',
            marginVertical: '0.5rem',
        };
        return <p style={style}>{text}</p>;
    };


    const columns = ['Fecha', 'Origen - Destino', 'Cantidad', 'Descripción', 'Operaciones']

    return (<div className="w-full">

        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white ">
                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  px-6 text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && map(data, (item, index) => {
                        return (<tr key={index}
                                    className="h-14 sm:h-8 border-gray-300  border-b items-center ">

                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">{new Date(item?.date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                                year: "numeric", month: "short", day: "numeric"
                            })}</td>
                            <td className="text-sm px-6 py-2 whitespace-no-wrap text-gray-800 font-bold   leading-4 text-center ">
                                <RandomColoredText text={`${item?.origin_name}  ➼ ${item?.destination_name}`}/>
                            </td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">{item?.quantity}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">{item?.description}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">
                                <TrashIcon className="w-6 text-red-400 cursor-pointer ml-4  md:mt-0"
                                           onClick={() => remove(item?.id)}/>
                            </td>

                        </tr>)
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableMotions;
