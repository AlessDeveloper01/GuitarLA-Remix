import imagenNosotros from '../../public/img/nosotros.jpg';
import nosotrosCSS from '../styles/nosotros.css';

export function meta() {
  return {
    title: 'GuitarLA - Nosotros',
    description: 'Somos una empresa dedicada a la venta de guitarras eléctricas y acústicas'
  }
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: nosotrosCSS
    },
    {
      rel: 'preload',
      href: imagenNosotros,
      as: 'image'
    }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
        <h2 className="heading">Nosotros</h2>

        <div className="contenido">
            <img src={imagenNosotros} alt="Imagen de nosotros" />

            <div>
              <p>
                Curabitur sodales maximus dui eget tristique. Morbi luctus nec tortor sed sagittis. Curabitur dapibus vel sapien ut sagittis. Phasellus accumsan hendrerit dolor, at ullamcorper mi luctus at. Proin mi erat, consequat sit amet pharetra quis, hendrerit et sapien. Curabitur aliquet vestibulum sollicitudin. Phasellus tincidunt nibh nec ante hendrerit, quis fringilla elit semper. Nullam vestibulum, sapien id eleifend finibus, metus elit fringilla velit, quis pharetra urna mauris sit amet augue.
              </p>

              <p>
                Curabitur sodales maximus dui eget tristique. Morbi luctus nec tortor sed sagittis. Curabitur dapibus vel sapien ut sagittis. Phasellus accumsan hendrerit dolor, at ullamcorper mi luctus at. Proin mi erat, consequat sit amet pharetra quis, hendrerit et sapien. Curabitur aliquet vestibulum sollicitudin. Phasellus tincidunt nibh nec ante hendrerit, quis fringilla elit semper. Nullam vestibulum, sapien id eleifend finibus, metus elit fringilla velit, quis pharetra urna mauris sit amet augue.
              </p>
            </div>
        </div>
    </main>
  )
}

export default Nosotros