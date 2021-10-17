import React from 'react';
import './modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal({conteudo, close}){

    return(
        <div className="modal">
            <div className="container">
                <button onClick = { close } className="close">
                    <FiX size={23} color="#FFF" />
                </button>
                <h2>Detalhes do Chamado</h2>
                <div className="row">
                <span>
                    Cliente : <b>{conteudo.cliente}</b>
                </span>
            </div>
            <div className="row">
                <span>
                    Assunto : <b>{conteudo.assunto}</b>
                </span>
                <span>
                    Cadastrado em : <b>{conteudo.createdFormated}</b>
                </span>
            </div>
            <div className="row">
                <span>
                    Status : <b  style={{ color : '#FFF', backgroundColor : conteudo.status === 'Aberto' ? '#5FD204' : '#999'}} >{conteudo.status}</b>
                </span>
            </div>
            <div className="row">
                {conteudo.complemento !== '' && (
                    <>
                        <h3>Complemento: </h3>
                        <p>{conteudo.complemento}</p>
                    </>
                )}
            </div>
            </div>
        </div>
    );
}