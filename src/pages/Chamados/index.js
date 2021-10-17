import React, { useContext, useState } from 'react';
import { format } from "date-fns";
import { useHistory, useParams } from 'react-router-dom';
import firebase from '../../services/firebaseConnection';
import './chamados.css';

import { CustomerContext } from '../../contexts/customers';
import { ChamadosContext } from '../../contexts/chamados';
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";

import { FiPlus } from 'react-icons/fi';
import Header from '../../components/header';
import Title from '../../components/Title';
import { useEffect } from 'react/cjs/react.development';





export default function Chamados(){

    const { id } = useParams();
    const history = useHistory();

    const {inUse, clientes, firstClient} = useContext(CustomerContext);
    const {user} = useContext(AuthContext);
    const { cliente, assunto, status, complemento, clienteUID, chamadosAdd, setCliente, setStatus, setAssunto, setComplemento, setMyUID, setClienteUID} = useContext(ChamadosContext);
    
    const [assuntos, setAssuntos] = useState(['Suporte', 'Visita Técnica', 'Financeiro']);
    const [customers, setCustomers] = useState([]);
    const [chamado, setChamado] = useState([]);

    useEffect(()=>{
        const storageClientes = localStorage.getItem('clientes');
        setCustomers(JSON.parse(storageClientes));

        if(id !== null || id !== ''){

            async function buscaChamado(id){
                await firebase.firestore().collection('chamados')
                .doc(id)
                .get()
                .then((snapshot)=>{
                    let lista = {
                        id : snapshot.id,
                        cliente : snapshot.data().cliente,
                        assunto: snapshot.data().assunto,
                        status : snapshot.data().status,
                        complemento : snapshot.data().complemento,
                        userId : snapshot.data().userId,
                        created : snapshot.data().created,
                        createdFormated: format(snapshot.data().created.toDate(), 'dd/MM/yyyy'),
                        clienteUID : snapshot.data().clienteUID
                    };
                    console.log(lista.created);
                    setChamado(lista);
                })
                .catch((error)=>{
                    toast.warning('Ocorreu um problema ao buscar o chamado')
                    console.log(error);
                })
            }

            buscaChamado(id);
            console.log(chamado)
        }
    }, [])

    function handleAdd(e){
        e.preventDefault();
        let clienteUID;
        if( cliente == ''){
            let nome = customers[0].nome;
            

            clientes.forEach((item, index)=>{
                if(item.nome === nome){
                     clienteUID = customers[index].id;
                }
             })

             let dados = {
                cliente : nome,
                assunto : assunto,
                status : status,
                complemento : complemento,
                clienteUID : clienteUID
            }
            console.log(dados);
            chamadosAdd(dados);
        }
        else
        {
            clientes.forEach((item, index)=>{
                if(item.nome === cliente){
                     clienteUID = customers[index].id;
                }
             })

             let dados = {
                 cliente : cliente,
                 assunto : assunto,
                 status : status,
                 complemento : complemento,
                 clienteUID : clienteUID
             }
             console.log(dados);
             chamadosAdd(dados);
        }
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
                            <select value={cliente} onChange={(e)=>{setCliente(e.target.value)}}>
                            {
                                clientes.map((cl, index)=>{
                                    return(
                                            <option key={cl.id} value={cl.nome}>{cl.nome}</option>
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