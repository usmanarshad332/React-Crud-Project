import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'

function Student() {

    const [students, setStudentData] = useState([]);

    const getStudentData = async () => {
        try {
            const data = await fetch("http://localhost/react_projects/crud/react-project-api's/employeeApi.php");
            const actualData = await data.json();
            setStudentData(actualData);
        } catch (error) {
            console.log(error);
        }
    }

  const deleteUser = (id) => {
        const requestOptions = {
            method: 'Delete',
            body: id
        };
        fetch(`http://localhost/react_projects/crud/react-project-api's/employeeApi.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data' + data.status);
                getStudentData();
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }

    useState(() => {
       getStudentData();
    }, []);
    return (
        <>  
            <h1 style = {{'textAlign': 'center'}}> React JS Crud Operations </h1>
             <div className="container">
                <div className="row">
                    <div className="col">
                        <Link  className="btn btn-primary" to="/student/create">Create Employee</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table className="table mx-auto">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Salary</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((value, index) => {
                                        return (
                                            <tr key = {index}>
                                                <td>{index}</td>
                                                <td>{value.name}</td>
                                                <td>{value.age}</td>
                                                <td>{value.salary}</td>
                                                <td> <Link to={`/student/edit/${value.id}`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link> <button onClick={() => deleteUser(value.id)} className="btn btn-danger">Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Student;