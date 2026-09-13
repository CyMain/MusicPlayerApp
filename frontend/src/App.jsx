import { useState } from 'react';
import './App.css'
import QueueView from './Pages/QueueView/QueueView';
import Navbar from './components/Navbar/Navbar';


const App = ()=>{
  //Handles user data and page control.
  //I was too lazy, and felt it was unnecessary to make a PageController Component.


  const userData = {
    user_name:"Guest",
  }

  const [currPage, setCurrPage] = useState("playlist")


  const pageController = {
    currPage:currPage,
    setCurrPage:setCurrPage
  }


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
      <main>
        <Navbar pageController={pageController}/>
        {content}
      </main>
    </>
  )
}

export default App;