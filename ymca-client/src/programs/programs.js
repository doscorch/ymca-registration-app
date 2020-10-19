import React from 'react';
import { Container, Card, CardDeck, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Programs extends React.Component {
    state = {
        programs: [],
    }
    componentDidMount() {
        fetch('http://localhost:3030/programs')
            .then(response => response.json())
            .then(data => this.setState({ programs: data.data }));
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <CardDeck>
                        {this.state.programs.map(p => {
                            return (
                                <Card style={{ flex: "0 1 30%" }}>
                                    <Card.Img variant="top" src={p.img} />
                                    <Card.Body>
                                        <Card.Title>{p.title}</Card.Title>
                                        <Card.Text>{p.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button as={Link} to={"/programs/" + p._id} variant="primary">Details</Button>
                                    </Card.Footer>
                                </Card>
                            )
                        })}
                    </CardDeck>
                </Row>
            </Container >
        );
    }
}
