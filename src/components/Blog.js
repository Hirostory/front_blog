import { Link, useNavigate } from "react-router-dom";

const Blog = ({post, deleteBlog}) => {
    const navigate = useNavigate()

    const handleDelete = (event) => {
        event.preventDefault()
        deleteBlog(post.id)
        navigate('/')
    }

    return (
        <div>
            <Link to={`/blog/${post.id}`} >
            <h1>{post.title}</h1>
            </Link>
            <h2>{post.body}</h2>
            <form on onSubmit={handleDelete} >
                <input type="submit" value="delete" />
            </form>
        </div>
    )
}

export default Blog