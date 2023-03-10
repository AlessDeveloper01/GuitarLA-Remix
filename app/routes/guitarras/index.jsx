import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '../../data/guitarras.server'
import Guitarra from '../../components/guitarra';

export function meta() {
  return {
    title: 'GuitarLA - Tienda',
    description: 'GuitarLA - Tienda',
  }
}

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data
}

const Tienda = () => {

  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Coleccion</h2>

      {guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map(guitarra => (
            <Guitarra
              key={guitarra?.id}
              guitarra={guitarra?.attributes}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Tienda