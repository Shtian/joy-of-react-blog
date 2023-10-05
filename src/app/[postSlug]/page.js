import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import { COMPONENT_MAP } from "@/helpers/mdx-component-map";
const loadCachedBlogPost = React.cache(async (slug) => {
  const post = await loadBlogPost(slug);
  return post;
});

export async function generateMetadata({ params }) {
  const post = await loadCachedBlogPost(params.postSlug);

  return {
    title: `${post.frontmatter.title} • ${BLOG_TITLE}`,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const post = await loadCachedBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
