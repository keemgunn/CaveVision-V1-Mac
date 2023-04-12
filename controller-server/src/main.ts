import { useIOserver } from './socket/ioServer.js';
import { useOSCserver } from './osc/oscServer.js';
import { useFaceOSCstreamline } from './osc/faceOSC.js';

async function startServer() {
  const { server, io, startListening } = useIOserver();
  await startListening;
  const osc = useOSCserver();
  
  useFaceOSCstreamline(osc);
}

startServer();