import { helloWorld } from './hellowWorld';
import './search-test.less';
import logo from './assets/image/logo.png';
document.write(helloWorld())


import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {
    render() {
        return <div className='search__container'>
            Search Text
            <img src={logo} />
        </div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app')
)