import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
    const { user, profileUpdate, setLoading } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const IMGBB_API_KEY = "1f0d5a689a825b7724009d022a6172b9";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    formData
                );

                setFormData({
                    ...formData,
                    photoURL: response.data.data.url,
                });
            } catch (error) {
                console.error("Error uploading file to ImgBB: ", error);
            }
        }
    };

    const handleSave = () => {
        axiosCommon
            .put(`/updateUser`, { ...formData, email: user.email }, {})
            .then(() => {
                profileUpdate(formData.userName, formData.photoURL);
                setLoading(false);
                setEditMode(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
                <Button
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    variant={editMode ? "destructive" : "outline"}
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? "Cancel" : "Edit"}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <img
                        src={formData.photoURL || "/placeholder.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                    />
                    {editMode && (
                        <div className="mt-4 w-full">
                            <Label htmlFor="photoFile" className="text-gray-700 dark:text-gray-200 mb-2">
                                Profile Picture
                            </Label>
                            <Input
                                id="photoFile"
                                type="file"
                                onChange={handleFileChange}
                                className="mt-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            />
                        </div>
                    )}
                </div>

                {/* Profile Information */}
                <div className="flex-1 space-y-4">
                    <div>
                        <Label htmlFor="userName" className="text-gray-700 dark:text-gray-200">
                            Username
                        </Label>
                        <Input
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="mt-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="mt-1 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">
                            Phone Number
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!editMode}
                            className="mt-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <Label htmlFor="address" className="text-gray-700 dark:text-gray-200">
                            Address
                        </Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!editMode}
                            className="mt-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            rows={3}
                        />
                    </div>

                    {editMode && (
                        <Button 
                            onClick={handleSave}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        >
                            Save Changes
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;