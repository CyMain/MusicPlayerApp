import { useState } from 'react';
import './App.css'
//Page Imports
import QueueView from './Pages/QueueView/QueueView';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import HomePage from './Pages/HomePage/HomePage';
//Component Imports
import Navbar from './components/Navbar/Navbar';

//Context Imports
import { SongsProvider } from './Contexts/SongsContextFile';



const App = ()=>{
  //Handles user data and page control.
  //I was too lazy, and felt it was unnecessary to make a PageController Component.


  const userData = {
    user_name:"Guest",
  }

  const [currPage, setCurrPage] = useState("home")


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
  else if(currPage == "profile"){
    content = <ProfilePage/>
  }

  
  return (
    <>
      <SongsProvider>
        <main>
          <Navbar pageController={pageController}/>
          {content}
        </main>
      </SongsProvider>
    </>
  )
}

export default App;