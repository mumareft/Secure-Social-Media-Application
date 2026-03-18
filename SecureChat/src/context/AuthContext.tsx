// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { MockUser } from "../storage/mockUsers";

type AuthContextType = {
    currentUser: MockUser | null;
    login: (user: MockUser) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

    return (
        <AuthContext.Provider value={{
            currentUser,
            login: (user) => setCurrentUser(user),
            logout: () => setCurrentUser(null),
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)!;