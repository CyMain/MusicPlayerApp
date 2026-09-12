import { useState } from 'react';
import './App.css'
import QueueView from './QueueView/QueueView';
import Navbar from './Navbar';


const App = ()=>{
  //Handles user data and page control.
  //I was too lazy, and felt it was unnecessary to make a PageController Component.


  const userData = {
    user_name:"Guest",
  }

  const [currPage, setCurrPage] = useState("playlist")

  let content = <></>
  if (currPage == "home"){
    content = <HomePage/>
  } else if (currPage == "playlist"){
    content = <QueueView/>
  }
  else if(currPage == " profile"){
    content = <ProfilePage/>
  }

  
  return (
    <>
      <Navbar/>
      {content}
    </>
  )
}

export default App;