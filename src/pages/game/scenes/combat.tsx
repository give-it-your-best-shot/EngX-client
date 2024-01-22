import { Container, Sprite, Text, useTick } from "@pixi/react";
import useGameStore from "../stores/game_store";
import { TextStyle, Texture } from "pixi.js";
import { EngXBot } from "../components/engx-bot";
import { useEffect, useRef, useState } from "react";
import StateMachine from "../util/state_machine";
import { useEngXBotStore } from "../stores/component_store";
import CombatIdle from "./combat_states/idle";

import {
  AdjustmentFilter,
  AdvancedBloomFilter,
  CRTFilter,
  GlitchFilter,
  KawaseBlurFilter,
  PixelateFilter,
} from "pixi-filters";

export interface CombatSceneProps {
  image?: string;
}

export default function CombatScene(props: CombatSceneProps) {
  const gameStore = useGameStore();
  const engXBotStore = useEngXBotStore();
  props;

  const combatIdleState = useRef<CombatIdle>(new CombatIdle(engXBotStore));
  const stateMachine = useRef<StateMachine>();

  useEffect(() => {
    const states = [combatIdleState.current];
    if (stateMachine.current == null)
      stateMachine.current = new StateMachine(states, states[0]);
  }, []);

  useEffect(() => {
    combatIdleState.current.engXBotStore = engXBotStore;
  }, [engXBotStore]);

  const [waitingTextAlpha, setWaitingSetAlpha] = useState(1);

  useTick((_delta) => {
    if (waitingTextAlpha != 0) setWaitingSetAlpha(waitingTextAlpha - 0.02);
    stateMachine.current?.update(_delta);
  });

  return (
    <>
      <Container
        pivot={{ x: -gameStore.width / 2, y: -gameStore.height / 2 }}
        sortableChildren
      >
        <EngXBot
          x={engXBotStore.x}
          y={engXBotStore.y}
          width={engXBotStore.width}
          height={engXBotStore.height}
        />
        <Sprite
          texture={Texture.from(`data:image/jpeg;base64,${props.image}`)}
          anchor={{ x: 0.5, y: 0.5 }}
          zIndex={0}
          alpha={1 - waitingTextAlpha}
          filters={[
            new CRTFilter(),
            new AdjustmentFilter({
              brightness: 0.4,
            }),
          ]}
          width={gameStore.width}
          height={gameStore.height}
        />
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
          zIndex={1}
        />
        <Text
          y={gameStore.height / 2 - 50}
          x={-gameStore.width / 2 + 50}
          text="Music: Undertale - Death by Glamour"
          resolution={10}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "VT323",
              fill: "#ffffff",
            })
          }
          alpha={1 - waitingTextAlpha}
          zIndex={1}
        />
      </Container>
    </>
  );
}
