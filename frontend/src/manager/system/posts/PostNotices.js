import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, handleLogout } from 'common/Common';
import 'manager/system/posts/PostNotices.css';

const PostNotices = ({ onClick }) => {
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  // const [totalPages, setTotalPages] = useState(0);

  const [columnNotices] = useState([
    { columnName: '코드', field: 'post_code', width: 100, align: 'center'},
    { columnName: '구분', field: 'post_type', width: 100, align: 'center'},
    { columnName: '제목', field: 'post_title', width: 500, align: 'left'},
    { columnName: '작성자', field: 'author', width: 150, align: 'center'},
    { columnName: '작성일', field: 'created_at', width: 150, align: 'center'},
    { columnName: '작업', field: '', width: 230, align: 'center'},
  ]);

  const [isPopUp, setIsPopUp] = useState(false);
  const [popupType, setPopupType] = useState()

  const [postCode,setPostCode] = useState();
  const [postType,setPostType] = useState();
  const [postTitle,setPostTitle] = useState("");
  const [postContent,setPostContent] = useState("");
  const [authorCode,setAuthorCode] = useState(18);
  const [authorType,setAuthorType] = useState("AM");

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

  const handleSaveData = async (e) => {
    if(e === "추가") {
      const newPost = {
        post_code: postCode,
        post_type: postType,
        post_title: postTitle,
        post_content: postContent,
        author_code: authorCode,
        author_type: authorType,
        author: null,
        created_at: null,
        updated_at: null,
      }
      postCreateNotice(newPost)
    }
  }

  const postCreateNotice = async (newPost) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/arentcar/manager/post/notices`,
        newPost

      );
      console.log(response.data);
      alert("공지사항이 등록되었습니다.");
      fetchNotices();
      // setNotices((prevNotice)=>[...prevNotice, response.data])
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }

  }

  useEffect(()=>{
    fetchNotices();
    getCount();
  }, [totalNotices, pageNumber])

  const textarea = useRef();
  const handleResizeHeight = (e) => {
    setPostContent(e.target.value);
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  }

  const handleSearchClick = async () => {
    fetchNotices();
    getCount();
    setPageNumber(0);
  }

  const handleCreateClick = (e) => {
    setIsPopUp(true);
    setPopupType(e);
    setPostTitle("");
    setPostContent("");

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
              <button className='manager-button manager-button-insert' onClick={()=> handleCreateClick("추가")}> 추가</button>
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
        {isPopUp && (
          <div className='manager-post-notice-popup'>
            <div className='manager-post-notice-popup-wrap'>
              <div className='manager-post-notice-popup-header'>
                <div className='manager-post-notice-popup-title'> <h6 className='manager-post-notice-h6'>공지사항 {popupType}</h6> </div>
                <div className='manager-post-notice-popup-buttons'>
                  <button className='manager-button manager-post-notice-popup-save' onClick={()=>{handleSaveData(popupType)}}> {popupType} </button>
                  <button className='manager-button manager-post-notice-popup-close' onClick={()=>{setIsPopUp(!isPopUp)}}> 닫기 </button>
                </div>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label'>제목</label>
                <input className='width400' value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}/>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label' style={{verticalAlign: 'top'}}>내용</label>
                <textarea className='width400 manager-post-notice-popup-line-textarea' 
                rows={2} ref={textarea} value={postContent} onChange={(e)=>{handleResizeHeight(e)}}/>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label'>게시물 코드</label>
                <input className='width30 word-center' type="text" value={postCode} disabled/>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label'>게시물 유형</label>
                <input className='width50 word-center' type="text" value={postType} disabled/>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label'>작성자</label>
                <input className='width50 word-center' type="text" value={authorCode} disabled/>
              </div>
              <div className='manager-post-notice-popup-line'>
                <label className='manager-post-notice-popup-line-label'>작성자 유형</label>
                <input className='width50 word-center' type="text" value={authorType} disabled/>
              </div>

              {/* postCode postType postTitle postContent authorCode authorType postContent가 넘어갔을때 문제 */}
            </div>

          </div>
        )}
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


      </div>


    </div>
  );
}

export default PostNotices;

