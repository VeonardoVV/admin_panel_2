import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";
import img1 from "../../../../assets/img/baseDatos.png";


export default function AdminPanel() {
    // del boton de base de datos modal
    const [mostrarModal, setMostrarModal] = useState(false);

    const [activo, setActivo] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

  // Configuración de botones y rutas
    const botones = [
        { label: "productos", path: "/home" },
        { label: "categorias", path: "/categoria" },
        { label: "marcas", path: "/marca" },
    ];
    return(
        <div className={styles.adminPanel}>
            <div className={styles.botones_y_BD}>
                <div>
                    {botones.map((b) => (
                        <button
                            key={b.path}
                            onClick={() => navigate(b.path)}
                            style={{
                                borderColor: location.pathname === b.path ? "orange" : "#9DABB8"
                            }}
                        >
                            {b.label}
                        </button>
                    ))}
                    {/* Categorías */}
                    
                </div>
                <div className={styles.botonBaseDatos}>
                    <button onClick={() => setMostrarModal(true)}>
                    <img src={img1} alt="imagen no disponible" />
                        Base de Datos 
                    </button>
                    {/* modal de la base de datos */}
                    {mostrarModal && (
                        <div className={styles.modalFondo} onClick={() => setMostrarModal(false)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <button>importar excel</button>
                            <button>exportar excel</button>
                        </div>
                        </div>
                    )}
                    
                </div>
            </div>
            <div className={styles.toggle_cajaBusqueda}>
                <div
                    onClick={() => setActivo(!activo)}
                    style={{
                        top: "6px",
                        width: "60px",
                        height: "25px",
                        background: activo ? "#4ade80" : "#ccc",
                        borderRadius: "30px",
                        position: "relative",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    >
                    <div
                        style={{
                        width: "20px",
                        height: "20px",
                        background: "white",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "2px",
                        left: activo ? "38px" : "2px",
                        transition: "0.3s"
                        }}
                    />
                </div>
                <p>mostrar productos sin imagenes</p>
                <div className={styles.search_container}>
                    <input type="text" placeholder="Buscar..." className={styles.search_input} />
                    <button className={styles.search_button}>🔍</button>
                </div>
            </div>
        </div>
    );
};
