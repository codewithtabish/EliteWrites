"use client";

import React from "react";
import { TagsInput } from "react-tag-input-component";

const Example = ({ selectedTags, setSelectedTags }: { selectedTags: string[], setSelectedTags: (tags: string[]) => void }) => {
  return (
    <div className="">
      <div className="bg-[#020817] p-2 rounded-md">
        <TagsInput
          value={selectedTags}
          onChange={setSelectedTags}
          name="tags"
          placeHolder="Enter tags"
          classNames={{
            input: "bg-[#020817] text-white px-2 py-1 rounded outline-none w-full",
            tag: "bg-[#020817] text-white px-2 py-1 rounded",
          }}
        />
      </div>
    </div>
  );
};

export default Example;
