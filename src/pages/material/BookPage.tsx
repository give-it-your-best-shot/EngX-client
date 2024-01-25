import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";
import { Book } from "src/types/book.type";

export default function BookPage() {
  const navigate = useNavigate();
  const [mainBooks, setMainBooks] = useState<Book[] | null>([]);
  const [books, setBooks] = useState<Book[] | null>([]);

  useEffect(() => {
    material_service.getAllBooksOfAdmin().then((books) => {
      if (books) setMainBooks(books);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center py-20 px-32 gap-10">
      <div className="text-slate-800 text-4xl font-bold">Main Book</div>
      <div className="flex gap-10 justify-evenly items-stretch h-96 w-full">
        {mainBooks &&
          mainBooks.map((book, index) => (
            <div
              key={index}
              className="flex flex-col cursor-pointer transition duration-300 transform hover:scale-105 items-center justify-center h-full p-10"
              onClick={() => {
                navigate(`/courses/${book.id}`);
              }}
            >
              <img
                src={
                  book?.photoUrl && book.photoUrl.length
                    ? book.photoUrl
                    : "/book.png"
                }
                alt="No Image"
                className="object-cover w-80 h-full border-5 border-purple-300 hover:border-purple-500 rounded-lg"
              />
              <div className="flex items-center justify-center">
                <span className="font-bold text-large">{book.name}</span>
              </div>
            </div>
          ))}
      </div>
      {/* <div className="text-slate-800 text-4xl font-bold">Explore</div>
      <div className="grid grid-cols-8">
            
      </div> */}
    </div>
  );
}
