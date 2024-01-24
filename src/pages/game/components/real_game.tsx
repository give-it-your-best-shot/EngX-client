import { Button, Link } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question, Quiz } from "src/services/engx_game_service";

export default function RealGame(props: {
  quiz: Quiz;
  onWin?: (score: number) => void;
  onLose?: (score: number) => void;
}) {
  const quiz = props.quiz;
  const [qid, setQid] = useState(-1);
  const [viewAnswer, setViewingAnswer] = useState(false);
  const [hp, setHp] = useState(-1);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [death, setDeath] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const start = async () => {
      setQid(0);
      setHp(Math.floor(quiz.questions.length / 2));
    };
    start();
  }, []);
  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  async function doAnswer(question: Question, id: number) {
    setViewingAnswer(true);
    await delay(3000);
    setViewingAnswer(false);
    if (id != question.correct_answer) {
      if (hp - 1 <= 0) {
        setDeath(true);
        setGameover(true);
        if (props.onLose) props.onLose(score);
      } else {
        setHp(hp - 1);
      }
    } else {
      setScore(score + 1);
    }
    if (qid + 1 == quiz?.questions.length) {
      setGameover(true);
      if (props.onWin) props.onWin(score);
    } else {
      setQid(qid + 1);
    }
  }
  if (death && gameover) {
    return (
      <div className="pt-32 py-16 min-h-screen">
        <div className="bg-slate-800 bg-opacity-75 p-16 px-16 rounded-lg shadow-lg h-fit justify-between text-6xl font-bold text-red-500 flex flex-col gap-10">
          Game Over
          <div className="flex justify-between">
            <Button
              className="w-1/3 font-bold"
              color="primary"
              onClick={() => navigate(0)}
            >
              Try again
            </Button>
            <Button
              className="w-1/3 font-bold"
              color="danger"
              onClick={() => navigate("/home")}
            >
              Exit
            </Button>
          </div>
          <Link href="#answer" className="w-full flex justify-center">
            Check anwers
          </Link>
        </div>
      </div>
    );
  }
  if (gameover) {
    return (
      <div className="pt-32 py-16 min-h-screen">
        <div className="bg-slate-800 bg-opacity-75 p-16 px-16 rounded-lg shadow-lg h-fit justify-between text-6xl font-bold text-green-500 flex flex-col gap-10 items-center">
          Congratulation
          <div className="text-white font-semibold text-lg">
            You answered {score}/{quiz?.questions.length} questions correctly!
          </div>
          <div className="flex justify-between w-full">
            <Button
              className="w-1/3 font-bold"
              color="primary"
              onClick={() => navigate(0)}
            >
              Try again
            </Button>
            <Button
              className="w-1/3 font-bold"
              color="danger"
              onClick={() => navigate("/home")}
            >
              Exit
            </Button>
          </div>
          <Link href="#answer" className="w-full flex justify-center">
            Check anwers
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen gap-5 w-4/5">
        <div className="bg-slate-800 bg-opacity-75 p-5 px-16 rounded-lg shadow-lg flex h-1/3 justify-between w-2/3">
          {hp != -1 ? (
            <div className="flex gap-5 items-center justify-center h-full">
              <div className="text-red-500 text-xl font-bold align-middle items-center">
                HP: {hp}
              </div>
              <div className="h-full flex items-center">
                {Array.from(Array(hp).keys()).map((e) => (
                  <div
                    key={e}
                    className="h-5 w-8 bg-red-500 border-4 border-red-200"
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="text-slate-200 flex items-center font-bold text-xl">
            Score: {score}
          </div>
        </div>
        <div className="bg-slate-800 bg-opacity-75 p-16 rounded-lg shadow-lg flex flex-col gap-10 h-full overflow-y-auto">
          <div className="text-slate-200 text-lg font-semibold leading-loose">
            {quiz.paragraph.map((paragraph, index) => (
              <React.Fragment key={index}>
                {!!index && (
                  <span
                    className={
                      index - 1 == qid
                        ? "border border-green-500 text-green-500 px-2 py-1"
                        : "border border-slate-200 text-slate-200 px-2 py-1"
                    }
                  >
                    {index - 1 < qid
                      ? quiz?.questions[index - 1]._correct_answer_str
                      : "_".repeat(
                          quiz?.questions[index - 1]._correct_answer_str.length,
                        )}
                  </span>
                )}
                {paragraph}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-slate-800 bg-opacity-75 p-5 rounded-lg shadow-lg flex gap-5 justify-evenly h-1/4">
          {qid == -1 ? (
            <div></div>
          ) : (
            quiz?.questions[qid].answers.map((answer, id) => (
              <Button
                key={id}
                color={
                  viewAnswer
                    ? id == quiz!.questions[qid].correct_answer
                      ? "success"
                      : "danger"
                    : "primary"
                }
                variant={viewAnswer ? "faded" : "ghost"}
                onClick={() => doAnswer(quiz?.questions[qid], id)}
                disabled={viewAnswer}
                className="font-bold text-xl h-full w-full"
              >
                {answer}
              </Button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
