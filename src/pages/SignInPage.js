import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import UserData from "../context/UserData"


export default function SignInPage() {

  const [form, setForm] = useState({email:"", password:""})
  const {setToken} = useContext(UserData)

  const navigate = useNavigate()

  function handleForm(event){
    setForm({...form, [event.target.name]: event.target.value})
  }

  function SignIn(event){
    event.preventDefault ()
    
    const body={...form}
    console.log(body)

    axios.post(`${process.env.REACT_APP_API_URL}/`, body)
         .then(res => {console.log(res.data); setToken(res.data); navigate("/home")})
         .catch(err => {alert(err)})

    //axios.get(`${process.env.REACT_APP_API_URL}/registries`)
    

  }

  return (
    <SingInContainer>
      <form onSubmit={SignIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" 
               type="email"
               name={"email"}
               value={form.email}
               onChange={handleForm}
                />

        <input placeholder="Senha" 
                type="password" 
                name={"password"}
                value={form.password}
                onChange={handleForm}
                /* autocomplete="new-password" */

         />
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
