import { AnimatedSprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { Assets, SCALE_MODES, Spritesheet } from "pixi.js";
import WebFont from "webfontloader";

export function EngXBot() {
  const [isLoaded, setLoaded] = useState(false);
  const botSpritesheet = useRef<Spritesheet>();

  useEffect(() => {
    const start = async () => {
      WebFont.load({
        google: {
          families: ["VT323"],
        },
      });

      botSpritesheet.current = await Assets.load(
        "/game/engx-bot/engx-bot-normal.json",
      );
      setLoaded(true);

      botSpritesheet.current!.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    };

    start();
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      <AnimatedSprite
        textures={botSpritesheet.current?.animations["normal"]}
        animationSpeed={0.1}
        width={256}
        height={256}
        anchor={{ x: 0.5, y: 0.5 }}
        isPlaying
      />
    </>
  );
}
