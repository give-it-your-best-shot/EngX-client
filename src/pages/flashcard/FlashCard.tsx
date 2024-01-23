import React, { useState, useEffect } from "react";
import MaterialService from "src/services/material_service";
import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";
import { Book } from "src/types/book.type";

const FlashCard = () => {
  const [unitName, setUnitName] = useState("");
  const [vocabulary, setVocabulary] = useState([{ word: "", meaning: "" }]);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  useEffect(() => {
    // MaterialService.getAllUnitsOfBook()
    //   .then((data) => setUnits(data))
    //   .catch((error) => console.error("Error fetching units:", error));
  }, []);

  const handleUnitNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitName(e.target.value);
  };
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(Number(e.target.value));
  };

  const handleVocabularyChange = (
    index: number,
    type: string,
    value: string,
  ) => {
    const newVocabulary = [...vocabulary];
    newVocabulary[index][type as keyof (typeof newVocabulary)[number]] = value;
    setVocabulary(newVocabulary);
  };

  const removeVocabularyRow = (index: number) => {
    const newVocabulary = [...vocabulary];
    newVocabulary.splice(index, 1);
    setVocabulary(newVocabulary);
  };

  const addVocabularyRow = () => {
    setVocabulary([...vocabulary, { word: "", meaning: "" }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ unitName, vocabulary, selectedUnit });
    setUnitName("");
    setVocabulary([{ word: "", meaning: "" }]);
  };

  return (
    <div className="bg-fixed overflow-y-auto flex flex-col justify-stretch items-center w-full h-full min-h-screen bg-slate-100 px-4 py-20 border-4 rounded-md">
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Unit Name:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={unitName}
            onChange={handleUnitNameChange}
          />
        </div>

        <table className="w-full mb-4 text-lg">
          <thead>
            <tr>
              <th className="py-2">Word</th>
              <th className="py-2">Meaning</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={item.word}
                    onChange={(e) =>
                      handleVocabularyChange(index, "word", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={item.meaning}
                    onChange={(e) =>
                      handleVocabularyChange(index, "meaning", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="py-2 px-4 bg-red-500 text-white rounded"
                    onClick={() => removeVocabularyRow(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between text-lg">
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 text-white rounded"
            onClick={addVocabularyRow}
          >
            Add Vocabulary
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashCard;
