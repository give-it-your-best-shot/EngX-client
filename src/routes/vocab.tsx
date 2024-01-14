import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import http from "../utils/https";
import { Link, Button, Tabs, Tab, Tooltip } from "@nextui-org/react";
import EngXDataService from "../services/engx_data_service";
import { Chapter } from "../types/chapter.type";

export default function Vocab() {
  const navigate = useNavigate();
  const engx_data_service = EngXDataService.getInstance();
  const { id } = useParams();
  const [chapter, setChapter] = useState<Chapter>();
  const [isLoading, setIsLoading] = useState(false);

  const wordList = Array.isArray(chapter?.words) ? chapter?.words : [];

  useEffect(() => {
    engx_data_service.getChapterById(parseInt(id ?? "-1")).then(chapter => setChapter(chapter));
  }, [id]);

  const handleStartButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/game/${id}`);
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-between p-4 mt-20"></div>
      </div>
      <Tabs key={0} color="danger" aria-label="Tabs colors" radius="full">
        <Tab key="vocab" title="Vocabulary">
          {wordList.map((word, index) => (
            <div key={index} className="flex justify-center items-center mt-10">
              <Tooltip key={word} color="secondary" content={word} className="capitalize">
                <div
                  className="flex items-center justify-between p-4 border rounded-lg shadow-xl w-96 cursor-pointer"
                  onClick={() => navigate(`/word/${word}`)}
                >
                  <Link size="md" className="text-blue-500 hover:underline" onClick={() => navigate(`/word/${word}`)}>
                    {word}
                  </Link>
                  <div className="flex items-center">
                    <IoIosArrowRoundForward
                      size={15}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => navigate(`/word/${word}`)}
                    />
                  </div>
                </div>
              </Tooltip>
            </div>
          ))}
        </Tab>
        <Tab key="game" title="Game">
          <div className="flex justify-center items-center h-full">
            <Tooltip key={0} color="primary" content= "Let's go" className="capitalize">
            <Button color="secondary" onClick={() => navigate(`/game/${id}`)} disabled={isLoading}>
              {isLoading ? "Loading..." : "Start"}
            </Button>
            </Tooltip>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
