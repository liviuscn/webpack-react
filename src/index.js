import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
};

ReactDOM.render(
    //绑定redux、热加载
    <App/>,
    document.getElementById('root'),
)