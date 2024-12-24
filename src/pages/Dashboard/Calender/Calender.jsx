import { useState, useEffect, useContext } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";

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
        <MagicCard className="p-2 rounded-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-1">
                <div className="font-medium text-sm truncate flex items-center gap-2">
                    {event.title}
                    {event.type && (
                        <Badge variant="outline" className="text-xs">
                            {event.type}
                        </Badge>
                    )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {event.channel}
                </div>
            </div>
        </MagicCard>
    );

    EventComponent.propTypes = {
        event: PropTypes.shape({
            title: PropTypes.string.isRequired,
            channel: PropTypes.string.isRequired,
            type: PropTypes.string
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
        <div className="h-full p-6 space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Calendar
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    View all your upcoming assignments and quizzes
                </p>
            </div>
            
            <div className="h-[calc(100vh-12rem)] rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
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
                    className="rounded-xl p-4"
                />
            </div>
        </div>
    );
};

export default Calendar;