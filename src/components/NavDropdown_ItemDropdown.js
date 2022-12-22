import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';

function NavDropdown_ItemDropdown() {
    return (
        <div>
            <NavDropdown title="Hello">
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}

export default NavDropdown_ItemDropdown;