// 添加推荐并保存到 localStorage
function addRecommendation() {
  // 获取推荐内容
  let recommendation = document.getElementById("new_recommendation");
  
  // 如果有推荐内容
  if (recommendation.value != null && recommendation.value.trim() != "") {
    console.log("New recommendation added");

    // 获取 localStorage 中的现有推荐列表
    let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    
    // 将新推荐添加到数组中
    recommendations.push(recommendation.value.trim());
    
    // 将更新后的数组存回 localStorage
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
    
    // 重新渲染推荐列表
    displayRecommendations();

    // 清空输入框
    recommendation.value = "";

    // 显示弹窗
    showPopup(true);
  }
}

// 显示推荐列表（从 localStorage 加载）
function displayRecommendations() {
  const recommendationsContainer = document.getElementById("all_recommendations");
  recommendationsContainer.innerHTML = ""; // 清空现有内容
  
  // 从 localStorage 获取推荐列表
  const recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
  
  // 遍历推荐列表并添加到页面
  recommendations.forEach((rec, index) => {
    var element = document.createElement("div");
    element.setAttribute("class", "recommendation");
    
    // 添加推荐内容和删除按钮
    element.innerHTML = `
      <span>&#8220;</span>${rec}<span>&#8221;</span>
      <button class="delete-btn" onclick="deleteRecommendation(${index})">Supprimer</button>
    `;
    
    recommendationsContainer.appendChild(element);
  });
}

// 删除推荐
function deleteRecommendation(index) {
  // 从 localStorage 获取推荐列表
  let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
  
  // 删除指定索引的推荐
  recommendations.splice(index, 1);
  
  // 更新 localStorage
  localStorage.setItem("recommendations", JSON.stringify(recommendations));
  
  // 重新渲染推荐列表
  displayRecommendations();
}

// 显示/隐藏弹窗
function showPopup(bool) {
  if (bool) {
    document.getElementById('popup').style.visibility = 'visible';
  } else {
    document.getElementById('popup').style.visibility = 'hidden';
  }
}

// 页面加载时显示推荐列表
window.onload = function () {
  displayRecommendations();
};