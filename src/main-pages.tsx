import { useRef, useState } from "react";
import { Link, NavLink } from "react-router"
//import * as THREE from 'three';

//MCAPI to be integrated later... More info here > https://minecraft.wiki/w/Mojang_API
//Steps to render skin 1) Get UUID 2) Use UUID to get Skin (can use crafatar for 3d skin display!)

function Home(){

    const [players, setPlayers]  = useState<string[]>([])
    let upperPlayersArr : string[] = []//quick fix

    const [scrambledPlayers,setScrambledPlayers] = useState<string[]>([])

    function submitName(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const name = formJson.nameField.toString();
        console.log(name);

        upperPlayersArr = players.map((ele) => {
            return ele.toUpperCase();
        });

        const isValid = /^[a-z0-9]+$/i.test(name);
        if(name === "" || !isValid){
            alert("Name is empty OR Invalid Name Entry!");
            return;
        }
        if(upperPlayersArr.includes(name.toUpperCase())){
            alert("Name already exists in the table!")
            return;
        }
        
        //Insert name in array
        setPlayers([...players,name]);
        console.log(players);
    }

    function RemoveHead(removeName : string, setPlayersArray : React.Dispatch<React.SetStateAction<string[]>>, playerArr : string[]){
        setPlayersArray(playerArr.filter((name) => name !== removeName));
    }

    type headProp = {
        name : string,
        playerArr : string[],
        setPlayersArray : React.Dispatch<React.SetStateAction<string[]>>,
        isDisabled? : boolean

        //uuid : string,
        //img : string
    }

    function getRandomInt(max : number) {
        const rand = Math.random();
        //console.log(Math.floor(rand * max));
        return Math.floor(rand * max);
    }

    function lockScramblePlayers(){
        const arr = players.slice();
        const scrambledPlayers : string[] = [];

        //console.log(arr);           //pre scramble original arr

        for(let i = 0; i < players.length; i++){
            const rand = getRandomInt(players.length - i);
            scrambledPlayers.push(arr[rand]);      //push random chosen ele
            arr.splice(rand, 1);                //remove random chosen ele
        }
        
        //console.log(arr);           //empty arr
        //console.log(teamSortedArr); //post scrambled arr

        setScrambledPlayers(scrambledPlayers);
    }

    function clearScrambledPlayers(){
        setScrambledPlayers([])
    }

    function displayTeams(numOfTeams : number){

        const arr : number[] = []
        for(let i = 0; i < numOfTeams; i++) {arr.push(i);}

        


        //?
        return arr.map((element) => {
            console.log("HOW MAN TIMES IS THIS RUNNING");

            const os = scrambledPlayers.length/numOfTeams
            const s = (element * os);
            const e = s + os;
            return (
            <div key={element} className="pt-5 w-[50%] bg-gray-200 border-1">
                <h2 className="text-4xl">Team {element + 1}</h2>
                <div className="flex flex-wrap justify-center gap-5 p-5">
                    {
                        scrambledPlayers.slice(s,e).map( (player,index) => {
                            return <HeadName key={player} name={player} 
                            setPlayersArray={setScrambledPlayers} playerArr={scrambledPlayers}
                            isDisabled={true}/>
                        })
                    }
                </div>
            </div>
            )
        })
    }

    function HeadName({name, playerArr, setPlayersArray, isDisabled = false} : headProp){
        
        const a = [
            'https://images.unsplash.com/photo-1695159859857-696ab584c8c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1698208189346-6b356d242b09?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1695159859693-9d6735a6bc49?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]

        let bg = "";

        const rng = Math.random();

        if(rng < 0.33){
            bg = a[0];
        }else if(rng < 0.66){
            bg = a[1];
        }else{
            bg = a[2];
        }

        return (
            <div className="box-content shadow-xl  w-32 h-38 bg-white">
                <p className="border-1 bg-gray-300 h-6 truncate">{name}</p>
                <button 
                onClick={() => {
                    RemoveHead(name,setPlayersArray,playerArr)
                }}
                disabled={isDisabled}
                className="w-32 h-32 bg-red-200"
                style={{
                    backgroundImage:`url('${bg}')`,
                    backgroundSize:'cover',
                }}
                >
                </button>
            </div>
        )
    }
    
    return(
        <div className="font-[roboto] ">

            <div className="bg-gray-200">
                <h1 className="">{String.fromCharCode(83,99,114,97,109,98,108,101,114)}</h1>
            </div>

            <div className="">
                {/*items-center*/}
                <form method="post" onSubmit={submitName}>
                    <div className="p-5 flex justify-center">
                            <input
                            className="ml-2 bg-white border-4" name="nameField" type="text" maxLength={24} placeholder="Enter a name..."></input>
                            <button className="w-20 h-10 bg-white border-4 border-green-500" 
                            type="submit"
                            onClick={() => {
                                //addName();
                            }}>Add</button>
                        
                    </div>
                </form>
            
                

                <div className="">
                    <div className="flex flex-wrap justify-center gap-5 p-5">
                        {
                            players.map( player => (
                                <HeadName key={player} name={player} setPlayersArray={setPlayers} playerArr={players}/>
                            ))
                        }
                    </div>
                    <div>
                        
                    </div>
                    <button
                    onClick={lockScramblePlayers} 
                    className={players.length > 1 ? "ml-2 mr-2 bg-white p-2 border-4 border-green-500 text-black" : "hidden"} 
                    disabled={players.length > 1 ? false : true}> LOCK IN ALL</button>

                    <button
                    onClick={clearScrambledPlayers} 
                    className={scrambledPlayers.length > 1 ? "ml-2 mr-2 bg-white p-2 border-4 border-green-500 text-black" : "hidden"} 
                    disabled={scrambledPlayers.length > 1 ? false : true}> Clear Scrambled Team</button>
                </div>

                <div className="flex p-5 gap-5">
                    {
                        displayTeams(4)
                    }
                </div>

            </div>

            <footer className="">
                Click <Link to="/home">here</Link> to go to the home page...
            </footer>

        </div>
    )
}













function Empty(){
    return(
        <div>
            <h1>Welcome to the blank starting page!</h1>

            Click <Link to="/home">here</Link> to go to the home page...
        </div>
    ) 
}

function NotFound(){
    return(
        <div>
            <h1>Page not found!</h1>

            Click <Link to="/home">here</Link> to go to the home page...
        </div>
    )
}


export {
    NotFound,
    Home,
    Empty
}