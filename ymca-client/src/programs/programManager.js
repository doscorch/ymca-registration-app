import * as React from 'react';
import { TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import { createProgram, deleteProgram, updateProgram } from './programsService';

export default class ProgramManager extends React.Component {

    render() {
        const tableRef = React.createRef();
        const width = { maxWidth: "5px", overflow: "scroll" };
        return (
            <MaterialTable
                tableRef={tableRef}
                title="Programs"
                columns={[
                    // { title: 'Id', field: '_id' },
                    { title: 'Title', field: 'title' },
                    { title: 'Description', field: 'description' },
                    { title: 'Location', field: 'location' },
                    { title: 'Price', field: 'price' },
                    { title: 'Participant limit', field: 'participantLimit' },
                    {
                        title: 'Start Date',
                        field: 'startDate',
                        render: row => (<span>{new Date(row.startDate).toLocaleDateString()}</span>),
                        editComponent: props => (
                            <TextField
                                id="startDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={props.value}
                                onChange={e => props.onChange(e.target.value)}
                            />),
                    },
                    {
                        title: 'End Date',
                        field: 'endDate',
                        render: row => (<span>{new Date(row.endDate).toLocaleDateString()}</span>),
                        editComponent: props => (
                            <TextField
                                id="endDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={props.value}
                                onChange={e => props.onChange(e.target.value)}
                            />),
                    },
                    {
                        title: "Meet Time",
                        field: "meetTime"
                    },
                    { title: 'Image Source', field: 'img', cellStyle: width, headerStyle: width },
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url = 'http://localhost:3030/programs'
                        fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result.data,
                                })
                            })
                    })
                }
                editable={{
                    onRowAdd: (newData) => createProgram(newData),
                    onRowUpdate: (newData, oldData) => updateProgram(newData),
                    onRowDelete: (oldData) => deleteProgram(oldData._id),
                }}
            />
        )
    }

}
