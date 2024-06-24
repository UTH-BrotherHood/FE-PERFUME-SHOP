import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
    username: string;
    email: string;
    avatar: string;
    date_of_birth: string;
    id: string;
    phone_number: string | null;
    total_cart_quantity: number;
    total_wishlist_quantity: number;
    created_at: string;
    updated_at: string;
    verify: string;
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const config = {
                    baseURL: 'http://localhost:8001',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                try {
                    const response = await axios.get("/users/me", config);
                    console.log('User fetched:', response.data.result);
                    setUser(response.data.result);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
