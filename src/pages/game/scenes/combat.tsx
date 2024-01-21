import { Container, Text, useTick } from "@pixi/react";
import useGameStore from "../stores/game_store";
import { TextStyle } from "pixi.js";
import { EngXBot } from "../components/engx-bot";
import { useState } from "react";

export interface CombatSceneProps {}

export default function CombatScene(props: CombatSceneProps) {
  const gameStore = useGameStore();
  props;

  const [waitingTextAlpha, setWaitingSetAlpha] = useState(1);

  useTick(() => {
    if (waitingTextAlpha != 0) setWaitingSetAlpha(waitingTextAlpha - 0.01);
  });

  return (
    <>
      <Container pivot={{ x: -gameStore.width / 2, y: -gameStore.height / 2 }}>
        {/* <Sprite/> */}
        <EngXBot />
        <Text
          resolution={2}
          text="Stay tuned. It might seems to stuck but we actually trying to generate the best test for you."
          anchor={{ x: 0.5, y: 0.5 }}
          y={gameStore.height * 0.35}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "VT323",
              fill: "#ffffff",
            })
          }
          alpha={waitingTextAlpha}
        />
      </Container>
    </>
  );
}
