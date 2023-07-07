import { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Card
} from "react-bootstrap";


const Professor = () => {

  const [listaProf, setListaProf] = useState([]);
  const [prof, setProf] = useState({ name: "", cpf: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");

  useEffect(() => {
    const objStr = localStorage.getItem("lProfessor");
    const objLista = JSON.parse(objStr);
    setListaProf(objLista || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      prof.id = listaProf.length + 1;
      listaProf.push(prof);
      setListaProf([...listaProf]);
    }

    if (modeForm === "edit") {
      const pAux = listaProf.find((p) => p.id === prof.id);
      pAux.name = prof.name;
      pAux.cpf = prof.cpf;
      setListaProf([...listaProf]);
    }
    localStorage.setItem("lProfessor", JSON.stringify(listaProf));
    setProf({ name: "", cpf: "" });
  };

  const onEdit = (pAux) => {
    setProf(pAux);
    setModeForm("edit");
  };

  const onNew = () => {
    setModeForm("create");
    setProf({ name: "", cpf: "" });
  };

  const onRemove = (pRemove) => {
    const idx = listaProf.findIndex((p) => p.id === pRemove.id);
    listaProf.splice(idx, 1);
    setListaProf([...listaProf]);
    localStorage.setItem("lProfessor", JSON.stringify(listaProf));
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Professores</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastrar Professor</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="fromProfessor">
                    <Form.Label>Professor:</Form.Label>
                    <Form.Control
                      required
                      value={prof.name}
                      onChange={({ target }) => {
                        setProf({ ...prof, name: target.value });
                      }}
                      type="text"
                      placeholder="Digite aqui o nome do Professor"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCpf">
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                      required
                      value={prof.cpf}
                      onChange={({ target }) => {
                        setProf({ ...prof, cpf: target.value });
                      }}
                      type="text"
                      placeholder="000.000.000-00"
                    />
                  </Form.Group>

                  <Button variant="success" onClick={onSave}>
                    Salvar
                  </Button>{" "}
                  <Button variant="danger" onClick={onNew}>
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
        <h4>Lista de Professores</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Professor</th>
                <th>CPF</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaProf.map((profAux) => (
                <tr key={profAux.id}>
                  <td>{profAux.id}</td>
                  <td>{profAux.name}</td>
                  <td>{profAux.cpf}</td>
                  <td>
                    <Button
                      onClick={() => {
                        onEdit(profAux);
                      }}
                      variant="primary">
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(profAux);
                      }}
                      variant="danger">
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

export default Professor;
