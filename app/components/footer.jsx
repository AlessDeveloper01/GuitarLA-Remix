import Navegacion from "./navegacion"

const Footer = () => {
  return (
    <footer className="footer">
        <div className="contenedor contenido">
            <Navegacion />

            <p className="copyrigth">Todos Los Derechos Reservados &copy; Aless Developer { new Date().getFullYear() }</p>
        </div>
    </footer>
  )
}

export default Footer