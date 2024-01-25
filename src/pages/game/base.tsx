import { useEffect, useState } from "react";

import { Stage } from "@pixi/react";
import useGameStore from "./stores/game_store";
import LoadingScene from "./scenes/loading";
import CombatScene from "./scenes/combat";
import EngXGameService, { Quiz } from "src/services/engx_game_service";
import MusicPlayer from "./util/music_player";
import AnswerExplain from "./components/answer_explain";
import RealGame from "./components/real_game";

interface BaseGameProps {
  words?: string[];
  paragraphLengthRange?: number[];
  onGameEnd?: (quiz: Quiz | undefined, score: number, isWin: boolean) => void;
  onExit?: () => void;
}

export default function BaseGame(props: BaseGameProps) {
  const engx_game_service = EngXGameService.getInstance();
  const gameStore = useGameStore();

  const [quiz, setQuiz] = useState<Quiz>();
  const [loadingText, setLoadingText] = useState<string>(
    "Generating something wonderful",
  );

  const [showAnswers, setShowAnswers] = useState(false);

  addEventListener("resize", () => {
    gameStore.setWidth(window.innerWidth / 1.1);
    gameStore.setHeight(window.innerHeight / 1.1);
  });

  useEffect(() => {
    gameStore.setLoading(true);
    const range = props.paragraphLengthRange ?? [50, 100];
    const start = async () => {
      engx_game_service
        .getGameOfWords(
          props.words ?? [
            "hands-on",
            "unscrupulous",
            "seller",
            "conquer",
            "meandering",
            "wandering",
          ],
          {
            onParagraphGenerated: (_) =>
              setLoadingText("A wonderful story has been generated"),
            onSDPromptGenerated: (_) =>
              setLoadingText("Working hard on game background"),
            onSDImageGenerated: (_) =>
              setLoadingText("Almost done. Get ready to battle"),
          },
          {
            num_sentence: range[1] / 5,
            min_num_words: range[0],
            max_num_words: range[1],
          },
        )
        .then((quiz) => {
          setQuiz(quiz);
          gameStore.setLoading(false);
          MusicPlayer.getInstance().selectSongInTheme(quiz!.theme);
          MusicPlayer.getInstance().autoPlayStart();
          MusicPlayer.getInstance().setVolume(0.2);
        });
    };
    start();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {gameStore.isLoading ? (
        <></>
      ) : (
        <div className="absolute h-screen w-full" style={{}}>
          <RealGame
            quiz={quiz!}
            onWin={(score) => {
              setShowAnswers(true);
              if (props.onGameEnd) {
                props.onGameEnd(quiz, score, true);
              }
            }}
            onLose={(score) => {
              setShowAnswers(true);
              if (props.onGameEnd) {
                props.onGameEnd(quiz, score, false);
              }
            }}
            onExit={props.onExit}
          />
          {showAnswers ? <AnswerExplain quiz={quiz!} /> : " "}
        </div>
      )}
      <Stage
        className="mt-20 border-5 rounded-xl border-slate-500 shadow-xl"
        style={{
          fontFamily: "VT323",
        }}
        width={gameStore.width}
        height={gameStore.height}
        options={{
          backgroundAlpha: 1,
        }}
      >
        {gameStore.isLoading ? (
          <LoadingScene loadingText={loadingText} />
        ) : (
          <CombatScene image={quiz?.image} />
        )}
      </Stage>
    </div>
  );
}
