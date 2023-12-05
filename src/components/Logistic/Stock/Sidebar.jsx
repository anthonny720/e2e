import React from 'react';
import generateRandomColor from "../../util/colors";

const Sidebar = ({data}) => {
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
    return (<div
        className={"flex justify-between flex-col p-4 text-black text-md font-semi-bold overflow-x-scroll scrollbar-hide"}>
        <p>Lotes</p>
        {data && data.map((item, index) => {
            return (<div className="flex items-center border-b border-gray-200 py-6" key={item?.lot}>
                <RandomColoredText key={index} text={item?.category_name[0]}/>
                <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                        <p className="lg:text-xl text-sm font-medium leading-5 text-gray-800">{item?.lot}</p>
                        <p className="text-sm leading-normal pt-2 text-gray-500">{item?.stock}</p>
                    </div>
                </div>
            </div>)
        })}

    </div>);
};

export default Sidebar;
