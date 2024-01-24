import { AnimatedSprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { Assets, SCALE_MODES, Spritesheet } from "pixi.js";
import WebFont from "webfontloader";
import {
  AdvancedBloomFilter,
  DropShadowFilter,
  GlowFilter,
  OutlineFilter,
} from "pixi-filters";

interface EngXBotProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export function EngXBot(
  props: EngXBotProps = {
    width: 512,
    height: 512,
    x: 0,
    y: 0,
  },
) {
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
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
        anchor={{ x: 0.5, y: 0.5 }}
        isPlaying
        zIndex={1}
        filters={[
          new AdvancedBloomFilter(),
          new DropShadowFilter(),
          new OutlineFilter(2, 0xffffff),
        ]}
      />
    </>
  );
}
