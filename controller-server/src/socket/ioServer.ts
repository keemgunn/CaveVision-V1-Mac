import https from 'https';
import fs from 'fs';
import { expressApp } from './express.js';
import { internalIP } from '../helpers/ipAddress.js';
import { getFileURL } from '../helpers/fileSystem.js';
import { Server } from "socket.io";
import { corsOptions } from "../helpers/cors.js";
import configs from '../configs/configs.js';
const { PORT_BACKEND } = configs.serverConnection;

// Make Server with ExpressApp & TLS Certificate.
// Express Endpoints - SEE express/index.ts
const keyFile = getFileURL('configs/certificates/cert-key.pem');
const certFile = getFileURL('configs/certificates/fullchain.pem');
const httpsOptions = {
  key: fs.readFileSync(keyFile),
  cert: fs.readFileSync(certFile)
} satisfies https.ServerOptions;


export function useIOserver() {

  console.log('* Opening HTTPS Server ...');
  const server = https.createServer(httpsOptions, expressApp);

  // START SERVER
  console.log('* Starting Server ...');
  const startListening = new Promise<void>((resolve) => {
    server.listen(PORT_BACKEND, () => {
      console.log('======== SOCKET.IO SERVER RUNNING')
      console.log(` - https://localhost:${PORT_BACKEND}`);
      console.log(` - https://${internalIP}:${PORT_BACKEND}\n`);
      resolve();
    });
  });

  // CREATE SOCKET.IO SERVER
  console.log('* Starting socket.io Server ...');
  const io = new Server(server, {
    cors: corsOptions
  });

  return { server, io, startListening };
}