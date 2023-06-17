import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate, useParams } from "react-router-dom";

function CreateStudent() {
    const {id} = useParams();
    const navigate = useNavigate();
     
    function getUser() {

        const requestOptions = {
            method: 'GET'
        };

        fetch(`http://localhost/react_projects/crud/react-project-api's/employeeApi.php?id=${id}`, requestOptions)
        .then(response => response.json())
        .then(response => {
            updateInput(response);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

    const [input, updateInput]= useState({
        name:'',
        age:'',
        salary:''
    });
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (id != null && id !== undefined && id !== '') {
            getUser();
        }
    }, []);
    const handleChange = (e) => {
        const {name, value} = e.target;
        updateInput((preValues) => {
            return {
                ...preValues, 
                [name] : value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === null || id === undefined || id === '') {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(input)
            };
            fetch("http://localhost/react-project-api's/employeeApi.php", requestOptions)
                .then(response => response.json())
                .then(data => {
                  // Update the message based on the response from the API
                  setMessage(data.status ? 'Form submitted successfully!' : 'Form submission failed.');
                  navigate('/');
                })
                .catch(error => {
                  console.error('Error:', error);
                  setMessage('An error occurred during form submission.');
                });
        } else {
            console.log('Edit Mode...');
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(input)
            };
            fetch(`http://localhost/react-project-api's/employeeApi.php?id=${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                  navigate('/');
                })
                .catch(error => {
                  console.error('Error:', error);
                  setMessage('An error occurred during form submission.');
                });
        }
        
    }

  return (
      <>

        <div className="container">
                <div className="row">
                    <h1>{id ? 'Update ' : 'Create '} Employee </h1>
                    <div className="col-sm-4">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name = "name" type="text" placeholder="Enter Name" value= {input.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control name = "age" type="number" placeholder="Enter Age" value= {input.age} onChange={handleChange} required />
                            </Form.Group> 
                            <Form.Group className="mb-3" controlId="formBasicSalary">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control name = "salary" type="number" placeholder="Enter Salary" value= {input.salary} onChange={handleChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Link to='/' className="btn btn-secondary" style={{marginLeft: "20px"}}>Cancel</Link> 
                        </Form>
                    </div>
                </div>
        </div>
    </>
  );
}

export default CreateStudent;