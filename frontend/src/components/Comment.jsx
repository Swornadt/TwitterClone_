import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="p-2 border-b border-gray-200">
            <div className="flex items-center">
                <h1 className="font-bold mr-2"> {comment.user.name} </h1>
                <p className="text-gray-500 text-sm"> {`@${comment.user.username}  .  ${new Date(comment.createdAt).toLocaleString()}`} </p>
            </div>
            <p> {comment.text} </p>
        </div>
    );
}

export default Comment;
