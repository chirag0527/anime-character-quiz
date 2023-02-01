import './App.css';
import Card from './components/Card.js'
import Header from './components/Header';
import React from 'react';

function App() {

  const [realDataArray, setRealDataArray] = React.useState([])

  const [isActiveCard1, setIsActiveCard1] = React.useState(false)
  const [isActiveCard2, setIsActiveCard2] = React.useState(false)


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

  function compare(obj1, obj2){
    if(obj1.favorites>obj2.favorites){
      return obj1.name
    }
    else{
      return obj2.name
    }
  }

  function handleCardClick(e){
    setIsActiveCard1(current => !current);
    setIsActiveCard2(current => !current);
  }


  function temp(){
    console.log('clicked')
  }

  //Function calling
  shuffleArray(realDataArray)
  console.log(realDataArray)

  if(realDataArray.length<100){
    return (
    <p>Loading...</p>
    )
  }
  else{

    let r1 = Math.floor(Math.random() * 50)
    let r2 = Math.floor(Math.random() * 50)

    let answer = compare(realDataArray[r1], realDataArray[r2])

    return (
      <div className="App">
        <Header />
        <div className='main'>
          <div className='card-container'>
            <Card 
            className = {isActiveCard2?'selected-card':''}
            name = {realDataArray[r1].name}
            img = {realDataArray[r1].image}
            onclick={handleCardClick}
            />
            <Card 
            className = {isActiveCard2?'selected-card':''}
            name = {realDataArray[r2].name}
            img = {realDataArray[r2].image}
            onclick={handleCardClick}
            />
          </div>
          <div className='btn-container'>
            <button className='btn'
            
            >Check!</button>
          </div>
          <p className='answer'>{answer}</p>
        </div>  
      </div>
    );
  }

  
}

export default App;
