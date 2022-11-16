import { Observable } from '@nativescript/core';
import { checkBatteryLevel, listenForBatteryChanges } from './battery';

const formatMessage = (level) =>
  `Hello Victor! This is a hybrid app. The same code is used to for the frontend which is loaded on the iOS app and android app. It can also interact with the native APIs. e.g. your battery level is: ${level}%`;

export class HelloWorldModel extends Observable {
  level: number;
  isListening = false;

  constructor() {
    super();
    this.updateBatteryLevel();
  }

  async updateBatteryLevel() {
    const value = await checkBatteryLevel();
    this.updateLevel(value);
    alert(formatMessage(value));
  }

  async toggleListenForChanges() {
    this.isListening = listenForBatteryChanges((value) => {
      this.updateLevel(value);
    });
    this.notifyPropertyChange('isListening', this.isListening);
    if (this.isListening) {
      // update view binding right away
      const value = await checkBatteryLevel();
      this.updateLevel(value);
    }
  }

  private updateLevel(value: number) {
    this.level = value;
    this.notifyPropertyChange('level', this.level);
  }
}
