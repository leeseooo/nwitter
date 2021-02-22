import React, {useState,useEffect} from 'react'
import {dbService,storageService} from "../fblnstance";
import NweetFactory from "../components/NweetFactory";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweets,setNweets]=useState([]);//db에 저장된 뉴윗들

    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot) => {
            //onSnapshot : 데이터를 읽거나 쓰기 위함
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                 ...doc.data(),
                }));
                setNweets(nweetArray);
        });
    },[]);

    return(
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                <Nweet 
                key={nweet.id} 
                nweetObj={nweet}//각각의 트윗obj
                isOwner={nweet.creatorId === userObj.uid}
                />
                ))}
            </div>
        </div>
    )
}
export default Home;