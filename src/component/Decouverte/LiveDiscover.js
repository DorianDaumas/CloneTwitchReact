import React, { Component } from 'react'
import api from '../../Api'
import ReactTwitchVideo from 'react-twitch-embed-video'
import './decouverte.css'

export default class LiveDiscover extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          LiveStream: [],
          Login: [],
          ImgUrl: "",
          GameName: ""
        };
    }

    componentDidMount(){
        api.get(`https://api.twitch.tv/helix/streams?language=fr&first=1`).then(response => {
            let getLive = response.data.data.slice(0,1)
            getLive.map(check => {
            return this.setState({LiveStream: check})

            })
            
            let idUser = this.state.LiveStream.user_id
            api.get(`https://api.twitch.tv/helix/users?id=${idUser}`).then(response => {
                let LoginUsers = response.data.data                
                LoginUsers.map(check => {
                    return this.setState({Login: check.login,ImgUrl: check.profile_image_url})
                })    
            })

            const IdGame = this.state.LiveStream.game_id
            api.get(`https://api.twitch.tv/helix/games?id=${IdGame}`).then(response => {
                let GameName = response.data.data
                GameName.map(name => {
                    return this.setState({GameName: name.name})
        
                    })
                
            })
                

        })

        
        
    }


    render() {
    
        const Login = this.state.Login
        const ImgUrl = this.state.ImgUrl
        const data = this.state.LiveStream
        const GamenName = this.state.GameName
        console.log(GamenName);
        

   
        return (
            <React.Fragment>
                <div className="Resize" >
                    <div className="displayLive" style={{width: "100%"}}>
                        <ReactTwitchVideo
                        autoplay
                        channel="talk2megooseman"
                        height="480"
                        layout="video"
                        muted={false}
                        className="plaervideoT"
                        targetClass="twitch-embed" width="100%" channel={ Login ? Login : ""} ></ReactTwitchVideo>
                        { data.length !== 0 ?       
                        <div className="ProfilLiveInfo">
                            <div className="InfoProfilLive">
                                    <div style={{display:"flex", margin: "10px auto", fontSize: "x-large"}}>
                                    <img className="SizeStreamImgLive" alt='imageStreamers' src={ImgUrl.length !== 0 ? ImgUrl : "https://via.placeholder.com/150/1f1f23/1f1f23?Text="} />

                                        <div style={{margin: "auto"}}>
                                            <p className="Login" >{Login}</p>
                                            <p className="Elipsis">{GamenName}</p>
                                        </div>
                                        
                                        <p className='ElipsisDiscover' style={{fontSize: "medium"}}> {data.title}</p>
                                        <p className='Spec' style={{color: "red", fontSize: "1em", width: "22%!important" }}><span className="dot"></span>{data.viewer_count.toLocaleString()} Spectateurs</p>
                                    </div>
                            </div>
                            {/* <div className='ProfilLiveInfo'>
                            </div> */}
                        </div>   
                        :<div className="NotLoad"></div>}                
                    </div>
                </div>
                     
            </React.Fragment>
        )
    }
}
