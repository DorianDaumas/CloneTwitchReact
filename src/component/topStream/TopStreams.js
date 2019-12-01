import React, { Component } from 'react'
import './topstreams.css'
import api from '../../Api'
import {Link} from 'react-router-dom'

export default class TopStreams extends Component {
    constructor(props){
        super(props)
        this.state = { 
            dataUser: [],
            dataGame: [],
            dataChannels: [],
            receiveProps: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        let language = event.target.value
        this.componentDidMount(language)
        event.preventDefault();
    }
    
    

    componentDidMount(language = 'fr'){
       
       
        
        api.get(`https://api.twitch.tv/helix/streams?language=${language}`)
            .then(response => {
                let data = response.data.data;
                this.setState({dataChannels: data})
                let GameId =  data.map(stream => {
                    return stream.game_id
                })
                let UserId =  data.map(stream => {
                    return stream.user_id
                })
                
                let BaseURlGames = `https://api.twitch.tv/helix/games?`
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

   
    

    render() {
       
        let dataChannels = this.state.dataChannels.slice(0,12);
        let dataGame = this.state.dataGame;
        let dataUser = this.state.dataUser;       
        dataChannels.map(stream => {
            stream.gameName = ""
            stream.truePic = ""
            stream.login = ""
            stream.viewCount = ""
            stream.description = ""
            stream.thumbnail_urls = ""
            dataGame.forEach(name => {
                dataUser.forEach(user => {
                    if(stream.user_id === user.id && stream.game_id === name.id) {
                        stream.truePic = user.profile_image_url;
                        stream.gameName = name.name;
                        stream.login = user.login;
                        stream.viewCount = user.view_count;
                        stream.description = user.description;
                        stream.thumbnail_urls = stream.thumbnail_url;                       
                        let NewUrl = stream.thumbnail_url
                        .replace('{width}', "320")
                        .replace('{height}', "180")
                        stream.thumbnail_urls = NewUrl;                        
                    }
                })
            })    
        })    

        const styleInput = {
            outline: "none", 
            border: "0", 
            background: "transparent"
        }
        
        return (
            <React.Fragment>
                <div className="DisplayChannels">
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h4 className='TitleGame'>Les Streamers top tendances en</h4>
                        <form style={{paddingTop: "22px"}} onSubmit={this.handleSubmit}>
                            <label >
                            {/* <p style={{color: "black"}}>Chaines les plus populaires en : &nbsp;</p> */}
                            <select style={styleInput}  value={this.state.value}  onChange={this.handleChange}>
                                <option style={styleInput} value="fr">France</option>
                                <option style={styleInput} value="en">Amérique</option>
                                <option style={styleInput} value="es">Espagne</option>
                                <option style={styleInput} value="zh">Chine</option>
                                <option style={styleInput} value="de">Allemagne</option>
                                <option style={styleInput} value="ru">Russie</option>
                            </select>
                            {/* <input type="submit" value="Envoyer" /> */}
                            </label>
                            
                        </form>
                    </div>
                    <div className="ListChannels">
                        {
                            dataChannels.map((data,index) => {
                                if(data.thumbnail_urls.length === 0){
                                    return  (
                                        <div key={index} id="">
                                        <div id=""></div>
                                      </div>
  
                                    
                                    )}else{
                                        return  (
                                            <div className="BackgroundCardStream" key={index}>
                                                <Link className="Lien" to={{
                                                    pathname: `/live/${data.login}`
                                                }}>
                                                <img className="ImgGame" alt='imageJeux' src={ data.thumbnail_urls } />
                                                <p style={{textAlign: "center", color: "black", height: "12px", cursor: ""}}>{data.user_name}</p>
                                                <p style={{textAlign: "center", color: "black", cursor: ""}}>{data.viewer_count.toLocaleString()} spectateurs</p>
                                                
                                                    <button className="btn">Regarder </button>  
                                                </Link>
                                                
                                            </div>
                                        
                                    )}
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
