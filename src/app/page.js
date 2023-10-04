import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
};

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {blogPosts.length > 0 &&
        blogPosts.map((post) => {
          return (
            <BlogSummaryCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              abstract={post.abstract}
              publishedOn={post.publishedOn}
            />
          );
        })}
    </div>
  );
}

export default Home;
