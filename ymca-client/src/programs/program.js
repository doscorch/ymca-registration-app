import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';

const weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

// function to find if dates have any overlap
function overlap(dates) {
    const sortedDates = dates.sort((previous, current) => {
        const previousTime = previous.start.getTime();
        const currentTime = current.start.getTime();
        if (previousTime < currentTime) {
            return -1;
        }
        if (previousTime === currentTime) {
            return 0;
        }
        return 1;
    });

    for (let i = 0; i < sortedDates.length; i++) {
        if (i != 0) {
            const date1 = sortedDates[i - 1];
            const date2 = sortedDates[i];
            const previousEnd = date1.end.getTime();
            const currentStart = date2.start.getTime();
            if (previousEnd >= currentStart) {
                return true;
            }
        }
    }

    return false;
}

// function to get all meetings datetime for a program
function getMeetings(meetings, program) {
    const programStartDate = new Date(program.startDate);
    const programEndDate = new Date(program.endDate);
    const programStartTime = new Date(program.startTime);
    const programEndTime = new Date(program.endTime);
    const programDays = program.meetDays;
    let date = new Date(programStartDate);
    while (date <= programEndDate) {
        if (programDays.some(d => weekdays.indexOf(d.name) == date.getDay())) {
            let startTime = new Date(date);
            startTime.setHours(programStartTime.getHours());
            startTime.setMinutes(programStartTime.getMinutes());

            let endTime = new Date(date);
            endTime.setHours(programStartTime.getHours());
            endTime.setMinutes(programStartTime.getMinutes());
            meetings.push({ start: startTime, end: endTime });
        }
        date.setDate(date.getDate() + 1);
    }
}

class Program extends React.Component {
    state = {
        program: {},
        allPrograms: [],
        enrollments: [],
        userEnrollments: [],
    }
    enroll = () => {
        const programId = this.state.program._id;
        const userId = this.props.user._id;

        // post enrollment
        fetch("http://localhost:3030/enrollments", {
            method: "POST",
            body: JSON.stringify({
                programId: programId,
                userId: userId,
                isApproved: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(_ => { this.getEnrollments(programId); });
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.getPrograms(id);
        this.getEnrollments(id);
        this.getUserEnrollments(this.props.user._id)
        this.getAllPrograms();
    }
    getAllPrograms() {
        // get programs
        fetch('http://localhost:3030/programs')
            .then(response => response.json())
            .then(data => this.setState({ allPrograms: data.data }));
    }
    getPrograms(id) {
        // get programs by id
        fetch('http://localhost:3030/programs/' + id)
            .then(response => response.json())
            .then(data => this.setState({ program: data }));
    }
    getEnrollments(id) {
        // get enrollments by program id
        fetch('http://localhost:3030/enrollments?programId=' + id)
            .then(response => response.json())
            .then(data => this.setState({ enrollments: data.data }));
    }
    getUserEnrollments(id) {
        // get enrollments by user id
        fetch('http://localhost:3030/enrollments?userId=' + id)
            .then(response => response.json())
            .then(data => this.setState({ userEnrollments: data.data }));
    }
    render() {
        const userId = this.props.user._id;
        const program = this.state.program;
        const allPrograms = this.state.allPrograms;
        const enrollments = this.state.enrollments;
        const hasUser = Boolean(userId);
        const hasTimeConflict = this.state.userEnrollments.length
            ? this.state.userEnrollments.some(e => {
                const meetings = [];
                const enrolledProgram = allPrograms.find(p => p._id == e.programId);
                if (!enrolledProgram || enrolledProgram._id == program._id) return false;
                getMeetings(meetings, program);
                getMeetings(meetings, enrolledProgram);
                const hasOverlap = overlap(meetings);
                return hasOverlap;
            })
            : false;
        const isCurrentlyEnrolled = enrollments.some(e => e.userId == userId);
        const showEnrollmentBtn = !hasTimeConflict && hasUser && !isCurrentlyEnrolled && enrollments.length < program.participantLimit;
        const isFull = enrollments.length >= program.participantLimit;
        const rowStyle = { padding: ".25em" };
        return (
            <Container fluid>
                <Row>
                    <Col><img style={{ width: "100%", borderRadius: "10px" }} src={program.img} alt="program image"></img></Col>
                    <Col>
                        <Card bg="light" style={rowStyle}>
                            <Row>
                                <Col>
                                    <h4 style={{ textAlign: "center" }}>{program.title}</h4>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Description</h6>
                                    <p>{program.description}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Location</h6>
                                    <p>{program.location}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Meeting Days</h6>
                                    <p>{program.meetDays ? program.meetDays.map(d => d.name).join(", ") : ""}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Start Date</h6>
                                    <p>{new Date(program.startDate).toLocaleDateString()}</p>
                                </Col>
                                <Col>
                                    <h6>End Date</h6>
                                    <p>{new Date(program.endDate).toLocaleDateString()}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Start Time</h6>
                                    <p>{new Date(program.startTime).toLocaleTimeString([], { timeStyle: 'short' })}</p>
                                </Col>
                                <Col>
                                    <h6>End Time</h6>
                                    <p>{new Date(program.endTime).toLocaleTimeString([], { timeStyle: 'short' })}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Nonmember Price</h6>
                                    <p>{program.nonmemberPrice}</p>
                                </Col>
                                <Col>
                                    <h6>Member Price</h6>
                                    <p>{program.memberPrice}</p>
                                </Col>
                            </Row>
                            <Row style={rowStyle}>
                                <Col>
                                    <h6>Current Enrollment</h6>
                                    <p>{enrollments.length}/{program.participantLimit}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {showEnrollmentBtn ? <Button onClick={this.enroll}>Enroll</Button> : ""}
                                    {isCurrentlyEnrolled ? <Alert severity="success">Currently Enrolled: view enrollments in <Link href='/account'>my account</Link></Alert> : ""}
                                    {hasTimeConflict ? <Alert severity="info">Scheduling Conflict: you cannot enroll in this program</Alert> : ""}
                                    {(isFull && !isCurrentlyEnrolled) ? <Alert severity="info">program is currently at capacity</Alert> : ""}
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

export default connect(mapState, mapDispatch)(Program);