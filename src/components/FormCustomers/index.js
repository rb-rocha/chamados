import React, { useState, useContext } from 'react';
import ReactInputMask from 'react-input-mask';
import { toast } from 'react-toastify';

import { CustomerContext } from '../../contexts/customers';

export default function FormCustomers(){

    const {
        nomeCliente,
        cnpjCliente,
        estado,
        cidade,
        bairro,
        rua,
        numCasa,
        setNomeCliente,
        setCnpjCliente,
        setEstado,
        setCidade,
        setBairro,
        setRua,
        setNumCasa,
        customerAdd,
        setCadastraCliente
    } = useContext(CustomerContext);

    function handleAdd(e){
        e.preventDefault();
        if(nomeCliente !== '' && cnpjCliente !== '' && estado !== '' && cidade !== '' && bairro !== '' && numCasa !== ''){

            let dados = {
                nomeCliente : nomeCliente,
                cnpj : cnpjCliente,
                estado : estado,
                cidade : cidade,
                bairro : bairro,
                rua : rua,
                num : numCasa,
            }

            customerAdd(dados);
        } else {
            toast.warning('Por favor preencha todos os campos!');
        }
    }

    return(
        <form className="form-profile" onSubmit={handleAdd}>
            <label>Nome Cliente</label>
            <input type="text" placeholder="Nome Fantasia" value={nomeCliente} onChange={(e)=>{setNomeCliente(e.target.value)}}/>

            <label>CNPJ</label>
            <ReactInputMask mask="99.999.999/9999-99" placeholder="CNPJ" type="text" value={cnpjCliente} onChange={(e)=>{setCnpjCliente(e.target.value)}}></ReactInputMask>

            <label>Estado</label>
            <input type="text" placeholder="Estado" value={estado} onChange={(e)=>{setEstado(e.target.value)}}/>

            <label>Cidade</label>
            <input type="text" placeholder="Cidade" value={cidade} onChange={(e)=>{setCidade(e.target.value)}}/>

            <label>Bairro</label>
            <input type="text" placeholder="Bairro" value={bairro} onChange={(e)=>{setBairro(e.target.value)}}/>

            <label>Rua</label>
            <input type="text" placeholder="Rua" value={rua} onChange={(e)=>{setRua(e.target.value)}}/>

            <label>Número</label>
            <input type="text" placeholder="Número" value={numCasa} onChange={(e)=>{setNumCasa(e.target.value)}}/>

            <button type="submit">Salvar</button>
        </form>
    );
}
