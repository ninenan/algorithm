import { helloWorld } from './hellowWorld';
import './index.less';
import logo from '../../assets/image/logo.png';
import React from 'react';
import ReactDom from 'react-dom';
import { getStr } from '../../common/utils';

console.log(getStr());
class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }

    loadComponnt() {
        import('./text.js').then((text) => {
            this.setState({
                Text: text.default
            })
        })
    }

    render() {
        const { Text } = this.state
        return <div className='search__container'>
            {Text ? <Text /> : null}
            Search Text
            <img src={logo} onClick={this.loadComponnt.bind(this)} />
        </div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app')
)

document.write(helloWorld())