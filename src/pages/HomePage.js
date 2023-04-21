import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import UserData from "../context/UserData"
import axios from "axios"
import Item from "../components/Item"

export default function HomePage() {

  const { token } = useContext(UserData)
  const { setIdUser } = useContext(UserData)
  const { idUser } = useContext(UserData)
  const [dados, setDados] = useState([])
  const [cadastros, setCadastros] = useState([])

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.get(`${process.env.REACT_APP_API_URL}registros`, config)
      .then(res => { setDados(res.data) })
      .catch(err => { console.log(err) })

    axios.get(`${process.env.REACT_APP_API_URL}`, config)
      .then(res => { setIdUser(res.data[res.data.length - 1].idUsuario) })
      .catch(err => { console.log(err) })

    axios.get(`${process.env.REACT_APP_API_URL}cadastro`)
      .then(res => { setCadastros(res.data); })
      .catch(err => console.log(err))
  }, [token, setIdUser])


  if (cadastros.length === 0 || dados.length === 0) {
    console.log("oi")
    return
  }

  console.log(dados)
  console.log(idUser)
  console.log(cadastros)

  function buscaName() {

    if (cadastros.length === 0) return
    const array = cadastros.filter((item) => {
      if (item._id === idUser) {
        return true
      }
    })
    return array[0].name
  }

  function buscaRegistro() {

    if (dados.length === 0) return
    const array = dados.filter((item) => {
      if (item.idUsuario === idUser) return true
    })

    return array
  }

  function saldo() {

    let saldo = 0
    if (dados.length === 0) return saldo

   dados.forEach((item) => {
    if(item.tipo === "saida"){
      saldo = saldo - item.valor
    } else{
      saldo = saldo + item.valor
    }
   })
    return saldo
    
  }

  const registro = buscaRegistro()

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {buscaName()}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {registro.map(item => <Item key={item._id}
            valor={item.valor}
            descricao={item.descricao}
            tipo={item.tipo}>
          </Item>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo() >= 0 }>{saldo()}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`