import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useEffect, useState } from "react";
import useGameStore from "../stores/game_store";
import WebFont from "webfontloader";
import { EngXBot } from "../components/engx-bot";

export default function LoadingScene() {
  const [isLoaded, setLoaded] = useState(false);

  const gameStore = useGameStore();

  useEffect(() => {
    const start = async () => {
      WebFont.load({
        google: {
          families: ["VT323"],
        },
      });
      setLoaded(true);
    };
    start();
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Container pivot={{ x: -gameStore.width / 2, y: -gameStore.height / 2 }}>
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
      />
    </Container>
  );
}
