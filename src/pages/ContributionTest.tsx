import React, { useState } from "react";
import { Contribution } from "@/components/molecules";

const ContributionTest: React.FC = () => {
  const [percentage, setPercentage] = useState(31.6);

  return (
    <div style={{ 
      padding: "40px", 
      backgroundColor: "#080808", 
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>Contribution 컴포넌트 테스트</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label>
          퍼센트 값: 
          <input 
            type="number" 
            value={percentage} 
            onChange={(e) => setPercentage(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
            style={{ 
              marginLeft: "10px", 
              padding: "5px",
              backgroundColor: "#2b2b2b",
              color: "white",
              border: "1px solid #5e5e5e",
              borderRadius: "4px"
            }}
          />
        </label>
      </div>

      <div style={{ maxWidth: "600px" }}>
        <Contribution percentage={percentage} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>다른 퍼센트 값들</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Contribution percentage={0} title="0% 테스트" />
          <Contribution percentage={50} title="50% 테스트" />
          <Contribution percentage={100} title="100% 테스트" />
        </div>
      </div>
    </div>
  );
};

export default ContributionTest; 