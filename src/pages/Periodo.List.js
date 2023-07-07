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

const Periodos = () => {
  const [listaPeriodos, setListaPeriodos] = useState([]);
  const [periodo, setPeriodo] = useState({ periodo: "", materias: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");

  useEffect(() => {
    const objStr = localStorage.getItem("lPeriodo");
    const objLista = JSON.parse(objStr);
    setListaPeriodos(objLista || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      periodo.id = listaPeriodos.length + 1;
      listaPeriodos.push(periodo);
      setListaPeriodos([...listaPeriodos]);
    }

    if (modeForm === "edit") {
      const pAux = listaPeriodos.find((p) => p.id === periodo.id);
      pAux.periodo = periodo.periodo;
      pAux.materias = periodo.materias;
      setListaPeriodos([...listaPeriodos]);
    }
    localStorage.setItem("lPeriodo", JSON.stringify(listaPeriodos));
    onNew();
  };

  const onEdit = (pAux) => {
    setPeriodo(pAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setPeriodo({ periodo: "", materias: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaPeriodos.filter((p) => p.id !== pRemove.id);
    setListaPeriodos(updatedList);
    localStorage.setItem("lPeriodo", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Períodos</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Período</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="formPeriodo">
                    <Form.Label>Período:</Form.Label>
                    <Form.Control
                      required
                      value={periodo.periodo}
                      onChange={({ target }) => {
                        setPeriodo({ ...periodo, periodo: target.value });
                      }}
                      type="number"
                      placeholder="3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMaterias">
                    <Form.Label>Matérias:</Form.Label>
                    <Form.Control
                      required
                      value={periodo.materias}
                      onChange={({ target }) => {
                        setPeriodo({ ...periodo, materias: target.value });
                      }}
                      type="text"
                      placeholder="Matérias presentes no período informado"
                    />
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
        <h4>Lista de Professores:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Período</th>
                <th>Matérias</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaPeriodos.map((periodoAux) => (
                <tr key={periodoAux.id}>
                  <td>{periodoAux.id}</td>
                  <td>{periodoAux.periodo}</td>
                  <td>{periodoAux.materias}</td>
                  <td>
                    <Button
                      onClick={() => {
                        onEdit(periodoAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(periodoAux);
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

export default Periodos;