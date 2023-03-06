import { useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils'
import carritoCSS from '~/styles/carrito.css';

export function meta() {
    return {
        title: 'Carrito De Compras',
        description: 'Carrito De Compras'
    }
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: carritoCSS
        }
    ]
}

const Carrito = () => {

    const [ total, setTotal ] = useState(0);

    const { articulos, actualizarCantidad, eliminarGuitarra } = useOutletContext();

    useEffect(() => {
        const calculoTotal = articulos.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
        setTotal(calculoTotal);
    }, [articulos]);

  return (
    <ClientOnly fallback={'cargando...'}>
        {() => (
    <main className="contenedor">
        <h2 className="heading">Carrito De Compras</h2>

        <div className="contenido">
            <div className="carrito">
                <h2>Articulos</h2>

                {articulos?.length === 0 ? <p>No hay articulos en el carrito, Comienza Agregando</p> : (
                    articulos?.map( producto => (
                        <div key={producto.id} className='producto'> 

                            <div className='imagen'>
                                <img src={producto.imagen} alt={`Imagen de la guitarra ${producto.nombre}`} />
                            </div>

                            <div>
                                <p className="nombre">{producto.nombre}</p>
                                <p className="cantidad">Cantidad: </p>
                                
                                <select 
                                    value={producto.cantidad} 
                                    className='select' 
                                    onChange={ e => actualizarCantidad({
                                        id: producto.id,
                                        cantidad: Number(e.target.value)
                                })}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </select>


                                <p className="precio">Precio c/u: $ <span>{producto.precio}</span></p>
                                <p className="subtotal">Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                            </div>

                            <button
                                type='button'
                                className='btn-eliminar'
                                onClick={ () => eliminarGuitarra(producto.id)}
                            > X </button>
                        </div>
                    ))
                )}
            </div>
            
            <aside className="resumen">
                <h3>Resumen del pedido</h3>
                <p>Total a pagar: ${total}</p>
            </aside>
        </div>
    </main>
    )}
    </ClientOnly>
  )
}

export default Carrito