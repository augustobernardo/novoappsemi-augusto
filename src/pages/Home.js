import React from "react";
import {
  Container
} from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container>
        <h2 class='title welcome'>Bem-vindo (a),</h2>
        <h3 class='h3Coordenador'>Coordenador (a)!</h3>

        <p class='text'>Aqui você pode cadastrar Professores, Salas, Desafios, Horário para os desafios, Cursos e Períodos.</p>

        <p class='textTwo'>Utilize o menu para navegar entre as páginas!</p>
      </Container>
    </>
  )
}

export default Home;