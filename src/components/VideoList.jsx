

import React,{useState} from 'react';

import {CardGroup,Card,Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';



export default function VideoList(props) {
    

    const data = props.data;
  const [videoPlayingId,setVideoPlayingId] = useState("")



    return(
       data ?
       <div style={{border:"solid red"}}>
       <div className="container">
            {videoPlayingId &&
                <iframe
                width="560"
                    height="315"
                    src={"https://www.youtube.com/embed/"+videoPlayingId}
                    frameBorder="0" allow="accelerometer; autoplay;
                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

            </iframe>
            }
            
        </div>

        <div className="row mx-auto" style={{maxWidth:1000}}>
            {
                data.map(function(obj,index) {
                    console.log(obj+" "+ index)
                        return (
                            <div className="text-dark col-md-4" >
                            <Card  key={index}>

                            {videoPlayingId !== obj.id.videoId ? 
                            <Card.Img style={{maxHeight:250}} variant="top" src={obj.snippet.thumbnails.high.url} />
                            : <iframe
                            height="250"
                                    src={"https://www.youtube.com/embed/"+videoPlayingId}
                                    frameBorder="0" allow="accelerometer; autoplay;
                                    encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                            </iframe>
                         }

                            <Card.Header as="h5">{obj.snippet.title}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Text>
                                {false && obj.snippet.description}
                                </Card.Text>

                                {obj.id.videoId && <Button onClick={e => setVideoPlayingId(obj.id.videoId || obj.id.channelId)} variant="primary">JOUER </Button> }
                                
                            </Card.Body>
                            </Card>
                            </div>
                         
                        )
                } 
                
                    
                    
                )

            }
            
        </div>
       

            
        </div>

        : <div>Aucun resultat</div>


    )
}







