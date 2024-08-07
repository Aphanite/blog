import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BLOG_TITLE } from "@/constants";

const getBlogPost = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.postSlug);
  return {
    title: `${post.frontmatter.title} • ${BLOG_TITLE}`,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await getBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
