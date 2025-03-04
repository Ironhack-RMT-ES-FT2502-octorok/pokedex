import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

//1. como llamamos a la API? fetch "https://pokeapi.co/api/v2/pokemon"
//2. en que momento llamamos a la API? dentro del useEffect ComponentDidMount
//3. la API nos devuelve una promesa. Como resolvemos la promesa? then/catch o async/await
//4. que hacemos con la data que nos da la API? almacenamos la data en el estado
//5. como pintamos esa data? ocn un .map y pintando un enlace por cada pokemon

function Sidebar() {

  const [ allPokemon, setAllPokemon ] = useState([])

  useEffect(() => {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setAllPokemon(data.results)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  return (
    <nav className="sidebar">
      
      <h3>Elige un Pokemon</h3>

      {allPokemon
      // .toSorted((pokemon1, pokemon2) => pokemon1.name.localeCompare(pokemon2.name))
      .map((eachPokemon) => {
        return (
          <Link key={eachPokemon.name} to={`/poke/${eachPokemon.name}`}>{eachPokemon.name}</Link>
        )
      })}


      {/* example of 3 links */}
      {/* <Link to={"/"}>bulbasaur</Link>
      <Link to={"/"}>charmander</Link>
      <Link to={"/"}>squirtle</Link> */}

    </nav>
  )
}

export default Sidebar