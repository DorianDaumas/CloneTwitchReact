import React, { Component } from 'react'
import '../topStream/topstreams.css'
import api from '../../Api'
import {Link} from 'react-router-dom'
import Carousel from 'react-elastic-carousel';

export default class TopStreams extends Component {
    constructor(props){
        super(props)
        this.state = { 
            dataUser: [],
            dataGame: [],
            dataChannels: [],
        };
 
    }


    componentDidMount(){

        let refresh = () => {

        api.get(`https://api.twitch.tv/helix/streams?`)
            .then(response => {
                let data = response.data.data;
                this.setState({dataChannels: data})
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
    }, 12000)
    refresh()
    }

   
    

    render() {
            
        let dataChannels = this.state.dataChannels.slice(0,12);
        let dataGame = this.state.dataGame;
        let dataUser = this.state.dataUser;        
        for(var position=dataGame.length-1; position>=1; position--){
	
            //hasard reçoit un nombre entier aléatoire entre 0 et position
            var hasard=Math.floor(Math.random()*(position+1));
            
            //Echange
            var sauve=dataGame[position];
            dataGame[position]=dataGame[hasard];
            dataGame[hasard]=sauve;
        
        }
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



        const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 }
          ];

        return (
            <React.Fragment>
                <div className="DisplayChannels">
                    <h4 className='TitleGame'>Streamers recommandés</h4>

                    <div className="ListChannels">
                    <Carousel breakPoints={breakPoints}>
                        {
                            dataChannels.map((data,index) => {
                                if(data.thumbnail_urls.length === 0){
                                    return  (
                                        <div key={index} id="">
                                        <div id=""></div>
                                      </div>
  
                                    
                                    )}else{
                                        return  (
                                            <div className="BackgroundCardStreamDiscover" key={index}>
                                                <Link className="Lien" to={{
                                                    pathname: `/live/${data.login}`
                                                }}>
                                                <img width='100%' className="ImgGame" alt='imageJeux' src={ data.thumbnail_urls } />
                                                <p style={{textAlign: "center", color: "black", height: "12px", cursor: ""}}>{data.user_name}</p>
                                                <p style={{textAlign: "center", color: "black", cursor: ""}}>{data.viewer_count.toLocaleString()} spectateurs</p>
                                                
                                                    <button className="btn">Regarder </button>  
                                                </Link>
                                                
                                            </div>
                                        
                                    )}
                            })
                        }
                    </Carousel>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
