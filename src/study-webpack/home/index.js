import './index.less';
import React from 'react';
import ReactDom from 'react-dom';
import logo from '../../assets/image/logo.png';
import { getStr } from '../../common/utils';
import { helloWorld } from './hellowWorld';

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
        return (
            <div className="search__container">
                {Text ? <Text /> : null}
                Search Text
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
