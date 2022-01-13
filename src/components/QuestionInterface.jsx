
import NextButton from "./NextButton";
import Question from "./Question";

const QuestionInterface = ({gameStarted, questionArray, timeLeft, handleNext, handleCheck, passed}) => {
  



    return (
        
        <div  className={`question-container ${gameStarted ? 'show-question' : ''}`}>

            <div className='question-display'

             dangerouslySetInnerHTML = {{__html: gameStarted && questionArray.question}}
            />

            <div className='answers' >
             {gameStarted && questionArray.options.map(option => (
                 <Question key={option.id} text={option.text} id={option.id} handleCheck={handleCheck} passed={passed} timeLeft={timeLeft}/>
             ))}
                { timeLeft <= 0 &&
                <NextButton timeLeft={timeLeft} handleNext={handleNext}/>
                }
            </div>

            
        </div>
    )
}

export default QuestionInterface
