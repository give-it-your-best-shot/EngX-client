import { useParams } from "react-router-dom";
import EngXLearningService from "../services/engx_learning_service";
import { useEffect, useState } from "react";
import { BoltIcon, UserIcon } from "@heroicons/react/24/outline";
import { Message } from "../services/azure_openai_service";

export default function Word() {
  const { word } = useParams();
  const engx_service = EngXLearningService.getInstance();
  const [pronunciation, setPronunciation] = useState<Message | undefined>();
  const [definition, setDefinition] = useState<Message | undefined>();

  useEffect(() => {
    if (!pronunciation)
      engx_service
        .getWordPronunciation(word!)
        .then((_pronunciation) => setPronunciation(_pronunciation));
    if (!definition)
      engx_service
        .getWordDefinition(word!)
        .then((_definition) => setDefinition(_definition));
  }, []);
  return (
    <div className="bg-white p-16 rounded-lg shadow-lg w-full flex flex-col gap-10">
      <div className="text-slate-800 text-5xl font-bold">{word}</div>
      <div className="text-slate-600 text-lg items-center flex gap-5">
        <UserIcon className="w-8 h-8" />
        What is the pronunciation of '{word}'?
      </div>
      <div className="border border-slate-500 rounded-lg p-5 flex flex-col gap-5 text-slate-800">
        <BoltIcon className="w-5 h-5" />
        {pronunciation == null ? (
          <div className="text-2xl font-bold text-slate-400">...</div>
        ) : (
          <div className="text-xl text-slate-600 font-semibold">
            {pronunciation.content}
          </div>
        )}
      </div>
      <div className="text-slate-600 text-lg items-center flex gap-5">
        <UserIcon className="w-8 h-8" />
        What is the definition of '{word}'?
      </div>
      <div className="border border-slate-500 rounded-lg p-5 flex flex-col gap-5 text-slate-800">
        <BoltIcon className="w-5 h-5" />
        {definition == null ? (
          <div className="text-2xl font-bold text-slate-400">...</div>
        ) : (
          <div className="text-xl text-slate-600 font-semibold">
            {definition.content}
          </div>
        )}
      </div>
    </div>
  );
}
