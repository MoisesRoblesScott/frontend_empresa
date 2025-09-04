import React from 'react'

import { EyeFill, EyeSlashFill, Trash, PencilSquare, DatabaseFillGear } from "react-bootstrap-icons";
import { Tooltip } from "react-tooltip";

const TablaEmpresas = ({ empresas, fetchEliminar, abrirlModalActualizacion }) => {
  return (
    <table className="table text-center">
        <thead className="table-dark">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nit</th>
            <th scope="col">Nombre</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">Estado</th>
            <th scope="col">
                <DatabaseFillGear className="ms-2" size={22} color="#fff" />
            </th>
        </tr>
        </thead>
        <tbody>
        {
            empresas.map((data, index) => (
            <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.nit}</td>
                <td>{data.nombre}</td>
                <td>{data.direccion}</td>
                <td>{data.telefono}</td>
                <td>
                <span
                    className={`badge d-inline-flex align-items-center ${
                    data.estado === "Activo" ? "text-bg-success" : "text-bg-danger"
                    }`}
                >
                    {data.estado}
                    {data.estado === "Activo" ? (
                    <EyeFill className="ms-2" size={16} color="#fff" />
                    ) : (
                    <EyeSlashFill className="ms-2" size={16} color="#fff" />
                    )}
                </span>
                </td>
                <td>
                <Trash id="btn-delete"className="ms-2" size={25} color="#db3545" onClick={() => fetchEliminar(data)} />
                <Tooltip anchorSelect="#btn-delete" place="bottom">
                    Eliminar empresa
                </Tooltip>

                <PencilSquare className="ms-2" size={25} color="#000000" id='btn-editar' onClick={() => abrirlModalActualizacion(data)} />
                <Tooltip anchorSelect="#btn-editar" place="bottom">
                    Editar empresa
                </Tooltip>
                </td>
            </tr>
            ))
        }
        </tbody>
    </table>
  )
}

export default TablaEmpresas
