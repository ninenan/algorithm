import { helloWorld } from './hellowWorld';
import './search-test.less';
import logo from './assets/image/logo.png';
import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {
    render() {
        return <div className='search__container'>
            Search Text 123123
            <img src={logo} />
        </div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app')
)

document.write(helloWorld())