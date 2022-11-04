import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express'
import {body, validationResult} from 'express-validator'

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new movie with the title, year and language provided in the body
 */

app.post(
    '/exercises',
    body('name').not().isEmpty(),
    body('reps').isInt({gt: 0}),
    body('weight').isInt({gt: 0}),
    body('unit').isIn(['kgs', 'lbs']),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ Error: 'Invalid Request'});
      }
      if (!isDateValid(req.body.date)) {
          return res.status(400).json({ Error: 'Invalid Request'});
      }

      exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request'});
        });
},);

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */
 app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
});

/**
 * Retrieve movies. 
 * If the query parameters include a year, then only the movies for that year are returned.
 * Otherwise, all movies are returned.
 */

app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send([]);
        });

});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
 app.put('/exercises/:_id',
    body('name').not().isEmpty(),
    body('reps').isInt({gt: 0}),
    body('weight').isInt({gt: 0}),
    body('unit').isIn(['kgs', 'lbs']),
    (req, res) => { 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ Error: 'Invalid Request'});
      }
      if (!isDateValid(req.body.date)) {
          return res.status(400).json({ Error: 'Invalid Request'});
      }
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});