"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const updatePrompt = async (e) => {
    e.preventDefault();

    if (!promptId) return alert("Prompt ID not found");

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
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

  const getPromptDetails = async () => {
    const response = await fetch(`api/prompt/${promptId}`);
    const data = await response.json();

    setPost({
      ...data,
    });
  };

  useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default CreatePrompt;
