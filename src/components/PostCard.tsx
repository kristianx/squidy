import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import styled from "styled-components";
import PostCardUser from "./partials/PostCardUser.tsx";

const StyledPostCard = styled.div`
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--primary);
        margin-top: 20px;
        a{
            h2{
                color: var(--primary);
                font-weight: 500;
                font-size: 18px;
            }
            
        }
        .post-heading{
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        .comments-button{
            font-weight: 600;
            font-size: 15px;
            &:hover{
                cursor:pointer;
            }
        }
        .post-body{
            font-size: 14px;
        }
        .comments{
            .comment{
                border-bottom: 1px solid #1a1a1a;
                padding: 15px;
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



function PostCard({ post }) {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (showComments) {
            axios
                .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                .then((response) => {
                    setComments(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [showComments, post.id]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };



    return (
            <StyledPostCard className="post-card">
                <Link to={`/post/${post.id}`} className={"post-heading"}>

                        <h2>{post.title} - <PostCardUser userId={post.userId} /></h2>


                </Link>
                <p className={"post-body"}>{post.body}</p>

                <a onClick={toggleComments} className={"comments-button"}>
                    {showComments ? 'Collapse Comments' : 'Expand Comments'}
                </a>
                {showComments && (
                    <div className="comments">
                        <ul>
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment">
                                    <p className={"comment-heading"}>{comment.name} - {comment.email}</p>
                                    <p className={"comment-body"}>{comment.body}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </StyledPostCard>
    );
}

export default PostCard
