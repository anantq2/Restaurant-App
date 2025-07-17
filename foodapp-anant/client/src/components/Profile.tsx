import {
    Loader2,
    LocateIcon,
    Mail,
    MapPin,
    MapPinnedIcon,
    Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState, useEffect, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

// Define a type for the profile data form for better type safety
type ProfileDataType = {
    fullname: string;
    email: string;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
};

const Profile = () => {
    // 1. Get user AND the loading state from the store
    const { user, updateProfile, loading } = useUserStore();

    // 2. Initialize state. It's safer to do this inside useEffect
    // to ensure 'user' data is available before setting the form state.
    const [profileData, setProfileData] = useState<ProfileDataType>({
        fullname: "",
        email: "",
        address: "",
        city: "",
        country: "",
        profilePicture: "",
    });

    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");
    const imageRef = useRef<HTMLInputElement | null>(null);

    // This effect runs when the component mounts or when the user object changes.
    useEffect(() => {
        if (user) {
            setProfileData({
                fullname: user.fullname || "",
                email: user.email || "",
                address: user.address || "",
                city: user.city || "",
                country: user.country || "",
                profilePicture: user.profilePicture || "",
            });
            setSelectedProfilePicture(user.profilePicture || "");
        }
    }, [user]); // The effect depends on the user object

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result);
                // Also update the data that will be sent to the backend
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // 3. Simplify the handler. The store now manages all the logic.
    const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // The updateProfile function from the store already handles loading and errors.
        // We just need to call it.
        await updateProfile(profileData);
    };

    return (
        <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5 p-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Avatar className="relative w-20 h-20 md:w-28 md:h-28">
                        <AvatarImage src={selectedProfilePicture} alt={user?.fullname} />
                        <AvatarFallback>
                            {user?.fullname?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                        <input
                            ref={imageRef}
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={fileChangeHandler}
                        />
                        <div
                            onClick={() => imageRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
                        >
                            <Plus className="text-white w-8 h-8" />
                        </div>
                    </Avatar>
                    <Input
                        type="text"
                        name="fullname"
                        value={profileData.fullname}
                        onChange={changeHandler}
                        className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent p-2"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                {/* Email Field */}
                <div className="flex items-center gap-4 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label htmlFor="email">Email</Label>
                        <input
                            id="email"
                            disabled
                            name="email"
                            value={profileData.email}
                            className="w-full text-gray-600 dark:text-gray-400 bg-transparent outline-none border-none p-0"
                        />
                    </div>
                </div>
                {/* Address Field */}
                <div className="flex items-center gap-4 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label htmlFor="address">Address</Label>
                        <input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            className="w-full text-gray-800 dark:text-gray-200 bg-transparent outline-none border-none p-0"
                        />
                    </div>
                </div>
                {/* City Field */}
                <div className="flex items-center gap-4 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label htmlFor="city">City</Label>
                        <input
                            id="city"
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            className="w-full text-gray-800 dark:text-gray-200 bg-transparent outline-none border-none p-0"
                        />
                    </div>
                </div>
                {/* Country Field */}
                <div className="flex items-center gap-4 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
                    <MapPinnedIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label htmlFor="country">Country</Label>
                        <input
                            id="country"
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            className="w-full text-gray-800 dark:text-gray-200 bg-transparent outline-none border-none p-0"
                        />
                    </div>
                </div>
            </div>

            <div className="text-center">
                {/* 4. The button's state is now driven by the store's loading state */}
                <Button type="submit" disabled={loading} className="bg-orange hover:bg-hoverOrange px-8 py-3">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default Profile;
