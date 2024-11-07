import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage';

export default function Carousels() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="home" id="home">
            <div style={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
                <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
                    <Carousel.Item>
                        <ExampleCarouselImage text="First slide" src={"https://file.hstatic.net/1000253775/file/about_men_dk_e49ad6c75e354c57b50d108018246ab0.jpg"} />
                        <Carousel.Caption style={{ color: 'black' }}>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Second slide" src={"https://file.hstatic.net/1000253775/file/collection_dk_a0f3794304b844739844339d51e617bc.jpg"} />
                        <Carousel.Caption style={{ color: 'black' }}>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Third slide" src={"https://file.hstatic.net/1000253775/file/quoctrong_dk.jpg"} />
                        <Carousel.Caption style={{ color: 'black' }}>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div >
    );
}
