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

const Salas = () => {

  const [listaSalas, setListaSalas] = useState([]);
  const [sala, setSala] = useState({ curso: "", sala: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodos, setListaPeriodos] = useState([]);
  const [listaCurso, setListaCurso] = useState([]);

  useEffect(() => {
    const objStr = localStorage.getItem("lSala");
    const objLista = JSON.parse(objStr);
    setListaSalas(objLista || []);

    const listaPeriodosAux = localStorage.lPeriodo === undefined ? [] : JSON.parse(localStorage.lPeriodo);
    setListaPeriodos(listaPeriodosAux || []);

    const listaCursoAux = localStorage.lCurso === undefined ? [] : JSON.parse(localStorage.lCurso);
    setListaCurso(listaCursoAux || []);

  }, []);

  const onSave = () => {
    debugger
    if (modeForm === "create") {
      sala.id = listaSalas.length + 1;
      listaSalas.push(sala);
      setListaSalas([...listaSalas]);
    }

    if (modeForm === "edit") {
      const salaAux = listaSalas.find((p) => p.id === sala.id);
      salaAux.curso = sala.curso;
      salaAux.sala = sala.sala;
      salaAux.periodo = sala.periodo;
      setListaSalas([...listaSalas]);
    }
    localStorage.setItem("lSala", JSON.stringify(listaSalas));
    onNew();
  };

  const onEdit = (salaAux) => {
    setSala(salaAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setSala({ curso: "", sala: "", periodo: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaSalas.filter((p) => p.id !== pRemove.id);
    setListaSalas(updatedList);
    localStorage.setItem("lSala", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };


  return (
    <Container>
      <br />
      <Row>
        <h1>Salas</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Salas</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="formCurso">
                    <Form.Label>Sala:</Form.Label>
                    <Form.Control
                      required
                      value={sala.curso}
                      onChange={({ target }) => {
                        setSala({ ...sala, curso: target.value });
                      }}
                      type="text"
                      placeholder="Insira aqui a sala"
                    />
                  </Form.Group>

                  <Form.Label>Curso:</Form.Label>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Select aria-label="Selecione a periodo do curso">
                      <option value="">Selecione o curso</option>
                      {
                        listaCurso.map((cursoAux) => {
                          return (
                            <option key={cursoAux.id} value={cursoAux.curso}
                              onChange={({ target }) => {
                                  setSala({ ...sala, curso: target.value });
                                }}>
                              {cursoAux.curso}
                            </option>
                          )
                        })
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Label>Período:</Form.Label>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Select aria-label="Selecione a periodo do curso">
                      <option value="">Selecione o período do curso</option>
                      {
                        listaPeriodos.map((periodoAux) => {
                          return (
                            <option key={periodoAux.id} value={periodoAux.periodo}
                              onChange={({ target }) => {
                                  setSala({ ...sala, periodo: target.value });
                                }}>
                              {periodoAux.periodo}
                            </option>
                          )
                        })
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
        <h4>Lista de Salas:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Curso</th>
                <th>Sala</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaSalas.map((cursoAux) => (
                <tr key={cursoAux.id}>
                  <td>{cursoAux.id}</td>
                  <td>{cursoAux.curso}</td>
                  <td>{cursoAux.sala}</td>
                  <td>{cursoAux.periodo}</td>
                  <td>
                    <Button
                      onClick={() => {
                        onEdit(cursoAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(cursoAux);
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
}

export default Salas;