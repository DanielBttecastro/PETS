import React, { Component, useState, useRef, useEffect } from 'react';
import '../css/Admin/admin.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, ListInlineItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';




export function Razas(args) {

const navigate = useNavigate();
    const [Esmodif, setEsmodif] = useState(false);
    const [esvisible, setEsvisible] = useState(true);
    const [razas, setRazas] = useState([]);
    const [ITEliminar, setITEliminar] = useState([]);
    const [idRaza, setIdRaza] = useState('');
    const [nombre, setNombre] = useState('');
    const [idEliminar, setIdEliminar] = useState('');
    const [idModificar, setIdMoficar] = useState('');

    const [ModalEliminar, setModalEliminar] = useState(false);

    const EliminarMod = () => setModalEliminar(!ModalEliminar);

    const Listar = async () => {
        const Lista = await fetch("api/Mascotas/ListarRazas");
        if (Lista.status == 200) {
            setRazas(await Lista.json());
        }
    }
    const cancelar = () => {
        setIdRaza('');
        setNombre('');
        setEsmodif(false);
        setEsvisible(true);
    }
    const LlamarModificar = async (id) => {
        const RazaMod = await fetch("api/Razas/BuscarRazas/" + id)
        const RazaM = await RazaMod.json();
        setIdRaza(RazaM.idRaza);
        setNombre(RazaM.nombre);
        setEsmodif(true);
        setIdMoficar(id);
        setEsvisible(false);
    }

    const Guardar = async () => {
        if (idRaza === '' || nombre === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const RazaG = {
            idRaza: idRaza,
            nombre: nombre
        };
        const response = await fetch("api/Razas/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RazaG)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Agregado correctamente'
            });
            setIdRaza('');
            setNombre('');
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
        if (idRaza === '' || nombre === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const RazaG = {
            idRaza: idRaza,
            nombre: nombre
        };
        const response = await fetch("api/Razas/Modificar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RazaG)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Modificado correctamente'
            });
            setIdRaza('');
            setNombre(''); 
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
        const Eliminaritems = async (id) => {
            const itemsEliminar = await fetch("api/Razas/BuscarMascota/" + id)
            setITEliminar(await itemsEliminar.json());
            setIdEliminar(id);
            console.log(id);
            EliminarMod();
        }
    
        const Eliminar = async () => {
            alert(idEliminar);
            ITEliminar.forEach(async (item) => {
                const response = await fetch("api/Razas/EliminarInt/" + item.idMascota, {
                    method: "DELETE"
                });
            })
            as();
        }

        const as= async()=>{
            const response = await fetch("api/Razas/Eliminar/" + idEliminar, {
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
                <h1>Administar Razas</h1>
                <div className='col-6 column1'>
                    {esvisible ? (<div class="group">
                        <input type="number" required value={idRaza} onChange={(e) => { setIdRaza(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Codigo</label>
                    </div>) : null}






                </div>
                <div className='col-6 column2'>

                    <div class="group">
                        <input type="text" required value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Nombre</label>
                    </div>

                </div>
                <div>
                    {Esmodif ?
                        (<>
                            <button class="custom-btn btn-Guardar" hidden ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar"  onClick={modificar} ><span>Modificar</span></button>
                            <button class="custom-btn btn-5" onClick={cancelar} style={{ marginLeft: '50px' }}><span>Cancelar</span></button>
                        </>)
                        :
                        (<>
                            <button class="custom-btn btn-Guardar" onClick={Guardar}  ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" hidden ><span>Modificar</span></button></>)}
                </div>
                <div>

                </div>
            </div >
            <div className='Contenedor'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            razas.map((item) => {
                                return (
                                    <tr key={item.idRazas}>
                                        <td data-label="cedulaMedico">{item.idRaza}</td>
                                        <td data-label="nombreMedico">{item.nombre}</td>
                                        <td data-label="administracion"> <button class="custom-btn btn-4" onClick={() => { LlamarModificar(item.idRaza) }} ><span>Modificar</span></button> <button class="custom-btn btn-5" onClick={(e) => {

                                            Eliminaritems(item.idRaza)
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