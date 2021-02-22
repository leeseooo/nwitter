import React,{useEffect,useState} from 'react';
import {authService,dbService} from "../fblnstance";
import {useHistory} from "react-router-dom";

const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/"); //로그아웃된후 home으로
    };
    const getMyNweets = async() => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId","==",userObj.uid)
        .get();
        //where => filePath("creatorId")로부터 value(userObj.uid)가 같은지 보기위해 filtering을 해줌
    }
    useEffect(() => {
        getMyNweets();
    }, [])
    
    const onChange = (event)=>{
        const{target:{value}}=event;
        setNewDisplayName(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName:newDisplayName,
            });
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
            <input 
            type="text" 
            autoFocus
            placeholder="Display name" 
            onChange={onChange}
            value={newDisplayName}
            className="formInput"
            />
            <input
              type="submit"
              value="Update Profile"
              className="formBtn"
              style={{
                marginTop: 10,
              }} />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    )
}
export default Profile;