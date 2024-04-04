export interface StyledBtnType {
    type: "submit" | "reset" | "button" | undefined,
    text: string,
    id: string,
    clickHandler?: () => void,
    bgColor: string,
    hover: string
}