
const MenuOptions = ({displayMenu, toggleOnSound, onSound, updateCategory, updateLevel, gameLevel, gameCat}) => {


    return (

        <section className={`menu ${displayMenu ? 'showMenu' : ''}`}>

      <div className="menu-option" id="category">

          <label htmlFor='gameCategory'>Categories</label>

          <select name='gameCategory' className='categorySelect' defaultValue={gameCat} id='gameCategory' onChange={(e)=>updateCategory(e.target.value)}>

              <option value='books' >Books</option>
              <option value='comics'>Comics</option>
              <option  value='computers'>Computers</option>
              <option value='geography'>Geography</option>
              <option value='mathematics' >Mathematics</option>
              <option value='television'>Television</option>
              <option value='videogames'>Video Games</option>
              <option value='generalknowledge'>General Knowledge</option>

          </select>
      </div>

      <div className="menu-option" id="level">
          <label htmlFor='gameLevel'>Level</label>
          <select name='gameLevel' className='levelSelect' defaultValue={gameLevel}  id='gameLevel' onChange={(e)=>(
              updateLevel(e.target.value)
              )}>
              <option value='easy' >Easy</option>
              <option value='medium'>Medium</option>
              <option  value='hard'>Hard</option>
              
          </select>
      </div>

      <div className="menu-option" id="sound">
          <p>Sound</p>
          <label className='toggleSound' htmlFor="mySound" >
             <input className='toggleSound-input' type="checkbox" id='mySound' checked={onSound} onChange={(e)=> toggleOnSound(e.currentTarget.checked)}/>
             <div className='toggleSound-fill'>{onSound ? 'ON' : 'OFF'}</div>
          </label>
      </div>

      <div className="menu-option" id="scoreBoard">Score-Board</div>


    </section>
   
    )
}

export default MenuOptions
