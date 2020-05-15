import React, { Component } from 'react'

export default class List extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        dataSource: []
    }
    render() {
        const { dataSource } = this.props
        console.log(dataSource)
        return (
            <div>
                <ul>
                    {
                        dataSource.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}