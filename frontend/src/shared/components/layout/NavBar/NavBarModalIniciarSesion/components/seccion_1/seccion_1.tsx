import styles from "./seccion_1.module.css";
import { Link } from "react-router-dom";

export default function Seccion_1() {
  return (
    <div className={styles.contenido}>
      <h2>Cuenta</h2>

      <div className={styles.IniciarSesion}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          width="15"
          height="15"
          fill="currentColor"
        >
          <path d="M858.5 763.6a374 374 0 00-80.6-119.5..." />
        </svg>

        <Link to="/Auth">
          <button>Iniciar Sesión</button>
        </Link>
      </div>

      <div className={styles.registrarse}>
        <button>Registrarse</button>
      </div>
    </div>
  );
}