import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import { Quiz } from "src/services/engx_game_service";

interface AnswerExplainProps {
  quiz: Quiz;
}

export default function AnswerExplain(props: AnswerExplainProps) {
  return (
    <>
      {/* <div className="min-h-screen"></div> */}
      <div
        id="answer"
        className="w-full p-10 gap-16 bg-slate-200 px-32 rounded-xl border-2 text-lg font-semibold"
      >
        <div className="text-2xl font-bold text-slate-800">Paragraph</div>
        <div className="my-10">
          {props.quiz.paragraph.map((paragraph, index) => (
            <React.Fragment key={index}>
              {!!index && <span>__{index}__</span>}
              {paragraph}
            </React.Fragment>
          ))}
        </div>
        <div className="text-2xl font-bold text-slate-800">Answers</div>
        <Accordion variant="splitted" className="gap-16 my-10">
          {props.quiz.questions.map((question, id) => (
            <AccordionItem
              key={id}
              aria-label={`Question ${id + 1}`}
              subtitle={question.answers[question.correct_answer]}
              title={`Question ${id + 1}`}
              startContent={<QuestionMarkCircleIcon />}
            >
              {question.explanation}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
