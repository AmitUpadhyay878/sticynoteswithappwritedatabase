import React, { useRef, useEffect, useState, useContext } from 'react'
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../utils'
import { OrgGetFullDate } from '../functions/datetimefuncs'
import { db } from '../appwrite/datbases'
import Spinner from '../icons/Spinner'
import DeleteButton from '../components/DeleteButton'
import {NoteContext} from '../context/NoteContenxt'

const NoteCard = ({ note,setNotes }) => {
    const [position, setPositon] = useState(JSON.parse(note.position))
    const [saving, setSaving] = useState(false)
    const keyUpTimer = useRef(null)

    // let position = JSON.parse(note.position)
    const colors = JSON.parse(note.colors)
    // const body = JSON.parse(note?.body)
    const body = bodyParser(note.body)

    let mouseStartPos = { x: 0, y: 0 }

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef)
        setZIndex(cardRef.current);
    }, [])

    const { setSelectedNote } = useContext(NoteContext);

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {

            setSelectedNote(note);

        setZIndex(cardRef.current)

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
        }
    }
    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        //3 - Update card top and left position.
        const newPositions = setNewOffset(cardRef.current, mouseMoveDir)
        setPositon(newPositions)
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        const newPosition = setNewOffset(cardRef.current) //{x,y}
        saveData('position', newPosition)
        // db.notes.update(note.$id,{position:JSON.stringify(newPosition)})
    }

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) }
        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.error(error)
        }
        setSaving(false)
    }

    const handleKeyUp = async () => {
        setSaving(true)

        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData('body', textAreaRef.current.value)
        }, 2000)
    }

    return (
        <div
            className="card"
            ref={cardRef}
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            {' '}
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
                onMouseDown={mouseDown}
            >
                {/* <Trash /> */}
                <DeleteButton noteId={note.$id} 
                // setNotes={setNotes}
                 />

                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>
                            Saving...
                        </span>
                    </div>
                )}

                <p
                    style={{
                        color: 'black',
                        fontWeight: 600,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}
                >
                </p>
            </div>
            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                   
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current)
                        setSelectedNote(note)
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard
