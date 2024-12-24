import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { FaExpand } from 'react-icons/fa';
import { IoMdContract } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { IoArrowBack } from 'react-icons/io5';

const Whiteboard = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const navigate = useNavigate();

    const toggleFullscreen = () => {
        const whiteboardElement = document.getElementById('whiteboard-container');
        if (!document.fullscreenElement) {
            whiteboardElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleBack = () => {
        navigate('/dashboard/apps');
    };

    return (
        <div 
            className="flex flex-col h-full w-full"
            id="whiteboard-container"
        >
            <div className="absolute top-4 right-4 z-50 flex gap-2">
                {!isFullscreen && (
                    <ShinyButton
                        onClick={handleBack}
                        variant="ghost"
                        size="sm"
                        icon={<IoArrowBack />}
                        className="backdrop-blur-md"
                    />
                )}
                <ShinyButton
                    onClick={toggleFullscreen}
                    variant="ghost"
                    size="sm"
                    icon={isFullscreen ? <IoMdContract size={18} /> : <FaExpand size={16} />}
                    className="backdrop-blur-md"
                />
            </div>

            <div className={`flex-1 relative ${isFullscreen ? 'mt-0' : 'mb-16'}`}>
                <Tldraw
                    persistenceKey="user-whiteboard"
                    className="h-full w-full"
                    forceMobile
                />
            </div>
        </div>
    );
};

export default Whiteboard;