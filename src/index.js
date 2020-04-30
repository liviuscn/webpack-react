import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./pages/login/login";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            a: 'a'
        }
    }

    render() {
        return (
            <div>
                <Login />
            </div>
        );
    }
};

ReactDOM.render(
    //绑定redux、热加载
    <App />,
    document.getElementById('root'),
)