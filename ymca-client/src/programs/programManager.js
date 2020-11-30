import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import { createProgram, deleteProgram, updateProgram } from './programsService';
import { Multiselect } from 'multiselect-react-dropdown';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { cancelEnrollmentsByProgramId } from '../enrollments/enrollmentsService';

export default class ProgramManager extends React.Component {
    state = {
        days: [{ name: "Monday" }, { name: "Tuesday" }, { name: "Wednesday" }, { name: "Thursday" }, { name: "Friday" }, { name: "Saturday" }, { name: "Sunday" }],
        programs: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let url = 'http://localhost:3030/programs'
        return fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({ programs: result.data })
            })
    }

    render() {
        const days = this.state.days;
        const tableRef = React.createRef();
        const width = { maxWidth: "5px", overflow: "scroll" };
        return (
            <MaterialTable
                tableRef={tableRef}
                options={{
                    sorting: true,
                    search: true,
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
                data={this.state.programs}
                editable={{
                    onRowAdd: (newRow) => { return createProgram(newRow).then(_ => this.getData()) },
                    onRowUpdate: (newData, oldData) => { return updateProgram(newData).then(_ => this.getData()) },
                    onRowDelete: (oldData) => {
                        cancelEnrollmentsByProgramId(oldData._id);
                        return deleteProgram(oldData._id).then(_ => this.getData())
                    }
                }}
            />
        )
    }

}
