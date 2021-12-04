import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';
import {useState,useEffect} from 'react'; 
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';
function App() {
  const [latest,setLatest]=useState([]);
  const[results,setResults]=useState([]);
  useEffect(() => {
   axios
    .all([
    axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
    axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
    ])
    .then(resArray=>{
      setLatest(resArray[0].data);
      setResults(resArray[1].data);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [])
  const date=new Date(parseInt(latest.updated));
  const lastUpdated=date.toString();
  const [searchCountry,setSearchCountry]=useState("");
  const filterCountry=results.filter(item=>{
    return searchCountry !==""
     ? item.country.toLowerCase().includes(searchCountry.toLowerCase())
     :item;
  });
  const countries=filterCountry.map((data,i)=>{
    // console.log(data)
    return(
      <Card bg="light"
      key={i}
      text="dark" style={{width:"70%",marginLeft:"100px",marginTop:"10px",marginBottom:"10px"}}>
        <Card.Img variant="top" src={data.countryInfo.flag}/>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's Cases {data.todayCases}</Card.Text>
          <Card.Text>Today's Deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Today Recovered {data.todayRecovered}</Card.Text>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div className="App">
      <h1>Covid 19 Live Stats</h1>
      <CardGroup style={{marginLeft:"150px",width:"80%"}}>
  <Card bg='secondary' text="white" style={{marginLeft:"20px"}}>
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
        {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card text="white" bg="danger" style={{marginLeft:"20px"}}>
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
        {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" style={{marginLeft:"20px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
        {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
</CardGroup><Form style={{marginTop:"20px",marginLeft:"100px", width:"90%"}}>
  <Form.Group className="mb-3" controlId="formGroupSearch">
    <Form.Control 
    onChange={e=>setSearchCountry(e.target.value)}
    type="text" placeholder="Search a country" />
  </Form.Group>
</Form>
<Columns >
  {countries}
  </Columns>
    </div>
  );
}

export default App;
