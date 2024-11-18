import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'manager/reservation/posts/PostNotices.css';

const PostNotices = ({ onClick }) => {
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [columnNotices] = useState([
    { columnName: '코드', field: 'post_code', width: 100, align: 'center'},
    { columnName: '구분', field: 'post_type', width: 100, align: 'center'},
    { columnName: '제목', field: 'post_title', width: 500, align: 'left'},
    { columnName: '작성자', field: 'author', width: 150, align: 'center'},
    { columnName: '작성일', field: 'created_at', width: 150, align: 'center'},
    { columnName: '작업', field: '', width: 230, align: 'center'},
  ]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/post`);
      if(response.data) {
        console.log(response.data)
        setNotices(response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }
  }

  useEffect(()=>{

    fetchNotices();
  }, [])

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
            <input id='manager-post-serch' className='width200' type="text" ></input>
            <button className='manager-button manager-button-search'> 검색 </button>
            <span> [ 검색건수 : {totalNotices}건 ] </span>
          </div>

          <div>
              <button className='manager-button manager-button-insert'> 추가</button>
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
          <button className='manager-button'
            style={{color: pageNumber === 1 ? '#aaa' : '#26319b'}}
            disabled={pageNumber === 1}
          >이전</button>
          <div className='manager-post-notice-table-paging-page'>{pageNumber} / {totalPages}</div>
          <button className='manager-button'
            style={{color: pageNumber >= totalPages ? '#aaa' : '#26319b'}}
            disabled={ pageNumber >= totalPages }
          >다음 </button>
        </div>

      </div>


    </div>
  );
}

export default PostNotices;

