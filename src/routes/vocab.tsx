import NavigaComponent from "../components/loading/NavigaComponent";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/https";
import { Link } from "@nextui-org/react";

export default function Vocab() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Words, setWord] = useState<[]>([]);
  const wordList = Array.isArray(Words) ? Words : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(`chapters/${id}`);

        if (response.status === 200) {
          setWord(response.data.data.words);
          console.log(response.data.data.words);
        } else {
          console.log("Loi he thong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      <div className="fixed w-full z-40 mb-10">
        <NavigaComponent />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-xl mt-20">
          <span>List Vocabulary</span>
        </div>
      </div>
      {wordList.map((word) => (
        <div className="flex justify-center items-center ">
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-xl gap-96 mt-10">
            <Link size="md">{word}</Link>
            <div className="flex space-x-0.5">
              <div className="flex items-center">
                <IoIosArrowRoundForward
                  size={15}
                  className="text--500"
                  onClick={() => navigate(`/word/${word}`)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* </div> */}
    </>
  );
}
