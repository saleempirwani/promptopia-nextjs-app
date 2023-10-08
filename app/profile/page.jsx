"use client";

import Loader from "@components/Loader";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function MyProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const profileId = useSearchParams().get("id");
  const profileName = useSearchParams().get("name");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure, you want to delete this post?");
    if (!hasConfirmed) return;

    setLoading(true);

    try {
      await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
      const filteredPosts = posts.map((_post) => _post._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log("ERR [handleDelete] =====> ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(`api/users/${profileId}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("ERR [fetchPosts] =====> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileId) fetchPosts();
  }, [profileId]);

  if (status === "loading" || loading) return <Loader />;

  return (
    <Profile
      name={session?.user.id === profileId ? "My" : profileName}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
