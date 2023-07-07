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
  const [curso, setCurso] = useState({ curso: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);

  useEffect(() => {
    const objStr = localStorage.getItem("lCurso");
    const objLista = JSON.parse(objStr);
    setListaCursos(objLista || []);

    const listaPeriodosAux = localStorage.lPeriodo === undefined ? [] : JSON.parse(localStorage.lPeriodo);
    setListaPeriodo(listaPeriodosAux || []);
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
    setCurso({ curso: "", periodo: ""});
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

                  <Form.Label>Período:</Form.Label>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Select aria-label="Selecione a periodo do curso">
                      <option value="">Selecione o período do curso</option>
                      {
                        listaPeriodo.map((periodo) => {
                          return (
                            <option key={periodo.id} value={periodo.periodo}
                              onChange={({ target }) => {
                                  setCurso({ ...curso, periodo: target.value });
                                }
                              }>
                              {periodo.periodo}
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
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaCursos.map((cursoAux) => (
                <tr key={cursoAux.id}>
                  <td>{cursoAux.id}</td>
                  <td>{cursoAux.curso}</td>
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