import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Unit } from "src/types/unit.type";
import BaseGame from "./base";
import { Quiz } from "src/services/engx_game_service";

export default function UnitGame() {
  const { unitId } = useParams();
  const [unit, setUnit] = useState<Unit>();
  useEffect(() => {
    const start = async () => {};
    start();
  }, []);
  const getWords = () => {
    return unit!.words.map((e) => e.writing);
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
