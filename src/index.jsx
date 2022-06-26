import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate that './index.scss' should be bundled
import './index.scss';

// Create redux store
const store = createStore(moviesApp, devToolsEnhancer()); // Use devToolsEnhancer() middleware

// Main component
class SamMoviesApplication extends React.Component {


    render() {
        return (
            <>
                <Provider store={store}>
                    <MainView />
                </Provider>
            </>
        );
    }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Render app in root DOM element
ReactDOM.render(React.createElement(SamMoviesApplication), container);