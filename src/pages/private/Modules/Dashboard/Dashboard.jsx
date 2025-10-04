import React from "react";
import HeaderNavigation from "../../../../components/HeaderNavigation/HeaderNavigation";
import GradientText from "../../../../components/GradientText/GradientText";

const getGreeting = () => {
  const h = new Date().getHours(); // 0–23, from user's device time
  if (h >= 5 && h < 12) return "Good Morning";
  if (h >= 12 && h < 17) return "Good Afternoon";
  if (h >= 17 && h < 21) return "Good Evening";
  return "Good Night";
};

const Dashboard = () => {
  const greeting = getGreeting();

  return (
    <div className="dashboard-container">
      <HeaderNavigation>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          {greeting}
        </GradientText>
      </HeaderNavigation>
    </div>
  );
};

export default Dashboard;
