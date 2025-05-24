import React, { useState } from "react";
import Image from "next/image";

const ImageStepper = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col items-center space-y-4 pt-4">
      <div className="relative w-full max-w-md h-64">
        <Image
          src={images[currentIndex]}
          alt={`Step ${currentIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={goToPrev} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
          ◀
        </button>
        <span className="text-sm text-gray-600">
          Step {currentIndex + 1} of {images.length}
        </span>
        <button onClick={goToNext} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
          ▶
        </button>
      </div>
    </div>
  );
};

export default ImageStepper;
