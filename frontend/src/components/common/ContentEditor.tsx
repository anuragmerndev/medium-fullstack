import { FormEvent } from "react";

import SecuredComponent from "./SecuredComponent";
import StyledBtn from "./StyledBtn";
import { contentEditorType } from "../../types/components/common/ContentEditor";

function ContentEditor({
  clickHandler,
  buttonText,
  title,
  setTitle,
  content,
  setContent,
}: contentEditorType) {
  return (
    <SecuredComponent>
      <div className="mx-16 mt-20">
        <form onSubmit={clickHandler}>
          <div className="flex justify-end mb-2">
            <StyledBtn
              text={buttonText}
              type="submit"
              bgColor="green-900"
              id="publishButton"
              hover="bg-green-950"
            />
          </div>
          <input
            type="text"
            placeholder="Title"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
            className="w-full py-2 focus:outline-none text-xl border-b-2 m-2"
            value={title}
            required
          />
          <textarea
            required
            rows={5}
            value={content}
            onChange={(e: FormEvent<HTMLTextAreaElement>) =>
              setContent(e.currentTarget.value)
            }
            placeholder="Tell your story here...."
            className="w-full p-2 focus:outline-none text-sm"
          />
        </form>
      </div>
    </SecuredComponent>
  );
}

export default ContentEditor;
