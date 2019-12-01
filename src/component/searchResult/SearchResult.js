import React, { Component } from 'react'
import api from '../../Api'
import {Link} from 'react-router-dom'
import './searchResult.css'
import ErrorResult from "../ErrorResult"

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            infoSearchStreame: [],
            CheckIfOnline: null
        };
    }
    componentDidMount(){
        let login = this.props.match.params.slug;
        let cleanSearch = login.replace(/ /g,'');
        
        api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`).then(response => {
            this.setState({infoSearchStreame: response.data.data}) 
        })
        api.get(`https://api.twitch.tv/helix/streams?user_login=${cleanSearch}`).then(response => {
            let checkIfOnline = response.data.data
            checkIfOnline.map(check => {
                this.setState({CheckIfOnline: check.type})
            })
        })
        
    }


    render() {
    
        let ResultStream = this.state.infoSearchStreame
        console.log(ResultStream);
        
        const styleBackground = {
            textAlign: "center",
            height: "93vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }
         
        if(ResultStream.length > 0){            
            return (
                <React.Fragment>
                    {
                        ResultStream.map((results, index) => {                               
                            if(this.state.CheckIfOnline === null){
                                return <div key={index} style={styleBackground}>
                                            <p style={{color: "black"}}>On dirait que {results.login},</p>
                                            <p style={{color: "black"}}>n'est pas connecté.</p>
                                        </div>
                            }else{
                                return (
                                    <div key={index} className="DisplayGame" style={{height: "93.3vh"}}>
                                    <h1 className='TitleGame'></h1>
                                        <div>
                                            <div className="ListGame">
                                                <div style={{width: "300px!important"}} className="BackgroundCardSearch" >
                                                    <Link className="Lien"
                                                    to={{
                                                        pathname: "/live/" + results.login,
                                                        state: {
                                                            gameID: results.id,
                                                        }
                                                    }}>
                                                    <img className="ImgGame" alt='gameImg' style={{width: "100%"}} src={results.profile_image_url} />
                                                    <p style={{textAlign: "center", color: "black", height: "42px", cursor: ""}}>{results.login}</p>
                                                    <p className="" style={{textAlign: "center", color: "black"}}>{results.description}</p>
                                                    
                                                        <button className="btn">Regarder<br/>  </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                )}
                                
                        })
                    }
                </React.Fragment>
            ) 
        } 

        else{
            return <ErrorResult />
        }
    }
}
