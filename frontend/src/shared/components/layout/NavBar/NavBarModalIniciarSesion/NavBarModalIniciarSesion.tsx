import styles from "./NavBarModalIniciarSesion.module.css";
import Seccion_1 from "./components/seccion_1/seccion_1";


export default function NavBarModalIniciarSesion() {
  return (
    <div className={styles.container}>
      <Seccion_1 />
    </div>
  );
}