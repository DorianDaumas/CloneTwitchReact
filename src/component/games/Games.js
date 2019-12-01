import React, { Component } from 'react'
import api from '../../Api';
import './game.css'
import { Link } from 'react-router-dom';

export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            games: [] 
        };
    }
    
    componentDidMount(){
        let refresh = () => {  
        api.get('https://api.twitch.tv/helix/games/top')
        .then(response => {
            let dataGames = response.data.data;           
            let finalGames = dataGames.map(game => {
                let NexUrlImg = game.box_art_url
                .replace("{width}", "200")
                .replace("{height}", "250")
                game.box_art_url = NexUrlImg
                return game
            });
            this.setState({games : finalGames})
        })
    }
    setInterval( () => {
        refresh()
}, 12000)
refresh()
    }

    render() {

    const Games = this.state.games
        
        return (
            <React.Fragment>
                <div className="DisplayGame">
                <h1 className='TitleGame'>Les jeux en Top tendances</h1>
                    { Games.length !== 0 ? 
                        <div>
                            
                            <div className="ListGame">
                                {
                                    Games.map( (game,index) => {
                                        return (
                                            
                                            <div className="BackgroundCard" key={index}>
                                                <Link className="Lien"
                                                to={{
                                                    pathname: "game/" + game.name,
                                                    state: {
                                                        gameID: game.id,
                                                        gameName: game.name
                                                    },
                                                }}>
                                                <img className="ImgGame" alt='gameImg' src={game.box_art_url} />
                                                <p style={{textAlign: "center", color: "black", height: "42px", cursor: ""}}>{game.name}</p>
                                                
                                                    <button className="btn">Regarder<br/> {game.name} </button>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : 
                        <div className="NotLoad"></div>
                    }                  
                </div>
                
            </React.Fragment>       
        )
    }
}
