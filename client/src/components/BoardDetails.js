import { React, useEffect, useState, useContext } from 'react';

import { Context } from './context/Context';
import { deleteOne, getOne, getUser, updateDescription, editOne, deleteDesc } from '../services/board';
import { useNavigate, useParams } from 'react-router-dom';




export default function BoardDetails() {
    let [board, setBoard] = useState();
    const { user } = useContext(Context)
    const [boardUser, setUser] = useState([])
    let [description, setDescription] = useState([])
    const [stater, setStater] = useState(false)
    let { id } = useParams();

    const [formValues, setFormValues] = useState({ originalPoster: "", image: "" })
    const [formErrors, setFormErrors] = useState({})
    const [error, setError] = useState()
    let veri = ""

    const [formValuesDesc, setFormValuesDesc] = useState({ comment: "", image: "" })
    const [formErrorsDesc, setFormErrorsDesc] = useState({})
    const [errorDesc, setErrorDesc] = useState()
    let veriDesc = ""

    const navigate = useNavigate()

    useEffect(() => {
        getOne(id).then(result => {
            setBoard(result);
            setFormValues(result)
            setDescription(result.description)
        });
    }, [id, stater])

    useEffect(() => {
        if (board?.owner) {
            getUser(board.owner).then(res => setUser(res))
        }

    }, [board])



    const onSubmit = async (e) => {
        e.preventDefault();

        validateDesc(formValuesDesc)

        if (Object.keys(veriDesc).length !== 0) {

            return
        }
        try {
            const descriptionUpdate = Object.fromEntries(new FormData(e.target));
            descriptionUpdate.owner = user.username

            let check = (descriptionUpdate.image.slice(0, 8) === 'https://')
            let check2 = (descriptionUpdate.image.slice(0, 7) === 'http://')
           
            if (check === false && check2 === false) {
                descriptionUpdate.image = ""
            }

            const desc = updateDescription(board._id, descriptionUpdate)
            if (desc.error) {
                setErrorDesc(desc.error)
                return
            }
            document.getElementById("description").reset();


            setStater(!stater)

        } catch (error) {
            console.log({ error: error.message })
        }
    };

    function deleteExecute() {
        deleting(board._id)
    }
    const deleting = async (id) => {
        await deleteOne(id)
        navigate("/")
    }
    function deleteDescr(id) {
        deletingDescr(id)
    }
    const deletingDescr = async (id) => {
        await deleteDesc(id)
        setStater(!stater)

    }

    const onEdit = async (e) => {
        e.preventDefault();

        validate(formValues)

        if (Object.keys(veri).length !== 0) {

            return
        }

        try {
            const oUpdate = Object.fromEntries(new FormData(e.target));
            
            let check = (oUpdate.image.slice(0, 8) === 'https://')
            let check2 = (oUpdate.image.slice(0, 7) === 'http://')
           
            if (check === false && check2 === false) {
                oUpdate.image = ""
            }

            const editBoard = editOne(board._id, oUpdate)
            if (editBoard.error) {
                setError(editBoard.error)
                return
            }
            document.getElementById("edit").reset();


            setStater(!stater)

        } catch (error) {
            console.log({ error: error.message })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })

    }

    const validate = (values) => {
        const errors = {}
        if (!values?.originalPoster) {
            errors.originalPoster = "First post is required!"
        }
        veri = errors
        setFormErrors(errors)

    }

    const handleChangeDesc = (e) => {
        const { name, value } = e.target
        setFormValuesDesc({ ...formValuesDesc, [name]: value })

    }
    const validateDesc = (values) => {
        const errors = {}
        if (!values?.comment) {
            errors.comment = "Any comment is required!"
        }
        veriDesc = errors
        setFormErrorsDesc(errors)

    }

    return (
        <div className='boardCard'>
            {boardUser[0]?.username ? <div style={{ fontSize: '15px' }}>Creator: {boardUser[0].username}</div> : <div>Loading...</div>}
            {board ?
                <div>
                    <div style={{color:'red', fontSize: '10px' }} >ID: {board._id}</div>
                    <div style={{ fontSize: '15px' }} >Last Update: {board.date}</div>
                    {board.image !== "" ? <img src={board.image} alt={board.image} width="150" height="150"></img> : ""}
                    <div style={{ color: 'green' }} className="op" >{board.originalPoster}</div>
                    {board.owner === user.id ? <button onClick={deleteExecute}>Delete</button> : ""}
                    {board.owner === user.id ? <section className="edit">
                        <form id="edit" onSubmit={onEdit}>
                            <div className="container">

                                <label htmlFor="edit">Original Post:</label>
                                <textarea rows="4" cols="50"
                                    type="text"
                                    id="originalPoster"
                                    name="originalPoster"

                                    value={setFormValues.originalPoster} onChange={handleChange}
                                    defaultValue={board?.originalPoster}
                                ></textarea>
                                <p style={{ fontSize: 12, color: "red" }}>{formErrors.originalPoster}</p>

                                <label htmlFor="image">Image Link:</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"

                                    placeholder='Image URL https:/...png'
                                    defaultValue={board?.image}

                                ></input>
                                <input
                                    className="btn submit"
                                    type="submit"
                                    value="Edit"
                                />
                                <p style={{ fontSize: 12, color: "red" }}>{error}</p>
                            </div>
                        </form>
                    </section> : ""}
                    {description ?
                        <ul>
                            {description.map(x =>
                                <li style={{ color: 'green' }} className="desc" key={x._id}><p>{x.owner}</p>
                                    {x?.image !== "" ? <img src={x?.image} alt="wrongLink" width="150" height="150"></img> : ""}
                                    <p>{x?.comment}</p>{x.owner === user.username ? <button onClick={() => { deleteDescr(x._id) }}>Delete</button> : ""}</li>
                            ) }
                        </ul> : ""} </div> : ""}

            {user.accessToken ?
                <section className="description">
                    <form id="description" onSubmit={onSubmit}>
                        <div className="container">

                            <label htmlFor="comment">Comment:</label>
                            <textarea rows="4" cols="50"
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder='Add new comment here'
                                value={setFormValuesDesc.comment} onChange={handleChangeDesc}
                            ></textarea>
                            <p style={{ fontSize: 12, color: "red" }}>{formErrorsDesc.comment}</p>
                            <label htmlFor="image">Image Link:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder='Add image link here'

                            ></input>
                            <input
                                className="btn submit"
                                type="submit"
                              
                            />
                            <p style={{ fontSize: 12, color: "red" }}>{errorDesc}</p>
                        </div>
                    </form>
                </section> : ""}
        </div>
    )
}

