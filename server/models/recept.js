import mongoose from 'mongoose';

const receptSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  jednotlive_kroky: {
    type: String,
    required: true,
  },
  obrazok: {
    type: String,
    required: true,
  },
});

const Recept = mongoose.model('Recept', receptSchema);

export default Recept;