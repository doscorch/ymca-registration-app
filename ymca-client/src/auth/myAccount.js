import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class MyAccount extends React.Component {
    state = {
        enrollments: {},
    }
    componentDidMount() {
        // const id = this.props.match.params.id;
        // fetch('http://localhost:3030/programs/' + id)
        //     .then(response => response.json())
        //     .then(data => this.setState({ program: data }));
    }
    render() {
        const user = this.props.user;
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <Row>
                                <Col>
                                    <h4>Account Information</h4>
                                    <hr></hr>
                                    <h6>First Name</h6>
                                    <p>{user.firstName}</p>
                                    <h6>Last Name</h6>
                                    <p>{user.lastName}</p>
                                    <h6>Email</h6>
                                    <p>{user.email}</p>
                                    <h6>Account Type</h6>
                                    <p>{user.userRole}</p>
                                    <h4>Enrollments</h4>
                                    <hr></hr>
                                    <p>none</p>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const mapState = (state) => { return { user: state.user } };
const mapDispatch = {};

export default connect(mapState, mapDispatch)(MyAccount);