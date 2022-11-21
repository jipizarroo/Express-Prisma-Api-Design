import express from 'express';

import cors from 'cors';
import morgan from 'morgan';

import router from './router';



const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`)
  next()
}


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(customLogger('custom logger'))

app.use((req, res, next) => {
  req.shhhh_secret = 'doggy'
  next()
})

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use('/api', router)

export default app