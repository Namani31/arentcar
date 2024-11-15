import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'manager/reservation/posts/PostNotices.css';

const PostNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(()=>{
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/post/notices`);
        if(response.data) {
          console.log(response.data)
          setNotices(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the movies!', error);
      }
    }
    fetchNotices();
  }, [])

  return (
    <div className='manager-post-notice-wrap'>
      <div className='manager-post-notice-header-wrap'>
        <hr/>
        <h1 className='manager-post-notice-header-h1'> 공지사항 게시판 </h1>
        <hr/>
      </div>
      <div className='manager-post-notice-table-wrap'>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
          {notices && (
            notices.map((notice, index)=>(
              <tr key={index}>
                <td> { notice.post_code } </td>
                <td> { notice.post_title } </td>
                <td> { notice.author_type } { notice.post_code } </td>
                <td> { notice.created_at } </td>
                <td> 
                  <span className='post-btn3'> 읽기 </span> 
                  <span className='post-btn2'> 수정 </span> 
                  <span className='post-btn1'> 삭제 </span> 
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
        
      </div>


    </div>
  );
}

export default PostNotices;

