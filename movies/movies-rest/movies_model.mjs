import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    language: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Movie = mongoose.model("Movie", movieSchema);

const createMovie = async (title, year, language) => {
    const movie = new Movie({ title: title, year: year, language: language });
    return movie.save();
}

const findMovies = async (filter, projection, limit) => {
    const query = Movie.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

const findMovieById = async (_id) => {
    const query = Movie.findById(_id);
    return query.exec();
}

const replaceMovie = async (_id, title, year, language) => {
    const result = await Movie.replaceOne({_id: _id}, {title: title, year: year, language: language });
    return result.modifiedCount;
}

const deleteById = async (_id) => {
    const result = await Movie.deleteOne({ _id: _id });
    return result.deletedCount;
}

export {createMovie, findMovies, findMovieById, replaceMovie, deleteById};