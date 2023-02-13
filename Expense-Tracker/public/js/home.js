const form = document.getElementById('form-detail');
const il = document.getElementById('listOfExpenses');
const token = localStorage.getItem('token');

async function addExpense(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const expense = {
    amount,
    description,
    category
  };
  
try {
    await axios.post("http://localhost:2000/expense/add-expense", expense, {headers:{'Authorization': token}});
    refreshExpenses(currentPage); 
  } catch (err) {
    console.error(err);
  }
}

const itemsPerPage = 5;
async function refreshExpenses(currentPage) {
  try {
    const res = await axios.get("http://localhost:2000/expense/get-expense", {headers:{'Authorization': token}});
    il.innerHTML = ''; //clear the current expense list
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    for (let i = startIndex; i < endIndex && i < res.data.allExpenses.length; i++) {
      showExpenses(res.data.allExpenses[i]);
    }
    // clear form field
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value ='';
    showPagination(currentPage, Math.ceil(res.data.allExpenses.length / itemsPerPage));
  } catch (err) {
    console.error(err);
  }
}

function showPagination(currentPage, totalPages) {
  let paginationHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<span class="current-page">${i}</span>`;
    } else {
      paginationHTML += `<span class="page" onclick="currentPage=${i}; refreshExpenses(${i})">${i}</span>`;
    }
  }
  pagination.innerHTML = paginationHTML;
}

function showPremiumuserMessage() {
  document.getElementById('rzp-button').style.display = "none";
  document.getElementById('message').innerHTML = "Premium!";
}


function notPremiumUser () {
  const isPremium = localStorage.getItem("isPremium");
  if (!isPremium) {
    const downloadButton = document.getElementById("downloadexpense");
    downloadButton.style.visibility = "hidden";
  }
}


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const decodeToken = parseJwt(token)
    const ispremiumuser = decodeToken.ispremiumuser
    if(ispremiumuser){
        showPremiumuserMessage()
        showLeaderboard()
        download()
      } else {
        notPremiumUser();
      }
    const res = await axios.get("http://localhost:2000/expense/get-expense", {headers:{'Authorization': token}} );
    for (let i = 0; i < res.data.allExpenses.length; i++) {
      showExpenses(res.data.allExpenses[i]);
      refreshExpenses();
    }
  } catch (err) {
    console.error(err);
  }
});


function showExpenses(user){
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('category').value ='';

  const parentNode = document.getElementById('listOfExpenses');

  // Add heading only if it doesn't exist
  if (!document.getElementById('expenses-heading')) {
    parentNode.innerHTML = `<li id="expenses-heading">
                              <b>Expenses</b>
                            </li>` + parentNode.innerHTML;
  }

  const childHTML = `<li id=${user.id} > ${user.amount} - ${user.description} - ${user.category} 
                         <button onclick=deleteExpense('${user.id}')> Delete Expense </button>
                      </li>`

  parentNode.innerHTML += childHTML;
};

let currentPage = 1;
async function deleteExpense(id) {
  try {
    await axios.delete(`http://localhost:2000/expense/delete-expense/${id}`, {headers:{'Authorization': token}});
    refreshExpenses(currentPage); 
  } catch (err) {
    console.error(err);
  }
}

function removeExpense(userid) {
    const expenseId = document.getElementById(`${userid}`);
    if (expenseId != null) {
        il.removeChild(expenseId);
    }
};

//premium features

async function download() {
  try {
  const response = await axios.get('http://localhost:2000/user/download', { headers: { Authorization: token } });
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
    const a = document.createElement("a");
    a.href = response.data.fileURL;
    a.download = "myexpenses.csv";
    a.click();
    // console.log(a);
   } catch (err) {
    console.error(err);
    }
};  


async function showLeaderboard() {
  const inputElement = document.createElement("input");
  inputElement.type = "button";
  inputElement.value = "Show Leaderboard";
  inputElement.onclick = async () => {
    const { data: userLeaderBoardArray } = await axios.get(
      "http://localhost:2000/premium/showLeaderBoard",
      { headers: { Authorization: token } }
    );
    console.log(userLeaderBoardArray);

    const leaderboardElem = document.getElementById("leaderboard");
    leaderboardElem.innerHTML = "<h2> Leaderboard </h2>";
    userLeaderBoardArray.forEach(({ name, total_cost = 0 }) => {
      leaderboardElem.innerHTML += `<li>Name: ${name} | Total Expense = ${total_cost}</li>`;
    });
  };
  document.getElementById("message").appendChild(inputElement);
};


document.getElementById('rzp-button').onclick= async function(e){
  const response= await axios.get('http://localhost:2000/purchase/premiummembership',{headers:{'Authorization': token}})
  console.log(response);
  var options= {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function(response){
          await axios.post("http://localhost:2000/purchase/updatetransctionstatus", {
              order_id : options.order_id,
              payment_id : response.razorpay_payment_id,
          } , {headers:{'Authorization': token}} )
          // alert('you are a premium user')
         showLeaderboard()
         showPremiumuserMessage()
      }
  }
  const rzp1= new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function(response){
      console.log(response)
      alert('payment failed');
  })
};
