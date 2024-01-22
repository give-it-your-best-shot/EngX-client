import { ComponentStore } from "../../stores/component_store";
import { lerpStep } from "../../util/math_util";
import { State } from "../../util/state";

export default class CombatIdle extends State {
  DEFAULT_ENGX_BOT_X = 512;
  DEFAULT_ENGX_BOT_Y = -300;
  DEFAULT_ENGX_BOT_W = 128;
  DEFAULT_ENGX_BOT_H = 128;

  engXBotStore: ComponentStore;
  constructor(engXBotStore: ComponentStore) {
    super("CombatIdle");
    this.engXBotStore = engXBotStore;
  }
  onEnter(msg?: any): void {
    console.log("Enter CombatIdle State");
  }
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
