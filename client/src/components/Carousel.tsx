import React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CircleList from './CircleList';

interface CarouselProps {
  data: { src: string; alt: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }: CarouselProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { src, alt } = data[currentImgIndex];

  useEffect(() => {
    const id = setTimeout(() => {
      const nextIndex = (currentImgIndex + 1) % data.length;
      setCurrentImgIndex(nextIndex);
    }, 3000);
    return () => clearTimeout(id);
  }, [currentImgIndex, data]);

  function handleNext() {
    const nextIndex = (currentImgIndex + 1) % data.length;
    setCurrentImgIndex(nextIndex);
  }

  function handlePrevious() {
    const prevIndex = (currentImgIndex - 1 + data.length) % data.length;
    setCurrentImgIndex(prevIndex);
  }

  function handleCircleClick(index: number) {
    setCurrentImgIndex(index);
  }

  return (
    <div className="container">
      <div className="flex">
        <div className="sideNav flex backward">
          <button onClick={handlePrevious}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="mainContent">
          <div className="content flex">
            <img src={src} alt={alt} />
          </div>
          <div className="flex dots">
            <CircleList
              onCircleClick={handleCircleClick}
              currentImgIndex={currentImgIndex}
            />
          </div>
        </div>
        <div className="sideNav flex forward">
          <button onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
