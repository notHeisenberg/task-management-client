"use client"

import DashboardCard from "@/components/DashboardCard/DashboardCard";
import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext";
import { squircle } from "ldrs";
import { useContext } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

squircle.register()

const DashboardHome = () => {
    const { channels, isLoading, isError, setChannels } = useContext(DashboardContext);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = channels.findIndex((channel) => channel._id === active.id);
            const newIndex = channels.findIndex((channel) => channel._id === over.id);

            setChannels(arrayMove(channels, oldIndex, newIndex));
        }
    };

    const handleEdit = (channelId) => {
        console.log(`Edit channel: ${channelId}`);
    };

    const handleCopy = (channelId) => {
        console.log(`Copy channel: ${channelId}`);
    };

    const handleArchive = (channelId) => {
        console.log(`Archive channel: ${channelId}`);
    };

    return (
        <div className="p-5 h-screen overflow-hidden">
            {isLoading && (
                <div className="h-full flex justify-center items-center">
                    <div>
                        <l-squircle
                            size="37"
                            stroke="5"
                            stroke-length="0.15"
                            bg-opacity="0.1"
                            speed="0.9"
                            color="blue"
                        ></l-squircle>
                    </div>
                </div>
            )}
            {isError && <p>Error loading channels.</p>}
            
            {channels?.length > 0 && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={channels.map(channel => channel._id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 overflow-y-auto max-h-full">
                            {channels.map((channel) => (
                                <DashboardCard
                                    key={channel._id}
                                    id={channel._id}
                                    channel={channel}
                                    onEdit={() => handleEdit(channel._id)}
                                    onCopy={() => handleCopy(channel._id)}
                                    onArchive={() => handleArchive(channel._id)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
};

export default DashboardHome;