import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '../data/guitarras.server';
import { getPosts } from '../data/blog.server';
import { getCurso } from '../data/curso.server';
import Curso from '../components/curso';
import ListadoGuitarras from '../components/listado-guitarras';
import ListadoPost from '../components/listado-post';
import guitarrasCSS from '../styles/guitarras.css';
import postCSS from '../styles/blog.css';
import CursoCSS from '../styles/curso.css';


export function meta() {

}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: guitarrasCSS
    },
    {
      rel: "stylesheet",
      href: postCSS
    },
    {
      rel: "stylesheet",
      href: CursoCSS
    }
  ]
}

export async function loader() {

  const [guitarras, post, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ]);

  return {
    guitarras: guitarras.data,
    post: post.data,
    curso: curso.data
  };
}

function Index() {
  const { guitarras, post, curso } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras 
          guitarras={guitarras}
         />
      </main>

      <Curso
        curso={curso.attributes}
      />

      <section className="contenedor">
        <ListadoPost
            posts={post}
          />
      </section>
    </>
  )
}

export default Index