import { Key, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, Button, Tabs, Tab, Tooltip } from "@nextui-org/react";
import material_service from "src/services/material_service";
// import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";
import { WordComponent } from ".";

export default function Vocab() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [unit, setUnit] = useState<Unit | null>();
  const [wordList, setWordList] = useState<Word[] | null>([]);
  const [isLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // const wordList = Array.isArray(unit?.words) ? unit?.words : [];

  useEffect(() => {
    material_service
      .getAllWordsOfUnit(parseInt(id ?? "-1"))
      .then((words) => setWordList(words));
  }, [id]);

  useEffect(() => {
    if (wordList !== null && wordList.length > 0) {
      setCurrentIndex(0);
    }
  }, [wordList]);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document
        .getElementById("app-header")!
        .getBoundingClientRect().bottom;
      const materialVocabTopY = document
        .getElementById("material-vocab")
        ?.getBoundingClientRect().top;
      if (Number(materialVocabTopY) - Number(headerHeight) < 0) {
        const materialVocabRight = document.getElementById(
          "material-vocab-right",
        );
        const atLeft = materialVocabRight!.getBoundingClientRect().left + "px";
        materialVocabRight!.style.position = "fixed";
        materialVocabRight!.style.right = "0";
        materialVocabRight!.style.top = headerHeight + "px";
      } else {
        const materialVocabRight = document.getElementById(
          "material-vocab-right",
        );
        materialVocabRight!.style.position = "relative";
        materialVocabRight!.style.left = "auto";
        materialVocabRight!.style.top = "auto";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <Tabs
        key={0}
        color="danger"
        aria-label="Tabs colors"
        radius="full"
        className="flex justify-center items-center"
      >
        <Tab key="vocab" title="Vocabulary">
          {currentIndex != -1 && (
            <WordComponent word={wordList![currentIndex]} />
          )}

          <div id="material-vocab" className="mx-5">
            <div id="material-vocab-left" className="float-left">
              <p className="text-center text-3xl font-semibold leading-loose text-gray-900 dark:text-white">
                The Al-powered app will help you improve yourself.
              </p>
              {wordList?.map((word: Word, index: Key | null | undefined) => (
                <div
                  key={index}
                  className="flex justify-center items-center mt-1 transition duration-300 transform hover:scale-105"
                >
                  <div
                    className="flex items-center justify-between p-4 border rounded-lg shadow-xl w-96 cursor-pointer"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setCurrentIndex(index as number);
                    }}
                  >
                    {word.writing}
                    <div className="flex items-center">
                      <IoIosArrowRoundForward
                        size={15}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setCurrentIndex(index as number);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id="material-vocab-right" className="float-right mt-4">
              <img
                src="/images/sunAI.png"
                alt=""
                className="object-scale-down"
                style={{ height: "80vh" }}
              />
            </div>
          </div>
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
