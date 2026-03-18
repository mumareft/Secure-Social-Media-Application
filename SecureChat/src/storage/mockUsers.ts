// src/storage/mockUsers.ts

export type MockUser = {
    id: string;
    name: string;
    avatar: string; // just an emoji for now
};

export const MOCK_USERS: MockUser[] = [
    { id: "alice", name: "Alice", avatar: "👩" },
    { id: "bob", name: "Bob", avatar: "👨" },
    { id: "carol", name: "Carol", avatar: "👩‍💼" },
    { id: "dave", name: "Dave", avatar: "🧔" },
    { id: "eve", name: "Eve", avatar: "🕵️" },
];
