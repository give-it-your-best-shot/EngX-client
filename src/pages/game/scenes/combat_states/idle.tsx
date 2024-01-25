import { ComponentStore } from "../../stores/component_store";
import { GameStore } from "../../stores/game_store";
import { lerpStep } from "../../util/math_util";
import { State } from "../../util/state";

export default class CombatIdle extends State {
  DEFAULT_ENGX_BOT_X = 512;
  DEFAULT_ENGX_BOT_Y = -300;
  DEFAULT_ENGX_BOT_W = 128;
  DEFAULT_ENGX_BOT_H = 128;

  gameStore: GameStore;
  engXBotStore: ComponentStore;
  constructor(engXBotStore: ComponentStore, gameStore: GameStore) {
    super("CombatIdle");
    this.engXBotStore = engXBotStore;
    this.gameStore = gameStore;

    this.DEFAULT_ENGX_BOT_X = gameStore.width / 2.5;
    this.DEFAULT_ENGX_BOT_Y = -gameStore.height / 2.5;
  }
  onEnter(msg?: any): void {}
  update(_delta: number): void {
    if (this.engXBotStore.x != this.DEFAULT_ENGX_BOT_X)
      this.engXBotStore.setX(
        lerpStep(this.engXBotStore.x, this.DEFAULT_ENGX_BOT_X),
      );
    if (this.engXBotStore.y != this.DEFAULT_ENGX_BOT_Y)
      this.engXBotStore.setY(
        lerpStep(this.engXBotStore.y, this.DEFAULT_ENGX_BOT_Y),
      );
    if (this.engXBotStore.width != this.DEFAULT_ENGX_BOT_W)
      this.engXBotStore.setWidth(
        lerpStep(this.engXBotStore.width, this.DEFAULT_ENGX_BOT_W),
      );
    if (this.engXBotStore.height != this.DEFAULT_ENGX_BOT_H)
      this.engXBotStore.setHeight(
        lerpStep(this.engXBotStore.height, this.DEFAULT_ENGX_BOT_H),
      );
  }
}
