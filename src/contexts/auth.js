import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "../services/firebaseConnection.js";

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        function loadStorage(){

            const storageUser = localStorage.getItem('SistemUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

    async function signUp(nome, sobrenome, email, password){
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid)
            .set({
                nome : nome,
                sobrenome : sobrenome,
                avatarUrl : null,
            })
            .then(()=>{
                let data = {
                    uid : uid,
                    nome : nome,
                    sobrenome: sobrenome,
                    email : value.user.email,
                    avatarURL : null
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo(a) ${nome}!`);
            })
            .catch((error)=>{
                toast.error("Ops algo deu errado!");
                console.log(error);
            })

        })
        .catch((error)=>{
            toast.error("Ops algo deu errado!");
            console.log(error);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemUser', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemUser');
        localStorage.removeItem('clientes');
        setUser(null);
    }

    async function signIn(email, senha){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email,senha)
        .then(async (value)=>{
            let uid = value.user.uid;

            firebase.firestore().collection('users')
            .doc(uid)
            .get()
            .then((snapshot)=>{

                let data = {
                    uid : uid,
                    nome : snapshot.data().nome,
                    sobrenome : snapshot.data().sobrenome,
                    avatarUrl : snapshot.data().avatarUrl,
                    email: value.user.email
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo(a) ${snapshot.data().nome}!`);
            })
            .catch((error)=>{
                toast.error("Ops algo deu errado!");
                console.log(error);
            })
        })
        .catch((error)=>{
            setLoadingAuth(false);
            console.log(error);
            switch(error.code){
                case 'auth/user-not-found':
                    toast.warning('E-mail ou senha inválido');
                    return
                
                case 'auth/invalid-email':
                    toast.warning('E-mail ou senha inválido');
                    return

                case 'auth/wrong-password':
                    toast.warning('E-mail ou senha inválido');
                    return
            }
        })
    }

    async function updateUser(nome,sobrenome,avatarUrl){
        setLoadingAuth(true);
        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
            nome : nome,
            sobrenome : sobrenome,
            avatarUrl : avatarUrl
        })
        .then(()=>{
            let data = {
                uid : user.uid,
                nome : nome,
                sobrenome : sobrenome,
                avatarUrl : avatarUrl,
                email : user.email
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Perfil atualizado!');
        })
        .catch((error)=>{
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops algo deu errado!");
        })
    }

    async function uploadAvatarImg(image){
        setLoadingAuth(true);
        await firebase.storage()
        .ref(`images/${user.uid}/${image.name}`)
        .put(image)
        .then(async ()=>{

            await firebase.storage().ref(`images/${user.uid}/`)
            .child(image.name).getDownloadURL()
            .then((urlFoto)=>{
                setLoadingAuth(true);
                updateUser(user.nome, user.sobrenome, urlFoto);
            })
            .catch((error)=>{
                console.log(error);
            })         
        })
        .catch((error)=>{
            toast.warning('Ops, não foi possivel upar sua foto!');
            setLoadingAuth(true);
        })
    }

    return(
        <AuthContext.Provider 
        value={{ 
            signed : !!user,
            user,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            updateUser,
            uploadAvatarImg
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;