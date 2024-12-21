import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Stream from "./ChannelComponents/Stream";
import Classwork from "./ChannelComponents/ClassWork";
import People from "./ChannelComponents/People";
import { useContext, useState } from "react";
import { ChannelProvider } from "@/providers/ChannelProvider/ChannelProvider";
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, SettingsIcon, VideoIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { DotPattern } from '@/components/ui/dot-pattern';
import ChannelSettingsModal from '@/components/modals/ChannelSettingsModal';


const Channel = () => {
    return (
        <ChannelProvider>
            <div className="relative h-screen">
                <DotPattern
                    width={16}
                    height={16}
                    cx={1}
                    cy={1}
                    cr={1}
                    className="absolute inset-0 opacity-30"
                />
                <div className="relative z-10">
                    <ChannelContent />
                </div>
            </div>
        </ChannelProvider>
    );
};

const ChannelContent = () => {
    const { channel, isLoading, isError, refetch } = useContext(ChannelContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !channel) {
        return <div>Error fetching channel. Please check the code or try again.</div>;
    }

    const isOwner = user.email === channel.channelInfo.creatorUserEmail;

    const handleCalendarClick = () => {
        navigate("/dashboard/calendar");
    };

    const handleMeetClick = () => {
        // Replace with your MeetUp application URL
        const meetupUrl = `https://meetup-your-domain.com/room/${channel?.channelInfo?.channelCode}`;
        window.open(meetupUrl, '_blank');
    };

    return (
        <div className="relative h-full flex flex-col pb-24">
            <Tabs defaultValue="stream" className="flex flex-col h-full">
                <div className="sticky top-0 z-10 pt-4 px-5 flex items-center justify-between">
                    <TabsList className="h-12 flex items-center justify-start px-4">
                        <TabsTrigger value="stream">Stream</TabsTrigger>
                        <TabsTrigger value="classwork">Classwork</TabsTrigger>
                        <TabsTrigger value="people">People</TabsTrigger>
                    </TabsList>
                    <div className="flex flex-wrap items-center gap-3">
                        {isOwner ? (
                            <>
                                <CalendarIcon className="cursor-pointer" onClick={handleCalendarClick} />
                                <SettingsIcon
                                    className="cursor-pointer"
                                    onClick={() => setIsSettingsOpen(true)}
                                />
                            </>
                        ) : (
                            <>
                                <CalendarIcon className="cursor-pointer" onClick={handleCalendarClick} />
                                <VideoIcon className="cursor-pointer" onClick={handleMeetClick} />
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-5">
                    <TabsContent value="stream">
                        <Stream />
                    </TabsContent>
                    <TabsContent value="classwork">
                        <Classwork />
                    </TabsContent>
                    <TabsContent value="people">
                        <People />
                    </TabsContent>
                </div>
            </Tabs>

            <ChannelSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                channel={channel}
                refetch={refetch}
            />
        </div>
    );
};

export default Channel;