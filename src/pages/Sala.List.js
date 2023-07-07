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
  const [sala, setSala] = useState({ sala: "", curso: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);
  const [listaCursos, setListaCursos] = useState([]);

  useEffect(() => {
    const objStr = localStorage.getItem("lSala");
    const objLista = JSON.parse(objStr);
    setListaSalas(objLista || []);

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
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      sala.id = listaSalas.length + 1;
      listaSalas.push(sala);
      setListaSalas([...listaSalas]);
    }

    if (modeForm === "edit") {
      const salaAux = listaSalas.find((p) => p.id === sala.id);
      salaAux.sala = sala.sala;
      salaAux.curso = sala.curso;
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
    setSala({ sala: "", curso: "", periodo: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaSalas.filter((p) => p.id !== pRemove.id);
    setListaSalas(updatedList);
    localStorage.setItem("lSala", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };

  const handlePeriodoChange = (event) => {
    setSala({ ...sala, periodo: event.target.value });
  };

  const handleCursoChange = (event) => {
    setSala({...sala, curso: event.target.value });
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
                  <Form.Group className="mb-3" controlId="formSala">
                    <Form.Label>Sala:</Form.Label>
                    <Form.Control
                      required
                      value={sala.sala}
                      onChange={({ target }) => {
                        setSala({ ...sala, sala: target.value });
                      }}
                      type="text"
                      placeholder="Insira a sala aqui"
                    />
                  </Form.Group>
                  

                  <Form.Label>Curso:</Form.Label>
                  <Form.Group className="mb-3" controlId="formCursos">
                    <Form.Select
                      aria-label="Selecione a curso que usará a sala"
                      value={sala.curso}
                      onChange={handleCursoChange}
                    >
                      <option value="">Selecione a curso que usará a sala</option>
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
                      aria-label="Selecione a periodo que usará a sala"
                      value={sala.periodo}
                      onChange={handlePeriodoChange}
                    >
                      <option value="">Selecione a periodo que usará a sala</option>
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
        <h4>Lista de Salas:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Sala</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaSalas.map((salaAux) => (
                <tr key={salaAux.id}>
                  <td>{salaAux.id}</td>
                  <td>{salaAux.sala}</td>
                  <td>{salaAux.curso}</td>
                  <td>{salaAux.periodo}º Período</td>
                  <td>
                    <Button
                      onClick={() => {
                        onEdit(salaAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(salaAux);
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

export default Salas;