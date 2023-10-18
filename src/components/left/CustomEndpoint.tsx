import React, { useState } from "react"

const CustomEndpoint = ( {handleCreateCustomEndpoint, explorer}: any ) => {
    
    const handleCreateCustomFolder =(e?: React.KeyboardEvent<HTMLInputElement>) => {
        e?.stopPropagation()
        if (e?.key === 'Enter' && e?.currentTarget.value) {
            e?.preventDefault()

            const result = handleCreateCustomEndpoint(explorer.id, e.currentTarget.value)
            // console.log('result',result);
        }
    }
    
    return (
        <div>
            <form >
            <input 
            type="text"
            placeholder="create an endpoint" 
            autoFocus
            onKeyDown={handleCreateCustomFolder}
            />
            <button type = "submit" onClick={() => handleCreateCustomFolder}>Submit</button>
            
            </form>
        </div>
    );
}


export default CustomEndpoint;

