import React, { Component } from 'react'
import './sidebar.css'
import liveLogo from './live-streaming.svg'
import api from '../../Api';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

export default class sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataUser: [],
            dataGame: [],
            dataStream: [],
        };
    }

    componentDidMount(){
        let refresh = () => {                
            api.get('https://api.twitch.tv/helix/streams?')
                .then(response => {
                    let data = response.data.data;
                    this.setState({dataStream: data})
                    let GameId =  data.map(stream => {
                        return stream.game_id
                    })
                    let UserId =  data.map(stream => {
                        return stream.user_id
                    })
                    
                    let BaseURlGames = "https://api.twitch.tv/helix/games?"
                    let BaseURlUsers = "https://api.twitch.tv/helix/users?"
                    
                    let queryParamasGame = "";
                    let queryParamasUser = "";
    
                    GameId.map(id => {
                        return(queryParamasGame = queryParamasGame + `id=${id}&`)
                    })
    
                    UserId.map(id => {
                        return(queryParamasUser = queryParamasUser + `id=${id}&`)
                    })
    
                    let urlFinalGames = BaseURlGames + queryParamasGame;
                    let urlFinalUsers = BaseURlUsers + queryParamasUser;
                     
                    api.get(urlFinalGames).then(response => {
                        let dataGame = response.data.data
                        this.setState({dataGame: dataGame})                    
                    })
                    api.get(urlFinalUsers).then(response => {  
                        let dataUser = response.data.data;
                        this.setState({dataUser: dataUser})    
                    })    
            })
           
        }
        setInterval( () => {
            refresh()
    }, 10000)
        refresh()
    }

    render() {
        
        let dataStream = this.state.dataStream.slice(0,6);
        let dataGame = this.state.dataGame;
        let dataUser = this.state.dataUser;        

        dataStream.map(stream => {
            
            stream.gameName = ""
            stream.truePic = ""
            stream.login = ""
            stream.viewCount = ""
            stream.description = ""
            
            dataGame.forEach(name => {
                dataUser.forEach(user => {
                    if(stream.user_id === user.id && stream.game_id === name.id) {
                        stream.truePic = user.profile_image_url;
                        stream.gameName = name.name;
                        stream.login = user.login;
                        stream.viewCount = user.view_count;
                        stream.description = user.description;
                    }
                })
            })
        
                
        })      
         
         
         const styles = {
            tooltip: {
              color: "lightblue",
              backgroundColor: "green"
            }
          };
          
        return (
            <React.Fragment>
                <div className="Sidebar">
                    <div className="fiXed">
                        <div className="Respons">
                            <h4>Chaines recommandées</h4>
                            <div className="Placement">
                                {
                                    dataStream.map((data,index) => {
                                        return  (
                                            <Link key={index} className="Lien" to={{
                                                pathname: `/live/${data.login}`
                                            }}>
                                            <div  className="Profil">
                                                <div className="Float">
                                                    
                                                    <img className="SizeStreamImg" alt='imageStreamers' src={data.truePic.length !== 0 ? data.truePic : "https://via.placeholder.com/150/1f1f23/1f1f23?Text="} />
                                                    <div className="InfoProfil">
                                                        <p className="Elipsis" >{data.login}</p>
                                                        <p className="Elipsis">{data.gameName}</p>
                                                    </div>
                                                    <div className="ViewCount">
                                                        <p style={{display: "flex"}}><span className="dot"></span>{data.viewer_count.toLocaleString() }</p>                                                    
                                                    </div>

                                                </div>
                                                
                                            </div>
                                            </Link>
                                    )})
                                }
                            </div>
                        </div>
                        <div className="CenterMobile">
                            <img width="35px" alt='logoLive' src={liveLogo} />
                            <div className="SizeStreamImg">
                                {
                                    dataStream.map((data,index) => {
                                        const profil = 
                                         <div className="ProfilTooltip">
                                            <p className="ElipsisTooltip" style={{fontSize: "1.4em", fontWeight: "bold"}}>{data.login} - {data.gameName}</p>
                                            <br/>
                                            <p className="ElipsisTooltip" >{data.title } </p>
                                            <br/>
                                            <p style={{display: "flex"}}><span className="dot"></span>Direct | {data.viewer_count.toLocaleString() } Spectateurs</p>
                                        </div>
                                            
                                        
                                    return( 
                                        <Tooltip key={index} 
                                                 title={profil}
                                                 placement="left" 
                                                 arrow>
                                                    <Link key={index} className="Lien" to={{
                                                        pathname: `/live/${data.login}`
                                                    }}>
                                                 <img  alt='imageStreamers' src={data.truePic.length !== 0 ? data.truePic : "https://via.placeholder.com/150/1f1f23/1f1f23?Text="} />
                                                 </Link>
                                        </Tooltip>
                                    )})
                                }
                            </div>
                            
                        </div>
                            
                    </div>
                </div>
            </React.Fragment>
        )
    }
}