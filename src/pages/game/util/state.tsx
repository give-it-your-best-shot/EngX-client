import StateMachine from "./state_machine";

export abstract class State {
  name: string = "Unknown";
  stateMachine: StateMachine | undefined = undefined;

  constructor(name: string) {
    this.name = name;
  }

  abstract update(_delta: number): void;
  onEnter(msg: any = {}): void {}
  onExit(): void {}
}
