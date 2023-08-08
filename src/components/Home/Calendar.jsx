import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const Calendar = ({data}) => {
    const dispatch = useDispatch();
    const randomColor = () => {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    return (<FullCalendar
        plugins={[dayGridPlugin]}
        selectable={true}
        initialView="dayGridMonth"

        viewClassNames={" text-black w-full mx-auto rounded-xl p-4 h-full"}
        headerToolbar={{center: "title", left: "prev", right: "next,today",}}

        titleFormat={{year: 'numeric', month: 'short',}}

        eventTextColor="#ffffff"
        buttonText={{
            today: "Hoy",
        }}

        eventClassNames={"text-xs p-2 "}

        eventClick={function (info) {
            dispatch(setAlert(info.event.title + ": " + new Date(info.event.start).toLocaleDateString('es-PE', {
                year: 'numeric', month: 'long', day: 'numeric'
            }), "info"))
        }}

        events={data && map(data, (item) => {
            return {
                title: item.code, date: item.delivery_date, backgroundColor: randomColor(), borderColor: "transparent"
            }
        })}

    />);
};

export default Calendar;
