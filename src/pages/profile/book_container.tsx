import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import material_service from "src/services/material_service";
import { useAuthenticationStore } from "src/stores";
import { Book } from "src/types/book.type";

export default function ProfileBookContainer() {
  const user = useAuthenticationStore((state) => state.user);
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    material_service
      .getAllBooksOfOwner(user!.id)
      .then((books) => setBooks(books ?? []));
  }, []);

  return (
    <div className="flex flex-col w-full h-[440px] mx-auto bg-white rounded-2xl px-8 py-6 shadow-lg gap-6">
      {books.length < 1 ? (
        <div>You don't have any book</div>
      ) : (
        <>
          {books.map((book, id) => (
            <div
              key={id}
              className="border-2 rounded-xl p-5 flex justify-between"
            >
              <div className="flex flex-col">
                <div className="font-normal text-sm text-slate-500">
                  ID: {book.id}
                </div>
                <Link
                  className="font-semibold text-xl cursor-pointer"
                  href={`/courses/${book.id}`}
                >
                  {book.name}
                </Link>
              </div>
              <div className="flex gap-5">
                <Button
                  color="primary"
                  className="font-bold"
                  onClick={() => navigate(`/courses/${book.id}/edit`)}
                >
                  Edit
                </Button>
                <Button color="danger" className="font-bold">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
