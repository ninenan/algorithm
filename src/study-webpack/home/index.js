import { helloWorld } from './hellowWorld';
import './index.less';
import logo from '../../assets/image/logo.png';
import React from 'react';
import ReactDom from 'react-dom';
import { getStr } from '../../common/utils';

console.log(getStr());
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

document.write(helloWorld())