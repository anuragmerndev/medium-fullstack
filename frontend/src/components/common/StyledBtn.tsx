import { StyledBtnType } from "../../types/components/common/StyledBtn";

function StyledBtn({ type, id, clickHandler, text, bgColor, hover }: StyledBtnType) {
  return (
    <button
      type={type}
      id={id}
      onClick={clickHandler}
      className={`block py-2 px-4 hover:${hover} transition duration-[0.2s] rounded-md bg-${bgColor} text-white`}
    >
      {text}
    </button>
  );
}

export default StyledBtn;
