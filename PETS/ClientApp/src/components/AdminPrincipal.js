import React, { Component, useState, useRef, useEffect } from 'react';
import '../css/Admin/admin.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, ListInlineItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



export function AdminPrincipal(args) {

    const navigate = useNavigate();
    const [idmod, setIdmod] = useState();
    const [Esmodif, setEsmodif] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    //Variables para cargar mascotas
    const [Mascotas, setMascotas] = useState([]);
    const [Medico, setMedico] = useState([]);
    const [Cliente, setCliente] = useState([]);
    const [Intermedia, setIntermedia] = useState([]);
    const [Medicamento, setMedicamento] = useState([]);
    const [Razas, setRazas] = useState([]);
    const [tratamiento, setTratamiento] = useState([]);
    const [tratamientoaux, setTratamientoaux] = useState([]);
    //Varibales para guardar
    const [identificador, setIdentificador] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [dueño, setDueño] = useState('-1');
    const [raza, setRaza] = useState('-1');
    const [medico, setMedicoG] = useState('-1');
    const [nuevoTratamiento, setNuevoTratamiento] = useState([]);
    const [nuevoMedicamento, setNuevoMedicamento] = useState('');
    const [nuevaDosis, setNuevaDosis] = useState('');
    const [nuevoMedicamentoaux, setNuevoMedicamentoaux] = useState('');
    const [nuevaDosisaux, setNuevaDosisaux] = useState('');

    const ListarMascotas = async () => {
        const ListMascotas = await fetch("api/Mascotas/ListarMascotas");
        const ListarMedico = await fetch("api/Mascotas/ListarMedico");
        const ListarCliente = await fetch("api/Mascotas/ListarCliente");
        const ListarIntermedia = await fetch("api/Mascotas/ListarIntermedia");
        const ListarMedicamento = await fetch("api/Mascotas/ListarMedicamento");
        const ListarRazas = await fetch("api/Mascotas/ListarRazas");

        if (ListMascotas.status == 200 && ListarMedico.status == 200 && ListarCliente.status == 200 && ListarIntermedia.status == 200 && ListarMedicamento.status == 200 && ListarRazas.status == 200) {

            setMascotas(await ListMascotas.json());
            setRazas(await ListarRazas.json());
            setCliente(await ListarCliente.json());
            setMedico(await ListarMedico.json());
            setIntermedia(await ListarIntermedia.json());
            setMedicamento(await ListarMedicamento.json());
        }
    }

    const GuardarMascota = async () => {
        if (identificador === '' || nombre === '' || edad === '' || peso === '' || raza === '-1' || dueño === '-1' || medico === '-1') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Mascota = {
            IdMascota: identificador,
            NombreMascota: nombre,
            EdadMascota: edad,
            PesoMascota: peso,
            ClienteCedula: dueño,
            IdRaza: raza
        };
        const response = await fetch("api/Mascotas/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Mascota)
        });
        if (response.status == 200) {
            if (nuevoTratamiento.length > 0) {
                try {
                    const ultimoObjeto = Intermedia[Intermedia.length - 1];
                    var id = ultimoObjeto.idIntermedia
                    nuevoTratamiento.map(async (item) => {
                        const medicam = Medicamento.find((md) => md.nombreMedicamento === item.nuevoMedicamento)
                        id = id + 1
                        const Tratamiento = {
                            idIntermedia: id,
                            IdMedicamento: medicam.idMedicamento,
                            IdMascota: identificador,
                            Dosis: item.nuevaDosis,
                            IdMedico: medico
                        }
                        console.log(Tratamiento);
                        const response2 = await fetch("api/Mascotas/Guardarint", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(Tratamiento)
                        })
                    })
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial',
                        text: 'Agregado correctamente'
                    })
                    setIdentificador('');
                    setNombre('');
                    setEdad('');
                    setPeso('');
                    setDueño('-1');
                    setRaza('-1');
                    setMedicoG('-1');
                    setNuevoTratamiento([]);
                    ListarMascotas();
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al registrar ', err
                    })
                }


            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Genial',
                    text: 'Agregado correctamente'
                })
                setIdentificador('');
                setNombre('');
                setEdad('');
                setPeso('');
                setDueño('-1');
                setRaza('-1');
                setMedicoG('-1');
                setNuevoTratamiento([]);
                ListarMascotas();
            }
        } else {
            const data = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }


    const cargarTratamientos = (id) => {
        setTratamiento(Intermedia.filter(intermedia => intermedia.idMascota === id));
        toggle();

    }

    const CrearTratamientos = () => {
        if (nuevoMedicamento.trim() === '' || nuevaDosis.trim() === '') {
            return; // No agrega tratamiento si los campos están vacíos
        }
        const nuevo = { nuevoMedicamento, nuevaDosis };
        setNuevoTratamiento([...nuevoTratamiento, nuevo]);
    }

    const EliminarTratamientos = (medicamento, dosis) => {
        setNuevoTratamiento(nuevoTratamiento.filter(
            (tratamiento) => tratamiento.nuevoMedicamento !== medicamento && tratamiento.nuevaDosis !== dosis
        ));

    }

    const eliminarMascota = async (id) => {
        const response = await fetch("api/Mascotas/Eliminar/" + id, {
            method: "DELETE"
        });
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Eliminado correctamente'
            })
            ListarMascotas();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al eliminar'
            })
        }
    }

    const llamarModificarMascota = async (id) => {
        setIsVisible(false);
        setTratamientoaux([]);
        setIdmod(id);
        setTratamientoaux(Intermedia.filter(intermedia => intermedia.idMascota === id));
        setEsmodif(true);
        setNuevoTratamiento([]);
        const mascotaBuscada = await fetch("api/Mascotas/BuscarMascota/" + id);
        const data = await mascotaBuscada.json();
        setIdentificador(data.idMascota);
        setNombre(data.nombreMascota);
        setEdad(data.edadMascota);
        setPeso(data.pesoMascota);
        setDueño(data.clienteCedula);
        setRaza(data.idRaza);
        setMedicoG('-1');
        const m = Intermedia.filter((m) => m.idMascota === id);
        m.forEach((item) => {
            const med = Medicamento.find((med) => med.idMedicamento === item.idMedicamento);
            setNuevoMedicamento(med.nombreMedicamento);
            setNuevaDosis(item.dosis);
            CrearTratamientos();
        });
        console.log(nuevoTratamiento);
    }

    const llamartratamientosMod = async () => {
        tratamientMod();
    }


    const ModificarMascota = async () => {
        if (identificador === '' || nombre === '' || edad === '' || peso === '' || raza === '-1' || dueño === '-1' || medico === '-1') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Mascota = {
            IdMascota: identificador,
            NombreMascota: nombre,
            EdadMascota: edad,
            PesoMascota: peso,
            ClienteCedula: dueño,
            IdRaza: raza
        };
        const response = await fetch("api/Mascotas/ModificarMascota/" + idmod, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Mascota)
        });
        if (response.status == 200) {
            const response2 = await fetch("api/Mascotas/EliminarIntermedia/" + idmod, {
                method: "DELETE"
            });

            if (response2.status == 200) {
                if (tratamientoaux.length > 0) {
                    try {

                        const ultimoObjeto = Intermedia[Intermedia.length - 1];
                        var id = ultimoObjeto.idIntermedia
                        tratamientoaux.map(async (item) => {
                            id = id + 1
                            console.log(item)
                            const Tratamiento = {
                                idIntermedia: id,
                                IdMedicamento: item.idMedicamento,
                                IdMascota: identificador,
                                Dosis: item.dosis,
                                IdMedico: item.idMedico
                            }
                            const response2 = await fetch("api/Mascotas/Guardarint", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(Tratamiento)
                            })
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial',
                            text: 'Agregado correctamente'
                        })
                        setIsVisible(true);
                        setEsmodif(false);
                        setIdentificador('');
                        setNombre('');
                        setEdad('');
                        setPeso('');
                        setDueño('-1');
                        setRaza('-1');
                        setMedicoG('-1');
                        setNuevoTratamiento([]);
                        setTratamientoaux([]);
                        ListarMascotas();
                    } catch (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error al registrar ', err
                        })
                    }


                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial',
                        text: 'Agregado correctamente'
                    })
                    setIdentificador('');
                    setNombre('');
                    setEdad('');
                    setPeso('');
                    setDueño('-1');
                    setRaza('-1');
                    setMedicoG('-1');
                    setNuevoTratamiento([]);
                    ListarMascotas();
                }
            }
        } else {
            const data = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }

    const cancelar = () => {
        setIsVisible(true);
        setEsmodif(false);
        setIdentificador('');
        setNombre('');
        setEdad('');
        setPeso('');
        setDueño('-1');
        setRaza('-1');
        setMedicoG('-1');
        setNuevoTratamiento([]);
        setTratamientoaux([]);
        ListarMascotas();
    }

    useEffect(() => {
        ListarMascotas()
        document.body.style.overflow = document.hidden ? 'hidden' : 'auto';
        const sesionIniciada = localStorage.getItem('SesionIniciada'); 
        if (sesionIniciada == null) {
            navigate('/');
        }
    }, []);

    const [modal, setModal] = useState(false);

    const [modalTratamiento, setModalTratamiento] = useState(false);

    const [modalTratamientoMod, setModalTratamientoMod] = useState(false);

    const tratamientMod = () => setModalTratamientoMod(!modalTratamientoMod);
    const toggle = () => setModal(!modal);

    const tratamient = () => setModalTratamiento(!modalTratamiento);
    return (
        <>
            <div className='row text-center' >
                <h1>Administar Mascotas</h1>
                <div className='col-6 column1'>
                    {isVisible ? (
                        <div class="group">
                            <input type="text" id='id' value={identificador} required onChange={(e) => { setIdentificador(e.target.value) }} />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label className='label'>Identificador</label>
                        </div>
                    ) : null}
                    <div class="group">
                        <input type="text" required value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Nombre</label>
                    </div>

                    <div class="group">
                        <input type="number" required value={edad} onChange={(e) => { setEdad(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Edad</label>
                    </div>

                    <div class="group">
                        <input type="number" required value={peso} onChange={(e) => { setPeso(e.target.value) }} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label className='label'>Peso</label>
                    </div>
                </div>
                <div className='col-6 column2'>

                    <div className="group">
                        <select className='form-control' value={dueño} onChange={(e) => { setDueño(e.target.value) }}>
                            <option value='-1' selected disabled >Seleccione un dueño</option>
                            {
                                Cliente.map((item) => (
                                    <option value={item.cedula}> {item.nombreCliente}</option>
                                ))
                            }
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className='labelSelect label'>Dueño</label>
                    </div>
                    <div className="group">
                        <select className='form-control' value={raza} onChange={(e) => { setRaza(e.target.value) }} >
                            <option value='-1' disabled selected   >Seleccione una raza</option>
                            {
                                Razas.map((item) => (
                                    <option value={item.idRaza}> {item.nombre}</option>
                                ))
                            }
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className='labelSelect label'>Raza</label>
                    </div>
                    <div className="group">
                        <select className='form-control' value={medico} onChange={(e) => { setMedicoG(e.target.value) }}   >
                            <option value='-1' disabled selected >Seleccione un medico</option>
                            {
                                Medico.map((item) => (
                                    item.nombre !== "" ? (
                                        <option value={item.idMedico}>
                                            {item.nombreMedico} {item.apellidoMedico}
                                        </option>
                                    ) : null
                                ))
                            }
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className='labelSelect label'>Medico</label>
                    </div>

                    <div class="group center">
                        {Esmodif ?
                            (<><button class="custom-btn btn-3 " onClick={() => {
                                if (medico === '-1') {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Debe seleccionar un medico'
                                    })
                                    return; // No agrega tratamiento si los campos están vacíos
                                } tratamient()
                            }} hidden><span>Tratamientos</span>
                            </button><button class="custom-btn btn-3 " onClick={() => {
                                if (medico === '-1') {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Debe seleccionar un medico'
                                    })
                                    return; // No agrega tratamiento si los campos están vacíos
                                } llamartratamientosMod()
                            }}><span>Tratamientos</span></button></>)
                            :
                            (<><button class="custom-btn btn-3 " onClick={() => {
                                if (medico === '-1') {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Debe seleccionar un medico'
                                    })
                                    return; // No agrega tratamiento si los campos están vacíos
                                } tratamient()
                            }}><span>Tratamientos</span>
                            </button><button class="custom-btn btn-3 " onClick={() => {
                                if (medico === '-1') {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Debe seleccionar un medico'
                                    })
                                    return; // No agrega tratamiento si los campos están vacíos
                                } llamartratamientosMod()
                            }} hidden><span>Tratamientos</span></button></>)}

                    </div>
                </div>
                <div>

                    {Esmodif ?
                        (<>
                            <button class="custom-btn btn-Guardar" onClick={GuardarMascota} hidden ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" onClick={ModificarMascota}  ><span>Modificar</span></button>
                            <button class="custom-btn btn-5" onClick={cancelar} style={{ marginLeft: '50px' }}><span>Cancelar</span></button>
                        </>)
                        :
                        (<>
                            <button class="custom-btn btn-Guardar" onClick={GuardarMascota}  ><span>Guardar</span></button>
                            <button class="custom-btn btn-Modificar" onClick={ModificarMascota} hidden ><span>Modificar</span></button></>)}

                </div>
            </div>
            <div className='Contenedor'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Identificador</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Raza</th>
                            <th scope="col">Dueño</th>
                            <th scope="col">Tratamientos</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {


                            Mascotas.map((item) => {
                                const auxRaza = Razas.find(razas => razas.idRaza === item.idRaza);
                                const auxDueño = Cliente.find(cliente => cliente.cedula === item.clienteCedula);

                                return (
                                    <tr key={item.idMascota}>
                                        <td data-label="idMascota">{item.idMascota}</td>
                                        <td data-label="nombreMascota">{item.nombreMascota}</td>
                                        <td data-label="edadMascota">{item.edadMascota} años</td>
                                        <td data-label="pesoMascota">{item.pesoMascota} KG</td>
                                        <td data-label="raza">{auxRaza ? auxRaza.nombre : 'N/A'}</td>
                                        <td data-label="dueño">{auxDueño ? auxDueño.nombreCliente + " " + auxDueño.apellidoCliente : 'N/A'}</td>
                                        <td data-label="tratamiento"> <button class="custom-btn btn-3" onClick={(e) => { cargarTratamientos(item.idMascota) }}><span>Tratamientos</span></button></td>
                                        <td data-label="administracion"> <button class="custom-btn btn-4" onClick={(e) => { llamarModificarMascota(item.idMascota) }}><span>Modificar</span></button> <button class="custom-btn btn-5" onClick={(e) => {
                                            Swal.fire({
                                                title: '¿Estás seguro?',
                                                text: 'Esta acción no se puede deshacer',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Sí, eliminar',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    // Llamar a la función de eliminación aquí
                                                    eliminarMascota(item.idMascota)
                                                }
                                            });
                                        }}><span>Eliminar</span></button></td>
                                    </tr>
                                );
                            })
                        }


                    </tbody>
                </table>

                <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle}>Tratamientos</ModalHeader>
                    <ModalBody>
                        <div className='Contenedor'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">Medicamento</th>
                                        <th scope="col">Dosis</th>
                                        <th scope="col">Medico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        tratamiento.map((item) => {
                                            const auxMedicamento = Medicamento.find(med => med.idMedicamento === item.idMedicamento);
                                            const auxMedico = Medico.find(med => med.idMedico === item.idMedico);

                                            return (
                                                <tr key={item.idMascota}>
                                                    <td data-label="medicamento">{auxMedicamento ? auxMedicamento.nombreMedicamento : 'N/A'}</td>
                                                    <td data-label="dosis">{item.dosis}</td>
                                                    <td data-label="nombreMedico">{auxMedico ? auxMedico.nombreMedico : ''} {auxMedico ? auxMedico.apellidoMedico : ''}</td>

                                                </tr>
                                            );
                                        })



                                    }


                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalTratamiento} toggle={tratamient} {...args}>
                    <ModalHeader toggle={tratamient}>Agregar Tratamientos</ModalHeader>
                    <ModalBody>
                        <div >
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">Medicamento</th>
                                        <th scope="col">Dosis</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        nuevoTratamiento.map((item) => {
                                            return (
                                                <tr>
                                                    <td scope="col">{item.nuevoMedicamento}</td>
                                                    <td scope="col">{item.nuevaDosis}</td>
                                                    <td scope="col">
                                                        <button class="image-button" onClick={() => EliminarTratamientos(item.nuevoMedicamento, item.nuevaDosis)}>
                                                            <img src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png?uid=R9260650&ga=GA1.1.341323687.1694627255' alt="Icono" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }

                                    <tr>
                                        <td data-label="medicamento">
                                            <select className='form-control' onChange={(e) => { setNuevoMedicamento(e.target.value) }}>
                                                <option value='-1' disabled selected>Medicamento</option>
                                                {Medicamento.map((item) => (
                                                    <option value={item.nombreMedicamento}>{item.nombreMedicamento}</option>
                                                ))}</select></td>
                                        <td data-label="dosis">  <input type='text' onChange={(e) => { setNuevaDosis(e.target.value) }} /></td>
                                        <td data-label="dosis">
                                            <button class="image-button" onClick={CrearTratamientos}>
                                                <img src='https://cdn-icons-png.flaticon.com/512/4315/4315609.png?uid=R9260650&ga=GA1.1.341323687.1694627255' alt="Icono" />
                                            </button></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={tratamient}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalTratamientoMod} toggle={tratamientMod} {...args}>
                    <ModalHeader toggle={tratamientMod}>Modificar Tratameintos</ModalHeader>
                    <ModalBody>
                        <div >
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">Medicamento</th>
                                        <th scope="col">Dosis</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        tratamientoaux.map((item) => {
                                            const auxMedicamento = Medicamento.find(med => med.idMedicamento === item.idMedicamento);

                                            return (
                                                <tr key={item.idMascota}>
                                                    <td data-label="medicamento">{auxMedicamento ? auxMedicamento.nombreMedicamento : "N/A"}</td>
                                                    <td data-label="dosis">{item.dosis}</td>
                                                    <button class="image-button" onClick={() => {
                                                        const nuevoTratamientoaux = tratamientoaux.filter((m) => {
                                                            return m.idMedicamento !== item.idMedicamento || m.dosis !== item.dosis;
                                                        });
                                                        setTratamientoaux(nuevoTratamientoaux);
                                                    }}>
                                                        <img src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png?uid=R9260650&ga=GA1.1.341323687.1694627255' alt="Icono" />
                                                    </button>
                                                </tr>
                                            );
                                        })



                                    }

                                    <tr>
                                        <td data-label="medicamento">
                                            <select className='form-control' value={nuevoMedicamentoaux} onChange={(e) => { setNuevoMedicamentoaux(e.target.value) }}>
                                                <option value='-1' disabled selected>Medicamento</option>
                                                {Medicamento.map((item) => (
                                                    <option value={item.idMedicamento}>{item.nombreMedicamento}</option>
                                                ))}</select></td>
                                        <td data-label="dosis">  <input type='text' value={nuevaDosisaux} onChange={(e) => { setNuevaDosisaux(e.target.value) }} /></td>
                                        <td data-label="dosis">
                                            <button class="image-button" onClick={() => { setTratamientoaux([...tratamientoaux, { idMedicamento: parseInt(nuevoMedicamentoaux), dosis: nuevaDosisaux, idMedico: medico }]); setNuevaDosisaux(''); setNuevoMedicamentoaux('-1') }} >
                                                <img src='https://cdn-icons-png.flaticon.com/512/4315/4315609.png?uid=R9260650&ga=GA1.1.341323687.1694627255' alt="Icono" />
                                            </button></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={tratamientMod}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )
};