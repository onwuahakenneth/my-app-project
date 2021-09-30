import Header from "./Header";
import Menu from "./Menu";



const TopBar = ({onclick, displayMenu,gameStarted}) => {
    return (
        <nav className='top-bar'>
           <Menu onclick={onclick} displayMenu={displayMenu} gameStarted={gameStarted}/>
           <Header /> 
        </nav>
    )
}

export default TopBar
