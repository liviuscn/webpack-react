import React from 'react';
import ReactDOM from 'react-dom';
import './style.less'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.state = {
            ...this.state,
            a: 'a'
        }
        this.f()
    }

    f = async () => {
        await new Promise((x) => x('111'))
        console.log('fffffffffffffff')
    }

    render() {
        return (
            <h1 className="hello">Hello World</h1>
        );
    }
};

ReactDOM.render(
    //绑定redux、热加载
    <App />,
    document.getElementById('root'),
)