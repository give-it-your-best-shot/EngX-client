import { useParams } from "react-router-dom";
import EngXLearningService, { Language } from "../services/engx_learning_service";
import { useEffect, useState } from "react";
import { BoltIcon, UserIcon, MicrophoneIcon as MicrophoneOutline } from "@heroicons/react/24/outline";
import { MicrophoneIcon as MicrophoneSolid } from "@heroicons/react/24/solid";
import { Message } from "../services/azure_openai_service";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@nextui-org/react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Word() {
  const { word } = useParams();
  const engx_service = EngXLearningService.getInstance();
  const [pronunciation, setPronunciation] = useState<Message | undefined>();
  const [definition, setDefinition] = useState<Message | undefined>();
  const [example, setExample] = useState<Message | undefined>();
  const [language, setLanguage] = useState(engx_service.language);
  const [age, setAge] = useState(engx_service.age);

  const { speak, speaking, voices } = useSpeechSynthesis({
    onEnd: () => setMic1(false),
  });
  const [mic1, setMic1] = useState(false);

  const turnOnMic = (text: String | undefined) => {
    if (text && !speaking) speak({ text, rate: 0.7, voice: voices[1] });
  };

  useEffect(() => {
    console.log(voices)
    setPronunciation(undefined);
    setDefinition(undefined);
    setExample(undefined);
    engx_service.clearHistory();
    engx_service.getWordPronunciation(word!).then(_pronunciation => setPronunciation(_pronunciation));
    engx_service.getWordDefinition(word!).then(_definition => setDefinition(_definition));
    engx_service.getWordExample(word!).then(_example => setExample(_example));
  }, [language]);
  return (
    <div className="w-full bg-white p-16 rounded-lg shadow-lg flex flex-col gap-10">
      <div className="flex gap-5">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">{language}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={key => {
              engx_service.language = key as Language;
              setLanguage(key as Language);
            }}
          >
            <DropdownItem key={Language.ENGLISH}>english</DropdownItem>
            <DropdownItem key={Language.VIETNAMESE}>vietnamese</DropdownItem>
            <DropdownItem key={Language.JAPANESE}>japanese</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="text-slate-800 text-5xl font-bold flex-row flex items-center">
        {word}
        <MicrophoneOutline
          width={24}
          height={24}
          className={`ml-2 cursor-pointer ${mic1 && "hidden"}`}
          onClick={() => {
            turnOnMic(word);
            setMic1(prev => !prev);
          }}
        />
        <MicrophoneSolid width={24} height={24} className={`ml-2 cursor-pointer ${!mic1 && "hidden"}`} />
      </div>
      <div className="text-slate-600 text-lg items-center flex gap-5">
        <UserIcon className="w-8 h-8" />
        What is the pronunciation of '{word}'?
      </div>
      <div className="border border-slate-500 rounded-lg p-5 flex flex-col gap-5 text-slate-800">
        <BoltIcon className="w-5 h-5" />
        {pronunciation == undefined ? (
          <div className="text-2xl font-bold text-slate-400">...</div>
        ) : (
          <div className="text-lg text-slate-800 font-semibold whitespace-pre-wrap">{pronunciation.content}</div>
        )}
      </div>
      <div className="text-slate-600 text-lg items-center flex gap-5">
        <UserIcon className="w-8 h-8" />
        What is the definition of '{word}'?
      </div>
      <div className="border border-slate-500 rounded-lg p-5 flex flex-col gap-5 text-slate-800">
        <BoltIcon className="w-5 h-5" />
        {definition == undefined ? (
          <div className="text-2xl font-bold text-slate-400">...</div>
        ) : (
          <div className="text-lg text-slate-800 font-semibold whitespace-pre-wrap">{definition.content}</div>
        )}
      </div>
      <div className="text-slate-600 text-lg items-center flex gap-5">
        <UserIcon className="w-8 h-8" />
        Example using '{word}' in sentence?
      </div>
      <div className="border border-slate-500 rounded-lg p-5 flex flex-col gap-5 text-slate-800">
        <BoltIcon className="w-5 h-5" />
        {example == undefined ? (
          <div className="text-2xl font-bold text-slate-400">...</div>
        ) : (
          <div className="text-lg text-slate-800 font-semibold whitespace-pre-wrap">{example.content}</div>
        )}
      </div>
    </div>
  );
}
