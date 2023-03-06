import { useLoaderData, Link } from '@remix-run/react';
import { formatearFecha } from '../../utils/helpers';
import { getPost } from '../../data/blog.server';
import blogCSS from '../../styles/blog.css';

export function meta({data}) {

    if(!data) {
      return {
        title: 'GuitarLA - Blog no encontrado',
        description: 'GuitarLA - Blog no encontrado',
      }
    }
  
    return {
      title: `GuitarLA - ${data.data[0].attributes.titulo}`,
      description: `GuitarLA - ${data.data[0].attributes.titulo}`,
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

export async function loader({params}) {
    
    const { postUrl } = params;
    const post = await getPost(postUrl);
    if(post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrado'
        })
    }

    return post
}

const Post = () => {

    const post = useLoaderData();
    const { titulo, contenido, imagen, publishedAt } = post.data[0].attributes;

  return (
    <article className="contenedor post mt-3">
       <img src={imagen.data.attributes.url} alt={`Imagen del blog ${titulo}`} className='imagen' />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido}</p>
            <Link className='enlace' to={`/blog/`}>Regresar</Link>
        </div>
    </article>
  )
}

export default Post