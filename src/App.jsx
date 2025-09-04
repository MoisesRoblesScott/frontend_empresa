import { useEffect, useState } from 'react'
import { API_BASE_URL } from './config/base_url';
import { PlusCircle } from "react-bootstrap-icons";

import Swal from "sweetalert2";
import TablaEmpresas from './components/TablaEmpresas';
import ModalCrearActualizar from './components/ModalCrearActualizar';

import 'react-tooltip/dist/react-tooltip.css';
import './App.css'

function App() {
  const [listaEmpresas, setlistaEmpresas] = useState([])
  const [empresa, setEmpresa]             = useState(null)
  const [verModal, setVerModal]           = useState(false)
  const [errores, setErrores]             = useState([]);
  const [tituloModal, setTituloModal]     = useState('');
  const [metodoHttp, setMetodoHttp]       = useState('');
 
  const fetchEmpresas = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/empresas`);
      if (!res.ok) throw new Error('Error al obtener empresas');
      const data = await res.json();
      setlistaEmpresas(data.data);
    } catch (err) {
      console.error('Error al listar datos:', err);
    }
  };

  useEffect(() => {
    fetchEmpresas()
  }, []);
  
  const abrirlModalActualizacion = (empresa) => {
    setTituloModal('Editar Empresa')
    setMetodoHttp('PUT')
    setEmpresa(empresa);
    setVerModal(true)
  };

  const abrirlModalCreacion = () => {
    setEmpresa({ nombre: "", direccion: "", telefono: "", estado: "Activo" });
    setTituloModal('Registrar Empresa')
    setMetodoHttp('POST')
    setVerModal(true)
  };

  const fetchActualizarCrear = async() => {
    try {
      let url = `${API_BASE_URL}/api/empresas`
      let message = "Creado Exitosamente";
      if(metodoHttp === 'PUT'){
        message = "Actualizado Exitosamente";
        url = `${API_BASE_URL}/api/empresas/${empresa.nit}`
      }
      const body = JSON.stringify(empresa);

      const respuesta = await fetch(url, {
        method: metodoHttp,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await respuesta.json();
      
      if (!data.success) {
        if (data.errors) {
          const mensajes = Object.values(data.errors).flat();
          setErrores(mensajes);
        } else {
          setErrores([data.message || "Error desconocido"]);
        }
        return;
      }

      setErrores([]);
      await fetchEmpresas();
      cerrarModal()

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      setErrores(["Error de conexión con el servidor"]);
      console.error("Error al actualizar:", err);
    }
  }

  const fetchEliminar = async(empresa) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la empresa ${empresa.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const respuesta = await fetch(`${API_BASE_URL}/api/empresas/${empresa.nit}`, {
        method: 'DELETE',
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        await fetchEmpresas();
        await Swal.fire({title: data.message, icon: "success"});
      }else{
        await Swal.fire('Error', data.error, 'error');
        return;
      }
    }
  }

  const cerrarModal = () => {
    setVerModal(false);
    setTimeout(() => {
      const btn = document.getElementById('botonAbrirModal');
      if(btn) {
        btn.focus();
      }
    }, 100);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center text-primary">CRUD EMPRESAS</h1>
        <div className="card shadow mt-4">
          <div className="card-body">
            <div className='mb-2 text-lg-end'>
              <button type="button" className="btn btn-dark" onClick={abrirlModalCreacion} id='botonAbrirModal'>
                Registrar <PlusCircle className="ms-2" size={22} color="#fff" />
              </button>
            </div>
            <TablaEmpresas empresas={listaEmpresas} fetchEliminar={fetchEliminar} abrirlModalActualizacion={abrirlModalActualizacion} />
          </div>
        </div>
      </div>

      <ModalCrearActualizar 
        tituloModal={tituloModal} 
        metodoHttp={metodoHttp} 
        verModal={verModal} 
        fetchActualizarCrear={fetchActualizarCrear} 
        setVerModal={setVerModal} 
        empresa={empresa}
        setEmpresa={setEmpresa}
        errores={errores}
        cerrarModal={cerrarModal}
      />
    </>
  )
}

export default App
