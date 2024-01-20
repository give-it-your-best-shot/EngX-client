import { Key, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, Button, Tabs, Tab, Tooltip } from "@nextui-org/react";
import material_service from "src/services/material_service";
import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";

export default function Vocab() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | null>();
  const [isLoading] = useState<boolean>(false);

  const wordList = Array.isArray(unit?.words) ? unit?.words : [];

  useEffect(() => {
    material_service
      .getUnitById(parseInt(id ?? "-1"))
      .then((unit) => setUnit(unit));
  }, [id]);

  // const handleStartButtonClick = () => {
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //     navigate(`/game/${id}`);
  //   }, 1000);
  // };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-between p-4 mt-20"></div>
      </div>
      <Tabs key={0} color="danger" aria-label="Tabs colors" radius="full">
        <Tab key="vocab" title="Vocabulary">
          {wordList.map((word: Word, index: Key | null | undefined) => (
            <div key={index} className="flex justify-center items-center mt-10">
              <Tooltip
                key={word.id}
                color="secondary"
                content={word.write}
                className="capitalize"
              >
                <div
                  className="flex items-center justify-between p-4 border rounded-lg shadow-xl w-96 cursor-pointer"
                  onClick={() => navigate(`/word/${word.write}`)}
                >
                  <Link
                    size="md"
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/word/${word.write}`)}
                  >
                    {word.write}
                  </Link>
                  <div className="flex items-center">
                    <IoIosArrowRoundForward
                      size={15}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => navigate(`/word/${word.write}`)}
                    />
                  </div>
                </div>
              </Tooltip>
            </div>
          ))}
        </Tab>
        <Tab key="game" title="Game">
          <div className="flex justify-center items-center h-full">
            <Tooltip
              key={0}
              color="primary"
              content="Let's go"
              className="capitalize"
            >
              <Button
                color="secondary"
                onClick={() => navigate(`/game/${id}`)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Start"}
              </Button>
            </Tooltip>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
