import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { Post } from "@/type";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: Post[];
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts);

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home({ posts }: Props) {
  return (
    <div className={styles.homeContainer}>
      <h2>Rails & Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>
        Create New Post
      </Link>
      <div>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
            <Link href={`posts/@{post.id}`} className={styles.postCardBox}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <button className={styles.editButton}>編集</button>
            <button className={styles.deleteButton}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}
