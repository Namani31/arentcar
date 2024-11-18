import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { refreshAccessToken, handleLogout } from 'common/Common';
import 'manager/system/posts/PostNotices.css';

const PostNotices = ({ onClick }) => {
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  // const [totalPages, setTotalPages] = useState(0);
  const [isPopUp, setIsPopUp] = useState(false);

  const [columnNotices] = useState([
    { columnName: '코드', field: 'post_code', width: 100, align: 'center'},
    { columnName: '구분', field: 'post_type', width: 100, align: 'center'},
    { columnName: '제목', field: 'post_title', width: 500, align: 'left'},
    { columnName: '작성자', field: 'author', width: 150, align: 'center'},
    { columnName: '작성일', field: 'created_at', width: 150, align: 'center'},
    { columnName: '작업', field: '', width: 230, align: 'center'},
  ]);

  const [postCode,setPostCode] = useState();
  const [postType,setPostType] = useState();
  const [postTitle,setPostTitle] = useState();
  const [postContent,setPostContent] = useState();
  const [authorCode,setAuthorCode] = useState();
  const [authorType,setAuthorType] = useState();


  const fetchNotices = async () => {
    const params = {
      pageSize,
      pageNumber,
    };

    if(searchName && searchName.trim() !== "") {
      params.postName = searchName;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/post/notices`,
        {
          params,
        }
      );
      if(response.data) {
        console.log(response.data);
        setNotices(response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }
  }

  const getCount = async () => {
    const params = searchName && searchName.trim() !== "" ? { postName: searchName } : {}

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/post/notices/count`,
        {
          params,
        }
      );
      if(typeof response.data === "number") {
        setTotalNotices(response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }
  }

  useEffect(()=>{
    fetchNotices();
    getCount();
  }, [totalNotices, pageNumber])

  const handleSearchClick = async () => {
    fetchNotices();
    getCount();
    setPageNumber(0);
  }

  let totalPages = Math.ceil(totalNotices / pageSize);
  if (totalPages < 1) { totalPages = 1; }
  if (totalNotices === 0) { totalPages = 0; }

  const handleCloseClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='manager-post-notice-wrap'>
      <div className='manager-post-notice-header-wrap'>
        <div className='manager-post-notice-header-title'>
          <hr/>
            <h5 className='manager-post-notice-header-h5'> 공지사항 게시판 </h5>
          <hr/>
        </div>
      </div>

      <div className='manager-post-notice-table-wrap'>
        <div className='manager-post-notice-table-head'>
          <div className='flex-align-center'>
            <label className='manager-label' htmlFor="manager-post-serch">제목</label>
            <input id='manager-post-serch' className='width200' type="text" 
              onChange={(e)=>(setSearchName(e.target.value))} 
              onKeyDown={(e)=>{if(e.key === "Enter") {handleSearchClick()} }}></input>
            <button className='manager-button manager-button-search' onClick={()=>handleSearchClick()}> 검색 </button>
            <span> [ 검색건수 : {totalNotices}건 ] </span>
          </div>

          <div>
              <button className='manager-button manager-button-insert' onClick={()=>setIsPopUp(!isPopUp)}> 추가</button>
              <button className='manager-button manager-button-close' onClick={() => handleCloseClick()}> 닫기</button>
          </div>
        </div>

        <table className='manager-post-notice-table-body'>
          <thead>
            <tr>
              {columnNotices && (columnNotices.map((column,index)=>(
                  <th key={index} className='manager-post-notice-table-head-colmn' style={{ width: `${column.width}px`, textAlign: `center` }}>
                    {column.columnName}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
          {notices && (
            notices.map((notice, index)=>(
              <tr key={index}>
                {columnNotices && (columnNotices.map((column,index)=>(
                  <td key={index} className='manager-post-notice-table-row-colmn'
                    style={{width:`${column.width}`, textAlign:`${column.align}`}}
                  > 
                    {column.field === '' ? (<>
                      <button className='post-btn3'> 보기 </button> 
                      <button className='post-btn2'> 수정 </button> 
                      <button className='post-btn1'> 삭제 </button> 
                    </>) : (
                      notice[column.field]
                    )}
                  </td>
                )))}
              </tr>
            ))
          )}
          </tbody>
        </table>
        <div className='manager-post-notice-table-paging flex-align-center'>
          <button className='manager-button' onClick={()=>setPageNumber(pageNumber - 1)}
            style={{color: pageNumber === 0 ? '#aaa' : '#26319b'}}
            disabled={pageNumber === 0}
          >이전</button>
          <div className='manager-post-notice-table-paging-page'>{(pageNumber+1)} / {totalPages}</div>
          <button className='manager-button' onClick={()=>setPageNumber(pageNumber + 1)}
            style={{color: (pageNumber + 1) >= totalPages ? '#aaa' : '#26319b'}}
            disabled={ (pageNumber + 1) >= totalPages }
          >다음 </button>
        </div>
        {isPopUp && (
          <div className='manager-post-notice-popup'>
            <button onClick={()=>{setIsPopUp(!isPopUp)}}> 닫기 </button>
          </div>
        )}

      </div>


    </div>
  );
}

export default PostNotices;

