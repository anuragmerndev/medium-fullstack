export interface AuthButtonType {
    type: "submit" | "reset" | "button" | undefined,
    text: string,
    id: string,
    clickHandler?: () => void,
    icon?: string
}