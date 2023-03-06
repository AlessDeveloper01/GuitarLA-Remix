import Post from '../components/post'

export default function ListadoPost({posts}) {
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
