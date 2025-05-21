import React, { Dispatch, SetStateAction } from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tiptap/react";
import { FormattedPost } from "@/app/types";

type Props = {
  post: FormattedPost;
  isEditable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  tempTitle: string;
  setTempTitle: Dispatch<SetStateAction<string>>;
  tempContent: string;
  setTempContent: Dispatch<SetStateAction<string>>;
  editor: Editor | null;
};

const CategoryAndEdit = ({
  post,
  isEditable,
  setIsEditable,
  title,
  setTitle,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  editor
}: Props) => {
  function handleEnableEdit() {
    setIsEditable(!isEditable)
    editor?.setEditable(!isEditable)
    setTempTitle(title)
    setTempContent(editor?.getHTML() || "")
  }

  function handleCancelEdit() {
    setIsEditable(!isEditable)
    editor?.setEditable(!isEditable)
    setTitle(tempTitle)
    editor?.commands.setContent(tempContent)
  }

  return (
    <div className="flex justify-between items-center">
      <h4 className="bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold">
        {post.category}
      </h4>
      <div className="mt-4">
        {isEditable ? (
          <div className="flex justify-between gap-3">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        ) : (
          <button onClick={handleEnableEdit}>
            <PencilSquareIcon className="h-6 w-6 text-accent-red" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryAndEdit;
