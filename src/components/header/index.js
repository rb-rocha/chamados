import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import './header.css';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function Header(){

    const {user, signOut} = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div className="sidebar-imgs">
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto Avatar"/>
            </div> 
            <div className="sidebar-links">
                <Link to="/">
                    <FiHome color="#FFF" size={24}/>
                     Chamados
                </Link>
                <Link to="/customers">
                    <FiSettings color="#FFF" size={24}/>
                     Clientes
                </Link>
                <Link to="/profile">
                    <FiUser color="#FFF" size={24}/>
                     Configurações
                </Link>
                <button onClick={signOut}>
                    <FiLogOut color="#FFF" size={24}/>
                    Sair
                </button>
            </div>
        </div>
    );
}