import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserData from "../context/UserData";

export default function TransactionsPage() {

  const {tipo} = useParams();
  const {token} = useContext(UserData)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  })

  const [form, setForm] = useState({valor: "", descricao: ""})

  function handleForm(event){
   setForm({...form, [event.target.name] : event.target.value})
  }

  function transacao(event){
    event.preventDefault()

    const body = {...form}
    console.log(body)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`, body, config)
          .then(res => {console.log(res); navigate("/home")})
          .catch(err => {alert(err.response.data)})
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={transacao}>
        <input placeholder="Valor" 
               type="text"
               name={"valor"}
               value={form.valor}
               onChange={handleForm}
               />

        <input placeholder="Descrição" 
               type="text"
               name={"descricao"}
               value={form.descricao}
               onChange={handleForm}
                />
        <button type="submit" >Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
