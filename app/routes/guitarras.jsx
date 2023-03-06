import { Outlet, useOutletContext } from '@remix-run/react'
import guitarraCSS from '~/styles/guitarras.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: guitarraCSS,
    }
  ]
}

const Tienda = () => {


  return (
    <main className="contenedor">
      <Outlet
        context={useOutletContext()}
      />
    </main>
  )
}

export default Tienda