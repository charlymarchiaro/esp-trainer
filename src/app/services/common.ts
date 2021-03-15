
export type TrialResult = 'success' | 'failure';

export interface TrialState {
  completed: boolean;
  correctChoiceIndex?: number;
  selectedChoiceIndex?: number;
  result?: TrialResult;
}

export interface TestState {
  totalChoices: number;
  trials: TrialState[];
  currentTrialIndex: number;
}


export interface TestStateInfo {
  totalChoices: number;
  totalTrials: number;
  currentTrialIndex: number;
  completedTrials: number;
  successCount: number;
  failureCount: number;
  isTestComplete: boolean;
  state: TestState;
}


export const getTestStateInfo = (state: TestState): TestStateInfo => {
  const completedTrials = state.trials.filter(t => t.completed);
  const successCount = completedTrials
    .filter(t => t.result === 'success')
    .length;

  const failureCount = completedTrials
    .filter(t => t.result === 'failure')
    .length;

  return {
    totalChoices: state.totalChoices,
    totalTrials: state.trials.length,
    currentTrialIndex: state.currentTrialIndex,
    completedTrials: completedTrials.length,
    successCount,
    failureCount,
    isTestComplete: (
      state.currentTrialIndex === state.trials.length - 1
    ),
    state,
  };
};


// Constants
export const HIGHLIGHT_CORRECT_ANSWER_DURATION_MS = 500;
export const REWARD_IMAGE_DURATION_MS = 4000;
