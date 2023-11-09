import { useEffect, useState } from 'react';
import { obtenerUsuario } from '../services/obtenerUsuario';
import { obtenerCliente } from '../services/obtenerCliente';
import Loading from '../components/Loading/Loading';
import ModalEditarPerfil from '../components/ModalEditarPerfil';

const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const [cliente, setCliente] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    if (!localStorage.getItem("sessionId")) {
        window.location.href = '/';
    }

    const editarPerfil = async () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        async function cargarUsuario() {
            try {
                const usuario = await obtenerUsuario(JSON.parse(localStorage.getItem("user")).correo);
                setUsuario(usuario);
            } catch (error) {
                console.log(error);
            }
        }

        cargarUsuario();
    }, []);

    useEffect(() => {
        async function cargarCliente() {
            try {
                const cliente = await obtenerCliente(JSON.parse(localStorage.getItem("user")).idusuario);
                setCliente(cliente);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        cargarCliente();
    }, [usuario.idusuario]);

    return (
        <main className="container mt-5">
            <div className="p-5 border border-5 bg-white">
                <h1>Perfil de usuario</h1>
                <hr />
                {loading ? <Loading /> : (
                    <div className="row">
                        <div className="col-5">
                            <div className="mb-3">
                                <img src='https://static.thenounproject.com/png/5034901-200.png' alt='Usuario' className='userImage' />
                            </div>
                            <div className="mb-3">
                                <h4>Nombre: <strong>{usuario.nombre} {usuario.apellido}</strong></h4>
                            </div>
                        </div>

                        <div className="col-7 mt-4">
                            <div className="mb-3">
                                <h4><i className="fa-regular fa-envelope"></i> Correo electrónico: <strong>{usuario.correo}</strong></h4>
                            </div>

                            <div className="mb-3">
                                <h4><i className="fa-regular fa-calendar-days"></i> Fecha de registro: <strong>{usuario.fecharegistro}</strong></h4>
                            </div>
                            {!usuario.admin
                                ?
                                (<div className="mb-3">
                                    <h4><i className="fa-solid fa-sack-dollar"></i> Sueldo: <strong>${cliente.sueldomensual}</strong></h4>
                                </div>)
                                :
                                null
                            }
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-dark align-items-end"
                                    onClick={editarPerfil}
                                >
                                    Editar perfil
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ModalEditarPerfil
                    showModal={showModal}
                    cerrarModal={editarPerfil}
                    usuario={usuario}
                    cliente={cliente}
                />
            </div>
        </main>
    )
}

export default Perfil