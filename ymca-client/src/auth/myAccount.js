import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LinkDom from '@material-ui/core/Link';
import { TextField } from '@material-ui/core'
import MaterialTable from 'material-table'

class MyAccount extends React.Component {
    state = {
        enrollments: [],
        programs: [],
    }
    componentDidMount() {

    }
    render() {
        const tableRef = React.createRef();
        const user = this.props.user;
        const getData = (resolve, reject) => {
            const userId = this.props.user._id;
            fetch('http://localhost:3030/programs')
                .then(response => response.json())
                .then(p => {
                    const programs = p.data;
                    fetch('http://localhost:3030/enrollments?userId=' + userId)
                        .then(response => response.json())
                        .then(e => {
                            const enrollments = e.data;
                            const result = enrollments.map(e => {
                                const program = programs.find(p => p._id == e.programId);
                                return {
                                    programId: program._id,
                                    title: program.title,
                                    status: e.isApproved ? "approved" : "pending"
                                };
                            });
                            resolve({ data: result });
                        });
                });
        };
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
                                    <MaterialTable
                                        tableRef={tableRef}
                                        options={{
                                            search: false,
                                            paging: false,
                                            toolbar: false,
                                            sorting: true,
                                        }}
                                        columns={[
                                            { title: 'Program', field: 'title' },
                                            { title: "Status", field: "status" },
                                            {
                                                title: 'Details',
                                                field: 'link',
                                                render: row => (<LinkDom href={"/programs/" + row.programId}>Details <i className="fa fa-sm fa-share-square"></i>
                                                </LinkDom>),
                                            },
                                        ]}
                                        data={_ => new Promise(getData)}
                                    />
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