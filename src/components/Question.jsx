
const Question = ({id, text, handleCheck, passed, timeLeft}) => {
    return (

        <p onClick={(e)=>handleCheck(id, e.target)} style={{pointerEvents: passed !== 'undefined' || timeLeft === 0 ? 'none' : 'all'}} 

        dangerouslySetInnerHTML={{__html: text}}

        />
    )
}

export default Question
