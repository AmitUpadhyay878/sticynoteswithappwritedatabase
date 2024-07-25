// import { useContext, useRef } from 'react';
// import colors from '../assets/colors.json'
// import {NoteContext} from '../context/NoteContenxt'
// import Plus from '../icons/Plus'
// import { db } from '../appwrite/datbases';
 
// const AddButton = () => {
//     const { setNotes } = useContext(NoteContext);
//     const startingPos = useRef(10);


//     const addNote = async () => {
//         const payload = {
//             position: JSON.stringify({
//                 x: startingPos.current,
//                 y: startingPos.current,
//             }),
//             colors: JSON.stringify(colors[0]),
//         };
       
//         startingPos.current += 10;

//         const response = await db.notes.create(payload);
//         setNotes((prevState) => [response, ...prevState]);
//     };

//     return (
//         <div id="add-btn" onClick={addNote}>
//             <Plus />
//         </div>
//     );
// };

// export default AddButton



import { useContext, useRef } from 'react';
import colors from '../assets/colors.json';
import {NoteContext} from '../context/NoteContenxt'
import Plus from '../icons/Plus';
import { db } from '../appwrite/datbases'

const AddButton = () => {
    const { setNotes } = useContext(NoteContext);

    const startingPos = useRef(10);

    const addNote = async () => {
        try {
            const payload = {
                position: JSON.stringify({
                    x: startingPos.current,
                    y: startingPos.current,
                }),
                colors: JSON.stringify(colors[0]),
            };

            startingPos.current += 10;

            const response = await db.notes.create(payload);

            // setNotes((prevState) => {
            //     // Ensure the response is not undefined or incorrect
            //     if (response && response.id) {
            //         return [response, ...prevState]
            //     } else {
            //         console.error('Failed to create a new note', response)
            //         return prevState;
            //     }
            // });
            setNotes((prevState) => [response, ...prevState]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
