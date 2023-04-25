import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {

  const [form, setForm] = useState({email: "", name: "", password:"", confirmPassword: ""})

  const navigate = useNavigate()


  function handleForm(event){

    setForm ({...form, [event.target.name] : event.target.value})
  }

  function signUp(event){

    event.preventDefault() 

    const body = {...form}

    if(form.password !== form.confirmPassword){
      return alert("Senhas Diferentes")
    }

    axios.post(`${process.env.REACT_APP_API_URL}cadastro`, body)
          .then(res => {console.log(res.data); navigate("/")})
          .catch(err => {alert(err)})

  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" 
        type="text"
        name = {"name"}
        value = {form.name}
        onChange = {handleForm}
        required />

        <input placeholder="E-mail" 
               type="email"
               name={"email"}
               value={form.email}
               onChange={handleForm}
               required />

        <input placeholder="Senha" 
                type="password" 
                autoComplete="new-password"
                name={"password"}
                value={form.password}
                onChange={handleForm}
                required />

        <input placeholder="Confirme a senha" 
               type="password" 
               autoComplete="new-password"
               name={"confirmPassword"}
               value={form.confirmPassword}
               onChange={handleForm} />

        <button type="submit" >Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
