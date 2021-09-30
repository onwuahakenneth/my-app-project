
const QuestionInterface = ({gameStarted, timeLeft, checkAnswer, onNextClick, questionArray, currentIndex, passed, attemps}) => {
    

    //determine the color based on the option clicked
    const defaultColor = 'linear-gradient(285deg, rgba(214, 213, 213, 0.38)50%, rgba(98, 124, 177, 0.58)50%)';
    let bColor = 'linear-gradient(285deg, rgba(214, 213, 213, 0.38)50%, rgba(98, 124, 177, 0.58)50%)';
    if(timeLeft > 0 && passed=='true'){
        bColor = 'green';
    }
    if(timeLeft > 0 && passed=='false'){
        bColor = 'red';
    }
    if(timeLeft <=0 ){
        bColor = 'green';
    }

    let copy = [...questionArray]
  

    const correctAnswer = copy[currentIndex].answer;



    return (
        

            <div style={{opacity: `${timeLeft > 0 ? '1' : '0.7' }`}} className={`question-container ${gameStarted && (timeLeft >= 0) ? 'show-question' : ''}`}>
            <div className='question-display'>
                {`Q${currentIndex+1}: ${questionArray[currentIndex].question}`}
            </div>
            <div className='answers'>
                
                {copy[currentIndex].options.map((option, id)=>(
                    
                    <p key={id} onClick={()=>setTimeout(checkAnswer(option), 100)} id={id} style={{background: `${id == copy[currentIndex].options.indexOf(correctAnswer) && timeLeft <= 0? bColor : defaultColor }`, pointerEvents: `${timeLeft <= 0 || (passed !== 'no')? 'none' : 'all'}`}}>

                        {option}

                    </p>
                ))}

                <div className={`next-button ${timeLeft <= 0 ? 'show-next': '' }`}onClick={onNextClick}><span style={{pointerEvents: `${attemps > 0 ? 'all' : 'none'}`}}>{`${attemps > 0 ? 'Next >>' : 'Game Over !!'}`} </span ></div>
            </div>

            
        </div>
    )
}

export default QuestionInterface
