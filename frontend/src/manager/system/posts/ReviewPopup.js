import { useEffect, useRef, useState } from "react";
import "manager/system/posts/ReviewPopup.css";
import { store } from '../../../redux/store';

const ReviewPopup = ( { colse } ) => {
  const [user, setUser] = useState("123");
  const [score, setScore] = useState(1);

  useEffect(()=>{
    setUser(store.userState);
  },[])

  const StarSeting = () => {
    const star = [];

    for (let index = 0; index < score; index++) {
      star.push("★");
    }
    for (let index = 0; index < 5 - score; index++) {
      star.push("☆");
    }
    return (<>
      <span onClick={ ()=>setScore(1) } > {star[0]} </span>
      <span onClick={ ()=>setScore(2) } > {star[1]} </span>
      <span onClick={ ()=>setScore(3) } > {star[2]} </span>
      <span onClick={ ()=>setScore(4) } > {star[3]} </span>
      <span onClick={ ()=>setScore(5) } > {star[4]} </span>
    </>)
  }


  //텍스트박스 크기조절
  const textarea = useRef();
  const handleResizeHeight = (e) => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  }
  const handleColse = () => {
    console.log(colse);
    if(colse){
      colse();
    }
  }
  return (
    <div className="user-review-popup">
      <div className="user-review-popup-wrap">
        <div className="user-review-popup-line">
          <div className="user-review-popup-title"> <h6> {user}님 후기</h6> </div>
        </div>
        <div className="user-review-popup-line">
          <div className="user-review-popup-score">
            {/* ★☆☆☆☆ */}
            {StarSeting()}
          </div>
        </div>
        <div className="user-review-popup-line">
          <textarea className="width400 user-review-popup-content"
          rows={5} ref={textarea} onChange={(e)=>{handleResizeHeight(e)}}/>
        </div>
        <div className="user-review-popup-line">
          <button className="manager-button">작성</button> 
        </div>
        
      </div>
      <button onClick={()=>handleColse()}>닫기</button>
    </div>
  )
}

export default ReviewPopup;
