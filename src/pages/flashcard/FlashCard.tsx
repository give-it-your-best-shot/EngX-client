import React, { useState, useEffect } from "react";
import CardFlip from "react-card-flip";

const Flashcard = () => {
  const flashcards = [
    { front: "Hello", back: "Xin chào" },
    { front: "Goodbye", back: "Tạm biệt" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcards.length - 1),
    );
    setIsFlipped(false);
  };

  const currentFlashcard = flashcards[currentCardIndex];
  useEffect(() => {
    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress as any);

    return () => {
      window.removeEventListener("keydown", handleKeyPress as any);
    };
  }, [handlePrevious, handleNext]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 pt-16">
      <div className="max-w-2xl p-8 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <div className="text-lg font-semibold">Book:</div>
          <div className="text-xl font-bold text-blue-600 text-center">
            Toeic
          </div>
        </div>
        <div className="mb-4">
          <div className="text-lg font-semibold">Unit:</div>
          <div className="text-xl font-bold text-blue-600 text-center">
            Unit1
          </div>
        </div>
        <div>
          <CardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            flipSpeedBackToFront={0.6}
            flipSpeedFrontToBack={0.6}
          >
            <div
              className="flashcard front bg-gray-200 p-6 rounded-md cursor-pointer flex items-center justify-center"
              onClick={handleFlip}
              style={{ width: "300px", height: "200px" }}
            >
              <div className="text-xl font-bold text-blue-600">
                {currentFlashcard.front}
              </div>
            </div>
            <div
              className="flashcard back bg-green-500 p-6 rounded-md cursor-pointer flex items-center justify-center"
              onClick={handleFlip}
              style={{ width: "300px", height: "200px" }}
            >
              <div className="text-xl font-bold text-white">
                {currentFlashcard.back}
              </div>
            </div>
          </CardFlip>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentCardIndex === flashcards.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
