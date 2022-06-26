import React from 'react';

import MovieCard from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export function GenreView(props) {
    const { movies, user, genre, onBackClick, favoriteMovies } = props;
    return (
        <>

            <div>
                <Button variant="outline-light" onClick={() => { onBackClick() }}>Back</Button>
            </div>

            <div>
                <h1 className="display-4">{genre.Name}</h1>
            </div>
            <div>
                <span className="value">{genre.Description}</span>
            </div>
            <br />
            <div>
                <h4>Some movies in this genre:</h4>
            </div>



            <Row className="justify-content-md-center">
                {movies.filter(m => m.Genre.Name === genre.Name).map(m => (
                    <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
                        <MovieCard movie={m} user={user} favoriteMovies={favoriteMovies} />
                    </Col>
                ))}
            </Row>




            <Link to={"/"}>
                <Button variant="outline-light">Back to full list</Button>
            </Link>
        </>
    )
}