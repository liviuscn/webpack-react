import React from 'react';
import ReactDOM from 'react-dom';
import User from './pages/user/user'
import Home from './pages/home/home'

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
           <div>
               <Home/>
               <User/>
           </div>

        );
    }
};

ReactDOM.render(
    //绑定redux、热加载
    <App />,
    document.getElementById('root'),
)