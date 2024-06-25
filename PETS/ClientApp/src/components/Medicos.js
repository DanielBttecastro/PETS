import React, { Component, useState, useRef, useEffect } from 'react';
import '../css/Admin/admin.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, ListInlineItem } from 'reactstrap';

import { useNavigate } from 'react-router-dom';



export function Medicos(args) {

    const navigate = useNavigate();
    const [Esmodif, setEsmodif] = useState(false);
    const [esvisible, setEsvisible] = useState(true);
    const [medicos, setMedicos] = useState([]);
    const [ITEliminar, setITEliminar] = useState([]);
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [token, setToken] = useState('');
    const [idEliminar, setIdEliminar] = useState('');
    const [idModificar, setIdMoficar] = useState('');

    const [ModalEliminar, setModalEliminar] = useState(false);

    const EliminarMod = () => setModalEliminar(!ModalEliminar);

    const Listar = async () => {
        const Listar = await fetch("api/Mascotas/ListarMedico");
        if (Listar.status == 200) {
            setMedicos(await Listar.json());
        }
    }

    const LlamarModificar = async (id) => {
        const MedicosMod = await fetch("api/Medicos/BuscarMedicos/" + id)
        const MedicosM = await MedicosMod.json();
        setCedula(MedicosM.cedulaMedico);
        setNombre(MedicosM.nombreMedico);
        setApellido(MedicosM.apellidoMedico);
        setCorreo(MedicosM.correoMedico);
        setContraseña(MedicosM.contraseniaMedico);
        setTelefono(MedicosM.telefonoMedico);
        setEsmodif(true);
        setIdMoficar(id);
        setEsvisible(false);
    }

    const Eliminaritems = async (id) => {
        const itemsEliminar = await fetch("api/Clientes/BuscarMascota/" + id)
        setITEliminar(await itemsEliminar.json());
        setIdEliminar(id);
        console.log(id);
        EliminarMod();
    }

    const Eliminar = async () => {
        alert(idEliminar);
        ITEliminar.forEach(async (item) => {
            const response = await fetch("api/Medicos/EliminarInt/" + item.idMascota, {
                method: "DELETE"
            });
        })
        const response = await fetch("api/Medicos/Eliminar/" + idEliminar, {
            method: "DELETE"
        });
        console.log(response.status);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Eliminado correctamente'
            })
            Listar();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al eliminar'
            })
        }
    }

    const GuardarCliente = async () => {
        if (cedula === '' || nombre === '' || apellido === '' || correo === '' || contraseña === '' || telefono === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const ultimoObjeto = medicos[medicos.length - 1];
        var id = ultimoObjeto.idMedico
        const Medico = {
            idMedico: id + 1,
            nombreMedico: nombre,
            apellidoMedico: apellido,
            correoMedico: correo,
            contraseniaMedico: contraseña,
            telefonoMedico: telefono,
            cedulaMedico: cedula,
            tokenMedico: String(id + 1) + String(cedula)
        };
        const response = await fetch("api/Medicos/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medico)
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
            setCorreo('');
            setContraseña('    ');
            setTelefono('');
            Listar();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al registrar '
            })
        }

    }

    const modificar = async () => {
        if (cedula === '' || nombre === '' || apellido === '' || correo === '' || contraseña === '' || telefono === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Medico = {
            idMedico: idModificar,
            nombreMedico: nombre,
            apellidoMedico: apellido,
            correoMedico: correo,
            contraseniaMedico: contraseña,
            telefonoMedico: telefono,
            cedulaMedico: cedula,
            tokenMedico: ''
        };
        const response = await fetch("api/Medicos/Modificar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Medico)
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
            setCorreo('');
            setContraseña('');
            setTelefono('');
            setEsmodif(false);
            setEsvisible(true);
            Listar();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al modificar '
            })
        }
    }

    const cancelar = () => {
        setCedula('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setContraseña('');
        setTelefono('');
        setEsmodif(false);
        setEsvisible(true);
    }

    const Token = async () => {
        if (cedula === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Para generar el token el campo cedula no debe estar vacio'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const ultimoObjeto = medicos[medicos.length - 1];
        var id = ultimoObjeto.idMedico
        const token = String(id + 1) + String(cedula);


        id = id + 1;
        const response = await fetch("api/Medicos/Token/" + cedula + "/" + token + "/" + id);
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'El token generado es ' + token
            });
            setCedula('');
            setNombre('');
            setApellido('');
            setCorreo('');
            setContraseña('    ');
            setTelefono('');
            Listar();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al registrar '
            })
        }

    }

    useEffect(() => {
        Listar()
        document.body.style.overflow = document.hidden ? 'hidden' : 'auto';
        const sesionIniciada = localStorage.getItem('SesionIniciada');
        if (sesionIniciada == null) {
            navigate('/');
        }
    }, []);
    return (
        <>
            <div className='row text-center' >
                <h1>Administar Medicos</h1>
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
                        <input type="text" required value={correo} onChange={(e) => { setCorreo(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Correo</label>
                    </div>
                    <div class="group">
                        <input type="text" required value={contraseña} onChange={(e) => { setContraseña(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Contraseña</label>
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
                            <button class="custom-btn btn-Modificar" onClick={modificar}  ><span>Modificar</span></button>
                            <button class="custom-btn btn-5" onClick={cancelar} style={{ marginLeft: '50px' }}><span>Cancelar</span></button></>)
                        :
                        (<>
                            <button class="custom-btn btn-Guardar" onClick={GuardarCliente}  ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" hidden ><span>Modificar</span></button></>)}
                    <button class="custom-btn btn-3" style={{ marginLeft: '50px' }} onClick={Token}> <span>Generar Token</span></button>
                </div>
                <div>

                </div>
            </div >
            <div className='Contenedor'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Cedula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Token</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicos.map((item) => {
                                return (
                                    <tr key={item.idMedico}>
                                        <td data-label="cedulaMedico">{item.cedulaMedico}</td>
                                        <td data-label="nombreMedico">{item.nombreMedico}</td>
                                        <td data-label="apellidoMedico">{item.apellidoMedico}</td>
                                        <td data-label="correoMedico">{item.correoMedico}</td>
                                        <td data-label="contraseniaMedico">{item.contraseniaMedico}</td>
                                        <td data-label="telefonoMedico">{item.telefonoMedico}</td>
                                        <td data-label="tokenMedico">{item.tokenMedico}</td>
                                        <td data-label="administracion"> <button class="custom-btn btn-4" onClick={() => { LlamarModificar(item.idMedico) }} ><span>Modificar</span></button> <button class="custom-btn btn-5" onClick={(e) => {

                                            Eliminaritems(item.idMedico)
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

                        {ITEliminar.length > 0 ? (
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

                                            ITEliminar.map((item) => {

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