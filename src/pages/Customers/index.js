import React, { useContext, useState } from 'react';
import './customers.css';

import Header from '../../components/header';
import Title from '../../components/Title';
import ReactInputMask from 'react-input-mask';

import { FiUser, FiPlusSquare, FiXSquare } from 'react-icons/fi';

import FormCustomers from '../../components/FormCustomers';
import { CustomerContext } from '../../contexts/customers';

export default function Customers(){

    const {cadastraCliente,setCadastraCliente} = useContext(CustomerContext);

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Clientes">
                <FiUser size={25}/>
                </Title>
                {cadastraCliente === false ?
                    <button onClick={()=>{setCadastraCliente(true)}} className="add-customer">
                        <FiPlusSquare size={25}/>
                        Novo Cliente
                    </button>
                    :
                    <button className="cancel-customer" onClick={()=>{setCadastraCliente(false)}}>
                        <FiXSquare size={25} />
                        Cancelar
                    </button>
                }
                <div className="container">
                    { cadastraCliente &&
                            <FormCustomers/>
                    }
                </div>
            </div>
        </div>
    );
}