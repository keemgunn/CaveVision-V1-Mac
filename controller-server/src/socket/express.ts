import express from 'express';
const expressApp = express();

expressApp.get('/', (req, res) => {
  res.send('EXPRESS SERVER LISTENING!')
})

export {
  expressApp
}