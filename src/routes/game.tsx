import { useEffect, useState } from "react";
import EngXLearningService, { Question, Quiz } from "../services/engx_learning_service";
import { Button } from "@nextui-org/react";

export default function Game() {
  const [quiz, setQuiz] = useState<Quiz>()
  const [qid, setQid] = useState(-1)
  const [viewAnswer, setViewingAnswer] = useState(false)
  const [hp, setHp] = useState(-1)
  const [score, setScore] = useState(0)
  const [gameover, setGameover] = useState(false)
  const [death, setDeath] = useState(false)
  useEffect(() => {
    const start = async () => {
      const engx_service = EngXLearningService.getInstance();
      engx_service.getGameOfWords(["hello", "apple", "world"]).then(quiz => {
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
      <>
      Game Over
      </>
    )
  }
  if(gameover) {
    return (
      <>
      </>
    );
  }
  return (
    <div className="flex flex-col h-full gap-5 w-4/5">
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
          <div className="flex items-center justify-center font-bold text-6xl h-full">
            Loading
          </div>
          :
          <div className="text-xl font-semibold">
            {quiz.paragraph}
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
