
const NextButton = ({timeLeft, attemps, handleNext}) => {
    return (
        <button onClick={handleNext} className={`next-button ${timeLeft <= 0 && 'show-next'}`}>{`Next>>`}</button>
    )
}

export default NextButton
