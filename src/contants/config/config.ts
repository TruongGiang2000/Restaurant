import {io} from 'socket.io-client';
export const main = {
  BASE_URL: 'https://restaurantteam.herokuapp.com/api/', //14.186.103.252:1036
};

export const socket = io('https://restaurantteam.herokuapp.com/', {query: {}});
