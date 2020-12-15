import * as React from 'react';
import MaterialTable from 'material-table'
import { deleteEnrollment, updateEnrollment } from './enrollmentsService';
import { getUsers } from '../auth/usersService';
import { Select, MenuItem } from '@material-ui/core'

export default class EnrollmentManager extends React.Component {
    state = {
        enrollments: []
    }
    componentDidMount() {
        this.getData();
    }

    getData = () => {
        // get users
        return getUsers().then(users => {
            fetch('http://localhost:3030/programs')
                .then(response => response.json())
                .then(p => {
                    const programs = p.data;

                    // get enrollments
                    fetch('http://localhost:3030/enrollments')
                        .then(response => response.json())
                        .then(e => {
                            const enrollments = e.data;
                            // map together enrollment manager data
                            const result = enrollments.map(e => {
                                const program = programs.find(p => p._id == e.programId);
                                const user = users.find(u => u._id == e.userId);
                                return {
                                    _id: e._id,
                                    userId: e.userId,
                                    userEmail: user.email,
                                    isApproved: e.isApproved,
                                    programId: program._id,
                                    programTitle: program.title,
                                };
                            });
                            this.setState({ enrollments: result })
                        });
                });
        })
    }

    render() {
        const tableRef = React.createRef();
        return (
            <MaterialTable
                tableRef={tableRef}
                options={{
                    search: true,
                    paging: false,
                    sorting: true,
                }}
                title="Enrollments"
                columns={[
                    {
                        title: 'Program',
                        field: 'programTitle',
                        editable: false,
                        render: row => (<a href={"/programs/" + row.programId}>{row.programTitle}</a>),
                    },
                    { title: 'User', field: 'userEmail', editable: false },
                    {
                        title: 'Is Approved',
                        field: 'isApproved',
                        editComponent: props => (
                            <Select
                                id="isApproved"
                                value={props.value}
                                onChange={e => props.onChange(e.target.value)}
                            >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                            </Select>),
                    },
                ]
                }
                data={this.state.enrollments}
                editable={{
                    onRowUpdate: (newData, oldData) => { return updateEnrollment(newData).then(_ => this.getData()) },
                    onRowDelete: (oldData) => { return deleteEnrollment(oldData._id).then(_ => this.getData()) },
                }}
            />
        )
    }

}
