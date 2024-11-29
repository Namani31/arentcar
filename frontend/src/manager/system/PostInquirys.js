import "./PostInquirys.css"

const PostInquirys = ({ onClick }) => {




  return(
    <div className='manager-post-inquirys-wrap'>
      <div className='manager-post-inquirys-header-wrap'>
        <div className='manager-post-inquirys-header-title'>
          <h5 className='manager-post-inquirys-header-h5'> 고객문의 게시판 </h5>
        </div>
      </div>

      <div className='manager-post-notice-table-wrap'>
        <div className='manager-post-notice-table-head'>
          <div className='flex-align-center'>
            <label className='manager-label' htmlFor="manager-post-serch">제목</label>
            <input id='manager-post-serch' className='width200' type="text"></input>
            <button className='manager-button manager-button-search' onClick={()=>{}}> 검색 </button>
            <span> [ 검색건수 : {1}건 ] </span>
          </div>

          <div>
              <button className='manager-button manager-button-insert' onClick={()=>{}}> 추가</button>
              <button className='manager-button manager-button-close' onClick={()=>{}}> 닫기</button>
          </div>
        </div>

      </div>
    
    </div>
  )
}

export default PostInquirys;