import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { useToast } from "@/hooks/use-toast";
import PropTypes from 'prop-types';

const ChannelSettingsModal = ({ isOpen, onClose, channel, refetch }) => {
    const [channelName, setChannelName] = useState(channel?.channelInfo?.name || "");
    const [courseID, setCourseID] = useState(channel?.channelInfo?.courseID || "");
    const [section, setSection] = useState(channel?.channelInfo?.section || "");
    const [roomID, setRoomID] = useState(channel?.channelInfo?.roomID || "");
    const [enableVideoCall, setEnableVideoCall] = useState(channel?.channelInfo?.enableVideoCall || false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axiosCommon.patch(`/channels/${channel?.channelInfo?.channelCode}/settings`, {
                name: channelName,
                courseID,
                section,
                roomID,
                enableVideoCall
            });
            
            toast({
                title: "Settings updated!",
                description: "Channel settings have been updated successfully.",
                status: "success",
            });
            
            refetch();
            onClose();
        } catch (error) {
            console.error("Error updating settings:", error);
            toast({
                title: "Error updating settings",
                description: "Failed to update channel settings. Please try again.",
                status: "error",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Channel Settings</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="channelName">Channel Name</Label>
                        <Input
                            id="channelName"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            placeholder="Enter channel name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="courseID">Course ID</Label>
                        <Input
                            id="courseID"
                            value={courseID}
                            onChange={(e) => setCourseID(e.target.value)}
                            placeholder="Enter course ID"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Input
                            id="section"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            placeholder="Enter section"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="roomID">Room ID</Label>
                        <Input
                            id="roomID"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            placeholder="Enter room ID"
                        />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="enableVideoCall"
                            checked={enableVideoCall}
                            onCheckedChange={setEnableVideoCall}
                        />
                        <Label htmlFor="enableVideoCall">Enable Video Call for this channel</Label>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

ChannelSettingsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    channel: PropTypes.shape({
        channelInfo: PropTypes.shape({
            name: PropTypes.string,
            courseID: PropTypes.string,
            section: PropTypes.string,
            roomID: PropTypes.string,
            channelCode: PropTypes.string,
            enableVideoCall: PropTypes.bool
        })
    })
};

export default ChannelSettingsModal; 