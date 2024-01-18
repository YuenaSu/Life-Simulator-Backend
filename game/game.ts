import Game from '../model/game/game.js';
import Property from '../model/game/property.js';
import { JobLadder } from './enums.js';

export default class GameObject {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  noEnoughAp() {
    return this.game.stats.actionpoints <= 0;
  }

  checkCash(target: number) {
    return this.game.stats.cash >= target;
  }

  bankrupt() {
    return this.game.stats.asset <= 0;
  }

  tooOld() {
    return this.game.stats.age > 35;
  }

  sick() {
    return this.game.stats.health < 50;
  }

  changeCash(amount: number) {
    this.game.stats.cash += amount;
  }

  changeAsset(amount: number) {
    this.game.stats.asset += amount;
  }

  changeAge(amount: number) {
    this.game.stats.age += amount;
  }

  changeHealth(amount: number) {
    this.game.stats.health += amount;
  }

  changeActionPoints(amount: number) {
    this.game.stats.actionpoints += amount;
  }

  changeJob(job: JobLadder) {
    this.game.details.job = job;
  }

  setMessage(message: string) {
    this.game.message = message;
  }

  changeCategory(category: string) {
    this.game.details.jobCategory = category;
  }

  addCar(car: Property) {
    this.game.details.cars.push(car);
  }

  addHouse(house: Property) {
    this.game.details.houses.push(house);
  }

  addStock(stock: Property) {
    this.game.details.stocks.push(stock);
  }
}
