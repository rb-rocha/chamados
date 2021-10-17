import React, { useContext, useState, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import './dashboard.css';

import Header from '../../components/header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import { ChamadosContext } from '../../contexts/chamados';


function Dashnboard() {

    const {inUse, chamados, setInUse} = useContext(ChamadosContext);

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(()=>{
        setInUse(true);
    }, []);

    function togglePostModal(item){
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    return (
    <div>
        <Header/>
        <div className="content">
            <Title name="Meus Chamados">
                <FiMessageSquare size={25} />
            </Title>
            {chamados.length === 0 ? (
                <div className="container dashboard">
                    <span>Nenhum chamado registrado...</span>
                    <Link to="/chamados" className="dashboard-new">
                        <FiPlus size={25} />
                        Novo chamado
                    </Link>
                </div>
            )
            :
            (
                <div className="dashboard-table">
                    <Link to="/chamados" className="dashboard-new">
                        <FiPlus size={25} />
                        Novo chamado
                    </Link>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Assunto</th>
                            <th scope="col">Status</th>
                            <th scope="col">Cadastrado em</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamados.map((chamado, index)=>{
                            return(
                                <tr key={chamado.id}>
                                    <td data-label="Codigo">{index+1}</td>
                                    <td data-label="Cliente">{chamado.cliente}</td>
                                    <td data-label="Assunto">{chamado.assunto}</td>
                                    <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor : chamado.status === 'Aberto' ? '#5FD204' : '#999'}}>{chamado.status}</span>
                                    </td>
                                    <td data-label="Cadastrado">{chamado.createdFormated}</td>
                                    <td data-label="#">
                                    <button className="action" style= {{backgroundColor : '#3583f6'}} onClick = {()=>{togglePostModal(chamado)}}>
                                        <FiSearch size={15}/>
                                    </button>
                                    <Link to={`/chamados/${chamado.id}`} className="action" style= {{backgroundColor : '#F6a935'}}>
                                        <FiEdit2 size={15}/>
                                    </Link>
                                    </td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </table>
                </div>
            )
            }
        </div>
        {showPostModal && (
            <Modal
            conteudo = {detail}
            close = {togglePostModal}
            />
        )}
    </div>
    );
}

export default Dashnboard;