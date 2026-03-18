// src/context/GroupContext.tsx
import { createContext, useContext, useState } from "react";
import { MockUser } from "../storage/mockUsers";

type GroupContextType = {
    members: MockUser[];
    addMember: (user: MockUser) => void;
    removeMember: (userId: string) => void;
    isMember: (userId: string) => boolean;
};

const GroupContext = createContext<GroupContextType | null>(null);

export function GroupProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<MockUser[]>([]);

    return (
        <GroupContext.Provider value={{
            members,
            addMember: (user) => setMembers(prev => [...prev, user]),
            removeMember: (id) => setMembers(prev => prev.filter(u => u.id !== id)),
            isMember: (id) => members.some(u => u.id === id),
        }}>
            {children}
        </GroupContext.Provider>
    );
}

export const useGroup = () => useContext(GroupContext)!;