export interface contentEditorType {
    clickHandler: (e: React.FormEvent) => Promise<void>,
    buttonText: string,
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
}