import React, { Component } from 'react'
import LiveDiscover from './LiveDiscover'
import CategorieDiscover from './CategorieDiscover'

import StreamDiscover from './StreamDiscover'

export default class Decouverte extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{background: "#f4f4f4",paddingTop: "50px",width:"100%"}}>
                    <LiveDiscover />
                    <CategorieDiscover />
                    <StreamDiscover />
                </div>            
            </React.Fragment>
        )
    }
}
