import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Card
} from "react-bootstrap";

const Horario = () => {
  const [listaHorarios, setListaHorarios] = useState([]);
  const [horario, setHorario] = useState({ horario: "", sala: "", professor: "", curso: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);
  const [listaCursos, setListaCursos] = useState([]);
  const [listaSalas, setListaSalas] = useState([]);
  const [listaProfessores, setListaProfessores] = useState([]);

  useEffect(() => {
    const objStr = localStorage.getItem("lHorario");
    const objLista = JSON.parse(objStr);
    setListaHorarios(objLista || []);

    const listaPeriodosAux =
      localStorage.lPeriodo === undefined
        ? []
        : JSON.parse(localStorage.lPeriodo);
    setListaPeriodo(listaPeriodosAux || []);

    const listaCursosAux =
      localStorage.lCurso === undefined
        ? []
        : JSON.parse(localStorage.lCurso);
    setListaCursos(listaCursosAux || []);

    const listaSalasAux =
      localStorage.lSala === undefined
        ? []
        : JSON.parse(localStorage.lSala);
    setListaSalas(listaSalasAux || []);

    const listaProfAux =
      localStorage.lProfessor === undefined
        ? []
        : JSON.parse(localStorage.lProfessor);
    setListaProfessores(listaProfAux || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      horario.id = listaHorarios.length + 1;
      listaHorarios.push(horario);
      setListaHorarios([...listaHorarios]);
    }

    if (modeForm === "edit") {
      const horarioAux = listaHorarios.find((p) => p.id === horario.id);
      horarioAux.horario = horario.horario;
      horarioAux.sala = horario.sala;
      horarioAux.curso = horario.curso;
      horarioAux.periodo = horario.periodo;
      horarioAux.professor = horario.professor;
      setListaHorarios([...listaHorarios]);
    }
    localStorage.setItem("lHorario", JSON.stringify(listaHorarios));
    onNew();
  };

  const onEdit = (horarioAux) => {
    setHorario(horarioAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setHorario({ horario: "", sala: "", professor: "", curso: "", periodo: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaHorarios.filter((p) => p.id !== pRemove.id);
    setListaHorarios(updatedList);
    localStorage.setItem("lHorario", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };

  const handlePeriodoChange = (event) => {
    setHorario({ ...horario, periodo: event.target.value });
  };

  const handleCursoChange = (event) => {
    setHorario({ ...horario, curso: event.target.value });
  };

  const handleProfChange = (event) => {
    setHorario({ ...horario, professor: event.target.value });
  };

  const handleSalaChange = (event) => {
    setHorario({ ...horario, sala: event.target.value });
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Horarios</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Horarios</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="Horário">
                    <Form.Label>Horário:</Form.Label>
                    <Form.Control
                      required
                      value={horario.horario}
                      onChange={({ target }) => {
                        setHorario({ ...horario, horario: target.value });
                      }}
                      type="time"
                      placeholder="Insira o Horário aqui"
                    />
                  </Form.Group>

                  <Form.Label>Professor:</Form.Label>
                  <Form.Group className="mb-3" controlId="formSalas">
                    <Form.Select
                      aria-label="Selecione o professor que dará a aula"
                      value={horario.professor}
                      onChange={handleProfChange}
                    >
                      <option value="">Selecione o professor que dará a aula</option>
                      {
                        listaProfessores.map((prof) => (
                        <option key={prof.id} value={prof.name}>
                          {prof.name}
                        </option>
                      ))
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Label>Sala:</Form.Label>
                  <Form.Group className="mb-3" controlId="formSalas">
                    <Form.Select
                      aria-label="Selecione a sala"
                      value={horario.sala}
                      onChange={handleSalaChange}
                    >
                      <option value="">Selecione a sala que será utilizada</option>
                      {
                        listaSalas.map((sala) => (
                          <option key={sala.id} value={sala.sala}>
                            Sala {sala.sala}
                          </option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Label>Curso:</Form.Label>
                  <Form.Group className="mb-3" controlId="formCursos">
                    <Form.Select
                      aria-label="Selecione a curso que usará a sala"
                      value={horario.curso}
                      onChange={handleCursoChange}
                    >
                      <option value="">Selecione a curso ficará na sala</option>
                      {
                        listaCursos.map((curso) => (
                          <option key={curso.id} value={curso.curso}>
                            {curso.curso}
                          </option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Label>Período:</Form.Label>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Select
                      aria-label="Selecione o periodo que usará a sala"
                      value={horario.periodo}
                      onChange={handlePeriodoChange}
                    >
                      <option value="">Selecione o periodo que usará a sala</option>
                      {
                        listaPeriodo.map((periodo) => (
                          <option key={periodo.id} value={periodo.periodo}>
                            {periodo.periodo}º Período
                          </option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>

                  <Button variant="success" onClick={onSave}>
                    Salvar
                  </Button>{" "}
                  <Button variant="danger" onClick={onCancel}>
                    Cancelar
                  </Button>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <h4>Lista de Horarios:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Curso</th>
                <th>Professor</th>
                <th>Sala</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaHorarios.map((horarioAux) => (
                <tr key={horarioAux.id}>
                  <td>{horarioAux.id}</td>
                  <td>{horarioAux.horario}</td>
                  <td>{horarioAux.professor}</td>
                  <td>{horarioAux.sala}</td>
                  <td>{horarioAux.curso}</td>
                  <td>{horarioAux.periodo}º Período</td>
                  <td>
                    <Button
                      onClick={() => {
                        onEdit(horarioAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(horarioAux);
                      }}
                      variant="danger"
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Horario;