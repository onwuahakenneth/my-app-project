

const GamePlayInfo = ({gameStarted, timeLeft, score, attemps}) => {
    
    return (
        <nav className={`gamePlayInfo ${gameStarted ? 'showGameInfo' : ''}`}>

            <div className='timeLeft'>
                <span>Time left </span>
                <span>:{`${timeLeft < 10 ? '0' : ''}${timeLeft}`}</span>
            </div>

            <div className='gameScore'>
                 <span>Score </span>
                <span>{score}</span>
            </div>

            <div className='gameAttempt'>
                <span > Live{`${attemps > 0 ? 's' : ''}`}:</span><span>{attemps}</span>
            </div>
            
        </nav>
    )
}

export default GamePlayInfo
