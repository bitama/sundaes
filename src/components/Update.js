import "bootstrap/dist/css/bootstrap.min.css"
import { Link, navigate } from "@reach/router"
import React, {useState,useEffect} from 'react'
import axios from "axios"



const Update = (props) => {
    // const [sundae, setSundae] = useState([])
    const[form,setForm] = useState({
        name: '',
        ice_cream: '',
        source: '',
        topping: '',
        color: '',
        whipped:''
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sundaes/${props.id}/find`)
            .then(res =>setForm(res.data.sundae))
            .catch(err => console.log(err))
        },[props.id])
        const onChangeHandler = (event) => {
            setForm({
                ...form,
                [event.target.name]:event.target.value
            })
    }
    
        const onSubmitHandler = (event) => {
            event.preventDefault()
            axios.put(`http://localhost:8000/api/sundaes/${props.id}/update`, form)
                .then(res =>console.log(res)
                )
                navigate("/")
            .catch(err => console.log(err))
    }
    return(
        <div className="App container mt-4 bg-success text-light">
        <h1>Update sundaes</h1>
        <form onSubmit={onSubmitHandler} >
            <div className="form group">
            <label  htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label htmlFor="name">Ice_cream</label>
            <input type="text" className="form-control"name="ice_cream" value={form.ice_cream} onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label  htmlFor="name">Sauce</label>
            <input type="text" className="form-control"name="sauce" value={form.sauce} onChange={onChangeHandler} />
            </div>
            <div className="form group">
            <label  htmlFor="name">Topping</label>
            <input type="text" className="form-control"name="topping" value={form.topping} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
            <label  htmlFor="name">Color</label>
            <input type="text" className="form-control"name="color" value={form.color} onChange={onChangeHandler}/>
            </div>
            <div className="form group">
            <label for="name">whipped</label>
                    <input type="text" className="form-control" name="whipped" value={form.whipped}onChange={onChangeHandler}  />
            </div>
                <input type="submit" className="btn btn-danger mt-3" />
            
            </form>
            <Link to="/" className=" text-primary mt-4">Go to main page</Link>
        </div>
    )
}
export default Update;