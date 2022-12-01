/* eslint-disable no-unused-vars */
// @ts-nocheck

/**
 * Todo title
 * @type {string}
 */
const title = "Title 1";

/**
 * Array of ids (only number)
 * @type { Array<number> }
 */
const ids = [1, 2, 3];

/**
 * Default value of todo
 * @type {{
 * id: string, 
 * title: string, 
 * description: string, 
 * isComplete: boolean, 
 * finishedAt: string }}
 */

const todo = {
  id: 'ad1',
  title: 'Title 1',
  description: 'description of Title 1',
  isComplete: false,
  finishedAt: '2022-11-29T00:00:00+03:00',
};

/**
 * @typedef {Object} Todo
 * @property {string} id - Todo ID
 * @property {string} title - Todo title
 * @property {string} description - Todo description
 * @property {boolean} isComplete - Todo complete
 * @property {string} finishedAt - Todo finish time
 * 
 */

/**
 * @type {Todo}
 */

const todo2 = {
  id: 'ds2',
  title: 'Title 2',
  description: 'description of Title 2',
  isComplete: true,
  finishedAt: '2022-11-29T00:00:00+03:00',
}


/**
 * Class to create a new pet owner
 */
class Owner {
  /**
   * Pet owner detail
   * @param {Object} ownerDetail
   */
  constructor(ownerDetail) {
    /**
     * @property {string} name pet owner name
     */
    this.name = ownerDetail.name;
    /**
     * @property {number} age pet owner age
     */
    this.age = ownerDetail.age;
  }

  /**
   * @property {Function} printOwner print out owner information
   * @returns {void}
   */
  printOwner() {
    console.log(`Owner's name is ${this.name} and her age is ${this.age}`);
  }
}

/**
 * Link to Owner class
 * See {@link Owner}
 */
const owner1 = new Owner({
  name: "Kelly",
  age: 18,
});