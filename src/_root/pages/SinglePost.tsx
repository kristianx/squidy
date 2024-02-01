import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import styled from "styled-components";
import PostCardUser from "../../components/partials/PostCardUser.tsx";


const StyledSinglePost = styled.div`
        margin-top: 20px;
        h2{
           color: var(--primary); 
            font-size: 24px;
            margin-top: 26px;
            font-weight: 600;
        }
        .post-author{
            color: var(--grey-light);
            margin-bottom: 16px;
        }
        p{
            font-size: 18px;
            color: var(--body-text);
        }
        hr{
          margin: 40px 0 20px;  
        }
        .comments{
            .comment{
                margin-top: 16px;
                .comment-heading{
                    font-weight: 600;
                    font-size: 15px;
                }
                .comment-body{
                    font-size: 14px;

                }
            }
        }
    `;

function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });

        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);



    return (
        <StyledSinglePost className="single-post">
            <Link to={"/"} >{"<"} Back to posts</Link>
            {post ? (
                <div>
                    <h2 className={"post-header"}>{post.title}</h2>
                    <p className={"post-author"}>Author: <PostCardUser userId={post.userId} /></p>
                    <p className={"post-body"}>{post.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <hr/>
            <div className="comments">
                <h3>Comments:</h3>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment">
                            <p className={"comment-heading"}>{comment.name} - {comment.email}</p>
                            <p className={"comment-body"}>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </StyledSinglePost>
    );
}

export default SinglePost;