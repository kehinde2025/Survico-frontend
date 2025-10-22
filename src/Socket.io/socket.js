// src/sockets/socket.js
import { io } from 'socket.io-client';

const URL = 'http://localhost:5000'; // or your backend URL

export const socket = io(URL, {
  autoConnect: false, // good practice
});

export default socket;
