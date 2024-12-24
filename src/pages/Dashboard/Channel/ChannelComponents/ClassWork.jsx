import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ClassworkModal from "@/components/modals/ClassWorkModal";
import CreateDropdown from "@/components/DropdownDemo/CreateDropdown";
import placeholder_dog from "@/assets/dog-computor.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdOutlineAssignment, MdOutlineBook, MdOutlineQuiz } from "react-icons/md";
import { FileQuestion } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { BsThreeDotsVertical } from "react-icons/bs";

const typeIcons = {
    assignment: MdOutlineAssignment,
    quiz: MdOutlineQuiz,
    material: MdOutlineBook,
    poll: FileQuestion,
};

const Classwork = () => {
    const { channel, isLoading, isError, refetch } = useContext(ChannelContext);
    const { user } = useAuth();
    const isCreator = channel?.channelInfo?.creatorUserEmail === user?.email;
    const { toast } = useToast();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState("");
    const [topics, setTopics] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("All Topics");
    const [expandedCards, setExpandedCards] = useState({}); // Tracks expanded cards

    useEffect(() => {
        if (channel) {
            const topicsFromPosts = channel.posts?.filter((post) => post.type === "topic").map((post) => post.name);
            setTopics(topicsFromPosts);

            const validPosts = channel.posts?.filter((post) => post.type !== "topic" && post.type !== "announcement")
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp in descending order
            setFilteredPosts(validPosts);
        }
    }, [channel]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching classwork. Please try again.</div>;

    const openDialog = (type) => {
        setDialogType(type);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setDialogType("");
        setShowDialog(false);
    };

    const addPostOrTopic = async (postData) => {
        if (postData.type === "topic") {
            setTopics((prev) => [...prev, postData.name]);
        } else {
            setFilteredPosts((prev) => [...prev, postData]);
        }

        try {
            await axiosCommon.post(`/channels/${channel.channelInfo.channelCode}/posts`, postData);
            toast({
                title: "Success",
                description: `Your ${postData.type} has been posted successfully!`,
                status: "success",
            });
            refetch();
        } catch {
            toast({
                title: "Error",
                description: "Failed to post. Please try again later.",
                status: "error",
            });
        }
        closeDialog();
    };

    const getPostsByTopic = (topic) => filteredPosts?.filter((post) => post.topic === topic);
    const uncategorizedPosts = filteredPosts?.filter((post) => post.topic === "No Topic");

    const toggleCard = (postCode) => {
        setExpandedCards((prev) => ({
            ...prev,
            [postCode]: !prev[postCode], // Toggle the specific card
        }));
    };

    const handleViewInstruction = (type, postCode) => {
        const firstLetter = type.charAt(0).toLowerCase();
        navigate(`/dashboard/ch/${channel.channelInfo.channelCode}/${firstLetter}/${postCode}`);
    };

    const copyPostCode = (channelCode, postCode, type) => {
        const firstLetter = type.charAt(0).toLowerCase();
        navigator.clipboard.writeText(`${window.location.origin}/dashboard/ch/${channelCode}/${firstLetter}/${postCode}`)
        toast({
            title: "Link copied!",
            description: "You can now share this link with others.",
            status: "success",
        });
    };
// console.log(channel)
    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 space-y-8">
            {isCreator && (
                <div className="flex items-center justify-between mb-8">
                    <CreateDropdown onOpenDialog={openDialog} />
                </div>
            )}

            {!filteredPosts?.length && !topics?.length ? (
                <div className="flex flex-col items-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                    <img src={placeholder_dog} alt="Placeholder" className="w-48 h-auto mb-6 animate-bounce" />
                    <h1 className="font-semibold text-xl mb-2">This is where you'll assign work</h1>
                    <p className="text-center text-base text-gray-600 dark:text-gray-300 max-w-md">
                        {isCreator
                            ? "You can add assignments and other work for the class, then organize it into topics."
                            : "Please check back later for assignments and materials."}
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                            <SelectTrigger className="w-[200px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                <SelectValue placeholder="All Topics" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="All Topics">All Topics</SelectItem>
                                    {topics?.map((topic, index) => (
                                        <SelectItem key={index} value={topic}>
                                            {topic}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-6">
                        {selectedTopic === "All Topics" ? (
                            <>
                                {uncategorizedPosts?.length > 0 && (
                                    <div className="space-y-4">
                                        {uncategorizedPosts.map((post) => (
                                            <Card key={post.postCode} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                                <CardHeader
                                                    className="cursor-pointer group"
                                                    onClick={() => toggleCard(post.postCode)}
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                                                                {React.createElement(
                                                                    typeIcons[post.type] || MdOutlineAssignment,
                                                                    { className: "w-8 h-8 text-blue-600 dark:text-blue-400" }
                                                                )}
                                                            </div>
                                                            <div>
                                                                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                    {post.title || "Untitled Post"}
                                                                </CardTitle>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    Posted {new Date(post?.timestamp).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    })} at {new Date(post?.timestamp).toLocaleTimeString([], {
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            {post?.type !== "material" && post?.dueDate && (
                                                                <div className="text-right">
                                                                    <p className="text-sm font-medium text-red-500">Due</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                        {new Date(post?.dueDate).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                        })}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                        <BsThreeDotsVertical />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit p-1">
                                                                    <Button variant="ghost" size="sm" onClick={() => copyPostCode(post?.channelCode, post?.postCode, post?.type)}>
                                                                        Copy Link
                                                                    </Button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent
                                                    className={`transition-all duration-300 ${expandedCards[post.postCode] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                                                >
                                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mt-4">
                                                        <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
                                                        <Button
                                                            variant="link"
                                                            className="mt-4 text-blue-600 dark:text-blue-400"
                                                            onClick={() => handleViewInstruction(post.type, post.postCode)}
                                                        >
                                                            View Instructions →
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {topics.map((topic, topicIndex) => (
                                    <div key={topicIndex}>
                                        {/* Topic Title */}
                                        <h3
                                            className={`font-bold text-xl mb-4 cursor-pointer w-fit ${selectedTopic === topic ? "text-blue-600" : ""
                                                }`}
                                            onClick={() => setSelectedTopic(topic)}
                                            onMouseEnter={(e) => e.target.classList.add("btn-link")}
                                            onMouseLeave={(e) => e.target.classList.remove("btn-link")}
                                        >
                                            {topic}
                                        </h3>
                                        {getPostsByTopic(topic).length > 0 ? (
                                            getPostsByTopic(topic).map((post) => (
                                                <Card key={post.postCode} className="mb-4 shadow-md">
                                                    <CardHeader
                                                        className="cursor-pointer"
                                                        onClick={() => toggleCard(post.postCode)}
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-2">
                                                                {React.createElement(
                                                                    typeIcons[post.type] || MdOutlineAssignment,
                                                                    { className: "w-10 h-10 text-gray-700" }
                                                                )}
                                                                <CardTitle>
                                                                    <span className="font-bold">{post.title || "Untitled Post"}</span>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        {new Date(post?.timestamp).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                        })},{" "}
                                                                        {new Date(post?.timestamp).toLocaleTimeString([], {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                        })}
                                                                    </p>
                                                                </CardTitle>
                                                            </div>
                                                            <div className="flex items-center">
                                                                {post?.type !== "material" && post?.dueDate ?
                                                                    <p className="text-sm text-gray-500">
                                                                        {new Date(post?.dueDate).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                        })}{" "}
                                                                        {post?.dueTime && new Date(post?.dueTime).toLocaleTimeString([], {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                        })}
                                                                    </p>
                                                                    :
                                                                    <p className="text-sm text-gray-500">No due date</p>
                                                                }
                                                                <Popover>
                                                                    <PopoverTrigger>
                                                                        <Button variant="ghost" size="sm" className="rounded-full">
                                                                            <BsThreeDotsVertical />
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className='w-fit h-fit p-1 absolute right-0'>
                                                                        <Button variant="ghost" size="sm" onClick={() => copyPostCode(post?.channelCode, post?.postCode, post?.type)}>
                                                                            Copy Link
                                                                        </Button>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent
                                                        className={`transition-all duration-300 ${expandedCards[post.postCode] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                                                            }`}
                                                    >
                                                        <p>{post.content}</p>
                                                        <Button
                                                            variant="link"
                                                            className="mt-2"
                                                            onClick={() => handleViewInstruction(post.type, post.postCode)}
                                                        >
                                                            View Instruction
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No posts under this topic.</p>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {getPostsByTopic(selectedTopic).map((post) => (
                                    <Card key={post.postCode} className="mb-4 shadow-md">
                                        <CardHeader
                                            className="cursor-pointer"
                                            onClick={() => toggleCard(post.postCode)}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    {React.createElement(
                                                        typeIcons[post.type] || MdOutlineAssignment,
                                                        { className: "w-10 h-10 text-gray-700" }
                                                    )}
                                                    <CardTitle>
                                                        <span className="font-bold">{post.title || "Untitled Post"}</span>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(post?.timestamp).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })},{" "}
                                                            {new Date(post?.timestamp).toLocaleTimeString([], {
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                            })}
                                                        </p>
                                                    </CardTitle>
                                                </div>
                                                <div className="flex items-center">
                                                    {post?.type !== "material" && post?.dueDate ?
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(post?.dueDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}{" "}
                                                            {post?.dueTime && new Date(post?.dueTime).toLocaleTimeString([], {
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                            })}
                                                        </p>
                                                        :
                                                        <p className="text-sm text-gray-500">No due date</p>
                                                    }
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <Button variant="ghost" size="sm" className="rounded-full">
                                                                <BsThreeDotsVertical />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-fit h-fit p-1 absolute right-0'>
                                                            <Button variant="ghost" size="sm" onClick={() => copyPostCode(post?.channelCode, post?.postCode, post?.type)}>
                                                                Copy Link
                                                            </Button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent
                                            className={`transition-all duration-300 ${expandedCards[post.postCode] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                                                }`}
                                        >
                                            <p>{post.content}</p>
                                            <p className="text-sm text-gray-500">
                                                Posted at {new Date(post.timestamp).toLocaleString()}
                                            </p>
                                            <Button
                                                variant="link"
                                                className="mt-2"
                                                onClick={() => handleViewInstruction(post.type, post.postCode)}
                                            >
                                                View Instruction
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
            <ClassworkModal
                isOpen={showDialog}
                onClose={closeDialog}
                type={dialogType}
                onSubmit={addPostOrTopic}
                channelName={channel.channelInfo?.name || "Unknown Channel"}
            />
        </div>
    );
};

export default Classwork;