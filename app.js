import dotenv from 'dotenv';
import serverModel from './models/server.model.js';

dotenv.config();
const server = new serverModel();

server.listen();

