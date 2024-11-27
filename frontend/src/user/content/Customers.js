import { useEffect, useState } from "react";
import "./Customers.css"
import axios from "axios";



const Customers = () => {
  const menus = ["공지사항","고객후기","고객문의"];
  const [postState, setPostState] = useState(0);

  const [customers, setCustomers] = useState([]);
  
  const [totalCustomers, setTotalCustomers] = useState(0);
  //검색/페이징
  const [searchName, setSearchName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const pageingCustomersNotices = async () => {
    try {
      const params = {
        pageSize,
        pageNumber,
      };
  
      if(searchName && searchName.trim() !== "") {
        params.postName = searchName;
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/customers/notices`,
        {
          params,
        }
      );
      if(response.data) {
        setCustomers(response.data)
      }

    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }
  }

  const getCustomerCount = async () => {
    try {
      const params = {};
      if(searchName && searchName.trim() !== "") {
        params.postName = searchName;
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/customers/notices/count`,
        {
          params,
        }
      );
      if(response.data) {
        setTotalCustomers(response.data)
      }
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
    }
  }


  useEffect(()=>{
    pageingCustomersNotices();
    getCustomerCount();
    pageNum();
  },[pageNumber, totalCustomers])

  const handleSearchClick = async () => {
    pageingCustomersNotices();
    setPageNumber(0);
  }

  //페이징
  let totalPages = Math.ceil(totalCustomers / pageSize);
  if (totalPages < 1) { totalPages = 1; }
  if (totalCustomers === 0) { totalPages = 0; }
  
  const [pageNums, setPageNums] = useState([])
  const pageNum = () => {
    setPageNums([]);
    // 최대치 설정
    for (let index = 0; index < totalPages; index++) {
      setPageNums(pageNums => [...pageNums, index+1])
    }
  }


  return(
    <div className="user-customers">
      <div className="user-customers-header">
        <h3 className="user-customers-header-h3">
          고객지원
        </h3>
        <ul className="user-customers-header-menu">
        {menus.map((menu, index)=>(
            <li key={index} onClick={()=>setPostState(index)} className={postState === index ? "on" : ""}> <h5>{menu}</h5> </li>
          ))}
        </ul>
      </div>
      <div className="user-customers-wrap">
        {postState === 0 && (
          <div className="user-customers-wrap-post">

            <div className="user-customers-wrap-post-header">
              <h4 className="user-customers-wrap-post-header-h4">
                공지사항
              </h4>

              <div className="user-customers-wrap-post-heade-search">
                <input id='manager-post-serch' className='width200' type="text" placeholder="제목"
                value={searchName}
                onChange={(e)=>(setSearchName(e.target.value))}
                onKeyDown={(e)=>{if(e.key === "Enter") {handleSearchClick()} }} />
                <button onClick={()=>handleSearchClick()}
                  > 검색 </button>
              </div>
            </div>
            <div className="user-customers-wrap-post-notices">
              <ul className="user-customers-wrap-post-list">
                {customers.map((notices, index)=>(
                  <li key={index}> <a href={`/customers/${notices.post_type}/${notices.post_code}`}> {notices.post_title} </a> 
                  <div className="user-customers-wrap-post-list-info"> <span>{notices.author}</span> <span> {notices.created_at.substr(0,10)} </span> </div>  </li>
                ))}
                {/* <li> <a href="/customers/코드"> 제목 </a> <div className="user-customers-wrap-post-list-info"> <span>작성자</span> <span>작성일</span> </div>  </li> */}
              </ul>
              <div className="user-customers-wrap-post-paging">
                <button onClick={()=>setPageNumber(pageNumber - 1)}
                  style={{color: pageNumber === 0 ? '#aaa' : '#fff'}}
                  disabled={pageNumber === 0}>◀</button>
                {/* , backgroundColor:  pageNumber === 0 ? '#c25d16' : '#ff7916' */}
                {pageNums && pageNums.map((e,i)=>(
                  <>
                    <span key={i} className={i===pageNumber ? "on" : ""} onClick={()=>setPageNumber(i)}> {e} </span> {e < totalPages && ( <> / </> )}
                  </>
                ))}
                
                <button onClick={()=>setPageNumber(pageNumber + 1)}
                  style={{color: (pageNumber + 1) >= totalPages ? '#aaa' : '#fff'}}
                  disabled={ (pageNumber + 1) >= totalPages }>▶</button>
                {/* , backgroundColor:  (pageNumber + 1) >= totalPages ? '#c25d16' : '#ff7916' */}
              </div>
              
            </div>

          </div>
        )}
      </div>
    </div>
  )
}


export default Customers;