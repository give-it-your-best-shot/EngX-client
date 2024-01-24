import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Unit } from "src/types/unit.type";
import BaseGame from "./base";
import material_service from "src/services/material_service";
import { Quiz } from "src/services/engx_game_service";

export default function BookGame() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Unit>();
  useEffect(() => {
    const start = async () => {
      // material_service.getAllUnitsOfBook
    };
    start();
  }, []);
  const getWords = () => {
    return book!.words.map((e) => e.writing);
  };
  return (
    <>
      <BaseGame
        words={getWords()}
        onGameEnd={(
          quiz: Quiz | undefined,
          score: number,
          isWin: boolean,
        ) => {}}
      />
    </>
  );
}
