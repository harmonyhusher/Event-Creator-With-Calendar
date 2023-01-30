import {Calendar} from "antd";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import { IEvent } from './../models/Ievent';

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = (props) => {

  function dateCellRender(value: any) {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
    return (
        <div>
            {currentDayEvents.map((ev, index) =>
                <div key={index}>{ev.description}</div>
            )}
        </div>
    );
}
  return (
    <Calendar dateCellRender={dateCellRender}/>
  )
}

export default  EventCalendar