import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Program extends React.Component {
    state = {
        program: {},
    }
    enroll = () => {
        alert("todo");
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('http://localhost:3030/programs/' + id)
            .then(response => response.json())
            .then(data => this.setState({ program: data }));
    }
    render() {
        const program = this.state.program;
        const hasUser = Boolean(this.props.user._id);
        return (
            <Container fluid>
                <Row>
                    <Col><img style={{ width: "100%", borderRadius: "10px" }} src={program.img} alt="program image"></img></Col>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <h4 style={{ textAlign: "center" }}>{program.title}</h4>
                            <h6>Description</h6>
                            <p>{program.description}</p>
                            <h6>Location</h6>
                            <p>{program.location}</p>
                            <h6>Start Date</h6>
                            <p>{new Date(program.startDate).toLocaleDateString()}</p>
                            <h6>End Date</h6>
                            <p>{new Date(program.endDate).toLocaleDateString()}</p>
                            <h6>Meets</h6>
                            <p>{program.meetTime}</p>
                            <h6>Nonmember Price</h6>
                            <p>{program.nonmemberPrice}</p>
                            <h6>Member Price</h6>
                            <p>{program.memberPrice}</p>
                            <h6>Current Enrollment</h6>
                            <p>0/{program.participantLimit}</p>

                            {hasUser ? <Button onClick={this.enroll}>Enroll</Button> : ""}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const mapState = (state) => { return { user: state.user } };
const mapDispatch = {};

export default connect(mapState, mapDispatch)(Program);