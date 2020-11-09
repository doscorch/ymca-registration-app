import * as React from 'react';
import MaterialTable from 'material-table'
import { deleteEnrollment, updateEnrollment } from './enrollmentsService';
import { getUsers } from '../auth/usersService';
import { Select, MenuItem } from '@material-ui/core'

export default class EnrollmentManager extends React.Component {
    render() {
        const tableRef = React.createRef();
        const getData = (resolve, reject) => {
            getUsers().then(users => {
                fetch('http://localhost:3030/programs')
                    .then(response => response.json())
                    .then(p => {
                        const programs = p.data;
                        fetch('http://localhost:3030/enrollments')
                            .then(response => response.json())
                            .then(e => {
                                const enrollments = e.data;
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
                                resolve({ data: result });
                            });
                    });
            })
        }
        return (
            <MaterialTable
                tableRef={tableRef}
                options={{
                    search: false,
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
                data={_ => new Promise(getData)}
                editable={{
                    onRowUpdate: (newData, oldData) => updateEnrollment(newData),
                    onRowDelete: (oldData) => deleteEnrollment(oldData._id),
                }}
            />
        )
    }

}
