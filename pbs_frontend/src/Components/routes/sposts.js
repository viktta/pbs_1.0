import React , { Component } from 'react';
import GetPosts from './gposts';

class SeePosts extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <GetPosts />
            </div>
        )
    }
}

export default SeePosts;