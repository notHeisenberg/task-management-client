import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsersIcon, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { MdAnnouncement } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const Post = () => {
    const { channelCode, postCode } = useParams();
    const { toast } = useToast();
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [privateComment, setPrivateComment] = useState("");
    const [file, setFile] = useState(null);

    // Fetch the post details
    const { data: post, isLoading, isError, refetch } = useQuery({
        queryKey: ["postDetails", channelCode, postCode],
        queryFn: async () => {
            const response = await axiosCommon.get(`/channels/${channelCode}/posts/${postCode}`);
            return response.data;
        },
    });

    const handleAddComment = async () => {
        const trimmedComment = newComment.trim();
        if (!trimmedComment) {
            return toast({
                title: "Comment cannot be empty!",
                status: "error",
            });
        }

        try {
            await axiosCommon.post(`/channels/${channelCode}/posts/${postCode}/comments`, {
                author: user?.displayName,
                image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                content: trimmedComment,
                isPrivate: false, // Ensure it is a public comment
            });

            toast({
                title: "Comment added!",
                description: "Your comment was successfully posted.",
                status: "success",
            });

            setNewComment(""); // Clear the input
            refetch(); // Refresh comments
        } catch (error) {
            console.error("Error adding comment:", error);
            toast({
                title: "Failed to add comment!",
                description: "Something went wrong while adding your comment.",
                status: "error",
            });
        }
    };

    const handlePrivateComment = async () => {
        const trimmedComment = privateComment.trim();
        if (!trimmedComment) {
            return toast({
                title: "Private comment cannot be empty!",
                status: "error",
            });
        }

        try {
            await axiosCommon.post(`/channels/${channelCode}/posts/${postCode}/comments`, {
                author: user?.displayName,
                content: trimmedComment,
                isPrivate: true, // Private comment
            });

            toast({
                title: "Private comment added!",
                description: "Your private comment was successfully posted.",
                status: "success",
            });

            setPrivateComment("");
            refetch();
        } catch (error) {
            console.error("Error adding private comment:", error);
            toast({
                title: "Failed to add private comment!",
                description: "Something went wrong.",
                status: "error",
            });
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            return toast({
                title: "No file selected!",
                status: "error",
            });
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("student", user?.displayName || "Unknown Student");

            await axiosCommon.post(`/channels/${channelCode}/posts/${postCode}/submit`, formData);

            toast({
                title: "Assignment submitted!",
                description: "Your assignment was successfully submitted.",
                status: "success",
            });

            setFile(null);
            refetch();
        } catch (error) {
            console.error("Error submitting assignment:", error);
            toast({
                title: "Failed to submit assignment!",
                description: "Something went wrong.",
                status: "error",
            });
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading post...</div>;
    }

    if (isError || !post) {
        return <div className="text-center">Error loading post. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto pt-6 flex flex-col lg:flex-row gap-6 max-w-6xl">
            {/* Main Section */}
            <div className="flex-1">
                <Card className="shadow-lg border rounded-lg">
                    <CardHeader className="p-6 border-b">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 border rounded-full flex items-center justify-center font-bold">
                                <MdAnnouncement className="text-2xl" />
                            </div>
                            <div>
                                <span className="font-semibold text-3xl capitalize">{post.type}</span>
                                <p className="text-sm opacity-70">
                                    {post.author.name} {"| "}
                                    {new Date(post.timestamp).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    })},{" "}
                                    {new Date(post.timestamp).toLocaleTimeString([], {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-lg">{post.content}</p>
                        {post.attachments?.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {post.attachments.map((attachment, index) => (
                                    <a
                                        key={index}
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block underline"
                                    >
                                        {attachment.name || "Attachment"}
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="p-6 border-t">
                        <div className="w-full">
                            <h3 className="text-md font-semibold mb-4">
                                <UsersIcon className="inline-block mr-2" /> Comments (
                                {post.comments?.filter((comment) => !comment.isPrivate).length || 0})
                            </h3>
                            <ul className="space-y-6">
                                {post.comments
                                    ?.filter((comment) => !comment.isPrivate)
                                    .map((comment, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <img
                                                src={
                                                    comment.image ||
                                                    "https://robohash.org/default-user?set=set1&size=400x400"
                                                }
                                                alt={comment.author}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <span className="font-semibold">{comment.author}</span>{" "}
                                                <span className="text-xs opacity-70">
                                                    {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })},{" "}
                                                    {new Date(comment.timestamp).toLocaleTimeString([], {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                </span>
                                                <p>{comment.content}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <div className="mt-6 flex items-center gap-4">
                                <img
                                    src={
                                        user?.photoURL ||
                                        "https://robohash.org/default-user?set=set1&size=400x400"
                                    }
                                    alt="Your profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <Textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-grow"
                                    rows={1}
                                />
                                <Button onClick={handleAddComment} variant="ghost">
                                    <SendHorizonal size={20} />
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Aside Section */}
            {(post?.type === "assignment" || post?.type === "quiz") && (
                <aside className="w-full lg:w-1/3">
                    <Card className="shadow-lg border rounded-lg">
                        {/* Card Header with Due Date */}
                        <CardHeader className="p-6 border-b">
                            <h3 className="font-semibold">{post.author.name === user?.displayName ? "Assisment" : "Your work"}</h3>
                            {post.dueDate && (
                                <p className="text-sm text-red-600">
                                    Due: {new Date(post.dueDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            )}
                        </CardHeader>

                        <CardContent className="p-6">
                            {/* Check if User is a Teacher */}
                            {post.author.name === user?.displayName ? (
                                // For Teachers: Show All Submitted Assignments
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">All Submitted Assignments</h4>
                                    {post.submissions && post.submissions.length > 0 ? (
                                        <ul className="space-y-2">
                                            {post.submissions.map((submission, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-medium">{submission.student}</p>
                                                        <a
                                                            href={submission.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            {submission.fileName}
                                                        </a>
                                                    </div>
                                                    <span className="text-xs opacity-70">
                                                        {new Date(submission.uploadedAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm">No submissions uploaded yet.</p>
                                    )}
                                </div>
                            ) : (
                                // For Students: Show File Upload and Submit Button
                                <div>
                                    <h4 className="font-semibold mb-3">Your Assignment</h4>
                                    {/* Uploaded Assignments for the Current Student */}
                                    <div className="mb-4">
                                        {post.submissions &&
                                            post.submissions
                                                .filter((submission) => submission.student === user?.displayName)
                                                .map((submission, index) => (
                                                    <div key={index} className="flex justify-between items-center mb-2">
                                                        <a
                                                            href={submission.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            {submission.fileName}
                                                        </a>
                                                        <span className="text-xs opacity-70">
                                                            {new Date(submission.uploadedAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>

                                                        {/* Cancel Submission Modal */}
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="destructive" size="sm" className="ml-4">
                                                                    Cancel Upload
                                                                </Button>
                                                            </DialogTrigger>

                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <h3 className="font-semibold text-lg">Confirm Cancel Upload</h3>
                                                                </DialogHeader>

                                                                <div className="space-y-4">
                                                                    <p className="text-sm text-gray-600">
                                                                        Are you sure you want to cancel your uploaded assignment? This action cannot be undone.
                                                                    </p>

                                                                    <div>
                                                                        <h4 className="font-semibold mb-2 text-sm">Uploaded File:</h4>
                                                                        <a
                                                                            href={submission.fileUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-500 underline text-sm"
                                                                        >
                                                                            {submission.fileName}
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-end gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Close</Button>
                                                                    </DialogClose>
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={async () => {
                                                                            try {
                                                                                await axiosCommon.post(
                                                                                    `/channels/${channelCode}/posts/${postCode}/cancel`,
                                                                                    { student: user?.displayName }
                                                                                );
                                                                                toast({
                                                                                    title: "Submission canceled!",
                                                                                    description: "Your submission was successfully canceled.",
                                                                                    status: "success",
                                                                                });
                                                                                refetch(); // Refresh the post data
                                                                            } catch (error) {
                                                                                console.error("Error canceling submission:", error);
                                                                                toast({
                                                                                    title: "Failed to cancel submission!",
                                                                                    description: "Something went wrong.",
                                                                                    status: "error",
                                                                                });
                                                                            }
                                                                        }}
                                                                    >
                                                                        Confirm Cancel
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                ))}
                                        {/* File Upload Input */}
                                        {post.submissions?.filter((submission) => submission.student === user?.displayName).length === 0 && (
                                            <>
                                                <div className="mb-4">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => setFile(e.target.files[0])}
                                                        className="file-input"
                                                    />
                                                </div>
                                                <Button onClick={handleFileUpload} variant="outline" className="w-full">
                                                    Submit Assignment
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        {/* Private Comments */}
                        <CardFooter className="p-4 border-t flex flex-col items-start">
                            <h3 className="font-semibold text-md mb-4">Private Comments</h3>
                            <ul className="space-y-4 mb-2">
                                {post.comments
                                    ?.filter(
                                        (comment) =>
                                            comment?.isPrivate &&
                                            comment?.visibility?.includes(user?.displayName)
                                    )
                                    .map((comment, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <img
                                                src={
                                                    comment.image ||
                                                    "https://robohash.org/default-user?set=set1&size=400x400"
                                                }
                                                alt={comment.author}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <span className="font-semibold">{comment.author}</span>{" "}
                                                <span className="text-xs opacity-70">
                                                    {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })},{" "}
                                                    {new Date(comment.timestamp).toLocaleTimeString([], {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                </span>
                                                <p>{comment.content}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <div className="flex gap-2 items-center w-full">
                                <Textarea
                                    value={privateComment}
                                    onChange={(e) => setPrivateComment(e.target.value)}
                                    placeholder="Add a private comment..."
                                    rows={2}
                                />
                                <Button onClick={handlePrivateComment} variant="ghost">
                                    <SendHorizonal size={20} />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </aside>
            )}
        </div>
    );
};

export default Post;