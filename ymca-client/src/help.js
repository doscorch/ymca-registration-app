import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

class HelpPage extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card bg="light" style={{ padding: "10px" }}>
                            <Row>
                                <Col><h3>Help Information</h3></Col>
                            </Row>
                            <hr />
                            <div>
                                <br />
                                <h4>Table of Contents</h4>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        Introduction
                                            <ul>
                                            <li>System Requirements</li>
                                            <li>Installation</li>
                                        </ul>
                                    </li>

                                    <li>
                                        Getting Started
                                        </li>
                                    <li>
                                        Navigation
                                            <ul>
                                            <li>Home Page</li>
                                            <li>View My Account</li>
                                            <li>Browse Programs</li>
                                            <li>View Program Details</li>
                                        </ul>
                                    </li>
                                    <li>
                                        User Operations
                                            <ul>
                                            <li>Login</li>
                                            <li>Logout</li>
                                            <li>Register</li>
                                            <li>View My Account Information</li>
                                            <li>View Enrollments</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div>
                                <h4>Introduction</h4>
                                <p>
                                    This help page describes how a user would use the YMCA Registration System. This program is a web based system that uses modern web technologies to allow a user to view current program offerings and enroll in them at the YMCA.
                                </p>
                                <h5>System Requirements</h5>
                                <p>
                                    Any modern browser capable of viewing web pages (Google Chrome, Firefox, Edge)
                                </p>
                                <h5>Installation</h5>
                                <p>
                                    Install a web browser listed in the system requirements section
                                </p>
                                <figure>
                                    <img style={{ width: '50%' }} src="/browsers.png" alt="browsers" />
                                </figure>
                            </div>
                            <hr />
                            <div>
                                <h4>Getting Started</h4>
                                <p>
                                    The web program's main function is to allow users to browse current YMCA programs and enroll them.
                                    Users will be able browse programs as a guest or register as a nonmember user. Users will initally
                                    view the system as a guest. Newly registered users will automatically be set as nonmembers.
                                    </p>
                                <br />
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <b>Home</b> - Navigating to the home page will present our YMCA welcome page with general information
                                            <figure>
                                            <img style={{ width: '100%' }} src="/home.png" alt="home" />
                                            <figcaption>Fig.1 - Homepage</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <b>Browse</b> - Navigating to the browse page allows the user to view all current program offerings at a quick glance.
                                            <figure>
                                            <img style={{ width: '100%' }} src="/browse.png" alt="fig2" />
                                            <figcaption>Fig.2 - Browse Interface</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <b>Log In</b> - Navigating to the login page allows a user to login to their previously created account
                                            <figure>
                                            <img style={{ width: '100%' }} src="/login.png" alt="fig3" />
                                            <figcaption>Fig.3 - Login</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <b>Register</b> - Navigating to the register page allows a user to create a new nonmember account. Each account is keyed on by email address, so only 1 account per email is allowed.
                                            <figure>
                                            <img style={{ width: '100%' }} src="/register.png" alt="fig4" />
                                            <figcaption>Fig.4 - Register</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <b>My Account</b> - Navigating to the my account page allows a user to view their account information as well as their current program enrollments.
                                            <figure>
                                            <img style={{ width: '100%' }} src="/myaccount.png" alt="fig5" />
                                            <figcaption>Fig.5 - My Account</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <b>Help</b> - Navigating to the help page will present this page. Useful for new users to familularize themselves with the YMCA Registration System.
                                            <figure>
                                            <img style={{ width: '100%' }} src="/help.png" alt="fig6" />
                                            <figcaption>Fig.6 - The Manual Page</figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div>
                                <h4>Program Operations</h4>
                                <p>
                                    Program operations are the core functionality of this software interface. These operations enable Nonmember and Member users to browse and enroll in programs.
                                    </p>
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <h5>
                                            Browse Programs
                                        </h5>
                                        <p>
                                            A user will be able to browse through program offerings at the YMCA. This list is only current offerings that users would be allowed to enroll into.
                                        </p>
                                    </li>
                                    <li>
                                        <h5>
                                            View Program Details
                                        </h5>
                                        <p>
                                            A user will be able to view a particular programs details. This details page will displayed information like descriptions, dates, prices, participant limits and other important information related to that particular program.
                                        </p>
                                        <figure>
                                            <img style={{ width: '400px' }} src="/details.png" alt="fig7" />
                                            <figcaption>Fig.7 - Program Details</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <h5>
                                            Enroll in Program
                                        </h5>
                                        <p>
                                            On the program details page a user will be able to enroll in the program if there is availability and they do not have any scheduleing conflicts.
                                        </p>
                                        <figure>
                                            <img style={{ width: '400px' }} src="/enroll.png" alt="fig8" />
                                            <figcaption>Fig.8 - Enroll</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <h5>
                                            View Enrollments
                                        </h5>
                                        <p>
                                            On the My Account page, a user will be able to view their current enrollments. A staff member is required to approve the enrollment before the user is offically in the program.
                                            The enrollment status can also be found here.
                                        </p>
                                        <figure>
                                            <img style={{ width: '100%' }} src="/enrollments.png" alt="fig8" />
                                            <figcaption>Fig.8 - Enrollments</figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>User Operations</h4>
                                <p>
                                    User operations are intended to enable a user to register, authenticate, and maintain their user profile.
                                    </p>
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <h5>Login</h5>
                                        <p>
                                            In order to log in you must already have an account. If you do not have an account set up see the "Register" section below. In order to log into your account click the login button.
                                            </p>
                                        <figure>
                                            <img style={{ width: '400px' }} src="/loginpage.png" alt="fig9" />
                                            <figcaption>Fig.9 - Login Page</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <h5>Logout</h5>
                                        <p>
                                            If you are logged into an account you will have the option to logout. In the upper right hand corner next to the button with your username in it click the "logout" button.
                                        </p>
                                        <figure>
                                            <img style={{ width: '100%' }} src="/logout.png" alt="fig10" />
                                            <figcaption>Fig.10 - Logout</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <h5>Register</h5>
                                        <p>
                                            If you want to enroll in programs as a nonmember account, feel free to go to the registration page to register for an account.
                                        </p>
                                        <figure>
                                            <img style={{ width: '400px' }} src="/registerpage.png" alt="fig11" />
                                            <figcaption>Fig.11 - Register Page</figcaption>
                                        </figure>
                                    </li>
                                    <li>
                                        <h5>Account Information</h5>
                                        <p>
                                            If you head to the My Account page you will find your account information that we have on file. Any problems here will need staff members attention. Feel free to contact us.
                                        </p>
                                        <figure>
                                            <img style={{ width: '100%' }} src="/myaccountinfo.png" alt="fig12" />
                                            <figcaption>Fig.12 - Account Information</figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HelpPage;