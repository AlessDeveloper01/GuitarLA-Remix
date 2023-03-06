import { useLoaderData } from "@remix-run/react"
import { getPosts } from "../../data/blog.server"
import Post from "../../components/post";
import blogCSS from '../../styles/blog.css';

export function meta() {
  return {
      title: 'GuitarLA - Blog',
      description: 'Entrada del blog'
  }
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: blogCSS,
    }
  ]
}

export async function loader() {
  const posts = await getPosts();
  return posts.data;
}

const Blog = () => {

  const posts = useLoaderData();

  return (
      <>
        <h2 className="heading"> BLOG</h2>
        <div className="blog">
          {posts.map(post => (
                <Post 
                  key={post.id}
                  post={post}
                />
          ))}
        </div>
      </>
  )
}

export default Blog