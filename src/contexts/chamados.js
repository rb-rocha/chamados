import { format } from "date-fns";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react/cjs/react.development";
import firebase from "../services/firebaseConnection.js";
import { AuthContext } from "./auth.js";


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
    const [lastDocs, setLastDocs] = useState();

    const {user} = useContext(AuthContext);

    function limpaDados(){
        setCliente('');
        setAssunto('Suporte');
        setStatus('Aberto');
        setComplemento('');
        setClienteUID('');
    }

    useEffect(()=>{
        limpaDados();
        buscaChamados();
    } ,[])

    async function chamadosAdd(dado){
        await firebase.firestore().collection('chamados')
        .doc()
        .set({
            created : new Date(),
            cliente : dado.cliente,
            assunto :  dado.assunto,
            status : dado.status,
            complemento : dado.complemento,
            userId : user.uid,
            clienteUID : dado.clienteUID
        })
        .then(()=>{
            limpaDados();
            toast.success('Chamado cadastrado com sucesso!')
            buscaChamados();
        })
        .catch((error)=>{
            limpaDados();
            toast.warning('Ocorreu um problema ao registrar o chamado')
        })
    }

    async function buscaChamados(){

        setInUse(true);
        await firebase.firestore().collection('chamados').orderBy('created', 'asc')
        .get()
        .then((snapshot)=>{
            let lista = [];
            snapshot.forEach((doc=>{
                lista.push({
                    id : doc.id,
                    cliente : doc.data().cliente,
                    assunto: doc.data().assunto,
                    status : doc.data().status,
                    complemento : doc.data().complemento,
                    userId : doc.data().userId,
                    created : doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    clienteUID : doc.data().clienteUID
                });
            })
            )
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