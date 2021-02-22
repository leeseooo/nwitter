import React, {useState} from "react";
import {storageService,dbService} from "../fblnstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4} from 'uuid';

const NweetFactory = ({userObj}) => {
    const [nweet,setNweet]=useState("");
    const [file, setFile]=useState(""); 
    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
          }
        event.preventDefault();
        let attachmentUrl = "";
        if(file !== ""){//file없는뉴윗 처리
            const fileRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);//파일에대한ref를 가짐
            const response = await fileRef.putString(file, "data_url");//파일url은 string값이므로 putString사용
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet,
            createdAt:Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setFile("");//nweet해준 후 null로 만들어주기
    };
    const onFileChange=(event)=>{
        const {target:{files},}=event;
        const theFile = files[0];//하나의 파일만 input가능
        const reader = new FileReader();//파일 리더
        reader.onloadend = (finishedEvent)=>{
            //loading이 끝나면 finishedEvent를 받게됨
            const {currentTarget:{result},} = finishedEvent;
            setFile(result);
        }
        reader.readAsDataURL(theFile);//data url을 읽음
        //theFile값을 주소창에 입력해보면 이미지로 변환됨 string값
    }
    const onChange = (event) => {
        const { target : {value},}=event;
        setNweet(value);
    }
    const onClearPhoto = () => setFile("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                className="factoryInput__input"
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                }}
            />
                {file && (<div className="factoryForm__attachment">
                            <img
                                src={file}
                                style={{
                                backgroundImage: file,
                                }}
                            />
                            <div className="factoryForm__clear" onClick={onClearPhoto}>
                                <span>Remove</span>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>)}
            </form>
    )
}
export default NweetFactory;