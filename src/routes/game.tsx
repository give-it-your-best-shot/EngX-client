import { useEffect, useState } from "react";
import EngXLearningService, { Question, Quiz } from "../services/engx_learning_service";
import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EngXDataService from "../services/engx_data_service";

export default function Game() {
  const { chapterId } = useParams()
  const engx_data_service = EngXDataService.getInstance();
  const engx_learning_service = EngXLearningService.getInstance();

  const [quiz, setQuiz] = useState<Quiz>()
  const [qid, setQid] = useState(-1)
  const [viewAnswer, setViewingAnswer] = useState(false)
  const [hp, setHp] = useState(-1)
  const [score, setScore] = useState(0)
  const [gameover, setGameover] = useState(false)
  const [death, setDeath] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const start = async () => {
      var chapter = await engx_data_service.getChapterById(parseInt(chapterId ?? "-1"))
      engx_learning_service.getGameOfWords(chapter.words).then(quiz => {
        console.log(quiz)
        setQuiz(quiz)
        setQid(0)
        setHp(Math.floor(quiz.questions.length / 2))
      })
    };
    start();
  }, []);
  const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };
  async function doAnswer(question: Question, id: number) {
    setViewingAnswer(true)
    await delay(3000)
    setViewingAnswer(false)
    if(id != question.correct_answer) {
      if(hp - 1 <= 0) {
        setDeath(true)
        setGameover(true)
      } else {
        setHp(hp - 1)
      }
    }
    else {
      setScore(score + 1)
    }
    if(qid + 1 == quiz?.questions.length) {
      setGameover(true)
    } else {
      setQid(qid + 1)
    }
  }
  if(death && gameover) {
    return (
      <div className="bg-white p-16 px-16 rounded-lg shadow-lg h-fit justify-between text-6xl font-bold text-red-500 flex flex-col gap-10">
        Game Over
        <div className="flex justify-between">
          <Button className="w-1/3 font-bold" color="primary" onClick={() => navigate(0)}>Try again</Button>
          <Button className="w-1/3 font-bold" color="danger" onClick={() => navigate("/home")}>Exit</Button>
        </div>
      </div>
    )
  }
  if(gameover) {
    return (
      <div className="bg-white p-16 px-16 rounded-lg shadow-lg h-fit justify-between text-6xl font-bold text-green-500 flex flex-col gap-10 items-center">
        Congratulation
        <div className="text-slate-800 font-semibold text-lg">
          You answered {score}/{quiz?.questions.length} questions correctly!
        </div>
        <div className="flex justify-between w-full">
          <Button className="w-1/3 font-bold" color="primary" onClick={() => navigate(0)}>Try again</Button>
          <Button className="w-1/3 font-bold" color="danger" onClick={() => navigate("/home")}>Exit</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[calc(75vh)] gap-5 w-4/5">
      <div className="bg-white p-5 px-16 rounded-lg shadow-lg flex h-1/5 justify-between">
        {
          hp != -1 ?
          <div className="flex gap-5 items-center justify-center h-full">
            <div className="text-red-500 text-xl font-bold align-middle items-center">
              HP: {hp}
            </div>
            <div className="h-full flex items-center">
              {
                Array.from(Array(hp).keys()).map(e => <div className="h-5 w-8 bg-red-500 rounded border-2 border-red-200"></div>)
              }
            </div>
          </div>
          :
          <></>
        }
        <div className="flex items-center font-bold text-xl">
          Score: {score}
        </div>
      </div>
      <div className="bg-white p-16 rounded-lg shadow-lg flex flex-col gap-10 h-full">
        {
          quiz == null ?
          (
          <div className="flex flex-col items-center justify-center gap-10 h-full">
            <div className="font-bold text-6xl h-full">
              Loading
            </div>
            <div className="text-lg text-slate-500">
              Stay tuned. It might seems to stuck but we actually trying to generate the best test for you.
            </div>
          </div>
          )
          :
          <div className="text-lg font-semibold leading-loose flex gap-5">
            <div className="flex w-1/2 items-center">
              <img src={`data:image/jpeg;base64,${quiz.image}`} className="w-full h-[calc(35vh)] object-cover" />
            </div>
            <div className="w-1/2">
            {quiz.paragraph.map((paragraph, index) => (
              <React.Fragment key={index}>
                {!!index && <span className={index - 1 == qid ? "border border-green-500 text-green-500 px-2 py-1" : "border border-slate-800 text-slate-800 px-2 py-1"}>{index - 1 < qid ? quiz?.questions[index - 1]._correct_answer_str : "_".repeat(quiz?.questions[index - 1]._correct_answer_str.length)}</span>}
                {paragraph}
              </React.Fragment>
            ))}
            </div>
          </div>
        }
      </div>
      <div className="bg-white p-5 rounded-lg shadow-lg flex gap-5 justify-evenly h-1/4">
        {
          qid == -1 ?
          <div>

          </div>
          :
          quiz?.questions[qid].answers.map(
            (answer, id) => <Button color={viewAnswer ? (id == quiz!.questions[qid].correct_answer ? "success" : "danger") : "primary"} variant={viewAnswer ? "faded" : "ghost"} onClick={() => doAnswer(quiz?.questions[qid], id)} disabled={viewAnswer} className="font-bold text-xl h-full w-full">
              {answer}
            </Button>
          )
        }
      </div>
    </div>
  );
}
