export interface InputFieldType {
    type: string,
    placeholder: string,
    id: string,
    label: string,
    value: string,
    required: boolean,
    min?: number,
    max?: number,
    changeHandler: (e: React.FormEvent<HTMLInputElement>) => void
}