import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';

const Periodos = () => {

  const [listaPeriodos, setListaPeriodos] = useState([]);
  const [periodo, setPeriodo] = useState({ periodo: "", materias: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");

  useEffect(() => {
    const objStr = localStorage.getItem("lProfessor");
    const objLista = JSON.parse(objStr);
    setListaPeriodos([objLista]);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {

      if (listaPeriodos === null) {
        periodo.id = 1;
        setListaPeriodos([periodo]);
      } else {
        periodo.id = listaPeriodos.length + 1;
        setListaPeriodos([...listaPeriodos, { periodo: '', materias: '', id: 1}]);
      }
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
    const idx = listaPeriodos.findIndex((p) => p.id === pRemove.id);
    listaPeriodos.splice(idx, 1);
    setListaPeriodos([...listaPeriodos]);
    localStorage.setItem("lPeriodo", JSON.stringify(listaPeriodos));
  };

  const onCancel = () => {
    onNew()
  };

  return (
    <>
      <Container>
        <Container>
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Cadastro de Períodos</Accordion.Header>
                  <Accordion.Body>
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
                            placeholder="3" />

                          <Form.Control.Feedback type="invalid">
                            Por favor, informe um período válido!
                          </Form.Control.Feedback>
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
                            placeholder="Matérias presentes no período informado" />

                          <Form.Control.Feedback type="invalid">
                            Por favor, informe ao menos uma matéria!
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" onClick={onSave}>Salvar</Button>{' '}
                        <Button variant="danger" onClick={onCancel}>Cancelar</Button>
                      </Form>
                    </Container>

                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
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
                {listaPeriodos.map((periodoAux) => {
                  return (
                    <tr>
                      <td>{periodoAux.id}</td>
                      <td>{periodoAux.periodo}</td>
                      <td>{periodoAux.materias}</td>
                      <td>
                        <Button
                          onClick={() => {
                            onEdit(periodoAux);
                          }}
                          variant="success"
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
                  );
                })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Periodos;