import { networkInterfaces } from 'os';

console.log("======================================");
console.log("==== CONTROLLER SERVER INITIATING ====");
console.log("======================================");
console.log("");
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
    // @ts-ignore
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
console.log('[configs/connection.ts] - Current Network Status :', results);


export default {

  INTERNAL_IP: results.en0[0],
  // TLS Certificate must comply with this IP Address.

  PORT_BACKEND: 4040,
  PORT_FRONTEND_DEV: 5173,
  PORT_FRONTEND_PREVIEW: 4173,
}