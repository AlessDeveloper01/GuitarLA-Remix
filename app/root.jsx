import { useState, useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link
} from '@remix-run/react';

import styles from '~/styles/index.css';
import Header from '~/components/header';
import Footer from './components/footer';

export function meta() {
    return (
        {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1.0",
            title: "GuitarLA Remix",
        }
    )
}

export function links() {
    return [
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel: "stylesheet",
            href: styles,
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
        }
    ]
}



export default function App() {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
    const [ articulos, setArticulos ] = useState(carritoLS);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(articulos));
    }, [articulos]);
    
    const agregarArticulos = (guitarra) => {
        if(articulos.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Registro existente actualizar cantidad
             // 1. Iterar sobre el arreglo de articulos e identificar el articulo que se quiere actualizar
             const articuloActualizado = articulos.map( guitarraState => {
                if(guitarraState.id == guitarra.id) {
                    // 2. Actualizar la cantidad
                    guitarraState.cantidad = guitarra.cantidad;
                }
                
                return guitarraState;
             })

             setArticulos(articuloActualizado);

        } else {
            // registro nuevo agregar a articulos
            setArticulos([...articulos, guitarra]);
        }
    }

    const actualizarCantidad = (guitarra) => {
        const articuloActualizado = articulos.map( guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad;
            }
            return guitarraState;
        })

        setArticulos(articuloActualizado);
    }

    const eliminarGuitarra = (id) => {
        const articulosActualizados = articulos.filter(guitarraState => {
            return guitarraState.id !== id;            
        })

        setArticulos(articulosActualizados);
    }

    return (
        <Document>
            <Outlet
                context={{
                    agregarArticulos,
                    articulos,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    );
}

function Document({children}) {
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>

            <body>
                <Header />
                
                {children}

                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    )   
}

/*** Manejo de errores ***/

export function CatchBoundary() {
    const error = useCatch();
    return (
        <Document>
            <p className="error">{error.status } {error.statusText}</p>
            <Link className='error__enlace' to="/">Talvez Quieras Regresar A La Pagina Principal</Link>
        </Document>
    )
}

export function ErrorBoundary({error}) {
    return (
        <Document>
            <p className="error">{error.status } {error.statusText}</p>
            <Link className='error__enlace' to="/">Talvez Quieras Regresar A La Pagina Principal</Link>
        </Document>
    )
}