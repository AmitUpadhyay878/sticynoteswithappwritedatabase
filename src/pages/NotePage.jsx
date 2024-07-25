import React,{useState,useEffect, useContext} from 'react'
// import { fakeData as notes } from '../assets/fakeData'
import NoteCard from '../components/NoteCard'
import {databases} from '../appwrite/config'
import { db } from '../appwrite/datbases'
import { NoteContext } from '../context/NoteContenxt'
import Controls from '../components/Controls'

const NotePage = () => {

    // const [notes, setNotes] = useState([])
    const { notes } = useContext(NoteContext);

    // useEffect(()=>{
    //     init()
    // },[])

    // const init = async()=>{
    //     const response = await db.notes.list()

    //     // const response = await databases.listDocuments(
    //     //     import.meta.env.VITE_DATABASE_ID,
    //     //     import.meta.env.VITE_COLLECTION_NOTES_ID,
    //     // )

    //     setNotes(response.documents)
    // }



    return (
        <div>
            {
                notes?.map((note,i)=>{
                    return (
                    <NoteCard key={note?.id ?? i} note={note} />
                    )   
                })
            }
              <Controls />
        </div>
    )
}

export default NotePage