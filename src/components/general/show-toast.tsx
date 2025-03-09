"use client"; // Ensure it's a client component

import React, { useEffect } from "react";
import { toast } from "sonner";

const ShowToast = ({ text }: { text: string }) => {
  useEffect(() => {
    if (text) {
      toast.warning(text || "Please provide a message...");
    }
  }, [text]);

  return null; // No need to render anything
};

export default ShowToast;
