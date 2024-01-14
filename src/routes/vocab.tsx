import NavigaComponent from "../components/loading/NavigaComponent";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/https";
import { Link, Button } from "@nextui-org/react";
import EngXDataService from "../services/engx_data_service";
import { Chapter } from "../types/chapter.type";

export default function Vocab() {
  const navigate = useNavigate();
  const engx_data_service = EngXDataService.getInstance();
  const { id } = useParams();
  const [chapter, setChapter] = useState<Chapter>();
  // const [Words, setWord] = useState<[]>([]);
  const wordList = Array.isArray(chapter?.words) ? chapter?.words : [];

  useEffect(() => {
    engx_data_service.getChapterById(parseInt(id ?? "-1")).then(chapter => setChapter(chapter));
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-xl mt-20">
          <span>List Vocabulary</span>
        </div>
        <div className="flex items-center justify-between p-4 mt-20">
          <Button className="bg-green-600 shadow-xl" onClick={() => navigate(`/game/${id}`)}>
            <span className="text-black text-large">Words Game</span>
          </Button>
        </div>
      </div>
      {wordList.map(word => (
        <div className="flex justify-center items-center ">
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-xl gap-96 mt-10">
            <Link size="md">{word}</Link>

            <div className="flex space-x-0.5">
              <div className="flex items-center">
                <IoIosArrowRoundForward size={15} className="text--500" onClick={() => navigate(`/word/${word}`)} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* </div> */}
    </>
  );
}
