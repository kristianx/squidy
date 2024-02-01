import { useEffect, useState } from 'react';
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
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
                );
                setImages(response.data);

                const totalCount = response.headers['x-total-count'];
                setTotalImages(parseInt(totalCount, 10));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [currentPage, limit]);


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const hasNextPage = (currentPage * limit) < totalImages;
    const hasPrevPage = currentPage > 1;

    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
    };

    const totalPages = Math.ceil(totalImages / limit);



    return (
        <ImagesPage>
            <div className={"slider-page-size"}>
                <input
                    type="range"
                    min="1"
                    max="50" // You can adjust the max value as needed
                    value={limit}
                    onChange={handleLimitChange}
                    onMouseUp={handleLimitChange}
                />
                <span>{`Images per page: ${limit}`}</span>
            </div>
            <div className="image-list">
                {images.map((image) => (
                    <ImageItem key={image.id} image={image}/>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={handlePrevPage} disabled={!hasPrevPage}
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage} disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        </ImagesPage>
    );
}

export default Images
