import React, { Component } from 'react'
import './index.less'
export default class List extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        dataSource: []
    }
    render() {
        const { dataSource } = this.props
        return (
            <div class="pdv-list">
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