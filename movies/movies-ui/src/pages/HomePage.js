import React from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({setMovieToEdit}) {
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/movies/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newMovies = movies.filter( m => m._id !== _id);
            setMovies(newMovies);
        }
        else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = movie => {
        setMovieToEdit(movie);
        history.push("/edit-movie");
    }

    const loadMovies = async () => {
        const response = await fetch('/movies');
        const data = await response.json();
        setMovies(data);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <>
            <h2>List of Movies</h2>
            <MovieList movies={movies} onDelete={onDelete} onEdit={onEdit} ></MovieList>
            <Link to="/add-movie">Add a movie</Link>
        </>
    );
}

export default HomePage;