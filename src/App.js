import './App.css';
import Card from './components/Card.js'
import Header from './components/Header';
import React from 'react';

function App() {

  const [realDataArray, setRealDataArray] = React.useState([])
 
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  function createDataObjectArray(data){

    let dataObjectArray = []

    for (let index = 0; index < 25; index++) {
      dataObjectArray = [...dataObjectArray, {
        name: data.data[index].name,
        image: data.data[index].images.jpg.image_url,
        favorites: data.data[index].favorites
      }] 
    }
    return dataObjectArray
  }

  React.useEffect(()=>{
      const getData = async()=>{
      for (let index = 1; index < 5; index++) {
        const url = `https://api.jikan.moe/v4/top/characters?page=${index}`  
        const response = await fetch(url)
        const data = await response.json()
        const objdata = createDataObjectArray(data)
        setRealDataArray((prevData) => [...prevData, ...objdata])
      }
    }
    getData()
  },[])

  let r1 = Math.floor(Math.random() * 50)
  let r2 = Math.floor(Math.random() * 50)

  shuffleArray(realDataArray)
  console.log(realDataArray)

  return (
    <div className="App">
      <Header />
      <div className='main'>
        <div className='card-container'>
          <Card 
          />
          <Card />
        </div>
        <div className='btn-container'>
          <button className='btn'>Hello</button>
          <button className='btn'>World</button>
        </div>
      </div>  
    </div>
  );
}

export default App;
