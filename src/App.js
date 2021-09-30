import TopBar from "./components/TopBar"
import MenuOptions from "./components/MenuOptions";
import PlayButton from "./components/PlayButton";
import GamePlayInfo from "./components/GamePlayInfo";
import EndButton from "./components/EndButton";
import QuestionInterface from "./components/QuestionInterface";
import Footer from "./components/Footer";
import Sound from 'react-sound';
import myD from './sounds/4 final mid game.mp3';

import { useState, useEffect } from "react";

const App = () => {

    const settingsFromBackUp = window.localStorage.getItem('settings');
    const settingData = JSON.parse(settingsFromBackUp);
   
    const [onSound, setOnSound] = useState(settingsFromBackUp ? settingData.onSound : true);
    const [gameCat, setGameCat] = useState(settingsFromBackUp ? settingData.gameCat : 'generalknowledge');
    const [gameLevel, setGameLevel] = useState(settingsFromBackUp ? settingData.gameLevel : 'easy');
    const [displayMenu, setDisplayMenu] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [repeat, setRepeat] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [questionArray, setQuestionArray] = useState([{question: 'hello', options: ['Home'], answer: 'ok'}]);
    const [gameTime, setGameTime] = useState(30);
    const [timeLeft, setTimeLeft] = useState(gameTime);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [passed, setPassed] = useState('no');
    const [score, setScore] = useState(0);
    const [attemps, setAttempts] = useState(6);


    

    



  

    
    // Menu Bar Actions
    
    const handleMenuClick = ()=>{
        setDisplayMenu(!displayMenu);
    }

    
    // Update Category Chosen by the user

    const updateCategory = (chosenCat)=>{
        setGameCat(chosenCat)
    }
    
    //Update Game Level set by the user
    
    const updateLevel = (level)=>{
        setGameLevel(level)
        // handleTimer(timerValue)
    }
    

    
    //Handle Sound ON/OFF
      const toggleOnSound = (resp)=>{
          setOnSound(resp)

        if(onSound){
            setIsPlaying(!isPlaying)

        }else if(!onSound && !isPlaying) {
            setIsPlaying(!isPlaying)
        }
    }
    
    
    
    //Play Actions
    
    const questionsFetched = window.localStorage.getItem(`${gameCat}-${gameLevel}`);
    if(!questionsFetched){

        let id = 9;
        
        switch(gameCat){
            case 'books':
                id = 10;
                break;

            case 'comics':
                id = 29;
                break;

            case 'computers':
                id = 18;
                break;

            case 'geography':
                id = 22;
                break;

            case 'mathematics':
                id = 19;
                break;
            
            case 'television':
                id = 14;
                break;

            case 'videogames':
                id = 15;
                break;

            case 'generalknowledge':
                id = 9;
                break;
        }

       console.log('Current ID', id)
        
      
        const fetchQuestions = async ()=>{
          
            const response = await fetch(`https://opentdb.com/api.php?amount=50&category=${id}&difficulty=${gameLevel}&type=multiple`);

            const data = await response.json();
            const questions = data.results;
            const k = [];
            for(let q of questions){
                let {question, incorrect_answers, correct_answer } = q;
                const i = Math.floor(Math.random()*3);
                incorrect_answers.splice(i, 0, correct_answer);
                let arr = [...incorrect_answers];

                for(let i=arr.length-1; i > 0; i--){
                     const p = Math.floor(Math.random()*i);
                    [arr[p], arr[i]] = [arr[i], arr[p]];

                }
                
                incorrect_answers.sort((a, b)=> 0.5 - Math.random());
                k.push({question, options: [...arr] , answer: correct_answer});
            }

            window.localStorage.setItem(`${gameCat}-${gameLevel}`, JSON.stringify(k));
            
         }
        fetchQuestions();
            

       
        
    }
    
    
    const play = ()=>{
        //Check if we already have the questions downloaded and stored locally
        // let sortedQuest = [...questionArray]
        // sortedQuest[currentIndex].options.sort((a, b)=> 0.5 - Math.random());
        setQuestionArray(JSON.parse(window.localStorage.getItem(`${gameCat}-${gameLevel}`)).length != 0 ? JSON.parse(window.localStorage.getItem(`${gameCat}-${gameLevel}`)).sort((a, b)=> 0.5 - Math.random()) : JSON.parse(window.localStorage.getItem(`generalknowledge-${gameLevel}`)).sort((a, b)=> 0.5 - Math.random()));
       
        setPassed('no')
        setScore(0)
        setAttempts(6)
        setGameStarted(true);
        const startPlay = ()=>{
            
            if(questionsFetched !== null){
                setTimeLeft(gameTime)
                if(onSound){
                    setIsPlaying(true)
                 }
                
            }
        }
        setTimeout(startPlay, 500)
        setScore(0)
         
    }
    
    

    const checkAnswer = (option)=>{
        if(questionArray[currentIndex].answer === option){
            setPassed('true')
            setScore(score+1)
            setTimeout(onNextClick, 500)
        }else{
            setPassed('false')
            setTimeLeft(0);
            setAttempts(attemps-1)


        }   
    }

    //Handle Next Button Click

    const onNextClick = ()=>{
        if(attemps > 0){

            setPassed('no')
            setTimeLeft(gameTime);
            setCurrentIndex(currentIndex+1);
        }

        
    }


    // Handle End Button Click

    const onEndClick = ()=>{
        setGameStarted(!gameStarted)
        setTimeLeft(0);
        setCurrentIndex(0);
        
        

       
        
    }
    
  
    
    //Update Game settings

    useEffect(()=>{
        //Backup user's settings
        const settings = { gameCat, gameLevel,onSound };
        const userSettings = JSON.stringify(settings)
        window.localStorage.setItem('settings', userSettings)

    //Simulate A CountDown Timer
   

    if(timeLeft > 0 && gameStarted && passed === 'no'){
       setTimeout(()=>setTimeLeft(timeLeft-1), 1000); 
    }else {
       
        setTimeLeft(0);
    }
    
    
    if(timeLeft <=0 && passed==='no'){
        setAttempts(attemps-1)
    }

    }, [gameCat, gameLevel, onSound,timeLeft, gameStarted])
    
   

    //Rendering Zone

    return (
        <>  
            <TopBar onclick={handleMenuClick} displayMenu={displayMenu} gameStarted={gameStarted}/>
            <MenuOptions  displayMenu={displayMenu}  toggleOnSound={toggleOnSound}  onSound={onSound} play={play} updateCategory={updateCategory} updateLevel={updateLevel} gameLevel={gameLevel}gameCat={gameCat} />
            <PlayButton play={play} displayMenu={displayMenu} gameStarted={gameStarted}/>
            <GamePlayInfo attemps={attemps} score={score} gameStarted={gameStarted} timeLeft={timeLeft}/>
            <Sound playStatus={isPlaying && onSound ? Sound.status.PLAYING : Sound.status.STOPPED}  url={myD} loop={true} volume={gameStarted ? 45 : displayMenu ? 15: 25} playbackRate={gameStarted ? 0.8 : displayMenu ? 0.51 : 0.58 } autoLoad={true}/>
           <EndButton gameStarted={gameStarted} handleClick={onEndClick}/>
           <QuestionInterface attemps={attemps} passed={passed} currentIndex={currentIndex} questionArray={questionArray} checkAnswer={checkAnswer} gameStarted={gameStarted} timeLeft={timeLeft} onNextClick={onNextClick}/>
           <Footer />
        </>
    )
}

export default App
