import { withState as recomposeWithState } from 'recompose';

export type WithStateProps<State, Props = {}> = {
  state: State;
  setState: SetStateViaValueOrFunction<State, Props>;
};

export type SetStateViaValueOrFunction<State, Props> =
  (input: State | ((currentState: State, props: Props) => State), callback?: Function) => void;

export function withState<State, Props = {}> (initialState: State | ((props: Props) => State)) {
  return recomposeWithState('state', 'setState', initialState);
}