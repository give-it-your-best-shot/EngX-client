import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
} from "@nextui-org/react";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";
import { Book } from "src/types/book.type";

export default function Units() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    material_service.getBookById(parseInt(id ?? "0")).then((book) => {
      if (book) setBook(book);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 h-screen my-20 px-20">
        <div className="col-span-3">
          <div className="grid grid-cols-2">
            <img
              className="w-[20rem] h-[20rem] object-contain"
              src={book?.photoUrl ?? "/book.png"}
              alt="No Image"
            />
            <div className="grid grid-rows-2">
              <div className="flex items-center">
                <p className="text-5xl">{book?.name}</p>
              </div>
              <div className="flex flex-col justify-center h-full w-full">
                <p className="mb-10 text-lg font-semibold text-gray-800">
                  Let's practice together 🎮
                </p>
                <Tooltip
                  key={0}
                  color="primary"
                  content="Let's go"
                  className="capitalize font-bold"
                >
                  <Button
                    color="secondary"
                    onClick={() =>
                      navigate(`/courses/${parseInt(id ?? "0")}/game`)
                    }
                    className="w-3/5 font-bold h-12 text-xl"
                  >
                    Start
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          {book &&
            (book.description ? (
              <div
                className="flex flex-col mx-2 py-10"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            ) : (
              <div className="flex flex-col mx-2 py-10">
                <br />
                <p className="text-lg font-bold">Targeted Skill Development:</p>
                <br />
                <p>
                  1. Focus on the four essential language skills tested in TOEIC
                  - Listening, Reading, Speaking, and Writing. Tailored
                  exercises and activities to strengthen your abilities in each
                  skill area. Strategic Test-Taking Techniques:
                </p>
                <br />
                <p>
                  2. Learn proven strategies to approach different question
                  types in both the TOEIC Listening and Reading sections.
                  Practice with authentic TOEIC-style questions to build
                  familiarity and confidence. Vocabulary and Grammar Mastery:
                </p>
                <br />
                <p>
                  3. Expand your English vocabulary with words commonly used in
                  professional settings. Enhance your understanding of English
                  grammar rules and usage through targeted lessons. Speaking and
                  Writing Practice:
                </p>
                <br />
                <p>
                  4. Develop effective communication skills for the TOEIC
                  Speaking section through interactive exercises. Hone your
                  written communication skills for the TOEIC Writing section
                  with guided writing tasks. Mock Exams and Performance
                  Analysis:
                </p>
                <br />
                <p>
                  5. Simulate real TOEIC exam conditions with full-length
                  practice tests. Receive detailed feedback and performance
                  analysis to identify strengths and areas for improvement.
                  Experienced Instructors:
                </p>
                <br />
                <p>
                  6. Learn from experienced instructors with a strong background
                  in TOEIC preparation. Benefit from personalized guidance and
                  support to address your specific learning needs. Flexible
                  Schedule Options:
                </p>
                <br />
                <p>
                  7. Choose from flexible course schedules to accommodate your
                  busy lifestyle. Join interactive live sessions or access
                  recorded materials for convenient self-paced learning. Prepare
                  with confidence and elevate your TOEIC scores to open doors to
                  new opportunities in international business and communication.
                  Enroll in our Comprehensive TOEIC Preparation Course and take
                  a significant step towards achieving your language proficiency
                  goals.
                </p>
                <br />
                <p>Ready to succeed in TOEIC? Join us today!</p>
              </div>
            ))}
        </div>
        <div>
          <p className="text-lg text-cyan-600">Learn now</p>
          {book && book.units && book.units.length > 0 && (
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {book.units.map((unit, index) => (
                <li key={index}>
                  <a
                    href={`/units/${unit.id}/words`}
                    className="block px-4 py-2 hover:bg-blue-800 hover:scale-105 transition bg-blue-600 my-1 text-white"
                  >
                    {unit.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
