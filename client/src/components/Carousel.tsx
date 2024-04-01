import React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CircleList from './CircleList';

interface CarouselProps {
  data: { imageUrl: string; name: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }: CarouselProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { imageUrl: src, name: alt } = data[currentImgIndex];

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
    <div className="container max-w-5xl flex-css">
      <div className="flex-css w-1/2">
        <div className="sideNav flex-css backward">
          <button onClick={handlePrevious}>
            <FaChevronLeft className="text-2xl m-2" />
          </button>
        </div>
        <div className="mainContent">
          <div className="content flex-css">
            <img src={src} alt={alt} />
          </div>
          <div className="flex-css dots m-2">
            <CircleList
              onCircleClick={handleCircleClick}
              currentImgIndex={currentImgIndex}
            />
          </div>
        </div>
        <div className="sideNav flex-css forward">
          <button onClick={handleNext}>
            <FaChevronRight className="text-2xl m-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
