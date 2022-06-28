import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';

/* import actions */
import { setMovies, setUser, setFavoriteMovies } from '../../actions/actions';

/* import views */
import { NavigationBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

/* import bootstrap components */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class MainView extends React.Component {

    constructor() {
        super();
    }

    // When token is present (user is logged in), get list of movies
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        let username = localStorage.getItem('user');
        console.log('componentDidMount() is running!');

        if (accessToken !== null && username !== null) {
            Promise.all([
                this.getMovies(accessToken),
                this.getUser(accessToken, username)
            ])
                .then(() => {
                    this.props.setFavoriteMovies(this.props.movies.filter(movie => this.props.user.FavoriteMovies.includes(movie._id)));
                })
        }

    }

    // Query samovies API /movies endpoint to set movies state
    getMovies(token) {
        axios.get('https://samcinema2022.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //Assign the result to the movies state using action creator
                this.props.setMovies(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* Create function to get the user data from server, assign to userdata variable  */
    getUser(token, username) {
        axios.get(`https://samcinema2022.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //Assign the result to the userdata
                this.props.setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }




    /* On successful login, set token and user variables of local State & load the movies list (getMovies) */
    onLoggedIn(authData) {
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        console.log('onLoggedIn() is running!');

        Promise.all([
            this.getMovies(authData.token),
            this.getUser(authData.token, authData.user.Username)
        ])
            .then(() => {
                this.props.setFavoriteMovies(this.props.movies.filter(movie => this.props.user.FavoriteMovies.includes(movie._id)));
            })
    }



    render() {
        let { movies, user, favoriteMovies } = this.props;
        console.log('List of favoriteMovies:');
        console.log(favoriteMovies);


        return (
            <Router>
                < NavigationBar user={user} />
                <Container>

                    <Row className="main-view justify-content-md-center">

                        <Route exact path="/" render={() => {
                            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                            if (!user) return (
                                <Col md={6}>
                                    <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} />
                                </Col>
                            )

                            // If movie list is empty (while movies load from API), display empty page
                            if (movies.length === 0) return <div className="main-view" />;

                            return (
                                <MoviesList movies={movies} user={user} favoriteMovies={favoriteMovies} />
                            )
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Navigate to="/" />
                            return (
                                <Col xs={12} md={8}>
                                    <RegistrationView />
                                </Col>
                            )
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            return (
                                <Col xs={12} md={10}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />
                        <Route path={`/users/:username`} render={({ history }) => {
                            if (!user) return <Navigate to="/" />
                            return (
                                <Col xs={12} md={10}>
                                    <ProfileView user={user} favoriteMovies={favoriteMovies} onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />
                        <Route path={"/directors/:name"} render={({ match, history }) => {
                            if (!user) return <Navigate to="/" />
                            // If movie list is empty (while movies load from API), display empty page
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col xs={12} md={10}>
                                    <DirectorView movies={movies} user={user} favoriteMovies={favoriteMovies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />
                        <Route path={"/genres/:name"} render={({ match, history }) => {
                            if (!user) return <Navigate to="/" />
                            // If movie list is empty (while movies load from API), display empty page
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col xs={12} md={10}>
                                    <GenreView movies={movies} user={user} favoriteMovies={favoriteMovies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />


                    </Row>
                </Container>
            </Router>

        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavoriteMovies })(MainView);