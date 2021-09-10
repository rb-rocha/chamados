import React, { useContext, useState, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './dashboard.css';

import Header from '../../components/header';
import Title from '../../components/Title';

import { ChamadosContext } from '../../contexts/chamados';


function Dashnboard() {

    const {inUse, chamados, setInUse} = useContext(ChamadosContext);

    useEffect(()=>{
        setInUse(true);
    }, []);

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
                        {chamados.map((chamado)=>{
                            return(
                                <tr key={chamado.id}>
                                    <td data-label="Codigo">01</td>
                                    <td data-label="Cliente">{chamado.cliente}</td>
                                    <td data-label="Assunto">{chamado.assunto}</td>
                                    <td data-label="Status">
                                    <span className="badge">{chamado.status}</span>
                                    </td>
                                    <td data-label="Cadastrado">04/03/2021</td>
                                    <td data-label="#">
                                    <button className="action">
                                        <FiSearch size={15}/>
                                    </button>
                                    <button className="action">
                                        <FiEdit2 size={15}/>
                                    </button>
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
    </div>
    );
}

export default Dashnboard;