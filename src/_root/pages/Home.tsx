import { useEffect, useState } from 'react'
import axios from 'axios';
import PostCard from "../../components/PostCard.tsx";
import { useOutletContext } from "react-router-dom";


function Home() {

    const searchTerm = useOutletContext();

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });

        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) => {
                const user = users.find((u) => u.id === post.userId);
                return user && user.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredPosts(filtered);
        }
    }, [searchTerm, posts, users]);



    return (
        <>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {filteredPosts.map((post) => (
                            <PostCard key={post.id} post={post}/>
                            ))}
                    </ul>
                )}
        </>
    )
}

export default Home
