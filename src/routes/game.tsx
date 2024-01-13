import { useEffect, useState } from "react";
import EngXLearningService, { Quiz } from "../services/engx_learning_service";

export default function Game() {
  const [quiz, setQuiz] = useState<Quiz>()
  const [qid, setQid] = useState(-1)
  const [hp, setHp] = useState(-1)
  const [score, setScore] = useState(0)
  useEffect(() => {
    const start = async () => {
      const engx_service = EngXLearningService.getInstance();
      engx_service.getGameOfWords(["hello", "apple", "world"]).then(quiz =>  {
        setQuiz(quiz)
        setQid(0)
        setHp(Math.floor(quiz.questions.length / 2))
      })
    };
    start();
  }, []);
  return (
    <div className="flex flex-col h-full gap-5 px-5">
      <div className="bg-white p-16 rounded-lg shadow-lg flex flex-col gap-10 h-1/5">

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
      <div className="bg-white p-16 rounded-lg shadow-lg flex flex-col gap-10 h-1/4">

      </div>
    </div>
  );
}
