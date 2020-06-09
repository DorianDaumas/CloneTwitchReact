import React, { Component } from 'react'
import logo from './iconTitch.svg'
import './header.css'
import {Link} from 'react-router-dom'
import Search from './search.svg'
import Input from '@material-ui/core/Input';
import compass from './compass-with-white-needles.svg'
import list from './list.svg'
import live from './live.svg'

export default class header extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchInput: "",
            dataSearch: [],
            dataname: [],
            repos: [] 
        }
    }

    render(){

        const handleSubmit = (e) => {
            e.preventDefault();
        }
    
        const handleKeyPress = (e) => {
            this.setState({searchInput: e.target.value})
        }

  

        return (
            <React.Fragment>
                <nav className="HeaderTop">
                    
                    <li className="LogoNav">
                        <Link to="/"><img src={logo} href="/" alt="logo twitch" className="logo" /> </Link>
                    </li>
    
                    <ul className="ListMenu">
    
                        {/* <li className="LienNav">
                            <img alt='onglet decouverte' className="discover" src={compass} />
                            <Link to="/discover" > Découvrir </Link>
                        </li>

                        <li className="discover">
                            <Link to="/discover" > <img className="discover" alt='onglet decouverte' width="25px" src={compass} /> </Link>
                        </li> */}
                        
                        <li className="LienNav">
                            <Link to="/top-games" > Les jeux les plus populaires </Link>
                        </li>

                        <li className="discover">
                            <Link to="/top-games" > <img className="discover" alt='onglet top games' width="25px" src={list} /> </Link>
                        </li>
    
                        <li className="LienNav">
                            <Link to="/top-streams" > Les streamers en top tendances </Link>
                        </li>

                        <li className="discover">
                            <Link to="/top-streams" > <img className="discover" alt='onglet top streams' width="25px" src={live} /> </Link>
                        </li>
    
    
                        <li className="search" style={{width: "100%" ,textAlign: "center"}}>
                            <form className="formSubmit" onSubmit={handleSubmit}>
                            <Input
                                placeholder="Cherchez un streamer.."
                                
                                required value={this.state.searchInput} onChange={(e) => handleKeyPress(e)} type="text" className="inputRecherche"
                                style={{background: "white", padding: '5px'}}
                                inputProps={{
                                'aria-label': 'description',
                                }}/>
                                {/* <input required value={this.state.searchInput} onChange={(e) => handleKeyPress(e)} type="text" className="inputRecherche"/> */}
    
                                <Link
                                className="lien"
                                    to={{
                                        pathname: `/search/${this.state.searchInput}`
                                    }}>
                                    <button style={{padding:"0",position: "absolute", }} type="submit">
                                    <img style={{padding:"7px", width:'14px'}} src={Search} alt="icone loupe" className="logoLoupe"/>
                                    </button>
                                </Link>
                            </form>
                        </li>
    
                    </ul>
                </nav>
    
            </React.Fragment>
        )
    }
 
}
