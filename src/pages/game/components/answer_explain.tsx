import { Accordion, AccordionItem } from "@nextui-org/react";
import { Quiz } from "src/services/engx_game_service";

interface AnswerExplainProps {
  quiz: Quiz;
}

export default function AnswerExplain(props: AnswerExplainProps) {
  console.log(props.quiz);
  return (
    <div className="flex flex-col w-full p-10 gap-10">
      <Accordion>
        {props.quiz.questions.map((question, id) => (
          <AccordionItem
            key={id}
            aria-label={`Question ${id + 1}`}
            subtitle={question.answers[question.correct_answer]}
            title={`Question ${id + 1}`}
          >
            {question.explaination}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
