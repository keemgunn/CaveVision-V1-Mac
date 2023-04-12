import { internalIP } from "./ipAddress.js";
import configs from "../configs/configs.js";
import type { CorsOptions } from "cors";
const { PORT_FRONTEND_DEV, PORT_FRONTEND_PREVIEW } = configs.serverConnection;

const corsWhitelist: Array<string> = [];

if (internalIP.includes(',')) {
  const ips = internalIP.split(',');
  ips.forEach((ip) => {
    corsWhitelist.push(`https://${ip}:${PORT_FRONTEND_DEV}`);
    corsWhitelist.push(`https://${ip}:${PORT_FRONTEND_PREVIEW}`);
  })
  corsWhitelist.push(`https://localhost:${PORT_FRONTEND_DEV}`);
  corsWhitelist.push(`https://localhost:${PORT_FRONTEND_PREVIEW}`);
} else {
  corsWhitelist.push(`https://${internalIP}:${PORT_FRONTEND_DEV}`);
  corsWhitelist.push(`https://${internalIP}:${PORT_FRONTEND_PREVIEW}`);
  corsWhitelist.push(`https://localhost:${PORT_FRONTEND_DEV}`);
  corsWhitelist.push(`https://localhost:${PORT_FRONTEND_PREVIEW}`);
}


console.log('corsWhitelist: ',corsWhitelist, '\n');

export const corsOptions = {

  origin: corsWhitelist, 
  credentials: true,

} satisfies CorsOptions