import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";
import { Book } from "src/types/book.type";

export default function BookPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[] | null>([]);

  useEffect(() => {
    material_service.getAllBooksOfOwner(1).then((books) => {
      if (books) setBooks(books);
    });
  }, []);

  return (
    <div className="flex justify-center items-center py-20">
      <div className="gap-16 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 max-w-[900px]">
        {books &&
          books.map((book, index) => (
            <div
              key={index}
              className="cursor-pointer relative group overflow-hidden rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => {
                navigate(`/courses/${book.id}`);
              }}
            >
              <img
                src="images/bookImage.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-back font-['Liberation_Mono'] mt-10 mr-10 font-bold text-large">
                  {book.name}
                </span>
              </div>
              <div className=" absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
