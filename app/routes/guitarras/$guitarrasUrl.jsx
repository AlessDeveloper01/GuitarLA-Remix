import { useState } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getGuitarra } from '../../data/guitarras.server';


export async function loader({ params }) {
  const { guitarrasUrl } = params;

  const guitarra = await getGuitarra(guitarrasUrl);

  if(guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }

  return guitarra
}

export function meta({data}) {

  if(!data) {
    return {
      title: 'GuitarLA - Guitarra no encontrada',
      description: 'GuitarLA - Guitarra no encontrada',
    }
  }

  return {
    title: `GuitarLA - ${data.data[0].attributes.nombre}`,
    description: `GuitarLA - ${data.data[0].attributes.nombre}`,
  }
}

function Guitarra() {

  const {agregarArticulos} = useOutletContext(); 

  const [ cantidad, setCantidad ] = useState(0);
  const guitarra = useLoaderData();
  const {nombre, imagen, precio, descripcion} = guitarra.data[0].attributes;

  function handleSubmit(e){
    e.preventDefault();

    if(cantidad === 0) {
      alert('Selecciona una cantidad');
      return;
    }

    const guitarrasSeleccionada = {
      id: guitarra.data[0].id,
      nombre,
      imagen: imagen.data.attributes.url,
      precio,
      cantidad
    }
    
    agregarArticulos(guitarrasSeleccionada);

    console.log(agregarArticulos);
  }

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} className='imagen'/>

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">

            <select id="cantidad" onChange={(e) => setCantidad(+e.target.value)} >
              <option value="0">-- Selecciona Una Cantidad --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <input type="submit" value="Agregar Al Carrito"/>

          </label>
        </form>
      </div>
    </div>
  )
}

export default Guitarra
