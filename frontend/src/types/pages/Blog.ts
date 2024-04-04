export interface BlogDataType {
    id: string,
    title: string,
    content: string,
    authorID: string,
    created_at: Date,
    author?: {
        name: string
    }
}