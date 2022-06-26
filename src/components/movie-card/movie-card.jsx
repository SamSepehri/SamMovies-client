import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import { connect } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../../actions/actions';

function MovieCard(props) {
    const { movie, user, favoriteMovies } = props;

    const [isFav, setIsFav] = useState(false);

    // Set default Authorization for axios requests
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    useEffect(() => {
        if (favoriteMovies.find(m => m._id === movie._id)) {
            setIsFav(true);
        }
    })




    /* Function that allows users to remove a movie from their list of favorites */
    const removeFav = (movie) => {
        axios.delete(`https://samcinema2022.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
            .then(() => {
                // Change state of favoriteMovies to rerender component
                props.removeFavoriteMovie(movie);
                setIsFav(!isFav);
            })
            .catch(e => {
                console.log(e);
            });
    }

    /* Function that allows users to add a movie to their list of favorites */
    const addFav = (movie) => {
        axios.post(`https://samcinema2022.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
            .then(() => {
                // Change state of favoriteMovies to rerender component
                props.addFavoriteMovie(movie);
                setIsFav(!isFav);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (

        <Card text="dark" border="dark" className="mb-3">
            <Card.Img variant="top" src={movie.ImagePath} className="img-responsive" />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                {/* <Card.Text>{movie.Description}</Card.Text> */}
                {!isFav && <Button variant="outline-primary" onClick={() => addFav(movie)}>Add to Favorites</Button>}
                {isFav && <Button variant="outline-danger" onClick={() => removeFav(movie)}>Remove from Favorites</Button>}
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">More Info</Button>
                </Link>

            </Card.Body>
        </Card>

    );
}


export default connect(null, { removeFavoriteMovie, addFavoriteMovie })(MovieCard);

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onMovieClick function is required
*/
MovieCard.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string
    }).isRequired
};