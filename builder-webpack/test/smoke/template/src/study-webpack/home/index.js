import React from 'react';
import ReactDom from 'react-dom';
import largeNumber from 'nnn-large-number';
import logo from '../../assets/image/logo.png';
import { getStr } from '../../common/utils';
import { helloWorld } from './hellowWorld';
import './index.less';

getStr();
class Search extends React.Component {
    constructor(...reset) {
        super(reset);
        this.state = {
            Text: null,
        };
    }

    loadComponent() {
        import('./text').then((text) => {
            this.setState({
                Text: text.default,
            });
        });
    }

    render() {
        const { Text } = this.state;
        const num = largeNumber('999', '1');
        return (
            <div className="search__container">
                {Text ? <Text /> : null}
                Search Text
                {num}
                <img src={logo} onClick={() => this.loadComponent()} alt="" />
            </div>
        );
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('app'),
);

document.write(helloWorld());
