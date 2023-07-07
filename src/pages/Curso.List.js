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

const Cursos = () => {

  const [listaCursos, setListaCursos] = useState([]);
  const [curso, setCurso] = useState({ curso: "", sala: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodos, setListaPeriodos] = useState([]);

  useEffect(() => {
    const objStr = localStorage.getItem("lCurso");
    const objLista = JSON.parse(objStr);
    setListaCursos(objLista || []);

    const listaPeriodosAux = JSON.parse(localStorage.lPeriodo);
    setListaPeriodos(listaPeriodosAux || []);

  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      curso.id = listaCursos.length + 1;
      listaCursos.push(curso);
      setListaCursos([...listaCursos]);
    }

    if (modeForm === "edit") {
      const cursoAux = listaCursos.find((p) => p.id === curso.id);
      cursoAux.curso = curso.curso;
      cursoAux.sala = curso.sala;
      cursoAux.periodo = curso.periodo;
      setListaCursos([...listaCursos]);
    }
    localStorage.setItem("lCurso", JSON.stringify(listaCursos));
    onNew();
  };

  const onEdit = (cursoAux) => {
    setCurso(cursoAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setCurso({ curso: "", sala: "", periodo: ""});
  };

  const onRemove = (pRemove) => {
    const updatedList = listaCursos.filter((p) => p.id !== pRemove.id);
    setListaCursos(updatedList);
    localStorage.setItem("lCurso", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };


  return (
    <Container>
      <br />
      <Row>
        <h1>Cursos</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Cursos</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="formCurso">
                    <Form.Label>Curso:</Form.Label>
                    <Form.Control
                      required
                      value={curso.curso}
                      onChange={({ target }) => {
                        setCurso({ ...curso, curso: target.value });
                      }}
                      type="text"
                      placeholder="Insira aqui o curso"
                    />
                  </Form.Group>

                  <Form.Label>Sala:</Form.Label>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Select aria-label="Selecione a periodo do curso">
                      <option value="">Selecione a sala do curso</option>
                      {
                        listaPeriodos.map((salaAux) => {
                          return (
                            <option key={salaAux.id} value={salaAux.sala}
                              onChange={
                                ({ target }) => {
                                  setCurso({ ...curso, sala: target.value });
                                }}>
                              {salaAux.sala}
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
                              onChange={(target) => {
                                setCurso({ ...curso, periodo: target.value });
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
        <h4>Lista de Cursos:</h4>
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
              {listaCursos.map((cursoAux) => (
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

export default Cursos;