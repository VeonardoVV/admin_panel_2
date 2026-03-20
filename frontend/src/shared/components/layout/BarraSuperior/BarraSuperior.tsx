import { useEffect, useState } from "react";
import styles from "./BarraSuperior.module.css";
import { supabase } from "../../../../app/services/apiSupabase.ts";
import img from "../../../../assets/img/imgAdminPanel.png";

const Seccion_1 = () => {
  // Estados para los totales
  const [cantidadTotalProducto, setCantidadTotalProducto] = useState(0);
  const [cantidadTotalCategoria, setCantidadTotalCategoria] = useState(0);
  const [cantidadTotalMarca, setCantidadTotalMarca] = useState(0);

  useEffect(() => {
    // Función para contar registros de una tabla
    const fetchCounts = async () => {
      try {
        // Producto
        const { count: countProducto, error: errorProducto } = await supabase
          .from("producto")
          .select("*", { count: "exact" });
        if (errorProducto) throw errorProducto;
        setCantidadTotalProducto(countProducto || 0);

        // Categoria
        const { count: countCategoria, error: errorCategoria } = await supabase
          .from("categoria")
          .select("*", { count: "exact" });
        if (errorCategoria) throw errorCategoria;
        setCantidadTotalCategoria(countCategoria || 0);

        // Marca
        const { count: countMarca, error: errorMarca } = await supabase
          .from("marca")
          .select("*", { count: "exact" });
        if (errorMarca) throw errorMarca;
        setCantidadTotalMarca(countMarca || 0);

      } catch (error) {
        console.error("Error obteniendo totales:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className={styles.seccion}>
      <div className={styles.imagenPanel}>
        <img src={img} alt="Panel Admin" />
      </div>

      <div className={styles.PCM}>
        {/* Tarjeta PRODUCTOS */}
        <div className={styles.PCM1}>
          <div className={styles.cardLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(0, 5, 82)">
              <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" />
            </svg>
            <span>PRODUCTOS</span>  
          </div>
          <div className={styles.cardNumber}>{cantidadTotalProducto}</div>
        </div>

        {/* Tarjeta CATEGORIAS */}
        <div className={styles.PCM2}>
          <div className={styles.cardLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(0, 5, 82)">
              <path d="M20.59 13.41L12 4.83c-.37-.37-.88-.58-1.41-.58H4c-1.10 0-2 .90-2 2v6.59c0 .53.21 1.04.59 1.41l8.59 8.59c.78.78 2.05.78 2.83 0l6.59-6.59c.78-.78.78-2.05 0-2.83zM7.50 9C6.67 9 6 8.33 6 7.50S6.67 6 7.50 6 9 6.67 9 7.50 8.33 9 7.50 9z" />
            </svg>
            <span>CATEGORIAS</span>
          </div>
          <div className={styles.cardNumber}>{cantidadTotalCategoria}</div>
        </div>

        {/* Tarjeta MARCAS */}
        <div className={styles.PCM3}>
          <div className={styles.cardLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(0, 5, 82)">
              <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zM10 14l-3-3 1.41-1.41L10 11.17l5.59-5.59L17 7l-7 7z" />
            </svg>
            <span>MARCAS</span>
          </div>
          <div className={styles.cardNumber}>{cantidadTotalMarca}</div>
        </div>
      </div>
    </div>
  );
};

export default Seccion_1;