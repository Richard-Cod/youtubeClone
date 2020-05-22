import React,{useState,useEffect} from 'react';
import './App.css';

import { Form,Button,Navbar,Nav , FormControl,Spinner } from 'react-bootstrap';

import VideoList from './components/VideoList';
import logo from "./logo.JPG"
import { useBottomScrollListener } from 'react-bottom-scroll-listener';


function App() {
  const [query,setQuery]  = useState("");
  const [result,setResult]= useState([]);
  const [data,setData]= useState([]);
  const [loading,setLoading]= useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY

  console.log(API_KEY)

  const BASE_URL = "https://www.googleapis.com/youtube/v3/"
  let   search_url = `search?chart=mostPopular&q=${query}&part=snippet&key=${API_KEY}&maxResults=20`
  
  const callback = function (){
    
    if(result.length !== 0){
      const nextToken = result.nextPageToken
      const url = `${BASE_URL}${search_url}&pageToken=${nextToken}`
      setLoading(true)
      fetch(url).then(function(response) {
        if(response.ok) {
          response.json().then(function(json) {

           
          setResult(json)

            setData([...data,...json.items])
            setLoading(false)

          });
        } else {
          alert('Mauvaise réponse du réseau');
        }
      })
      
      .catch(function(error) {
        alert("Veuillez activer votre connexion internet ")
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
    }

}
useBottomScrollListener(callback);


  const updateInput = (e) => {
    //console.log(e.target.name + " " + e.target.value);
    const value = e.target.value;
    //const name =  e.target.name;
    

    value.length < 50 && setQuery(value) ;

    
  }


  const soumission =  (e) => {
    e.preventDefault()
    const myInit = { 
      method: 'GET',
    //headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

    const url = `${BASE_URL}${search_url}`
    
    setLoading(true)
    fetch(url,myInit).then(function(response) {
      if(response.ok) {
        response.json().then(function(json) {
          console.log(json)
          setResult(json)
          setData(json.items)
          setLoading(false)

        });
      } else {
        alert('Mauvaise réponse du réseau');
      }
    })
    
    .catch(function(error) {
      alert("Veuillez activer votre connexion internet ")
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });



    

  }


  return (
    <div className="App">
    <Navbar className="sticky-top" bg="light" expand="lg">
      <Navbar.Brand href="#home">
      <img
        src={logo}
        style={{maxHeight:50}}
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      Richard youtube React JS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Acceuil</Nav.Link>
        
        </Nav>
        <Form onSubmit={(e)=> soumission(e)} inline>
          <FormControl onChange={e => updateInput(e)} value={query} name="query"  type="text" placeholder="Rechercher "  className="mr-sm-2" />
          <Button type="submit" variant="outline-success">Rechercher</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>

    
   
    <p> Recherche : <span> {query} </span> </p>

  

    {result.length !==0 && <VideoList data={data} pageInfo = {result.pageInfo} />}

    {loading && <span> <Spinner animation="border" variant="primary" size="lg" /> chargement des résultats</span>}

   
    
     
    </div>
  );
}

export default App;
