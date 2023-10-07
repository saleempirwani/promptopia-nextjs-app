"use client";

import Form from "@components/Form";
import { useRouter } from "next/router";
import { useState } from "react";

function CreatePrompt() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.user.id,
        }),
      });

      if (response.ok) router.push("/");
    } catch (error) {
      console.log("ERR [createPrompt] =====> ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
