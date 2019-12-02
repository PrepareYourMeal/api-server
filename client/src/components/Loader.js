import React, { Component } from 'react';

class PreLoaderWidget extends Component {

    render() {
        return (

            <div id="preloader" style="display: none;">
            <div id="status" style="display: none;">
                <div class="spinner"></div>
            </div>
            </div>

        )
    }
}

export default PreLoaderWidget;