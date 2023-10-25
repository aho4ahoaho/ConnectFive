import Express from 'express';

const PORT = process.env.PORT || 3001;
const app = Express();

app.use(Express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
    console.log(`Listening on port ${PORT}!`);
});