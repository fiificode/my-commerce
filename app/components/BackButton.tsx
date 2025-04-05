"use client";

import { ArrowLeft } from "lucide-react";
import React from "react";

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
