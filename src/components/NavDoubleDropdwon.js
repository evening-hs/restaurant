import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';

function NavDoubleDropdown({title, items}) {
    return (
        <div>
            <NavDropdown menuVariant='double' title={title}>
                
                <Accordion bsPrefix='accordion accordion-nav'>
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

export default NavDoubleDropdown;