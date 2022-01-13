import TopBar from "./components/TopBar"
import MenuOptions from "./components/MenuOptions";
import PlayButton from "./components/PlayButton";
import GamePlayInfo from "./components/GamePlayInfo";
import EndButton from "./components/EndButton";
import QuestionInterface from "./components/QuestionInterface";
import Footer from "./components/Footer";
import Sound from 'react-sound';
import startSound from './sounds/start game.mp3';
import midSound from './sounds/final mid game.mp3';
import failSound from './sounds/fail short.wav';
import passedSound from './sounds/click sound.wav';
import overSound from './sounds/game over.mp3';
import { useState, useEffect } from "react";

const App = () => {
    let p;
    const settingsFromBackUp = window.localStorage.getItem('settings');
    const settingData = JSON.parse(settingsFromBackUp);
   
    const [onSound, setOnSound] = useState(settingsFromBackUp ? settingData.onSound : true);
    const [gameCat, setGameCat] = useState(settingsFromBackUp ? settingData.gameCat : 'generalknowledge');
    const [gameLevel, setGameLevel] = useState(settingsFromBackUp ? settingData.gameLevel : 'easy');
    const [displayMenu, setDisplayMenu] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [questionArray, setQuestionArray] = useState([{}]);
    const [gameTime, setGameTime] = useState(10);
    const [timeLeft, setTimeLeft] = useState(gameTime);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [passed, setPassed] = useState(false);
    const [score, setScore] = useState(0);
    const [attempsLeft, setAttemptsLeft] = useState(15);
    
    
    // Menu Bar Actions
    const handleMenuClick = ()=>{
        setDisplayMenu(!displayMenu);
    }
    
    // Update Category Chosen by the user
    const updateCategory = (chosenCat)=>{
        setGameCat(chosenCat);
    }
    
    //Update Game Level set by the user
    const updateLevel = (level)=>{
        setGameLevel(level);
    }
    

    
    //Handle Sound ON/OFF
    const toggleOnSound = (resp)=>{
        setOnSound(resp);
    }
    
    const startTmer = ()=>{
       p =  setInterval(()=>{
            setTimeLeft(timeLeft => {
                if(timeLeft > 0 && passed=='undefined'){
                    return timeLeft - 1
                }else{

                    clearInterval(p)
                    return 0
                }
            })
        }, 1000)

        if(timeLeft <= 0){
            clearInterval(p)
        }
    }

    const stopTimer = ()=>{
        clearInterval(p)
    }
    
    
    
    const play = ()=>{
        let currentQuestion = JSON.parse(window.localStorage.getItem(`${gameCat}-${gameLevel}`)).sort((a, b)=>0.5 - Math.random());
        for(let q of currentQuestion){
            q.options.sort((a,b)=>0.5 - Math.random())
        }
        setPassed('undefined')
        setCurrentIndex(0)
        setQuestionArray(currentQuestion)
        setTimeLeft(gameTime)
        startTmer()
        
        setGameStarted(!gameStarted)

    }

    // Check answer

    const handleCheck = (id, target)=>{
        if(questionArray[currentIndex].answer.id === id){
            setPassed(true)
            target.style.background = 'green';
            clearInterval(p)
            stopTimer()
            setTimeout(handleNext, 500)
        }else{
            target.style.background = 'darkred'
            setPassed(false)

        }
    }
    
    
    //Handle Next Button Click
    const handleNext = ()=>{
        setPassed('undefined')
        if(currentIndex+1 < questionArray.length){
            setTimeLeft(gameTime)
            setCurrentIndex(currentIndex + 1)
        }
        startTmer()
    }

    // Handle End Button Click
    const onEndClick = ()=>{
        stopTimer()
        setGameStarted(!gameStarted)
    }
    
    
    useEffect(()=>{
        //Backup user's settings
        const settings = { gameCat, gameLevel,onSound };
        const userSettings = JSON.stringify(settings);
        window.localStorage.setItem('settings', userSettings);

        //fetch the question
        const questFromLocal = JSON.parse(window.localStorage.getItem(`${gameCat}-${gameLevel}`));

        if(!questFromLocal){
            
            let catId = 9;
            switch(gameCat){
                case 'books':
                    catId = 10;
                    break;
    
                case 'geography':
                    catId= 22;
                    break;
    
                case 'videogames':
                    catId = 15;
                    break;
    
                case 'generalknowledge':
                    catId = 9;
                    break;
                
                default:
                    catId = 9;
            }

            fetch(`https://opentdb.com/api.php?amount=50&category=${catId}&difficulty=${gameLevel}&type=multiple`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                return data.results;
            })
            .then(questions=>{
                
                const modifiedQuestions = [];
                for(let q of questions){

                let {question, incorrect_answers, correct_answer } = q;

                let options = [];
                for(let text of incorrect_answers){
                    let id = Math.floor(Math.random()*Date.now());

                    let obj = {text: text, id}
                    options.push(obj)
                }
                let id = Math.floor(Math.random()*Date.now());
                let answer = {text: correct_answer, id};
                let pos = Math.floor(Math.random()*options.length)
                options.splice(pos, 0, answer);
               
    
                for(let i = options.length-1; i > 0; i--){
                     const p = Math.floor(Math.random()*i);
                    [options[p], options[i]] = [options[i], options[p]];
                }
                
                modifiedQuestions.push({question, options, answer});
            }
            window.localStorage.setItem(`${gameCat}-${gameLevel}`, JSON.stringify(modifiedQuestions));
            // setQuestionArray(modifiedQuestions)
                
            }).catch(err=>{
                alert(`Oops..unable to fetch question from the API\nPlease check your network connection and refresh the page...\nYou may select a different category from the MENU options`)
            })
        }
        
        // }else{
        //     setQuestionArray(questFromLocal.sort((a, b)=> 0.5 -Math.random()));
        // }
        
        
        // Simulate A CountDown Timer
        if(timeLeft > 0 && gameStarted){
                setTimeout(()=>setTimeLeft(timeLeft-1), 1000);
                if(timeLeft === 0){
                    setTimeLeft(0)
                }
        }
       
    }, [gameCat, gameLevel, onSound, gameStarted, timeLeft])
    
    
    
    //Rendering Zone
    return (
        <>  
            <TopBar onclick={handleMenuClick} displayMenu={displayMenu} gameStarted={gameStarted}/>

            <MenuOptions  displayMenu={displayMenu}  toggleOnSound={toggleOnSound}  onSound={onSound} play={play} updateCategory={updateCategory} updateLevel={updateLevel} gameLevel={gameLevel}gameCat={gameCat} />

            <PlayButton play={play} displayMenu={displayMenu} gameStarted={gameStarted}/>

            <GamePlayInfo gameTime={gameTime} gameStarted={gameStarted} timeLeft={timeLeft}/>

            <Sound playStatus={onSound && gameStarted ? Sound.status.PLAYING : Sound.status.STOPPED}  url={startSound} loop={true} volume={30} autoLoad={true}/>
           
           <EndButton gameStarted={gameStarted} handleClick={onEndClick}/>

           <QuestionInterface passed={passed} timeLeft={timeLeft} handleCheck={handleCheck}  gameStarted={gameStarted} questionArray={questionArray[currentIndex]} handleNext={handleNext}/>
           <Footer />
        </>
    )
}

export default App
