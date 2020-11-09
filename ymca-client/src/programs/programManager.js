import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { createProgram, deleteProgram, updateProgram } from './programsService';
import { Multiselect } from 'multiselect-react-dropdown';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

export default class ProgramManager extends React.Component {
    state = {
        days: [{ name: "Monday" }, { name: "Tuesday" }, { name: "Wednesday" }, { name: "Thursday" }, { name: "Friday" }, { name: "Saturday" }, { name: "Sunday" }],

    }
    render() {
        const days = this.state.days;
        const tableRef = React.createRef();
        const width = { maxWidth: "5px", overflow: "scroll" };
        return (
            <MaterialTable
                tableRef={tableRef}
                options={{
                    search: false,
                    paging: false,
                    tableLayout: "fixed",
                }}
                title="Programs"
                columns={[
                    // { title: 'Id', field: '_id' },
                    { title: 'Title', width: 200, field: 'title' },
                    { title: 'Description', width: 400, field: 'description' },
                    { title: 'Location', width: 200, field: 'location' },
                    { title: 'Nonmember Price', width: 200, field: 'nonmemberPrice' },
                    { title: 'Member Price', width: 200, field: 'memberPrice' },
                    { title: 'Participant limit', width: 200, field: 'participantLimit' },
                    {
                        title: 'Start Date',
                        field: 'startDate',
                        width: 200,
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
                        width: 200,

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
                        title: "Meeting Days",
                        field: "meetDays",
                        width: 200,
                        render: row => (<span>{row.meetDays ? row.meetDays.map(d => d.name).join(", ") : ""}</span>),
                        editComponent: props => (
                            <Multiselect
                                options={days}
                                selectedValues={props.value}
                                onSelect={(list, item) => { props.onChange(list) }}
                                onRemove={(list, item) => { props.onChange(list) }}
                                displayValue="name"
                                showCheckbox={true}
                            />
                        ),
                    },
                    {
                        title: "Start Time",
                        field: "startTime",
                        width: 200,
                        render: row => (<span>{new Date(row.startTime).toLocaleTimeString([], { timeStyle: 'short' })}</span>),
                        editComponent: props => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="start-time"
                                    label="Start Time"
                                    value={props.value}
                                    onChange={date => props.onChange(date)}
                                />
                            </MuiPickersUtilsProvider>
                        ),
                    },
                    {
                        title: "End Time",
                        field: "endTime",
                        width: 200,
                        render: row => (<span>{new Date(row.endTime).toLocaleTimeString([], { timeStyle: 'short' })}</span>),
                        editComponent: props => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="end-time"
                                    label="End Time"
                                    value={props.value}
                                    onChange={date => props.onChange(date)}
                                />
                            </MuiPickersUtilsProvider>
                        ),
                    },
                    {
                        title: 'Image Source',
                        width: 200,
                        field: 'img',
                        cellStyle: width,
                        headerStyle: width
                    },
                ]}
                data={
                    query =>
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
