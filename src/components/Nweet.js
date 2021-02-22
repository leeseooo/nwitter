import React,{useState} from "react";
import {dbService,storageService} from "../fblnstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing]=useState(false);
    const [newNweet, setNewNweet]=useState(nweetObj.text);
    //nweetObj.nweet 트윗을 업데이트

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete it?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //document의 id를 알고있으면 이렇게 쉽게 쓸수있다
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            //URL(사진파일url)에서 reference를 얻어와서 삭제
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    //form 변경을 위한 토글 func


    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target : {value},}=event;//밑 코드처럼 안쓰려고 이렇게 쓰는거임
        setNewNweet(event.target.value); //value라고 써줘야 에러 안남
        console.log(value);
    }

    return(
        <div className="nweet">
            {
                editing ? (<>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input 
                    type="text" 
                    placeholder="Edit your nweet"
                    value={newNweet}
                    autoFocus
                    onChange={onChange}
                    className="formInput"/>
                    <input type="submit" value="Update Nweet"className="formBtn"/>
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>) :
                (<div>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (
                    <div class="nweet__actions">
                        <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                    )} 
                    
                </div>)
            }
        </div>
    )
}

export default Nweet;