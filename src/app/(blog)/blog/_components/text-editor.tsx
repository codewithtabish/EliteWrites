"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import ToolBar from "./editor-tool-bar";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Code from "@tiptap/extension-code";
import Color from "@tiptap/extension-color";
import sanitizeHtml from "sanitize-html";

export default function RichTextEditor({ content, onChange }: { content: string; onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-3" } }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc ml-3" } }),
      Highlight,
      Image,
      ImageResize,
      Color, // Added Color extension
      Blockquote,
      CodeBlock,
      Underline,
      Paragraph,
      Code,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-screen w-full overflow-hidden border rounded-md bg-[#020817] text-white py-2 px-3 border-[1px] border-gray-600 hover:border-gray-600 hover:border-[1px]",
      },
    },
    onUpdate: ({ editor }) => {
      let rawHtml = editor.getHTML();

      // Ensure all text is wrapped in paragraphs if needed
      if (!rawHtml.startsWith("<p>") && !rawHtml.startsWith("<h1>") && !rawHtml.startsWith("<h2>") && !rawHtml.startsWith("<h3>")) {
        rawHtml = `<p>${rawHtml}</p>`;
      }

      const cleanHtml = sanitizeHtml(rawHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "span", "img"]),
        allowedAttributes: {
          a: ["href", "target", "rel", "class"],
          img: ["src", "alt", "width", "height", "style"], // Ensure image attributes are allowed
          span: ["style"], // Allow color styling in spans
          p: [],
          h1: [],
          h2: [],
          h3: [],
        },
      });

      onChange(cleanHtml);
    },
  });

  return (
    <div className="">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className="min-h-1.5" />
    </div>
  );
}
