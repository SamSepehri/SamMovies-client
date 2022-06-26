import React from "react";
import { connect } from "react-redux";

import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function MoviesList(props) {
    const { movies, visibilityFilter, user, favoriteMovies } = props;



    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <>
            <Col md={12} style={{ margin: '1em' }}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
            {filteredMovies.map(m => (
                <Col xs={12} sm={6} md={4} lg={3} className="d-flex" key={m._id}>
                    <MovieCard movie={m} user={user} favoriteMovies={favoriteMovies} />
                </Col>
            ))}
        </>);
}

export default connect(mapStateToProps)(MoviesList);