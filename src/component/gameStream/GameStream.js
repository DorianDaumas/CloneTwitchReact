import React, { Component } from 'react'
import api from '../../Api'
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";
import "./gamestream.css"

class GameStream extends Component {
    constructor(props){
        super(props)
        this.state = {
            streamData: [],
            Viewer: "",
            dataUser: [],
            idCurrentGame: ""
        }
    }

    componentDidMount(){
        let refresh = () => {
            
        const GameName = this.props.match.params.slug
        
        api.get(`https://api.twitch.tv/helix/games?name=${GameName}`).then(response => {
            let dataID = response.data.data
            dataID.map(id => {
                let idGames = id.id
                this.setState({idCurrentGame: idGames})
            }) 
            let idgame = this.state.idCurrentGame

        
            api.get(`https://api.twitch.tv/helix/streams?game_id=${idgame}`).then(response => {
                let dataGames = response.data.data;           
                dataGames.map(stream => {
                    
                    let NexUrlImg = stream.thumbnail_url
                                        .replace("{width}", "320")
                                        .replace("{height}", "180")
                                        stream.thumbnail_url = NexUrlImg;
                return stream
                });
    
                let totalViewers = dataGames.reduce((acc, val) => {
                    return acc + val.viewer_count
                }, 0)
                this.setState({Viewer: totalViewers})            
    
                let userIDs = dataGames.map(stream =>{
                    return stream.user_id
                })
    
                let BaseURlUsers = "https://api.twitch.tv/helix/users?"
                
                let queryParamasUsers = "";
    
                userIDs.map(id => {
                    return(queryParamasUsers = queryParamasUsers + `id=${id}&`)
                })
    
                let final = BaseURlUsers + queryParamasUsers;
                
                api.get(final).then(response => {  
                let dataUser = response.data.data;
                this.setState({dataUser: dataUser})  
                let userLogin = this.state.dataUser
                let finalData = dataGames.map(stream => {
                    stream.login = ""
                    userLogin.forEach(login => {
                        if(stream.user_id === login.id) {
                            stream.login = login.login
                 
                        }
                    });
                    return stream
                })
               
                this.setState({streamData: finalData})
                })})})}
        setInterval( () => {
            refresh()
        }, 5000)
        refresh()

    }

    render() {
        
        const streamData = this.state.streamData
        const viewerCount = this.state.Viewer
        const GameName = this.props.match.params.slug
        
        return (
            <React.Fragment>
            <div className="DisplayGame">
            <h4 className='TitleGame'>Les Streamers qui joue à : {GameName} </h4>
                                            <p style={{color: "black", textAlign: "center"}}>viewer general: {viewerCount.toLocaleString()}</p>
                { streamData.length !== 0 ? 
                    <div>
                        
                        <div className="ListGame">
                            {
                                streamData.map( (data,index) => {
                                    return (
                                        <div key={index}>
                                            
                                            <div  className="BackgroundCardGameStream" >
                                                <img className="ImgGame" alt='gameImg' src={data.thumbnail_url} />
                                                    <p style={{textAlign: "center", color: "black", height: "12px", cursor: ""}}>{data.login }</p>
                                                    <p style={{textAlign: "center", color: "black", cursor: ""}}>{data.viewer_count.toLocaleString() } Spectateurs</p>
                                                    <Link className="Lien"
                                                    to={{
                                                        pathname: "/live/" + data.login,
                                                    }}>
                                                        <button className="btn">Regarder<br/> {data.user_name} </button>
                                                    </Link>
                                            </div>
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

export default withRouter(GameStream);
