"use client";

import React from "react";
import dynamic from "next/dynamic";

const CKEditor = dynamic(
  () =>
    import("@ckeditor/ckeditor5-react").then((mod) => {
      return import("@ckeditor/ckeditor5-build-classic").then((editorMod) => {
        const ClassicEditor = editorMod.default;
        return (props: any) => (
          <mod.CKEditor {...props} editor={ClassicEditor} />
        );
      });
    }),
  { ssr: false, loading: () => <div>Loading Editor...</div> }
);

interface Props {
  value: string;
  onChange: (data: string) => void;
}

const CKEditorWrapper = ({ value, onChange }: Props) => {
  return (
    <div style={{ minHeight: 400 }}>
      <CKEditor
        data={value}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "insertTable",
            "|",
            "undo",
            "redo",
          ],
        }}
      />
    </div>
  );
};

export default CKEditorWrapper;
