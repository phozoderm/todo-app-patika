import {useState} from 'react';
import './index.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import journals from '../ToDoListPage/img/journals.svg';

export function LoginPage() {
    const [username, setUsername] = useState('');

    function onLoginFormSubmit(e) {
        e.preventDefault();
        localStorage.setItem('username', username);
        window.location.reload();
    }

    return (
        <>
            <Navbar bg="secondary" className="py-3 grey-gradient-bg">
                <Container>
                    <NavbarBrand variant="black">
                        <img
                            src={journals}
                            width="30"
                            height="30"
                            className="me-2"
                        />
                        To Do List
                    </NavbarBrand>
                </Container>
            </Navbar>
            <Form
                className="w-100 vh-100 d-flex justify-content-center align-items-center"
                onSubmit={onLoginFormSubmit}>
                <Form.Group className="d-flex flex-column form-group-container">
                    <h1 className="text-center">LOGIN</h1>
                    <Form.Control
                        className="mb-1"
                        name={'username'}
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                    <Button
                        className="grey-gradient-bg"
                        type="submit"
                        disabled={username.length < 3}>
                        Sign in
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}
