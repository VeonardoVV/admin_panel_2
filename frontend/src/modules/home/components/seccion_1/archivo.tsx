import { useEffect, useState } from "react";
import { supabase } from "../../../../app/services/apiSupabase";
import styles from "./archivo.module.css";

type Props = {
  id: number;
  onCerrar: () => void;
  onGuardado: () => void;
};

type Producto = {
  id_producto: number;
  img_producto_url: string;
  descripcion: string;
  precio: number;
  categoria: { nombre_categoria: string } | null;
  marca: { nombre_marca: string } | null;
  tipo: { nombre_tipo: string } | null;
};

const Archivo = ({ id, onCerrar, onGuardado }: Props) => {
  const [btnProducto, setBtnProducto] = useState<any>(null);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const fetchBtn = async () => {
      const { data, error } = await supabase
        .from("btnProducto")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error(error);
      } else {
        setBtnProducto(data);
      }
    };
    fetchBtn();
  }, []);

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const obtenerProducto = async () => {
    const { data, error } = await supabase
      .from("producto")
      .select(`
        *,
        categoria ( nombre_categoria ),
        marca ( nombre_marca ),
        tipo ( nombre_tipo )
      `)
      .eq("id_producto", id)
      .single();

    if (error) {
      console.log("Error:", error);
    } else {
      setProducto(data);
      setDescripcion(data.descripcion);
      setPrecio(data.precio.toString());

      const { data: urlData } = supabase.storage
        .from("imagenes")
        .getPublicUrl(`producto/${data.img_producto_url}`);
      setPreview(urlData.publicUrl);
    }
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = async () => {
    if (!producto) return;
    setGuardando(true);

    let nombreImagen = producto.img_producto_url;

    if (imagen) {
      const { error: uploadError } = await supabase.storage
        .from("imagenes")
        .upload(`producto/${imagen.name}`, imagen, { upsert: true });

      if (uploadError) {
        console.log("Error al subir imagen:", uploadError);
        setGuardando(false);
        return;
      }
      nombreImagen = imagen.name;
    }

    const { error } = await supabase
      .from("producto")
      .update({
        descripcion,
        precio: parseFloat(precio),
        img_producto_url: nombreImagen,
      })
      .eq("id_producto", producto.id_producto);

    if (error) {
      console.log("Error al actualizar:", error);
    } else {
      onGuardado();
    }

    setGuardando(false);
  };

  if (!producto) return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.cargando}>Cargando...</p>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2>Editar Producto <span>#{id}</span></h2>
          <button className={styles.btnCerrar} onClick={onCerrar}>✕</button>
        </div>

        <div className={styles.contenido}>

          {/* IZQUIERDA */}
          <div className={styles.imagenContainer}>
            <img src={preview} alt="producto" className={styles.imagenPreview} />

            

            <hr />

            <h3>{producto.marca?.nombre_marca}</h3> {/* 👈 corregido */}
            <p>{descripcion}</p>

            {btnProducto && (
              <button
                className={styles.btnProducto}
                style={{
                  background: `linear-gradient(to right, ${btnProducto.color_izquierda}, ${btnProducto.color_derecha})`
                }}
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/imagenes/btnProducto/${btnProducto.img_btnProducto_url}`}
                  alt="icono"
                  className={styles.iconoBtn}
                />
                {btnProducto.texto}
              </button>
            )}
            <label className={styles.btnCambiarImagen}>
              Cambiar imagen
              <input type="file" accept="image/*" hidden onChange={handleImagenChange} />
            </label>
          </div>

          {/* DERECHA */}
          <div className={styles.derecha}>
            <div className={styles.campos}>
              <label>Descripción</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <label>Precio (S/)</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />

              <label>Categoría</label>
              <input type="text" value={producto.categoria?.nombre_categoria || ""} disabled />

              <label>Marca</label>
              <input type="text" value={producto.marca?.nombre_marca || ""} disabled />

              <label>Tipo</label>
              <input type="text" value={producto.tipo?.nombre_tipo || ""} disabled />
            </div>

            <div className={styles.botones}>
              <button className={styles.btnCancelar} onClick={onCerrar}>
                Cancelar
              </button>
              <button className={styles.btnGuardar} onClick={handleGuardar} disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Archivo;