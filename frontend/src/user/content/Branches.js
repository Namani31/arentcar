import React, { useState, useEffect} from "react";
import axios from "axios";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchPostCode, setBranchPostCode] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchPickup, setBranchPickup] = useState("");
  const [branchReturn, setBranchReturn] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/branches`);
        if (response.data) {
          setBranches(response.data);
          console.log(branches);
        }
      } catch (error) {
        console.error("There was an error fetching the branches", error);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchGuideClick = (branch) => {
    console.log(branch.branch_detailed_address)
    setBranchName(branch.branch_name);
    setBranchAddress(branch.branch_detailed_address);
    setBranchPostCode(branch.post_code);
    setBranchPhone(branch.branch_phone_number);
    setBranchPickup(branch.available_pickup_time);
    setBranchReturn(branch.available_return_time);
  }

  return (
    <div className="branches-guide-wrap">
      <div>
        {branches.map((branch, index) => (
            <div className="branches-guide-menu-wrap" key={index} onClick={() => handleBranchGuideClick(branch)}>
            {branch.branch_name}
            </div>
        ))}
      </div>
      <div className="branches-guide-content-wrap">
        <div className="branches-guide-map-wrap" style={{width:'100%', height:'400px;'}}></div>
        <div className="branches-guide-info-wrap">{branchName}, {branchAddress}, {branchPostCode}, {branchPhone}, {branchPickup} ~ {branchReturn}</div>
      </div>
    </div>
  );
};

export default Branches;
