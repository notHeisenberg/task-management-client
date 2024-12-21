import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaClipboardUser } from "react-icons/fa6";
import { MdFolderOpen } from "react-icons/md";
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
            className="relative"
        >
            {/* Drag handle with listeners */}
            <div {...attributes} {...listeners} className="absolute inset-0 cursor-move" />
            
            {/* Clickable content */}
            <NavLink 
                to={`/dashboard/ch/${channel?.channelInfo?.channelCode}`}
                onClick={handleClick}
                className="block relative z-10"
            >
                <div className="group relative overflow-hidden rounded-lg bg-white p-1">
                    {/* Magic UI shine border pattern */}
                    <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0 blur-xl transition duration-500 group-hover:opacity-75" />

                    <div className="relative z-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {/* Top buttons */}
                        <div className="absolute top-4 right-4 flex gap-3 text-white text-2xl z-20">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onEdit();
                                }} 
                                className="focus:outline-none hover:scale-110 transition-transform"
                            >
                                <FaClipboardUser />
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onCopy();
                                }} 
                                className="focus:outline-none hover:scale-110 transition-transform"
                            >
                                <MdFolderOpen />
                            </button>
                        </div>

                        <div className="h-60 rounded-t-lg overflow-hidden">
                            <div
                                style={{
                                    backgroundImage: "url('https://i.ibb.co.com/hgf6crv/education.jpg')",
                                }}
                                className="h-60 bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
                            ></div>
                        </div>

                        <div className="flex gap-2 py-3 px-2 items-center">
                            <div>
                                {channel?.teachers?.map((teacher, index) => (
                                    <img
                                        key={index}
                                        src={teacher?.image}
                                        alt=""
                                        className="h-20 w-20 rounded-full"
                                    />
                                )) || (
                                    <img
                                        src="https://i.ibb.co.com/VD1BYW6/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg"
                                        alt=""
                                        className="h-20 w-20 rounded-full"
                                    />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-[#000000]">
                                    {channel?.channelInfo?.name}
                                </h1>
                                <h1 className="text-[#201f1fc1]">{channel?.channelInfo?.courseID}</h1>
                                <h1 className="text-[#201f1fc1]">
                                    {channel?.teachers?.map((teacher, index) => (
                                        <p key={index}>{teacher?.name}</p>
                                    ))}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

DashboardCard.propTypes = {
    id: PropTypes.string.isRequired,
    channel: PropTypes.shape({
        channelInfo: PropTypes.shape({
            channelCode: PropTypes.string,
            name: PropTypes.string,
            courseID: PropTypes.string
        }),
        teachers: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string
        }))
    }),
    onEdit: PropTypes.func,
    onCopy: PropTypes.func,
    onArchive: PropTypes.func
};

export default DashboardCard;