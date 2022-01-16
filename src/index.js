import { helloWorld } from './hellowWorld';
document.write(helloWorld())


import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {
    render() {
        return <div>Search Text</div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app')
)