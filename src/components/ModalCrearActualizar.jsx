import React from 'react'
import { Modal, Button } from "react-bootstrap";

const ModalCrearActualizar = ({tituloModal, metodoHttp, verModal, fetchActualizarCrear, setVerModal, empresa, setEmpresa, errores, cerrarModal }) => {
  const cambioInput = (e) => {
    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={verModal} onHide={cerrarModal} restoreFocus={true} >
        <Modal.Header closeButton className=''>
          <Modal.Title> {tituloModal} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <>
              {
                errores.length > 0 && (
                  <div className="alert alert-danger">
                    <ul className="mb-0">
                      {errores.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )
              }

              <form>
                {
                  metodoHttp === 'POST' && (
                    <div className="mb-3">
                      <label className="form-label">Nit</label>
                      <input type="text" autoFocus className="form-control" name='nit' value={empresa?.nit || ""} onChange={cambioInput} />
                    </div>
                  )
                }

                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name='nombre' value={empresa?.nombre || ""} onChange={cambioInput} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" className="form-control" name='direccion' value={empresa?.direccion || ""} onChange={cambioInput} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="text" className="form-control" name='telefono' value={empresa?.telefono || ""} onChange={cambioInput} />
                </div>

                {
                  metodoHttp === 'PUT' && (
                    <div className="mb-3">
                      <label className="form-label">Estado</label>
                      <select name="estado" id="estado" className="form-select" value={empresa?.estado || "Activo"} onChange={cambioInput}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  )
                }
              </form>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVerModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={fetchActualizarCrear}>Guardar</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalCrearActualizar