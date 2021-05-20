
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import {Link} from "@reach/router"

const Main = (props) => {
    const [sundae, setSundae] = useState([])
    const[load,setLoad]= useState(false)
    const [form, setForm] = useState({
        name: '',
        ice_cream: '',
        source: '',
        topping: '',
        color: '',
        whipped:''
    })
    
    
    useEffect(() => {
        // if (load === false) {
        axios.get("http://localhost:8000/api/sundaes")
            .then(res => {
                setSundae(res.data.sundaes)
                setLoad(true)
            })
            .catch(err => console.log(err))
            
        // }
    }, [load])

    const onChangeHandler = (event) => {
        setForm({
        ...form,
        [event.target.name]:event.target.value
        })
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8000/api/sundaes/create", form)
        .then(res => {
            console.log(res)
            setLoad(false)
        })
        .catch(err => console.log(err))
    }
    const onDeleteHandler = (_id) => {
        if (window.confirm("Are you sure you want to delete"))
            axios.delete(`http://localhost:8000/api/sundaes/${_id}/delete`)
            .then(res => {
                console.log(res)
                setLoad(false)
            })
            .catch(err => console.log(err))
        
    }
    
    return (
    <div className="App container mt-4 bg-info">
        <h1> Create Sundaes</h1>
        <form onSubmit={onSubmitHandler}>
            <div className="form group">
            <label for="name">Name</label>
            <input type="text" className="form-control" name="name" onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label for="name">Ice_cream</label>
            <input type="text" className="form-control"name="ice_cream" onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label for="name">Sauce</label>
            <input type="text" className="form-control"name="sauce" onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label for="name">Topping</label>
            <input type="text" className="form-control"name="topping" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
            <label for="name">Color</label>
            <input type="text" className="form-control"name="color" onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label for="name">whipped</label>
            <input type="text" className="form-control"name="whipped" onChange={onChangeHandler}/>
            </div>
            <input type="submit" className="btn btn-danger mt-3"/>
        </form>
        <h1>All sundaes</h1>
        <table className="table table-dark">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Ice_cream</th>
                <th>Sauce</th>
                <th>Topping</th>
                <th>color</th>
                <th>whipped</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                sundae.map((item, i) => {
                return <tr key={i}>
                    <td><Link to={`/api/sundaes/${item._id}/find`}>{item._id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.ice_cream}</td>
                    <td>{item.sauce}</td>
                    <td>{item.topping}</td>
                    <td>{item.color}</td>
                    <td>{item.whipped}</td>
                    <td><button className="btn btn-danger" onClick={()=>onDeleteHandler(item._id)}>delete</button></td>
                </tr>
                })
            }
            </tbody>
        </table>
        </div>
    );
}
export default Main;