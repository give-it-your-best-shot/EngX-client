import { State } from "./state";

export default class StateMachine {
  private states: State[];
  private current_state: State;

  constructor(states: State[], initial_state: State) {
    this.states = states;
    for (const state of this.states) [(state.stateMachine = this)];
    this.current_state = initial_state;
    this.current_state.onEnter();
  }

  to(state: State | string, _msg = {}): void {
    if (typeof state == "string") {
      if (this.states.filter((e) => e.name == state).length < 1) {
        throw `State: ${state} is not existed inside this state machine`;
      }
      state = this.states.filter((e) => e.name == state).shift() as State;
    } else {
      if (!this.states.includes(state)) {
        throw `State: ${state} is not existed inside this state machine`;
      }
    }
    this.current_state.onExit();
    this.current_state = state;
    this.current_state.onEnter();
  }

  update(_delta: number): void {
    this.current_state.update(_delta);
  }
}
