import  { useState, useEffect, useContext } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const locales = {
    'en-US': enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar = () => {
    const { channels } = useContext(DashboardContext);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!channels) return;

        const calendarEvents = channels.flatMap(channel => {
            if (!channel.posts) return [];

            return channel.posts
                .filter(post => post.dueDate)
                .map(post => ({
                    id: post.postCode,
                    title: post.title,
                    start: new Date(`${post.dueDate}${post.dueTime ? 'T' + post.dueTime : 'T00:00:00'}`),
                    end: new Date(`${post.dueDate}${post.dueTime ? 'T' + post.dueTime : 'T23:59:59'}`),
                    description: post.content,
                    channel: channel.channelInfo.name,
                    type: post.type,
                    points: post.points,
                }));
        });

        setEvents(calendarEvents);
    }, [channels]);

    const EventComponent = ({ event }) => (
        <div className="p-1">
            <div className="font-semibold text-sm truncate">
                {event.title}
            </div>
            <div className="text-xs truncate">
                {event.channel}
            </div>
        </div>
    );

    EventComponent.propTypes = {
        event: PropTypes.shape({
            title: PropTypes.string.isRequired,
            channel: PropTypes.string.isRequired
        }).isRequired
    };

    const handleEventSelect = (event) => {
        const firstLetter = event.type.charAt(0).toLowerCase();
        const channelCode = channels.find(channel => 
            channel.posts?.some(post => post.postCode === event.id)
        )?.channelInfo.channelCode;

        if (channelCode) {
            navigate(`/dashboard/ch/${channelCode}/${firstLetter}/${event.id}`);
        }
    };

    return (
        <div className="h-full p-4 rounded-lg shadow-sm">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Calendar</h2>
                <p className="">View all your upcoming assignments and quizzes</p>
            </div>
            
            <div className="h-[calc(100vh-12rem)]">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    components={{
                        event: EventComponent
                    }}
                    onSelectEvent={handleEventSelect}
                    views={['month', 'week', 'day']}
                    defaultView='month'
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default Calendar;