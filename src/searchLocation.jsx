import React from "react";
import {useState, useEffect} from "react";
import './App.css'
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios";


const SearchLocation = () => {
    const navigate = useNavigate();

    const routeChange = () => {
        let path = '/login';
        navigate(path);
    };
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            routeChange()
        }
    }, []);

    const [data, setData] = useState([]);
    const [location_id, setLocationID] = useState("");
    const [location_type, setLocationType] = useState("");
    const [item_id, setItemID] = useState("");
    const [physical_location, setPhysicalLocation] = useState("");

    // search location function
    const search = (e) => {
        e.preventDefault();
        Axios.get(`http://localhost:3001/api/getSearchLocation?location_id=${location_id}&location_type=${location_type}&item_id=${item_id}&physical_location=${physical_location}`)
        .then((response) =>{
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleView = (e, id) => {
        e.preventDefault();
        const idPassed = id.toString();
        navigate(`/contact/${idPassed}`);
    }

    const handleRemove = (e, id) => {
        e.preventDefault();
        const idPassed = id.toString();
        Axios.delete(`http://localhost:3001/api/location/${idPassed}`)
        .then((response) =>{
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='page'>
            <div className='HomePageBar'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-maroon">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <label className="navbar-brand">ABSOLUTE MEDIA, INC.</label>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                    </div>
                </div>

                <button className="btn btn-outline-light">Logout</button>
            </nav>

            </div>

            <div className="container p-5">
                <div className="page-headers">
                    <h2>SEARCH LOCATION</h2>
                </div>
                <form>
                    <div className="contact-info pt-3">
                        <div className="form-row">
                            <label htmlFor="id" className="col-md-0 col-form-label"><b>Location ID</b></label>
                            <div className="input-group input-group-sm mb-3 col-md-2">
                                <input type="text" className="form-control" id="location-id" onChange={(e) =>{
                                setLocationID(e.target.value)
                            }} maxLength = "128"/>
                            </div>

                            <label htmlFor="name" className="col-md-0 col-form-label"><b>Location Type</b></label>
                            <div className="input-group input-group-sm mb-3 col-md-4">
                                <input type="text" className="form-control" id="location-type" onChange={(e) =>{
                                setLocationType(e.target.value)
                            }} maxLength = "128"/>
                            </div>

                            <label htmlFor="name" className="col-md-0 col-form-label"><b>Item ID</b></label>
                            <div className="input-group input-group-sm mb-3 col-md-4">
                                <input type="text" className="form-control" id="item-id" onChange={(e) =>{
                                setItemID(e.target.value)
                            }} maxLength = "128"/>
                            </div>

                            <label htmlFor="name" className="col-md-0 col-form-label"><b>Physical Location</b></label>
                            <div className="input-group input-group-sm mb-3 col-md-4">
                                <input type="text" className="form-control" id="physical-location" onChange={(e) =>{
                                setPhysicalLocation(e.target.value)
                            }} maxLength = "128"/>
                            </div>

                            <div className="input-group input-group mb-3 col-md-1">
                                <button onClick={(e) => search(e)} id="search-company" className="btn btn-outline-success">Search</button>
                            </div>
                        </div>
                    </div>
                    {data && (
                        <>
                        <div className="section-headers">
                            <h5>Search Results</h5>
                        </div>
                        <div className="table-responsive-md">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Dept</th>
                                        <th scope="col">VIEW</th>
                                        <th scope="col">DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{row.company_id}</td>
                                            <td>{row.company_name}</td>
                                            <td>{row.fname}</td>
                                            <td>{row.lname}</td>
                                            <td>{row.contact_type}</td>
                                            <td>{row.title}</td>
                                            <td>{row.dept}</td>
                                            <td><button className="btn btn-sm btn-outline-info" onClick={(e) => handleView(e, row.location_id)}>OPEN</button></td>
                                            <td><button className="btn btn-sm btn-danger" onClick={(e) => handleRemove(e, row.location_id)}>DELETE</button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        </>
                    )}
                        
                    <div>
                        <button className="btn btn-outline-dark" onClick={() => navigate("../Search")}>Back</button>
                        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>Home</button>
                    </div>
                </form>
            </div>

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <label>Absolute Media, Inc.</label>
                        </div>
                        <div className="col-sm">
                            <label>3350 Victor Ct. Santa Clara, CA 95054</label>
                        </div>
                        <div className="col-sm">
                            <label>(408) 970-3283</label>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SearchLocation;