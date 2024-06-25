import React, { Component, useState, useRef, useEffect } from 'react';
import '../css/Admin/admin.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, ListInlineItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



export function Clientes(args) {
    const navigate = useNavigate();

    const [Esmodif, setEsmodif] = useState(false);
    const [esvisible, setEsvisible] = useState(true);
    const [Cliente, setCliente] = useState([]);
    const [ClienteMod, setClienteMod] = useState([]);
    const [mascotasEliminar, setMascotasEliminar] = useState([]);
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDirrecion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idEliminar, setIdEliminar] = useState('');

    const [ModalEliminar, setModalEliminar] = useState(false);

    const EliminarMod = () => setModalEliminar(!ModalEliminar);

    const ListarCliente = async () => {
        const ListarCliente = await fetch("api/Mascotas/ListarCliente");
        if (ListarCliente.status == 200) {
            setCliente(await ListarCliente.json());
        }
    }

    const LlamarModificar = async (id) => {
        const ClienteMod = await fetch("api/Clientes/BuscarCliente/" + id)
        const ClientM = await ClienteMod.json();
        setCedula(ClientM.cedula);
        setNombre(ClientM.nombreCliente);
        setApellido(ClientM.apellidoCliente);
        setDirrecion(ClientM.direccion);
        setTelefono(ClientM.telefono);
        setEsmodif(true);
        setEsvisible(false);
    }

    const EliminarCliente = async (id) => {
        const MascotEliminar = await fetch("api/Clientes/BuscarMascota/" + id)
        setMascotasEliminar(await MascotEliminar.json());
        setIdEliminar(id);
        console.log(mascotasEliminar);
        EliminarMod();
    }

    const Eliminar = async () => {

        mascotasEliminar.forEach(async (item) => {
            const response = await fetch("api/Clientes/EliminarInt/" + item.idMascota, {
                method: "DELETE"
            });
        })
        const response = await fetch("api/Clientes/Eliminar/" + idEliminar, {
            method: "DELETE"
        });
        console.log(response.status);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Eliminado correctamente'
            })
            ListarCliente();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al eliminar'
            })
        }
    }

    const GuardarCliente = async () => {
        if (cedula === '' || nombre === '' || apellido === '' || direccion === '' || telefono === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Cliente = {
            cedula: cedula,
            nombreCliente: nombre,
            apellidoCliente: apellido,
            direccion: direccion,
            telefono: telefono
        };
        const response = await fetch("api/Clientes/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cliente)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Agregado correctamente'
            });
            setCedula('');
            setNombre('');
            setApellido('');
            setDirrecion('');
            setTelefono('');
            ListarCliente();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al registrar '
            })
        }

    }

    const modificarCliente = async () => {
        if (cedula === '' || nombre === '' || apellido === '' || direccion === '' || telefono === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Cliente = {
            cedula: cedula,
            nombreCliente: nombre,
            apellidoCliente: apellido,
            direccion: direccion,
            telefono: telefono
        };
        const response = await fetch("api/Clientes/Modificar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cliente)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Modificado correctamente'
            });
            setCedula('');
            setNombre('');
            setApellido('');
            setDirrecion('');
            setTelefono('');
            setEsmodif(false);
            setEsvisible(true);
            ListarCliente();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al modificar '
            })
        }
    }

    const cancelar = () => {
        setEsvisible(true);
        setCedula('');
        setNombre('');
        setApellido('');
        setDirrecion('');
        setTelefono('');
        setEsmodif(false);
        ListarCliente();
    }
    useEffect(() => {
        ListarCliente()
        document.body.style.overflow = document.hidden ? 'hidden' : 'auto';
        const sesionIniciada = localStorage.getItem('SesionIniciada');
        if (sesionIniciada == null) {
            navigate('/');
        }

    }, []);
    return (
        <>
            <div className='row text-center' >
                <h1>Administar Clientes</h1>
                <div className='col-6 column1'>
                    {esvisible ? (<div class="group">
                        <input type="number" required value={cedula} onChange={(e) => { setCedula(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Cedula</label>
                    </div>) : null}


                    <div class="group">
                        <input type="text" required value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Nombre</label>
                    </div>

                    <div class="group">
                        <input type="text" required value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Apellido</label>
                    </div>


                </div>
                <div className='col-6 column2'>

                    <div class="group">
                        <input type="text" required value={direccion} onChange={(e) => { setDirrecion(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Dirección</label>
                    </div>
                    <div class="group">
                        <input type="number" required value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Telefono</label>
                    </div>


                </div>
                <div>
                    {Esmodif ?
                        (<>
                            <button class="custom-btn btn-Guardar" hidden ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" onClick={modificarCliente}  ><span>Modificar</span></button>
                            <button class="custom-btn btn-5" onClick={cancelar} style={{ marginLeft: '50px' }}><span>Cancelar</span></button></>)
                        :
                        (<>
                            <button class="custom-btn btn-Guardar" onClick={GuardarCliente} ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" onClick={modificarCliente} hidden ><span>Modificar</span></button></>)}

                </div>
                <div>

                </div>
            </div>
            <div className='Contenedor'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Cedula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Telefono</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Cliente.map((item) => {
                                return (
                                    <tr key={item.cedula}>
                                        <td data-label="cedula">{item.cedula}</td>
                                        <td data-label="nombreCliente">{item.nombreCliente}</td>
                                        <td data-label="apellidoCliente">{item.apellidoCliente}</td>
                                        <td data-label="direccion">{item.direccion}</td>
                                        <td data-label="telefono">{item.telefono}</td>
                                        <td data-label="administracion"> <button class="custom-btn btn-4" onClick={() => { LlamarModificar(item.cedula) }} ><span>Modificar</span></button> <button class="custom-btn btn-5" onClick={(e) => {

                                            EliminarCliente(item.cedula)
                                        }}><span>Eliminar</span></button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
                <Modal isOpen={ModalEliminar} toggle={EliminarMod} {...args}>
                    <ModalHeader toggle={EliminarMod}>Eliminar Cliente</ModalHeader>
                    <ModalBody>

                        {mascotasEliminar.length > 0 ? (
                            <div >
                                Las siguientes mascotas Pertenecen a este dueño si elimina el Dueño las mascotas tambien se eliminaran
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Identificador</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Edad</th>
                                            <th scope="col">Peso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            mascotasEliminar.map((item) => {

                                                return (
                                                    <tr key={item.idMascota}>
                                                        <td data-label="medicamento">{item.idMascota}</td>
                                                        <td data-label="dosis">{item.nombreMascota}</td>
                                                        <td data-label="dosis">{item.edadMascota}</td>
                                                        <td data-label="dosis">{item.pesoMascota}</td>
                                                    </tr>
                                                );
                                            })
                                        }

                                    </tbody>
                                </table> </div>) : (
                            <div className='text-center'>
                                <div className="swal2-icon swal2-warning swal2-icon-show" style={{ display: 'flex' }}><div className="swal2-icon-content">!</div></div>
                                <h1>¿Estás seguro?</h1><br></br>
                                <h4>Esta acción no se puede deshacer</h4>
                            </div>
                        )}


                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={EliminarMod}>
                            Cancelar
                        </Button>
                        <Button color="primary" onClick={() => { Eliminar(); EliminarMod(); }}>
                            Sí, eliminar
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        </>
    )
};