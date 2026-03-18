// src/storage/localDb.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Post = {
    id: string;
    authorId: string;
    content: string; // plaintext for now — will become ciphertext
    timestamp: number;
};

const POSTS_KEY = "posts";

export async function savePosts(posts: Post[]): Promise<void> {
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export async function loadPosts(): Promise<Post[]> {
    const raw = await AsyncStorage.getItem(POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
}

export async function addPost(post: Post): Promise<void> {
    const existing = await loadPosts();
    await savePosts([post, ...existing]);
}
