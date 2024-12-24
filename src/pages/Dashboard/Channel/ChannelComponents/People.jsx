import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserIcon, UsersIcon, AlertTriangle } from "lucide-react";

const People = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError || !channel) {
        return (
            <div className="flex items-center justify-center h-96 text-red-500">
                <div className="text-center">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                    <p>Error fetching people. Please check the code or try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 space-y-8">
            {/* Teachers Section */}
            <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl">
                <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Teachers
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm">
                            {channel.teachers?.length || 0} teachers
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {channel.teachers?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {channel.teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-md transition-all duration-300"
                                >
                                    <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400">
                                        <AvatarImage src={teacher.image} alt={teacher.name} />
                                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                            {teacher.name?.[0] || "T"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            {teacher.name}
                                        </p>
                                        {teacher.email && (
                                            <a
                                                href={`mailto:${teacher.email}`}
                                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                                            >
                                                <Mail className="h-3 w-3" />
                                                <span className="truncate">{teacher.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <UserIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No teachers available.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Students Section */}
            <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl">
                <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Students
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm">
                            {channel.students?.length || 0} students
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {channel.students?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {channel.students.map((student, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-md transition-all duration-300"
                                >
                                    <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-purple-500 dark:ring-purple-400">
                                        <AvatarImage src={student.image} alt={student.name} />
                                        <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                                            {student.name?.[0] || "S"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            {student.name || "Unnamed Student"}
                                        </p>
                                        {student.email && (
                                            <a
                                                href={`mailto:${student.email}`}
                                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1"
                                            >
                                                <Mail className="h-3 w-3" />
                                                <span className="truncate">{student.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <UsersIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No students enrolled yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default People;