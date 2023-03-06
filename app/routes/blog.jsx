import { Outlet } from "@remix-run/react"
import blogCSS from '../styles/blog.css';

export function links() {
  return [
    {
      rel: "stylesheet",
      href: blogCSS,
    }
  ]
}

const Blog = () => {

  return (

    <main className="contenedor">
        <Outlet />
    </main>
  )
}

export default Blog