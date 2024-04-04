import { AuthButtonType } from "../../types/components/common/AuthButton";

function AuthButton({ type, text, icon, id, clickHandler }: AuthButtonType) {
  return <button type={type} id={id} onClick={clickHandler} className="block w-full p-2 rounded-md bg-[#18181b] text-white">{text}{icon}</button>;
}

export default AuthButton;
