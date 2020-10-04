import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';
import Programs from './programs/programs';


import './App.css';
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/home"><img style={{ width: "30px", height: "30px" }} src="../ymca-logo.png" alt="ymca logo"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/programs">Programs</Nav.Link>
              <Nav.Link href="/staff">Staff</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
              <Nav.Link href="/register"><i className="fas fa-user"></i> Register</Nav.Link>
              <Nav.Link href="/account"><i className="fas fa-user"></i> My Account</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/programs" component={Programs} />
        <Route path="/staff" component={Staff} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/account" component={Account} />
      </div>
    );
  }
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <i className="fas fa-spin fa-lg fa-dumbbell"></i>
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
export default App;
