import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseGame from "./base";
import material_service from "src/services/material_service";
import { Quiz } from "src/services/engx_game_service";
import { Book } from "src/types/book.type";
import { Unit } from "src/types/unit.type";

export default function BookGame() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const navigate = useNavigate();
  useEffect(() => {
    const start = async () => {
      material_service.getBookById(parseInt(bookId ?? "0")).then((book) => {
        if (!book) {
          navigate(`/courses/${bookId}`);
        }
        const promises: Promise<Unit | null>[] = [];
        book?.units.forEach((unit, i) => {
          promises.push(
            material_service.getUnitById(unit.id).then((unit) => {
              book.units[i] = unit as Unit;
              return unit;
            }),
          );
        });
        Promise.all(promises).then(() => {
          setBook(book as Book);
        });
        return book;
      });
    };
    start();
  }, []);
  const getWords = () => {
    return book?.units.map((u) => u.words.map((w) => w.writing)).flat();
  };
  if (book == undefined) return <></>;
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
