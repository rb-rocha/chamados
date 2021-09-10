import React, {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import './signUp.css';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    if(nome !== '' && sobrenome !== '' && email !== '' && password !== '' && validatePassword !== ''){
      if(password !== validatePassword){
        toast.warning("As senhas não batem!");
        setPassword('');
        setValidatePassword('');
        return
      }
      signUp(nome, sobrenome, email, password);
      toast.success('Cadastro efetuado');
      return
    }
    toast.warning('Favor preencher todos os campos!');
    setPassword('');
    setValidatePassword('');
  }

  return (
    <div className="container-center">
      <div className="register">
        <div className="register-logo">
          <img src={logo} alt="logo Sujeito"/>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <h1>Cadastro de usuário</h1>
            <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} placeholder="Nome"/>
            <input type="text" value={sobrenome} onChange={(e)=>{setSobrenome(e.target.value)}} placeholder="Sobrenome"/>
            <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email@email.com"/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Senha"/>
            <input type="password" value={validatePassword} onChange={(e)=>{setValidatePassword(e.target.value)}} placeholder="Validar senha"/>
            <button type="submit">{loadingAuth ? 'Cadastrando...' : 'Cadastrar'}</button>
            <Link to="/">Já possuo uma conta</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;