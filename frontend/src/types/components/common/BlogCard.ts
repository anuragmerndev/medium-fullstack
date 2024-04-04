export interface BlogCardTypes {
    author?: string,
    date: Date,
    title: string,
    content: string,
    blogId: string
}

export interface BlogCardData {
    author?: {
        name: string
    },
    created_at: Date,
    title: string,
    content: string,
    blogId: string
}