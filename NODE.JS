const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Movie = require('./movie');
const Review = require('./review');

app.use(bodyParser.json());

app.get('/movies', async (req, res) => {
  const movies = await Movie.getAll();
  res.json(movies);
});

app.get('/movies/:id', async (req, res) => {
  const movie = await Movie.getById(req.params.id);
  res.json(movie);
});

app.post('/movies', async (req, res) => {
  const movie = await Movie.add(req.body);
  res.status(201).json(movie);
});

app.put('/movies/:id', async (req, res) => {
  const movie = await Movie.update(req.params.id, req.body);
  res.json(movie);
});

app.delete('/movies/:id', async (req, res) => {
  await Movie.delete(req.params.id);
  res.status(204).send();
});

app.get('/movies/:id/reviews', async (req, res) => {
  const reviews = await Review.getAllByMovieId(req.params.id);
  res.json(reviews);
});

app.post('/movies/:id/reviews', async (req, res) => {
  const review = await Review.add(req.params.id, req.body);
  res.status(201).json(review);
});

const Review = require('./review');

exports.update = async (id, updatedReview) => {
  // Find the review by ID
  const review = await Review.getById(id);

  // If the review doesn't exist, return a 404 error
  if (!review) {
    throw { status: 404, message: 'Review not found' };
  }

  // Update the review with the new data
  Object.assign(review, updatedReview);

  // Save the updated review to the database
  await review.save();

  return review;
};
