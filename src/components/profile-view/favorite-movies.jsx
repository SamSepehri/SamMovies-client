import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import MovieCard from '../movie-card/movie-card';

import { Link } from 'react-router-dom';

export function FavoriteMoviesList(props) {
    const { favoriteMovies, user } = props;
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h4>My favorite movies</h4>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {favoriteMovies.map(m => (
                    <Col xs={12} sm={6} md={4} lg={3} className="d-flex" key={m._id}>
                        <MovieCard movie={m} user={user} favoriteMovies={favoriteMovies} />
                    </Col>
                ))}
            </Row>

        </>
    )

}