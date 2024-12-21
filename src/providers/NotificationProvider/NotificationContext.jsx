import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosCommon } from '@/hooks/useAxiosCommon';
import useAuth from '@/hooks/useAuth';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const { user } = useAuth();

    const fetchNotifications = async () => {
        if (!user?.email) return;
        try {
            const response = await axiosCommon.get(`/notifications/${user.email}`);
            const notifs = response.data;
            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (channelId, notificationId) => {
        try {
            await axiosCommon.patch(`/notifications/${channelId}/${notificationId}/read`);
            await fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        if (!user?.email) return;
        try {
            await axiosCommon.patch(`/notifications/${user.email}/read-all`);
            await fetchNotifications();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [user?.email]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            refetchNotifications: fetchNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext); 