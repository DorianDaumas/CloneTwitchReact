import React, { useState, useEffect } from 'react'
import ReactTwitchVideo from 'react-twitch-embed-video'
import {useParams} from 'react-router-dom'
import api from '../../Api'
import './live.css'

export default function Live() {
    let {slug} = useParams();

    const [infoStream, setInfoStream ] = useState([])
    
    const [infoGame, setInfoGame ] = useState([])

    useEffect( () => {
        
        const fetchData = async () => {
            
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)

            let gameID = result.data.data.map(gameId => {
                return gameId.game_id;
            })
            

            const resultGameID = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`)

            let GameNames = resultGameID.data.data.map(gameName => {
                return gameName.name;
            })            

            setInfoGame(GameNames)
            setInfoStream(result.data.data[0])
        }

        fetchData()
    }, [])

    
   
    return (

        
        
        <React.Fragment>
                <div className="Live" style={{width: "100%"}}>
                    <ReactTwitchVideo height="745px" width="100%" channel={slug} ></ReactTwitchVideo>
                    <div className="ProfilLive">
                        <p> {infoStream.title}</p>
                        <p style={{color: "red", fontSize: "1em"}}><span className="dot"></span>{infoStream.viewer_count } Spectateurs</p>
                        <p>{infoGame}</p>
                    </div>                   
                </div>
        </React.Fragment>
    )
}


