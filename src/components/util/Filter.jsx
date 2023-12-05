import React, {useState} from 'react';
import {enGB} from 'date-fns/locale'
import 'react-nice-dates/build/style.css'
import {DateRangePicker} from "react-nice-dates";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

const Filter = ({action}) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    return (<DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumLength={1}
        format='yyyy-MM-dd'
        locale={enGB}

    >
        {({startDateInputProps, endDateInputProps, focus}) => (<div
            className='date-range text-gray-400 w-full md:w-max   rounded-lg flex  space-x-1 items-center sm:flex-row flex-col space-y-1 mt-2 '>
            <input
                className={'text-black w-full focus:border-blue-300 p-3 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "START_DATE" ? ' -focused' : '')}
                {...startDateInputProps}
                placeholder='Fecha de inicio'
            />
            <span className='date-range_arrow'/>
            <input
                className={'text-black w-full focus:border-blue-300 p-3  border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "END_DATE" ? ' -focused' : '')}
                {...endDateInputProps}
                placeholder='Fecha de fin'
            />
            <PaperAirplaneIcon onClick={() => action({startDate, endDate})}
                               className={'sm:h-12 sm:w-12 h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer'}/>
        </div>)}
    </DateRangePicker>);
};

export default Filter;
