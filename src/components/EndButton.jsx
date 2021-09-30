

const EndButton = ({gameStarted, handleClick}) => {
    return (
        <> 
        { gameStarted &&

            <div className='endBtn'  onClick={handleClick}>END</div>
        }
        </>
    )
}

export default EndButton
