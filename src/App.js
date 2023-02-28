import './App.css';
import Card from './components/Card.js'
import Header from './components/Header';
import React from 'react';

function App() {

  const [realDataArray, setRealDataArray] = React.useState([])

  const [isActiveCard1, setIsActiveCard1] = React.useState(true)
  const [isActiveCard2, setIsActiveCard2] = React.useState(false)

  const [r1, setr1] = React.useState(Math.floor(Math.random() * 50));
  const [r2, setr2] = React.useState(Math.floor(Math.random() * 50));

  const [answer, setAnswer] = React.useState('')
  const [userAnswer, setUserAnswer] = React.useState('')
  


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


  function handleButtonClick(){ 
    setAnswer(compare(realDataArray[r1], realDataArray[r2]))
    if(isActiveCard1){
      setUserAnswer(realDataArray[r1].name)
    }
    else{
      setUserAnswer(realDataArray[r2].name)
    } 
  }


  //Function calling
  console.log(realDataArray)

  if(realDataArray.length<100){
    return (
    <p>Loading...</p>
    )
  }
  else{

    function handleCardClick(index) {
      if (index === 0) {
        setIsActiveCard1(current => !current);
        setIsActiveCard2(current => !current)
        
      } else {
        setIsActiveCard2(current => !current);
        setIsActiveCard1(current => !current)
        
      }
    }

    return (
      <div className="App">
        <Header />
        <div className='main'>
          <div className='card-container'>
            <Card 
            className = {isActiveCard1?'selected-card':'card'}
            name = {realDataArray[r1].name}
            img = {realDataArray[r1].image}
            onclick={() => handleCardClick(0)}
            />
            <Card 
            className = {isActiveCard2?'selected-card':'card'} 
            name = {realDataArray[r2].name}
            img = {realDataArray[r2].image}
            onclick={() => handleCardClick(1)}
            />
          </div>
          <div className='btn-container'>
            <button className='btn'
            onClick = {handleButtonClick}
            >Check!</button>
          </div>
          {answer && <p className={userAnswer==answer?`answer`:`wronganswer`}>{userAnswer==answer?`Yes, correct!`:`No, wrong!`}</p>}
          {console.log({userAnswer, answer})}
        </div>  
      </div>
    );
  }
}


export default App;