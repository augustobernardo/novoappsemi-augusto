import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Professor from './pages/Professor.List.js';
import Desafio from './pages/Desafio.List.js'
import NoPage from './pages/NoPage.js'
import Curso from './pages/Curso.List.js';
import Periodo from './pages/Periodo.List.js';
import Horario from './pages/Horario.List.js';
import Sala from './pages/Sala.List.js';


function App() {
  // const [user, setUser] = useState({})
  // const [listaUser, setListaUser] = useState([])


  // useEffect(() => {
  //   console.log('chamou o useEffect!')
  // }, [user, listaUser])


  // const onChangeInput = (param) => {
  //   const { target } = param;
  //   // console.log(target.value)
  //   setUser({ ...user, name: target.value })
  // }

  // const onSave = () => {
  //   user.id = listaUser.length + 1;
  //   setListaUser([...listaUser, user]);
  //   setUser({ name: '', id: -1 })
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="professor" element={<Professor />} />
          <Route path='periodo' element={<Periodo />} />
          <Route path='curso' element={<Curso />} />
          <Route path='sala' element={<Sala />} />
          <Route path='horario' element={<Horario />} />
          <Route path="desafio" element={<Desafio />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
