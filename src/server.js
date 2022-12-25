const express = require('express');
const Result = require('./result');

const app = express();
const result = new Result();

app.use(express.json());
app.use(express.static(`${__dirname}/../storages`));

app.get('/api/result', async (req, res) => {
  try {
    const exam = req.query.exam.toLowerCase();
    const year = req.query.year.toLowerCase();
    const board = req.query.board.toLowerCase();
    const roll = req.query.roll.toLowerCase();
    const reg = req.query.reg.toLowerCase();

    if (!exam || !year || !board || !roll || !reg) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all the query parameters.'
      });
    }

    await result.initialize();
    const pdf = await result.getResult(exam, year, board, roll, reg);

    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).end(pdf);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// return error if route not found
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.method} ${req.originalUrl} on this server.`
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
