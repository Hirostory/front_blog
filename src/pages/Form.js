import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Form = (props) => {
    const navigate = useNavigate()
    const params = useParams()

    const currentBlog = useMemo(() => props.posts.find(post => post.id === parseInt(params.id)), [params.id, props.posts])

    const [formData, setformData] = useState(
        props.formType === 'new' ? {
            title: '',
            body: '',
        } : {
            title: currentBlog.title,
            body: currentBlog.body,
            id: parseInt(currentBlog.id)
        }
    )

    const handlChange = (event) => {
        setformData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        props.handleSubmit(formData, props.formType)
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmission}>
            <h3>Title</h3>
            <input 
                type='text'
                onChange={handlChange}
                value={formData.title}
                name='title'
            />
            <h3>Post</h3>
            <input 
                type='text'
                onChange={handlChange}
                value={formData.body}
                name='body'
            />
            <input type='submit' value={props.buttonLabel} />
        </form>
    )
}

export default Form