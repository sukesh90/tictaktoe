import { useState } from "react";

export default function PlayerInfo({ initalName, symbol, isActive,onNameChange }) {
    const [name, setName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);
    var textButton = "Edit";
    let returnValue = <span className="player-name">{name}</span>;
    function handleEditButton() {
        setIsEditing((isEditing) => {
            setIsEditing(!isEditing);
        });
        if(isEditing){
            onNameChange(symbol,name);
        }
    }
    function setNamevalue(event) {
        setName(event.target.value);
    }
    if (isEditing) {
        returnValue = <input type="text" required defaultValue={initalName}
            value={name} onChange={setNamevalue} />;
        textButton = "Save";
    }

    return (<li className={isActive ? 'active' : undefined} >
        <span className="player" >
            {returnValue}
            <span className="player-symbol"> {symbol} </span>
        </span>
        <button onClick={handleEditButton}>{textButton}</button>
    </li>);
}