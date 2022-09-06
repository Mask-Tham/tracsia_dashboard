import { Ability } from '@casl/ability'
import { initialAbility } from './config'
import Vue from 'vue'

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
// const existingAbility = JSON.parse(localStorage.getItem('userAbility'))
// console.log(existingAbility);
// console.log(Vue.prototype);
const userAbility = getCookie('userAbility')
const existingAbility = userAbility ? JSON.parse(userAbility):userAbility;
// const existingAbility = [{ action: 'manage', subject: 'all' }]
// const existingAbility = null

export default new Ability(existingAbility || initialAbility)
