

const GamePlayInfo = ({gameStarted, timeLeft, gameTime}) => {
    
    return (
        <nav className={`gamePlayInfo ${gameStarted ? 'showGameInfo' : ''}`}>

            <div className='timeLeft'>
                <span>Time left </span>
                <span>:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>

            <div className='gameScore'>
                 <span>Score </span>
                <span></span>
            </div>

            <div className='gameAttempt'>
                <span > Lives:</span><span></span>
            </div>
            
        </nav>
    )
}

export default GamePlayInfo
