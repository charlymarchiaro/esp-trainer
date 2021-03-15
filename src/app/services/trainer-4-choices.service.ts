import { Injectable, EventEmitter } from '@angular/core';
import { RandomGeneratorService } from './random-generator.service';
import { TestState, TrialState, getTestStateInfo, TestStateInfo } from './common';


const TOTAL_TRIALS = 24;


@Injectable({
  providedIn: 'root'
})
export class Trainer4ChoicesService {


  private testState: TestState;
  private get currentTrial(): TrialState {
    return this.testState.trials[this.testState.currentTrialIndex];
  }
  private set currentTrial(ts: TrialState) {
    this.testState.trials[this.testState.currentTrialIndex] = ts;
  }

  private get isTestComplete(): boolean {
    return (
      this.testState.trials.filter(t => t.completed)
        .length === this.testState.trials.length
    );
  }


  public stateChange = new EventEmitter<TestStateInfo>();
  public trialComplete = new EventEmitter<TrialState>();


  constructor(
    private randomGenerator: RandomGeneratorService,
  ) {
    this.initState();
    this.emitStateChangeEvent();
  }


  public reset(): void {
    this.initState();
    this.emitStateChangeEvent();
  }


  public pass(): void {
    if (this.isTestComplete) {
      return;
    }
    this.initCurrentTrial();
  }


  public submitChoice(choiceIndex: number): void {
    if (this.isTestComplete) {
      return;
    }

    const isSuccess = this.currentTrial.correctChoiceIndex === choiceIndex;

    this.currentTrial = {
      ...this.currentTrial,
      completed: true,
      selectedChoiceIndex: choiceIndex,
      result: isSuccess ? 'success' : 'failure',
    };

    this.trialComplete.emit(this.currentTrial);

    if (!this.isTestComplete) {
      this.testState.currentTrialIndex++;
      this.initCurrentTrial();
    }

    this.emitStateChangeEvent();
  }


  private initState(): void {
    const state: TestState = {
      totalChoices: 4,
      trials: [],
      currentTrialIndex: 0,
    };

    for (let i = 0; i < TOTAL_TRIALS; i++) {
      state.trials.push({ completed: false });
    }
    this.testState = state;

    this.initCurrentTrial();
  }


  private initCurrentTrial(): void {
    this.currentTrial = {
      completed: false,
      correctChoiceIndex: this.randomGenerator.getRandomInt(0, 3),
    };
  }


  private emitStateChangeEvent(): void {
    this.stateChange.emit(getTestStateInfo(this.testState));
  }
}
