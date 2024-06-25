import React, { NavLink, useState, useRef, useEffect } from 'react';
import '../css/Login/login.css'
import $ from 'jquery';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';




export function Login() {
    const [correo, setCorreo] = useState();
    const [contraseña, setContraseña] = useState(); const navigate = useNavigate();

    const [validarUsuario, setValidarUsuario] = useState(true);
    const [token, setToken] = useState();
    const [cedula, setCedula] = useState();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseñaM, setContraseñaM] = useState();
    const [telefono, setTelefono] = useState();
    const [correoM, setCorreoM] = useState();

    const Iniciar_sesion = async () => {

        const response = await fetch("api/Login/Login/" + correo + "/" + contraseña, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('SesionIniciada', data);
            navigate('/AdminPrincipal');

        } else if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }


    }


    const validar = async () => {
        const response = await fetch("api/Login/Validar/" + cedula + "/" + token, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.status == 200) {
            setValidarUsuario(false);
        } else if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }


    const Registrar = async () => {
        if (cedula === '' || nombre === '' || apellido === '' || correo === '' || contraseña === '' || telefono === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return; // No agrega tratamiento si los campos están vacíos
        }
        const Medico = {
            idMedico: 1,
            nombreMedico: nombre,
            apellidoMedico: apellido,
            correoMedico: correoM,
            contraseniaMedico: contraseñaM,
            telefonoMedico: telefono,
            cedulaMedico: cedula,
            tokenMedico: token
        };
        const response = await fetch("api/Login/Registrar", {
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
                text: 'Registrado correctamente'
            });
            setCedula('');
            setNombre('');
            setApellido('');
            setCorreo('');
            setContraseñaM('');
            setCorreoM('');
            setTelefono('');  
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al modificar '
            })
        }
    }

useEffect(() => { 
    // Código de useEffect aquí
    $('#goRight').on('click', function () {
        $('#slideBox').animate({
            'marginLeft': '0'
        });
        $('.topLayer').animate({
            'marginLeft': '100%'
        });
    });
    $('#goLeft').on('click', function () {
        if (window.innerWidth > 769) {
            $('#slideBox').animate({
                'marginLeft': '50%'
            });
        }
        else {
            $('#slideBox').animate({
                'marginLeft': '20%'
            });
        }
        $('.topLayer').animate({
            'marginLeft': '0'
        });
    });
    // Tu lógica con useEffect aquí
}, []);
return (
    <>
        <div className='cont'>
            <div id="back">
                <canvas id="canvas" className="canvas-back"></canvas>
                <div className="backRight">
                </div>
                <div className="backLeft">
                </div>
            </div>

            <div id="slideBox">
                <div className="topLayer">
                    <div className="left">
                        <div className="content">
                            <h2>Registrar</h2>
                            <div id="form-signup">
                                {validarUsuario ? (<div>
                                    <div className="form-element form-stack">
                                        <label for="username-signup" className="form-label">Token</label>
                                        <input id="username-signup" value={token} type="text" onChange={(e) => { setToken(e.target.value) }} name="username" />
                                    </div>
                                    <div className="form-element form-stack">
                                        <label for="password-signup" className="form-label">Cedula</label>
                                        <input id="password-signup" value={cedula} type="number" onChange={(e) => { setCedula(e.target.value) }} name="password" />
                                    </div>
                                    
                                </div>) : (
                                    <div>
                                        <div className="form-element form-stack">
                                            <label for="email" className="form-label">Nombre</label>
                                            <input id="email" type="text" name="email" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                        </div>
                                        <div className="form-element form-stack">
                                            <label for="email" className="form-label">Apellido</label>
                                            <input id="email" type="email" name="email" value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                                        </div>
                                        
                                        <div className="form-element form-stack">
                                            <label for="email" className="form-label">Correo</label>
                                            <input id="email" type="email" name="email" value={correoM} onChange={(e) => { setCorreoM(e.target.value) }} />
                                        </div>
                                        <div className="form-element form-stack">
                                            <label for="email" className="form-label">Contraseña</label>
                                            <input id="email" type="email" name="email" value={contraseñaM} onChange={(e) => { setContraseñaM(e.target.value) }} />
                                        </div>
                                        <div className="form-element form-stack">
                                            <label for="email" className="form-label">Telefono</label>
                                            <input id="email" type="email" name="email" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                                        </div>
 
                                    </div>
                                )}
                                <div className="form-element form-submit">
                                {validarUsuario ?(
                                        <button id="signUp" className="signup buttonlg" onClick={validar} name="signup">Validar</button>
                                ):(
                                        <button id="signUp" className="signup buttonlg" onClick={Registrar} name="signup">Registrar</button>
                                  )}
                                        <button id="goLeft" className="signup off buttonlg">Iniciar sesión</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="content">
                            <h2>Inicio de sesión</h2>
                            <div id="form-login">
                                <div className="form-element form-stack">
                                    <label for="username-login" className="form-label">Correo</label>
                                    <input id="username-login" type="correo" name="username" onChange={(e) => { setCorreo(e.target.value) }} />
                                </div>
                                <div className="form-element form-stack">
                                    <label for="password-login" className="form-label">Contraseña</label>
                                    <input id="password-login" type="password" name="password" onChange={(e) => { setContraseña(e.target.value) }} />
                                </div>
                                <div className="form-element form-submit">
                                    <button id="logIn" className="login buttonlg" type="submit" name="login" onClick={Iniciar_sesion}>Iniciar sesión</button>
                                    <button id="goRight" className="login off buttonlg" name="signup">Registrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>
);

}

