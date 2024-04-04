import { InputFieldType } from "../../types/components/common/InputFields";

function InputFields({
  type,
  placeholder,
  id,
  label,
  value,
  changeHandler,
  required,
  min,
  max
}: InputFieldType) {
  return (
    <div className="my-3">
      <label
        htmlFor={id}
        className="block text-lg leading-6 text-gray-900 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={changeHandler}
        required={required}
        minLength={min}
        maxLength={max}
        className="block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default InputFields;
