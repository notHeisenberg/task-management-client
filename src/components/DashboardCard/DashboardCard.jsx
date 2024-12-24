import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from "lucide-react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const DashboardCard = ({ id, channel, onEdit, onCopy, onArchive }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        transition: {
            duration: 200,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.9 : 1,
    };

    const handleClick = (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative group"
        >
            {/* Drag handle - Now only in top-left corner */}
            <div 
                {...attributes} 
                {...listeners} 
                className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center cursor-move z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                <GripVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
            
            {/* Card Content */}
            <NavLink 
                to={`/dashboard/ch/${channel?.channelInfo?.channelCode}`}
                onClick={handleClick}
                className="block relative"
            >
                <div className="group/card relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl p-0.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover/card:opacity-20 transition-opacity duration-300" />
                    
                    {/* Card Inner Content */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 transition-transform duration-300">
                        {/* Channel Image */}
                        <div className="relative h-48 rounded-lg overflow-hidden mb-4 border border-gray-100 dark:border-gray-700">
                            <div
                                style={{
                                    backgroundImage: "url('https://i.ibb.co.com/hgf6crv/education.jpg')",
                                }}
                                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover/card:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Channel Info */}
                        <div className="flex gap-4 items-start p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                            {/* Teacher Avatar */}
                            <div className="flex-shrink-0">
                                {channel?.teachers?.map((teacher, index) => (
                                    <img
                                        key={index}
                                        src={teacher?.image}
                                        alt={teacher?.name}
                                        className="h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-700 shadow-lg border-2 border-gray-50 dark:border-gray-600"
                                    />
                                )) || (
                                    <img
                                        src="https://i.ibb.co.com/VD1BYW6/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg"
                                        alt="Default teacher"
                                        className="h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-700 shadow-lg border-2 border-gray-50 dark:border-gray-600"
                                    />
                                )}
                            </div>

                            {/* Channel Details */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                                    {channel?.channelInfo?.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    {channel?.channelInfo?.courseID}
                                </p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {channel?.teachers?.map((teacher, index) => (
                                        <p key={index} className="line-clamp-1">{teacher?.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hover Indicator - More visible in light mode */}
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-200 transform group-hover/card:translate-x-0 translate-x-2">
                            Click to view →
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

DashboardCard.propTypes = {
    id: PropTypes.string.isRequired,
    channel: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default DashboardCard;