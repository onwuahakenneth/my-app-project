
const Menu = ({onclick, displayMenu, gameStarted}) => {
   
    return (
        <div className={`menu-bar ${gameStarted ? 'hideMenuBar' : ''}`} onClick={onclick}>
            <h4>Menu</h4>
            { !displayMenu ? 
            <div className='hamburger' >
                <div className='line line-1'></div>
                <div className='line line-2'></div>
                <div className='line line-3'></div>
            </div>
               : <div className='closeMenuBtn'>X</div> }
        </div>
    )
}

export default Menu
