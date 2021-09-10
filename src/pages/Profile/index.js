import React, {useState, useContext} from 'react';
import './profile.css';
import Header from '../../components/header';
import Title from '../../components/Title';
import { FiSettings,FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import { toast } from 'react-toastify';

export default function Profile(){

    const {user, updateUser, uploadAvatarImg} = useContext(AuthContext);
    const [nome, setNome] = useState(user.nome);
    const [email,setEmail] = useState(user.email);
    const [sobrenome, setSobrenome] = useState(user.sobrenome);
    const [avatarUrl,setAvatarUrl] = useState(user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [typeImg, setTypeImg] = useState('');

    function handleSave(e){
        e.preventDefault();

        if(imageAvatar === null && nome !== ''){
            updateUser(nome, sobrenome, user.avatarUrl);
            return
        }
        uploadAvatarImg(imageAvatar);
    }

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
                setTypeImg('jpeg');
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }

            //TENTATIVA DE PADRONIZAR O NOME DA IMAGEM, TRATAR MELHOR DEPOIS
/*             else if(){
                setTypeImg('png');
                setImageAvatar(image);
                console.log(e.target.files[0]);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }
            else if(){
                setTypeImg('jpg');
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            } */
             else{
                toast.warning('Envie uma imagem do tipo JPEG/JPG/PNG!');
                setImageAvatar(null);
                return
            }
        }
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="avatar-profile">
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Foto perfil usuário"/>
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto perfil usuário"/>
                            }
                        </label>
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>

                        <label>Sobrenome:</label>
                        <input type="text" value={sobrenome} onChange={(e)=>{setSobrenome(e.target.value)}}/>

                        <label>E-mail:</label>
                        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} disabled="true"/>

                        <button typeof="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}