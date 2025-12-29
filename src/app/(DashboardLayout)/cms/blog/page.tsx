"use client";

import React, { useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CKEditorWrapper from "../../components/ckTextEditor/page";

const BlogPage = () => {
  const [content, setContent] = useState("");

  return (
    <DashboardCard title="Blog Editor">
      <CKEditorWrapper
        value={content}
        onChange={(data) => setContent(data)}
      />
    </DashboardCard>
  );
};

export default BlogPage;
