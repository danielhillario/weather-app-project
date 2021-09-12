const { Link } = require("react-router-dom");
const { Navbar, Nav, Container } = require("react-bootstrap");

function Navigation(props) {
    let { title } = props;
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/weather">Weather</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

module.exports = Navigation;