function getMonthBefore(monthsToSubtract) {
  var currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - monthsToSubtract);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var oneMonthBeforeDate =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;

  return oneMonthBeforeDate;
}

function getDateBefore(dateBefore) {
  var currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - dateBefore);
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = {
  getMonthBefore,
  getDateBefore,
  getCurrentDate,
};
