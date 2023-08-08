import React, {useEffect} from 'react';
import NavManufacturing from "../../../../components/Planning/Production/Nav";
import Planning from "../Home";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {useDispatch, useSelector} from "react-redux";
import {get_schedule_calendar} from "../../../../redux/actions/operations";
import {map} from "lodash";
import {Helmet} from "react-helmet";


const CalendarPlanning = () => {
    const dispatch = useDispatch();
    const payload = useSelector(state => state.Operations.calendar);

    useEffect(() => {
        dispatch(get_schedule_calendar())
    }, []);
    return (<Planning>
        <Helmet>
            <title>MPS</title>
        </Helmet>
        <NavManufacturing/>
        <div className={"w-full overflow-scroll scrollbar-hide  mt-4"}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                selectable={true}
                initialView="dayGridMonth"
                viewClassNames={"text-black bg-white"}
                headerToolbar={{center: "title", left: "prev", right: "next,today"}}
                dayHeaderClassNames={"text-xs p-2 text-gray-800"}
                titleFormat={{year: 'numeric', month: 'short'}}
                eventTextColor="#ffffff"
                buttonText={{today: "Hoy"}}
                dayCellClassNames={"text-xs px-2"}
                contentHeight={"480px"}
                allDayClassNames={"text-xs p-2"}

                events={payload && map(payload, (item) => {
                    return {
                        title: item.title,
                        date: item.date,
                        backgroundColor: item?.color,
                        borderColor: "transparent"
                    }
                })}
            />
        </div>

    </Planning>);
};

export default CalendarPlanning;
