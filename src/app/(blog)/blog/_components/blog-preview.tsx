"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogPreviewDialog({
  children,
  previewData,
}: {
  children: React.ReactNode;
  previewData: {
    title: string;
    imageUrl?: string;
    content: string;
    tags: string[];
  };
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="w-full min-h-1/2 overflow-y-scroll max-w-3xl mx-auto p-6">
          {/* Blog Image */}
          {previewData?.imageUrl && (
            <div className="w-full h-96 relative mb-6">
              <Image
                src={previewData.imageUrl}
                alt="Blog Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
          )}

          {/* Blog Title */}
          <DrawerHeader>
            <DrawerTitle className="text-3xl font-bold">{previewData?.title}</DrawerTitle>
          </DrawerHeader>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-full">{renderBlogContent(previewData?.content)}</div>

          <hr />

          {/* Blog Tags */}
          {previewData?.tags?.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {previewData.tags.map((tag, index) => (
                <div key={index} className="bg-[#020817] text-white px-2 py-1 rounded">
                  {tag}
                </div>
              ))}
            </div>
          ) : null}

          {/* Close Button */}
          <div className="text-center mt-6">
            <Button variant="outline" className="w-full">
              Close Preview
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Function to Parse and Render Blog Content
const renderBlogContent = (content: string) => {
  if (!content) return null;

  // Ensure all images have a valid src
  content = content.replace(/<img([^>]*?)>/g, (match, attributes) => {
    if (!/src=["'].*?["']/.test(attributes)) {
      return ""; // Remove images with no src
    }
    return `<img ${attributes} class="w-full h-auto rounded-lg my-4"/>`; // Ensure proper styling
  });

  const blocks = content.split(/<pre><code>|<\/code><\/pre>/);

  return blocks.map((block, index) => {
    if (index % 2 !== 0) {
      return (
        <SyntaxHighlighter key={index} language="javascript" style={materialDark} className="rounded-lg p-4 my-4">
          {decodeHTMLEntities(block)}
        </SyntaxHighlighter>
      );
    }

    return (
      <div
        key={index}
        className="space-y-4"
        dangerouslySetInnerHTML={{
          __html: block
            .replace(/<p>/g, `<p class="mb-4 leading-relaxed">`)
            .replace(/<ul>/g, `<ul class="list-disc pl-6 mb-4">`)
            .replace(/<ol>/g, `<ol class="list-decimal pl-6 mb-4">`)
            .replace(/<h1>/g, `<h1 class="text-4xl font-bold mb-4">`)
            .replace(/<h2>/g, `<h2 class="text-3xl font-semibold mb-4">`)
            .replace(/<h3>/g, `<h3 class="text-2xl font-medium mb-4">`)
        }}
      />
    );
  });
};

// Function to Decode HTML Entities in Code Blocks
const decodeHTMLEntities = (text: string) => {
  return text?.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
};
