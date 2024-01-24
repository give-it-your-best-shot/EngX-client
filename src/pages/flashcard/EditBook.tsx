import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import material_service from "src/services/material_service";
import { Book } from "src/types/book.type";
import { Unit } from "src/types/unit.type";

export default function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>();
  const navigate = useNavigate();

  useEffect(() => {
    material_service.getBookById(parseInt(id ?? "0")).then((book) => {
      if (!book) {
        navigate("/profile");
        return;
      }
      const promises: Promise<Unit | null>[] = [];
      book.units.forEach((unit, id) => {
        promises.push(
          material_service.getUnitById(unit.id).then((unit) => {
            book.units[id] = unit as Unit;
            return unit;
          }),
        );
      });
      Promise.all(promises).then(() => setBook(book));
    });
  }, []);

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center text-6xl font-bold">
        Loading
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 flex flex-col px-16 gap-16">
      <div className="text-2xl font-semibold flex gap-5 items-center text-slate-800">
        <div className="">Book:</div>
        <div className="w-full border-3 rounded-xl p-2 font-normal text-slate-900 bg-slate-50">
          {book.name}
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-800">Units</div>
      <Button
        color="primary"
        className="font-semibold w-1/6"
        onClick={() => navigate(`/courses/${id}/create-unit`)}
      >
        Create new
      </Button>
      {book.units.length < 1 ? (
        <div className="text-xl">This book don't have any unit</div>
      ) : (
        <Accordion variant="bordered">
          {book.units.map((e) => (
            <AccordionItem key={e.id} title={e.name}>
              <div className="grid grid-cols-8 gap-5">
                {e.words.map((w, id) => (
                  <div
                    key={id}
                    className="border-2 border-slate-800 rounded-lg p-2 flex items-center justify-center"
                  >
                    {w.writing}
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
