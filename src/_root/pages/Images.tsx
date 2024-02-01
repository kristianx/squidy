import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageItem from "../../components/ImageItem.tsx";
import styled from "styled-components";

const ImagesPage = styled.div`
    .slider-page-size{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        input{
            width: 500px;
        }
    }
    .image-list{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        grid-gap: 15px;
    }
    .pagination{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
        button{
            color: white;
        }
    }
      
    `;


const Images = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalImages, setTotalImages] = useState(0);
    const [imagesPerPage, setImagesPerPage] = useState(10);

    useEffect(() => {
        // Calculate the start and end indices for the current page
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;

        // Use Axios to fetch data from the API
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then((response) => {
                // Update the state with the fetched images for the current page
                setImages(response.data.slice(startIndex, endIndex));
                setTotalImages(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [currentPage, imagesPerPage]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setImagesPerPage(newValue);
        setCurrentPage(1); // Reset the current page when the images per page change
    };

    // Calculate the total number of pages based on the number of images
    const totalPages = Math.ceil(totalImages / imagesPerPage);



    return (
        <ImagesPage>
            <div className={"slider-page-size"}>
                <input
                    type="range"
                    min="1"
                    max="50" // You can adjust the max value as needed
                    value={imagesPerPage}
                    onChange={handleSliderChange}
                    onMouseUp={handleSliderChange}
                />
                <span>{`Images per page: ${imagesPerPage}`}</span>
            </div>
            <div className="image-list">
                {images.map((image) => (
                    <ImageItem key={image.id} image={image}/>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </ImagesPage>
    );
}

export default Images
