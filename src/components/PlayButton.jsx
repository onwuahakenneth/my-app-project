import PlayIcon from "./PlayIcon"

const PlayButton = ({displayMenu, play, gameStarted}) => {
    return (
        <>
        { (!displayMenu && !gameStarted) &&
        <> 
            <div className='playBtnContainer'> </div>
            <div className='playBtn' onClick={play}><PlayIcon /></div>
        </>
        }
        </>
    )
}

export default PlayButton
