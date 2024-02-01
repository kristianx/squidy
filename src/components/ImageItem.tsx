import React from 'react';

function ImageItem({ image }) {
    return (
        <div className="image-item">
            <img src={image.thumbnailUrl} alt={image.title} />
        </div>
    );
}

export default ImageItem;