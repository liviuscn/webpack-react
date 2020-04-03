import React from 'react';

import './home.less'

interface HomeProps {
    name: string
}

interface HomeState {
    title: string
}

export default class Home extends React.Component<HomeProps, HomeState> {

    static defaultProps = {
        name: 111,
        a: '111'
    }
    
    public props = {
        name: ''
    }

    state: HomeState = {
        title: '222'
    }

    constructor(props: HomeProps) {
        super(props)
    }

    render() {
        return <div>{this.state.title}{this.props.name}</div>
    }
}   