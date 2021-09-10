import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react/cjs/react.development";
import firebase from "../services/firebaseConnection.js";
import { CustomerContext } from "./customers.js";


export const ChamadosContext = createContext({});

export default function ChamadosProvider({children}){

    const [chamados, setChamados] = useState('');
    const [inUse, setInUse] = useState(false);
    const [cliente, setCliente] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const [myUID, setMyUID] = useState('');
    const [clienteUID, setClienteUID] = useState();

    function limpaDados(){
        setCliente('');
        setAssunto('Suporte');
        setStatus('Aberto');
        setComplemento('');
    }

    useEffect(()=>{
        buscaChamados();
    } ,[])

    async function chamadosAdd(){
        await firebase.firestore().collection('chamados')
        .doc()
        .set({
            created : new Date(),
            cliente : cliente,
            assunto :  assunto,
            status : status,
            complemento : complemento
        })
        .then(()=>{
            toast.success('Chamado cadastrado com sucesso!')
            limpaDados();
            buscaChamados();
        })
        .catch((error)=>{
            toast.warning('Ocorreu um problema ao registrar o cadastro')
            limpaDados();
        })
    }

    async function buscaChamados(){

        setInUse(true);
        await firebase.firestore().collection('chamados')
        .get()
        .then((snapshot)=>{
            let lista = [];
            snapshot.forEach((doc=>{
                lista.push({
                    id : doc.id,
                    cliente : doc.data().cliente,
                    assunto: doc.data().assunto,
                    status : doc.data().status,
                    complemento : doc.data().complemento
                });
            }))
            setInUse(false);
            setChamados(lista);
        })
        .catch((error)=>{
            toast.warning('Não foi possível buscar os chamados!')
            console.log(error);
        })
    }

    return(
        <ChamadosContext.Provider value={{
            myUID,
            clienteUID,
            inUse,
            chamados,
            cliente,
            assunto,
            status,
            complemento,
            setCliente,
            setAssunto,
            setStatus,
            setComplemento,
            chamadosAdd,
            buscaChamados,
            setInUse,
            setMyUID,
            setClienteUID,
        }}>
            {children}
        </ChamadosContext.Provider>
    );
}