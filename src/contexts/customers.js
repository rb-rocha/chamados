import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "../services/firebaseConnection.js";

export const CustomerContext = createContext({});

export default function CustomerProvider({children}){

    const [cadastraCliente, setCadastraCliente] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [cnpjCliente, setCnpjCliente] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numCasa, setNumCasa] = useState('');
    const [inUse, setInUse] = useState(false);
    const [firstClient, setFirstClient] =useState('');

    function limpaDados(){
        setNomeCliente('');
        setCnpjCliente('');
        setEstado('');
        setCidade('');
        setBairro('');
        setRua('');
        setNumCasa('');
    }

    useEffect(()=>{
        customerSearch();
    }, [])


    async function customerAdd(dados){
    
        await firebase.firestore().collection('customers')
        .doc()
        .set({
            nomeCliente : dados.nomeCliente,
            cnpj : dados.cnpj,
            estado : dados.estado,
            cidade : dados.cidade,
            bairro : dados.bairro,
            rua : dados.rua,
            num : dados.num
        })
        .then(()=>{
            toast.success(`Cliente ${dados.nome} cadastrado!`);
            setCadastraCliente(false);
            limpaDados();
        })
        .catch((error)=>{
            console.log(error);
            setCadastraCliente(false);
            limpaDados();
        })

    }

    async function customerSearch(){

        setInUse(true);
        await firebase.firestore().collection('customers')
        .get()
        .then((snapshot)=>{
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    nome : doc.data().nomeCliente,
                    cnpj : doc.data().cnpj,
                    estado : doc.data().estado,
                    cidade : doc.data().cidade,
                    bairro : doc.data().bairro,
                    rua : doc.data().rua,
                    num : doc.data().num
                })
            })
            setClientes(lista);
            localStorage.setItem('clientes', JSON.stringify(lista));
            setFirstClient(lista[0].nome);
            setInUse(false);
        })
        .catch((error)=>{
            setInUse(false);
            toast.warning('Ocorreu algum erro ao buscar a lista!')
            console.log(error);
        })
    }

    return(
        <CustomerContext.Provider value={{
            firstClient,
            inUse,
            clientes,
            cadastraCliente,
            nomeCliente,
            cnpjCliente,
            estado,
            cidade,
            bairro,
            rua,
            numCasa,
            setClientes,
            setCadastraCliente,
            setNomeCliente,
            setCnpjCliente,
            setEstado,
            setCidade,
            setBairro,
            setRua,
            setNumCasa,
            customerAdd,
            customerSearch,
        }}>
            {children}
        </CustomerContext.Provider>
    );
}