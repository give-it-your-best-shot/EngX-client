import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialService from "src/services/material_service";
import { useAuthenticationStore } from "src/stores";

const CreateBook = () => {
  const [bookName, setBookName] = useState("");

  const authStore = useAuthenticationStore();

  const handleBookNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createdBook = await MaterialService.createBook({
        name: bookName,
        ownerId: authStore.user?.id,
      });
      console.log("New book created:", createdBook);
      // history.push("/books");
    } catch (error) {
      console.error("Error creating book:", error);
    }

    setBookName("");
  };

  const navigate = useNavigate();

  useEffect(() => {
    // if(authStore.user == null)
    //   navigate("/login")
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create a New Book
        </h2>
        <label htmlFor="bookName" className="block text-sm font-semibold mb-2">
          Book Name:
        </label>
        <input
          id="bookName"
          type="text"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300 mb-4"
          value={bookName}
          onChange={handleBookNameChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
