import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';
import Programs from './programs/programs';
import Program from './programs/program';
import './App.css';
import { logout } from './auth/usersService';
import { withRouter } from 'react-router-dom';
import { app_logout } from './redux/actions/userActions';
import { connect } from 'react-redux';
import ProgramManager from './programs/programManager'
import EnrollmentManager from './enrollments/enrollmentManager'
import MyAccount from './auth/myAccount';

class App extends React.Component {

  clickLogout = async (e) => {
    e.preventDefault();
    await logout();
    this.props.app_logout();
    this.props.history.push('/');
  }
  render() {
    const hasUser = Boolean(this.props.user._id);
    const isMember = this.props.user.userRole === "member";
    const isAdmin = this.props.user.userRole === "admin";
    const isStaff = this.props.user.userRole === "staff";
    return (
      <div>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg" style={{ marginBottom: "10px" }}>
          <Navbar.Brand as={Link} to="/"><img style={{ width: "30px", height: "30px" }} src="../ymca-logo.png" alt="ymca logo"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/programs">Programs</Nav.Link>
              {isStaff || isAdmin ? <Nav.Link as={Link} to="/program-manager">Manage Programs</Nav.Link> : ""}
              {isStaff || isAdmin ? <Nav.Link as={Link} to="/enrollment-manager">Manage Enrollments</Nav.Link> : ""}
              {/* {hasUser ? <Nav.Link as={Link} to="/staff">Staff</Nav.Link> : ""} */}
            </Nav>
            <Nav>
              {hasUser ? <Nav.Link as={Link} to="/" onClick={this.clickLogout}><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link> : ""}
              {hasUser ? <Nav.Link as={Link} to="/account"><i className="fas fa-user"></i> {this.props.user.email}</Nav.Link> : ""}
              {!hasUser ? <Nav.Link as={Link} to="/login"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link> : ""}
              {!hasUser ? <Nav.Link as={Link} to="/register"><i className="fas fa-user"></i> Register</Nav.Link> : ""}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/programs" component={Programs} />
        <Route path="/staff" component={Staff} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={MyAccount} />
        <Route path="/program-manager" component={ProgramManager} />
        <Route path="/enrollment-manager" component={EnrollmentManager} />
        <Route path="/programs/:id" component={Program} />
      </div>
    );
  }
}

function Home() {
  return (
    <div className="container" style={{ backgroundColor: "lightgrey" }}>
      <div class="row">
        <div style={{ margin: "auto", marginBottom: "20px" }}>
          <img src="http://www.theplugkcps.org/wp-content/uploads/2017/02/logo-ymca-footer.png" alt="ymca home image"></img>
        </div>
      </div>
      <div className="row">
        <div className="card card-body bg-light" style={{ height: "300px" }}>
          <span>
            Welcome to the YMCA registration application.
            Feel free to browse our program offerings and register to enroll.
          </span>
        </div>
      </div>
    </div>
  )
}
function Staff() {
  return (
    <h1>Staff</h1>
  )
}
function Account() {
  return (
    <h1>Account</h1>
  )
}

const mapState = (state) => { return { user: state.user } };
const mapDispatch = { app_logout };
export default connect(mapState, mapDispatch)(withRouter(App));
