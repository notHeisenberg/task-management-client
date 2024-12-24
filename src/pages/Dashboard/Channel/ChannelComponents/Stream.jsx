import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, SendHorizonal, Settings, UsersIcon, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { BsThreeDotsVertical } from "react-icons/bs";
import settingsLogo from "../../../../assets/settings.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MeetUpLogo from "@/assets/MeetUpLogo.png";

const Stream = () => {
    const { channel, refetch } = useContext(ChannelContext);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const { toast } = useToast();
    const { user } = useAuth();
    const [expandedComments, setExpandedComments] = useState({}); 
    const [commentText, setCommentText] = useState({}); 

    const copyChannelCode = () => {
        if (channel?.channelInfo?.channelCode) {
            navigator.clipboard.writeText(channel.channelInfo.channelCode);
            toast({
                title: "Channel code copied!",
                description: "You can now share this code with others.",
                status: "success",
            });
        } else {
            toast({
                title: "Channel code not available!",
                description: "Please try again later.",
                status: "error",
            });
        }
    };

    const copyPostCode = (channelCode, postCode) => {
        navigator.clipboard.writeText(`${window.location.origin}/dashboard/ch/${channelCode}/p/${postCode}`)
        toast({
            title: "Link copied!",
            description: "You can now share this link with others.",
            status: "success",
        });
    };

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handlePostAnnouncement = async () => {
        if (newAnnouncement.trim()) {
            const post = {
                type: "announcement",
                content: newAnnouncement,
                timestamp: new Date().toISOString(),
                author: {
                    name: user?.displayName,
                    image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                },
                attachments: [],
                postCode: generateRandomCode(),
                channelCode: channel.channelInfo.channelCode || "N/A",
                comments: [],
            };

            try {
                await axiosCommon.post(`/channels/${channel.channelInfo.channelCode}/posts`, post);
                toast({
                    title: "Post created!",
                    description: "Your announcement was successfully posted.",
                    status: "success",
                });
                refetch();
                setNewAnnouncement("");
            } catch {
                toast({
                    title: "Failed to post!",
                    description: "Something went wrong while posting your announcement.",
                    status: "error",
                });
            }
        } else {
            alert("Please enter a valid announcement.");
        }
    };

    const toggleComments = (index) => {
        setExpandedComments((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleCommentChange = (index, value) => {
        setCommentText((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

    const handleAddComment = async (index) => {
        const comment = commentText[index]?.trim();
        if (!comment) {
            return toast({
                title: "Comment cannot be empty!",
                status: "error",
            });
        }

        const post = channel.posts[index];

        try {
            await axiosCommon.post(
                `/channels/${channel.channelInfo.channelCode}/posts/${post.postCode}/comments`,
                {
                    author: user?.displayName,
                    image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                    content: comment,
                }
            );
            toast({
                title: "Comment added!",
                description: "Your comment was successfully posted.",
                status: "success",
            });
            refetch();
            handleCommentChange(index, ""); // Clear the input field for this post
        } catch (error) {
            console.error("Error adding comment:", error);
            toast({
                title: "Failed to add comment!",
                description: "Something went wrong while adding your comment.",
                status: "error",
            });
        }
    };

    const handleJoinMeet = () => {
        const meetupUrl = `https://meetup-d48c4.web.app/room/${channel?.channelInfo?.channelCode}`;
        window.open(meetupUrl, '_blank');
    };

    if (!channel) {
        return <div>No stream data available.</div>;
    }

    return (
        <>
            {/* Hero Banner */}
            <Card className="relative mb-8 overflow-hidden border-none">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://www.gstatic.com/classroom/themes/img_code.jpg')`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 dark:from-blue-900/90 dark:to-purple-900/90" />
                <CardHeader className="relative z-10">
                    <CardTitle className="text-4xl font-bold text-white">
                        {channel.channelInfo.name || "Channel Page"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                    {channel.channelInfo.section && (
                        <p className="text-white/90 text-lg font-medium">
                            {channel.channelInfo.section}
                        </p>
                    )}
                    {channel.channelInfo.courseID && (
                        <p className="text-white/90 text-lg font-medium">
                            {channel.channelInfo.courseID}
                        </p>
                    )}
                    {channel.channelInfo.roomID && (
                        <p className="text-white/90 text-lg font-medium">
                            Room: {channel.channelInfo.roomID}
                        </p>
                    )}
                </CardContent>
            </Card>

            <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-5">
                {/* Channel Info Cards */}
                <div className="flex flex-col gap-4 w-full md:w-72">
                    {/* Channel Code Card */}
                    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Channel Code
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="font-mono font-semibold text-2xl text-gray-700 dark:text-gray-200">
                                    {channel.channelInfo?.channelCode || "N/A"}
                                </span>
                                <Button 
                                    onClick={copyChannelCode} 
                                    variant="ghost" 
                                    className="hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Video Call Card */}
                    {channel.channelInfo?.enableVideoCall && (
                        <Card className="overflow-hidden">
                            <div className="relative p-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-blue-200 dark:from-violet-950 dark:to-blue-900" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-xl shadow-lg">
                                                <img
                                                    src={MeetUpLogo}
                                                    alt="MeetUp"
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                                                    MeetUp Video Call
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Join live video discussion
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleJoinMeet}
                                            className="bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 gap-2"
                                        >
                                            <Video className="w-4 h-4" />
                                            Join
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {/* Post Announcement Card */}
                    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Share with your class
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <img
                                    src={user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400"}
                                    alt="Your profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <Textarea
                                        value={newAnnouncement}
                                        onChange={(e) => setNewAnnouncement(e.target.value)}
                                        placeholder="Share an announcement with your class..."
                                        className="min-h-[100px] resize-none mb-4"
                                    />
                                    <div className="flex justify-end">
                                        <Button 
                                            onClick={handlePostAnnouncement}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts Section */}
                    {channel.posts?.map((post, index) => (
                        <Card key={post.postCode} className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <CardHeader className="relative">
                                {/* Author Info */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={post.author?.image}
                                            alt={post.author?.name}
                                            className="w-12 h-12 rounded-full border-2 border-gray-100 dark:border-gray-700 shadow-md"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {post.author?.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(post.timestamp).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Post Actions */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            onClick={() => copyPostCode(channel.channelInfo.channelCode, post.postCode)}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Share
                                        </Button>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="mt-4 text-gray-700 dark:text-gray-300">
                                    <p className="whitespace-pre-wrap">{post.content}</p>
                                </div>
                            </CardHeader>

                            {/* Comments Section */}
                            <CardContent>
                                <div className="mt-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleComments(index)}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {expandedComments[index] ? 'Hide' : 'Show'} Comments ({post.comments?.length || 0})
                                    </Button>

                                    {/* Comments List */}
                                    {expandedComments[index] && (
                                        <div className="mt-4 space-y-4">
                                            {post.comments?.map((comment, commentIndex) => (
                                                <div
                                                    key={commentIndex}
                                                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                                >
                                                    <img
                                                        src={comment.image}
                                                        alt={comment.author}
                                                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {comment.author}
                                                        </h4>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                            {comment.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add Comment */}
                                            <div className="flex gap-3 mt-4">
                                                <img
                                                    src={user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400"}
                                                    alt="Your profile"
                                                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
                                                />
                                                <div className="flex-1">
                                                    <Textarea
                                                        value={commentText[index] || ''}
                                                        onChange={(e) => handleCommentChange(index, e.target.value)}
                                                        placeholder="Add a comment..."
                                                        className="min-h-[60px] resize-none text-sm"
                                                    />
                                                    <div className="flex justify-end mt-2">
                                                        <Button
                                                            onClick={() => handleAddComment(index)}
                                                            size="sm"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                                        >
                                                            <SendHorizonal className="w-4 h-4 mr-2" />
                                                            Comment
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Stream;