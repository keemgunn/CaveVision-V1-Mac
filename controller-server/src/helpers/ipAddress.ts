import os from 'os';
import https from 'https';

// Get the internal IP address of the machine
const internalIP = Object.values(os.networkInterfaces())
  .flat()
  .filter((netInfo) => netInfo?.family === 'IPv4' && !netInfo.internal)
  .map((netInfo) => netInfo?.address)
  .toString();


/** Get the public IP address of the machine (using a third-party service) */
async function getPublicIP(port: number) {
  https.get('https://api.ipify.org', (res) => {
    res.setEncoding('utf8');
    let publicIP = '';
    res.on('data', (chunk) => {
      publicIP += chunk;
    });
    res.on('end', () => {
      console.log(` * PUBLIC IP: https://${publicIP}:${port}`);
    });
  });
}

export {
  internalIP,
  getPublicIP
}