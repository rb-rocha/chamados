import React, { useContext, useState } from 'react';
import './chamados.css';

import { CustomerContext } from '../../contexts/customers';
import { ChamadosContext } from '../../contexts/chamados';
import { AuthContext } from '../../contexts/auth';

import { FiPlus } from 'react-icons/fi';
import Header from '../../components/header';
import Title from '../../components/Title';
import { useEffect } from 'react/cjs/react.development';





export default function Chamados(){

    const {clientes} = useContext(CustomerContext);
    const {user} = useContext(AuthContext);
    const {inUse, cliente, assunto, status, complemento, chamadosAdd, setCliente, setStatus, setAssunto, setComplemento, setMyUID, setClienteUID} = useContext(ChamadosContext);
    
    const [assuntos, setAssuntos] = useState(['Suporte', 'Visita Técnica', 'Financeiro']);
    const [customers, setCustomers] = useState([]);
    const [clienteIndex, setClienteIndex] = useState('');
    const [customerSelected, setCustomerSelected] = useState('');

    useEffect(()=>{
        setCustomers(clientes)
        console.log(customers)
    } ,[])

    function handleAdd(e){
        e.preventDefault();
        if(clienteIndex == ''){
            setClienteIndex(0)
            let nome = customers[clienteIndex].nome;
            setCliente(nome)
        }
        else{
            console.log(cliente)
            setCliente(customers[clienteIndex].nome)
        }
        chamadosAdd();
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Chamados">
                    <FiPlus size={25}/>
                </Title>


                <div className="container">
                    <form className="form-profile" onSubmit={handleAdd}>
                        <label>Cliente</label>
                        {inUse ? (
                            <input id="inputCliente" type="text" disabled={true} value="Carregando clientes..."/>
                        ) :
                        (
                            <select value={clienteIndex} onChange={(e)=>{setClienteIndex(e.target.value)}}>
                            {
                                clientes.map((cl, index)=>{
                                    return(
                                            <option key={cl.id} value={index}>{cl.nome}</option>
                                    )
                                })
                            }
                            </select>
                        )
                    }

                        <label>Assunto</label>
                        <select value={assunto} onChange={(e)=>{setAssunto(e.target.value)}}>
                            {assuntos.map((assunto)=>{
                                return(
                                    <option key={assunto} value={assunto}>{assunto}</option>
                                );
                            })
                            }
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto" checked={ status === 'Aberto' } onChange={(e)=>{setStatus(e.target.value)}}/>
                            <span>Em aberto</span>
                            <input type="radio" name="radio" value="Progresso" checked={ status === 'Progresso' } onChange={(e)=>{setStatus(e.target.value)}}/>
                            <span>Em Progresso</span>
                            <input type="radio" name="radio" value="Atendido" checked={ status === 'Atendido' } onChange={(e)=>{setStatus(e.target.value)}}/>
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type="text" value={complemento} onChange={(e)=>{setComplemento(e.target.value)}} placeholder="Descreva seu problema (Opcional)."/>
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}