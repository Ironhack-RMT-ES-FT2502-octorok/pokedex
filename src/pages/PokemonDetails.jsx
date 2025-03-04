
//1. como llamamos a la API. fetch y url "https://pokeapi.co/api/v2/pokemon/pikachu"
//2. como sabemos que pokemon le tenemos que pedir. accediendo a los parametros dinamicos usando useParams
//3. donde hacemos la llamada a la API. useEffect ComponentDidMount
//4. como resolvemos la promesa de la API. then/catch
//5. que hacemos con la data que me da la API. lo almacenamos en un estado
//6. como pintamos es data. accedemos a las propiedades del objeto

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import BounceLoader from "react-spinners/BounceLoader";

function PokemonDetails() {

  const navigate = useNavigate() // estamos creando la funcion "navigate" para redireccionar

  const parametrosDinamicos = useParams()
  console.log(parametrosDinamicos)

  const [ pokemon, setPokemon ] = useState(null)

  useEffect(() => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${parametrosDinamicos.pokeName}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setPokemon(data)
    })
    .catch((error) => {
      console.log(error)
      // redireccionar al usuario a la página de "/error"
      navigate("/error")
    })

  }, [parametrosDinamicos.pokeName])
  // pasarle dependencias significa dos:
  //1. sigue invocandolo cuando el componente aparezca por primera vez
  //2. cuando el parametro dinamico cambie, vuelvelo a invocar


  // DEBERIAMOS hacer siempre una clausula de guardia de carga
  if (pokemon === null) {
    return (
      // <h3>... buscando data de el pokemon</h3>
      <div style={{display: "flex", justifyContent:"center"}}>
        <BounceLoader size={200} color="red"/>
      </div>
    )
  }

  return (
    <div>
      
      <h3>nombre: {pokemon.name}</h3>
      <p>altura: {pokemon.height}</p>
      <img src={pokemon.sprites.other.dream_world.front_default} alt="pokemon" width="200px"/>
      {/* <li>tipo1</li>
      <li>tipo2</li>
      <li>tipo3</li> */}

    </div>
  )
}

export default PokemonDetails