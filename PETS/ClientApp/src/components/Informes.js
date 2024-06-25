import React, { Component, useState, useRef, useEffect } from 'react';
import '../css/Admin/admin.css'  

import { useNavigate } from 'react-router-dom';



export function Informes(args) {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [Mascotas, setMascotas] = useState([]);
    const [Medico, setMedico] = useState([]);
    const [Cliente, setCliente] = useState([]);
    const [Intermedia, setIntermedia] = useState([]);
    const [Medicamento, setMedicamento] = useState([]);
    const [Razas, setRazas] = useState([]);
    const [tratamiento, setTratamiento] = useState([]);

    const [mostrar, setMostrar] = useState();
    const [informe, setInforme] = useState('-1');

    const CrearInforme = async () => {
        if (informe == "Clientes") { 
                setMostrar("Clientes");
                setItems(Cliente); 
        } else if (informe == "Medicamento") { 
                setMostrar("Medicamento");
                setItems(Medicamento); 
        } else if (informe == "Medico") { 
                setMostrar("Medico");
                setItems(Medico); 
        } else if (informe == "Razas") {  
                setMostrar("Razas");
                setItems(Razas); 
        } else if (informe == "Mascota") { 

                  setMostrar("Mascota"); 
        } else if (informe == "Tratamientos") {
                 setMostrar("Tratamientos");  
        } else if (informe == "MascDueño") {  
                setMostrar("MascDueño");  
        } else if (informe == "MascRazas") {  
            setMostrar("MascRazas");  
    }

    }
    useEffect(async() => {
        document.body.style.overflow = document.hidden ? 'hidden' : 'auto';
        const sesionIniciada = localStorage.getItem('SesionIniciada');
        if (sesionIniciada == null) {
            navigate('/');
        }
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
    }, []);
    return (
        <>
            <div className='row text-center' >
                <h1>Informes</h1>
                <div className='col-6 column1'>
                    <div className="group">
                        <select className='form-control' onChange={(e) => { setInforme(e.target.value) }} value={informe}  >
                            <option value='-1' disabled selected >Seleccione una tabla</option>
                            <option value='Clientes' >Clientes</option>
                            <option value='Medicamento' >Medicamento</option>
                            <option value='Medico' >Medico</option>
                            <option value='Razas' >Razas</option>
                            <option value='Mascota' >Mascota</option>
                            <option value='Tratamientos' >Tratamiento</option>
                            <option value='MascDueño' >Mascota Cliente</option>
                            <option value='MascRazas' >Mascota Razas</option>

                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className='labelSelect label'>Medico</label>
                    </div>
                </div>

                <div className='col-6 column2'>
                    <button class="custom-btn btn-3" onClick={CrearInforme} ><span>Crear informe</span></button>

                </div>


            </div >
            <div className='Contenedor'>
                <table className='table'>
                    <thead>
                        {mostrar == "Clientes" ? (
                            <tr>
                                <th scope="col">Cedula</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Direeción</th>
                                <th scope="col">Telefono</th>
                            </tr>) : mostrar == "Medicamento" ? (<tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col"></th>
                            </tr>) : mostrar == "Medico" ? (<tr>
                                <th scope="col">Cedula</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Contraseña</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Token</th>
                                <th scope="col"></th>
                            </tr>) : mostrar == "Razas" ? (<tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col"></th>
                            </tr>) : mostrar == "Mascota" ? (
                                <tr>
                                    <th scope="col">Identificador</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Peso</th>
                                    <th scope="col">Raza</th>
                                    <th scope="col">Dueño</th>
                                </tr>
                            ) : mostrar == "Tratamientos" ? (
                                <tr>
                                    <th scope="col">Nombre Mascota</th>
                                    <th scope="col">Medicamentos</th>
                                    <th scope="col">Dosis</th>
                                    <th scope="col">Medico</th>
                                </tr>
                            ) : mostrar == "MascDueño" ? (
                                <tr>
                                    <th scope="col">Cedula Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Nombre Mascota</th>
                                </tr>
                            ) : mostrar == "MascRazas" ? (
                                <tr>
                                    <th scope="col">Razas</th>
                                    <th scope="col">Nombre Mascota</th> 
                                </tr>
                            ) : (null)}
                    </thead>
                    <tbody>
                        {mostrar == "Clientes" ? (
                            items.map((item) => {
                                return (
                                    <tr key={item.cedula}>
                                        <td data-label="cedulaMedico">{item.cedula}</td>
                                        <td data-label="nombreMedico">{item.nombreCliente}</td>
                                        <td data-label="apellidoMedico">{item.apellidoCliente}</td>
                                        <td data-label="correoMedico">{item.direccion}</td>
                                        <td data-label="contraseniaMedico">{item.telefono}</td>
                                    </tr>
                                )
                            })

                        ) : mostrar == "Medicamento" ? (
                            items.map((item) => {
                                return (
                                    <tr key={item.idMedicamento}>
                                        <td data-label="cedulaMedico">{item.idMedicamento}</td>
                                        <td data-label="nombreMedico">{item.nombreMedicamento}</td>
                                        <td data-label="nombreMedico">{item.descripcion}</td>

                                    </tr>
                                )
                            })
                        ) : mostrar == "Medico" ? (
                            items.map((item) => {
                                return (
                                    <tr key={item.idMedico}>
                                        <td data-label="cedulaMedico">{item.cedulaMedico}</td>
                                        <td data-label="nombreMedico">{item.nombreMedico}</td>
                                        <td data-label="apellidoMedico">{item.apellidoMedico}</td>
                                        <td data-label="correoMedico">{item.correoMedico}</td>
                                        <td data-label="contraseniaMedico">{item.contraseniaMedico}</td>
                                        <td data-label="telefonoMedico">{item.telefonoMedico}</td>
                                        <td data-label="tokenMedico">{item.tokenMedico}</td>

                                    </tr>
                                )
                            })) : mostrar == "Razas" ? (
                                items.map((item) => {
                                    return (
                                        <tr key={item.idRazas}>
                                            <td data-label="cedulaMedico">{item.idRaza}</td>
                                            <td data-label="nombreMedico">{item.nombre}</td>

                                        </tr>
                                    )
                                })
                            ) : mostrar == "Mascota" ? (
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
                                        </tr>
                                    );
                                })
                            ) : mostrar == "Tratamientos" ? (

                                Mascotas.map((item) => {
                                    const tratamientInter = Intermedia.filter(int => int.idMascota === item.idMascota);
                                    return (
                                        tratamientInter.map((tratamiento, index) => {
                                            const auxMedicamento = Medicamento.find(med => med.idMedicamento === tratamiento.idMedicamento);
                                 
                                            const medico = Medico.find(med => med.idMedico === tratamiento.idMedico);
                                            return (
                                            <tr key={tratamiento.idIntermedia}>
                                                {index === 0 && (
                                                    <td rowSpan={tratamientInter.length} data-label="nombreMascota">
                                                        {item.nombreMascota}
                                                    </td>
                                                )}
                                                <td>{auxMedicamento.nombreMedicamento}</td>
                                                <td>{tratamiento.dosis}</td>
                                                <td>{medico.nombreMedico}</td>
                                            </tr>
                                            );
                                        })
                                    );
                                })
                            ) : mostrar == "MascDueño" ? (
                                Cliente.map((cliente) => {
                                    const Masct = Mascotas.filter(mc => mc.clienteCedula === cliente.cedula);
                                    return (
                                        Masct.map((mascota, index) => (
                                            <tr key={mascota.idMascota}>
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={Masct.length} data-label="cedulaCliente">
                                                            {cliente.cedula}
                                                        </td>
                                                        <td rowSpan={Masct.length} data-label="nombreCliente">
                                                            {cliente.nombreCliente}
                                                        </td>
                                                    </>
                                                )}
                                                <td>{mascota.nombreMascota}</td>
                                            </tr>
                                        ))
                                    );
                                })
                            ) : mostrar == "MascRazas" ? (
                                Razas.map((item) => {
                                    const Masct = Mascotas.filter(mc => mc.idRaza === item.idRaza);
                                    return (
                                        Masct.map((mascota, index) => (
                                            <tr key={mascota.idMascota}>
                                                {index === 0 && (
                                                    <>
                                                        <td rowSpan={Masct.length} data-label="cedulaCliente">
                                                            {item.nombre}
                                                        </td> 
                                                    </>
                                                )}
                                                <td>{mascota.nombreMascota}</td>
                                            </tr>
                                        ))
                                    );
                                })
                            ) : (null)}


                    </tbody>
                </table>



            </div>
        </>
    )
};