import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trainer4ChoicesService } from 'src/app/services/trainer-4-choices.service';
import { Subscription } from 'rxjs';
import { TestStateInfo, TrialState, HIGHLIGHT_CORRECT_ANSWER_DURATION_MS, REWARD_IMAGE_DURATION_MS } from '../../services/common';
import { RandomImageService } from 'src/app/services/random-image.service';


interface ChoiceState {
  isHighlighted: boolean;
  isDisabled: boolean;
}



@Component({
  selector: 'app-trainer-4-choices',
  templateUrl: './trainer-4-choices.component.html',
  styleUrls: ['./trainer-4-choices.component.scss']
})
export class Trainer4ChoicesComponent implements OnInit, OnDestroy {


  public choiceSizePx: number;

  public choicesState: {
    [id: number]: ChoiceState
  } = {
      0: { isHighlighted: false, isDisabled: false, },
      1: { isHighlighted: false, isDisabled: false, },
      2: { isHighlighted: false, isDisabled: false, },
      3: { isHighlighted: false, isDisabled: false, },
    };

  public testStateInfo: TestStateInfo;

  public successRatePercent: number;

  public isRewardImageActive: boolean;
  public rewardImageSrc: string;

  public isCorrectAnswerActive: boolean;

  private subscription = new Subscription();


  constructor(
    private trainerService: Trainer4ChoicesService,
    private randomImageService: RandomImageService,
  ) {
    this.subscription.add(
      this.trainerService.stateChange.subscribe(
        s => this.onStateChange(s)
      )
    );
    this.subscription.add(
      this.trainerService.trialComplete.subscribe(
        t => this.onTrialComplete(t)
      )
    );
    this.subscription.add(
      this.trainerService.trialPass.subscribe(
        t => this.onTrialPass(t)
      )
    );
  }


  ngOnInit(): void {
    window.addEventListener('resize', () => this.onWindowResize());
    this.updateChoiceSize();

    this.trainerService.reset();
  }


  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.onWindowResize());
    this.subscription.unsubscribe();
  }


  private onWindowResize(): void {
    this.updateChoiceSize();
  }


  private updateChoiceSize(): void {
    if (window.innerWidth > window.innerHeight) {
      this.choiceSizePx = window.innerHeight * 0.30;
    } else {
      this.choiceSizePx = Math.min(window.innerWidth * 0.45, window.innerHeight * 0.30);
    }
  }


  public onChoiceClick(id: number): void {
    this.trainerService.submitChoice(id);
  }


  public onResetButtonClick(): void {
    this.trainerService.reset();
  }


  public onPassButtonClick(): void {
    this.trainerService.pass();
  }


  private onStateChange(info: TestStateInfo): void {
    this.testStateInfo = info;
    this.successRatePercent = 100 * info.successCount / info.totalTrials;

    this.updateChoicesEnableState();
  }


  private onTrialComplete(trialState: TrialState): void {

    this.displayCorrectAnswer(trialState);

    // Handle the trial result
    if (trialState.result === 'success') {
      this.handleTrialSuccess(trialState);

    } else {
      this.handleTrialFailure(trialState);
    }
  }


  private onTrialPass(trialState: TrialState): void {
    this.displayCorrectAnswer(trialState);
  }


  private displayCorrectAnswer(trialState: TrialState): void {
    this.isCorrectAnswerActive = true;
    this.choicesState[trialState.correctChoiceIndex].isHighlighted = true;
    this.updateChoicesEnableState();

    setTimeout(() => {
      this.isCorrectAnswerActive = false;
      this.choicesState[trialState.correctChoiceIndex].isHighlighted = false;
      this.updateChoicesEnableState();
    },
      HIGHLIGHT_CORRECT_ANSWER_DURATION_MS
    );
  }


  private handleTrialFailure(trialState: TrialState): void {

  }


  private handleTrialSuccess(trialState: TrialState): void {
    this.isRewardImageActive = true;
    this.rewardImageSrc = this.randomImageService.getRandomImage();
    this.updateChoicesEnableState();

    setTimeout(() => {
      this.isRewardImageActive = false;
      this.updateChoicesEnableState();
    },
      REWARD_IMAGE_DURATION_MS
    );
  }


  private setChoicesEnableState(enabled: boolean): void {
    Object.values(this.choicesState).forEach(
      cs => cs.isDisabled = !enabled
    );
  }


  private updateChoicesEnableState(): void {
    this.setChoicesEnableState(
      !this.isCorrectAnswerActive
      && !this.isRewardImageActive
      && !this.testStateInfo.isTestComplete
    );
  }
}
