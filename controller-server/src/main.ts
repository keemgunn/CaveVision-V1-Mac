import { useIOserver } from './socket/ioServer.js';
import { useOSCserver, useOSCclient } from './osc/oscCommunication.js';
import { useFaceOSCstreamline } from './osc/faceOSC.js';

async function startServer() {

  const { server, io, startListening } = useIOserver();
  await startListening;

  const oscServer = useOSCserver();
  const oscClient = useOSCclient();
  useFaceOSCstreamline(oscServer, oscClient);
}

startServer();