require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const bookingRouter = require('./routes/booking');

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hseq3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    console.log('CONNECTED MONGO DB');
  } catch (err) {
    console.log(`ERROR: ${err}`);
    process.exit(1);
  }
})();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
