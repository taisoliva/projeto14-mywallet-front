import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import UserData from "../context/UserData"
import axios from "axios"
import Item from "../components/Item"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const { token } = useContext(UserData)
  const { setIdUser } = useContext(UserData)
  const [dados, setDados] = useState([])
  const [nome, setNome] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  })


  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.get(`${process.env.REACT_APP_API_URL}/cadastro`, config)
      .then(res => { console.log(res.data); setNome(res.data[0].name) })
      .catch(err => { console.log(err.response.data)})

    axios.get(`${process.env.REACT_APP_API_URL}/registros`, config)
      .then(res => { console.log(res.data); setDados(res.data); })
      .catch(err => { console.log(err.response.data)})

  }, [token, setIdUser, navigate])

  function entrada() {
    console.log("entrada")
    navigate("/nova-transacao/entrada")
  }

  function saida() {
    console.log("saida")
    navigate("/nova-transacao/saida")
  }

  function saldo() {

    let saldo = 0
    if (dados.length === 0) return saldo

    dados.forEach((item) => {
      if (item.tipo === "saida") {
        saldo = saldo - Number(Number(item.valor).toFixed(2))
      } else {
        saldo = saldo + Number(Number(item.valor).toFixed(2))
      }
    })
    return saldo

  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={()=> navigate("/")}/>
      </Header>

      <TransactionsContainer show={dados.length === 0}>

        <ContainerArticle>
          {dados.length === 0 ? <Text>  Não há registros de entrada ou saída </Text> :
            <ul>
              {dados.map(item => <Item key={item._id}
                date={item.date}
                valor={item.valor}
                descricao={item.descricao}
                tipo={item.tipo}>
              </Item>)}
            </ul>}
        </ ContainerArticle>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo() >= 0}>{saldo()}</Value>
        </article>


      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={entrada}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={saida}>
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
  /* flex-grow: 1; */
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: space-between;

  

  article {
    display: ${props => props.show ? "none" : "flex"};
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

const Text = styled.div`
    width: 43vw;
    height: 70px;
    margin: 25vh auto;
    padding-right: 60px;
    padding-left: 85px;

    color: #868686;
    display: flex;
    flex-wrap: wrap;
   
    position: absolute;
    left: 0;
   
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    
`
const ContainerArticle = styled.div`

    overflow-y: scroll;
   
    
    

`