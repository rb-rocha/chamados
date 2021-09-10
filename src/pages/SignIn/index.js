import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import './signIn.css';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    if(email !== '' && password !== ''){
        signIn(email, password);
        setEmail('');
        setPassword('');
        return
    }
    toast.warning('Favor preencher todos os campos');
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-logo">
          <img src={logo} alt="logo Sujeito"/>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email@email.com"/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="*********"/>
            <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
            <Link to="/register">Criar uma conta</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
