import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const Professor = () => {
  const [listaP, setListaP] = useState([]);
  const [prof, setProf] = useState({ name: "", cpf: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");

  useEffect(() => {
    const objStr = localStorage.getItem("lProfessor");
    const objLista = JSON.parse(objStr);
    setListaP(objLista);
  }, []);
  const onSave = () => {
    if (modeForm === "create") {
      
      if (listaP === null) {
        prof.id = 1;
        setListaP([prof]);
      } else {
        prof.id = listaP.length + 1;
        setListaP([...listaP, prof]);
      }
    }

    if (modeForm === "edit") {
      const pAux = listaP.find((p) => p.id === prof.id);
      pAux.name = prof.name;
      pAux.cpf = prof.cpf;
      setListaP([...listaP]);
    }
    localStorage.setItem("lProfessor", JSON.stringify(listaP));
    setProf({ name: "", cpf: "" });
  };

  const pree = (pAux) => {
    setProf(pAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setProf({ name: "", cpf: "" });
  };

  const onRemove = (pRemove) => {
    const idx = listaP.findIndex((p) => p.id === pRemove.id);
    listaP.splice(idx, 1);
    setListaP([...listaP]);
    localStorage.setItem("lProfessor", JSON.stringify(listaP));
  };

  return (
    <Container>
      <Container>
        <Row>
          <Col>Formulario</Col>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                value={prof.name}
                onChange={({ target }) => {
                  setProf({ ...prof, name: target.value });
                }}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                value={prof.cpf}
                type="text"
                onChange={({ target }) => {
                  setProf({ ...prof, cpf: target.value });
                }}
                placeholder="Enter cpf"
              />
            </Form.Group>

            <Button variant="primary" onClick={onSave}>
              Salvar
            </Button>
            <Button variant="primary" onClick={onNew}>
              Novo
            </Button>
          </Form>
        </Row>
      </Container>
      <Row>
        <Col>Lista Professores</Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>CPF</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaP.map((pAux) => {
                  return (
                    <tr>
                      <td>{pAux.id}</td>
                      <td>{pAux.name}</td>
                      <td>{pAux.cpf}</td>
                      <td>
                        <Button
                          onClick={() => {
                            pree(pAux);
                          }}
                          variant="warning"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => {
                            onRemove(pAux);
                          }}
                          variant="danger"
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Professor;
