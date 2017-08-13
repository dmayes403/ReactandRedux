import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import Keys from './config.js';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import SearchBar from './components/search_bar';

const youTubeApiKey = Keys.keys[0].youTubeKey;

// const youTubeApiKey = Keys[0].keys[0].youTubeKey;
// Create a new component. This component should produce
// some HTML

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: youTubeApiKey, term: term}, (videos) => {
            // this.setState({ videos: videos }); when property and value are the same, you can do the line below.
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        
        return (
            <div>
                <SearchBar onSearchTermChange={ term => videoSearch(term) }/>
                <VideoDetail video={ this.state.selectedVideo }/> 
                <VideoList 
                    onVideoSelect={ selectedVideo => this.setState({ selectedVideo })}
                    videos={ this.state.videos }/> 
            </div>
        );
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));
