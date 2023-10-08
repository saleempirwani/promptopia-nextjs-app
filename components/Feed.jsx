"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(0);

  const filteredPrompt = (searchText = "") => {
    const regex = new RegExp(searchText, "i");

    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  // debounce method
  const handleSearch = (text = "") => {
    clearTimeout(searchTimeout);
    setSearchText(text);

    setSearchTimeout(
      setTimeout(() => {
        setFilteredPost(filteredPrompt(text));
      }, 500)
    );
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPost(data);
    } catch (error) {
      console.log("ERR [fetchPosts] =====> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          required
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="search_input peer"
        />
      </form>

      {loading ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <PromptCardList data={filteredPost} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
