"use client";

import { Toggle } from "@/components/ui/toggle";
import { List, Upload } from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Underline,
  Quote,
  Link as LinkIcon,
  Type,
  Image as ImageIcon,
  ListOrdered,
} from "lucide-react";

export default function ToolBar({ editor }: any) {
  if (!editor) return null;

  // Predefined image URL (temporary for local uploads)
  const predefinedImageUrl = "https://plus.unsplash.com/premium_photo-1674265998686-40708a7463f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D";

  // Function to handle inserting an image by URL
  const addImageByUrl = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Function to handle local image uploads (currently inserting predefined image URL)
  const addImageByUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      editor.chain().focus().setImage({ src: predefinedImageUrl }).run();
    };
    input.click();
  };

  // Function to handle adding a hyperlink
  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Function to set text color
  const setColor = () => {
    const color = window.prompt("Enter hex color code (e.g., #FF5733)");
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  };

  const Options = [
    { icon: <Heading1 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), pressed: editor.isActive("heading", { level: 1 }) },
    { icon: <Heading2 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), pressed: editor.isActive("heading", { level: 2 }) },
    { icon: <Heading3 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), pressed: editor.isActive("heading", { level: 3 }) },
    { icon: <Type className="size-4" />, onClick: () => editor.chain().focus().setParagraph().run(), pressed: editor.isActive("paragraph") },
    { icon: <Bold className="size-4" />, onClick: () => editor.chain().focus().toggleBold().run(), pressed: editor.isActive("bold") },
    { icon: <Italic className="size-4" />, onClick: () => editor.chain().focus().toggleItalic().run(), pressed: editor.isActive("italic") },
    { icon: <Strikethrough className="size-4" />, onClick: () => editor.chain().focus().toggleStrike().run(), pressed: editor.isActive("strike") },
    { icon: <Underline className="size-4" />, onClick: () => editor.chain().focus().toggleUnderline().run(), pressed: editor.isActive("underline") },
    { icon: <Quote className="size-4" />, onClick: () => editor.chain().focus().toggleBlockquote().run(), pressed: editor.isActive("blockquote") },
    { icon: <AlignLeft className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("left").run(), pressed: editor.isActive({ textAlign: "left" }) },
    { icon: <AlignCenter className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("center").run(), pressed: editor.isActive({ textAlign: "center" }) },
    { icon: <AlignRight className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("right").run(), pressed: editor.isActive({ textAlign: "right" }) },
    { icon: <List className="size-4" />, onClick: () => editor.chain().focus().toggleBulletList().run(), pressed: editor.isActive("bulletList") },
    { icon: <ListOrdered className="size-4" />, onClick: () => editor.chain().focus().toggleOrderedList().run(), pressed: editor.isActive("orderedList") },
    { icon: <Code className="size-4" />, onClick: () => editor.chain().focus().toggleCodeBlock().run(), pressed: editor.isActive("codeBlock") },
    { icon: <LinkIcon className="size-4" />, onClick: addLink },
    { icon: <ImageIcon className="size-4" />, onClick: addImageByUrl },
    { icon: <Upload className="size-4" />, onClick: addImageByUpload },
    { icon: <Highlighter className="size-4" />, onClick: setColor },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-[#020817] text-white space-x-1 sticky top-10 z-50 flex flex-wrap gap-1">
      {Options.map((option, i) => (
        <Toggle key={i} size="sm" pressed={option.pressed} onPressedChange={option.onClick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}