import React, { Component } from 'react'
import api from '../../Api';
import '../games/game.css'
import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';

export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            games: [],
            IdGames: [],
            Viewer: null 
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
}, 20000)
refresh()
    }

    render() {

    const Games = this.state.games
    for(var position=Games.length-1; position>=1; position--){
        var hasard=Math.floor(Math.random()*(position+1));
        var sauve=Games[position];
        Games[position]=Games[hasard];
        Games[hasard]=sauve;
    
    }
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];
        return (
            <React.Fragment>
                <div className="DisplayGame">
                <h1 className='TitleGame'>Catégories recommandées</h1>
                    { Games.length !== 0 ? 
                        <div>
                            
                            <div className="ListGame">
                            <Carousel breakPoints={breakPoints}>
        
      
                                {
                                    Games.map( (game,index) => {
                                        return (
                                            
                                            <div className="BackgroundCardStreamDiscover" key={index}>
                                                <Link className="Lien"
                                                to={{
                                                    pathname: "game/" + game.name,
                                                    state: {
                                                        gameID: game.id,
                                                        gameName: game.name
                                                    },
                                                }}>
                                                <img className="ImgGame" alt='gameImg' src={game.box_art_url} />
                                                <p className="Elipsis" style={{textAlign: "center", color: "black", height: "42px",width: "180px", cursor: ""}}>{game.name}</p>
                                                
                                                    <button className="btn">Regarder<br/> {game.name} </button>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                </Carousel>
                            </div>
                        </div> : 
                        <div className="NotLoad"></div>
                    }                  
                </div>
                
            </React.Fragment>       
        )
    }
}
