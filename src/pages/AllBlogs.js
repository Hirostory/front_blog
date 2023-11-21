import Blog from "../components/Blog"
import { Link } from "react-router-dom"

const AllBlogs = (props) => (
    <>
    <Link to='/new' >
        <button>Add A Thought</button>
    </Link>
    {props.posts.map(
        (post) => <Blog post={post} key={post.id} deleteBlog={props.deleteBlog} />
    )}
    </>
)

export default AllBlogs