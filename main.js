

let allNumbers = [];
let listOfNumberRepeat = []

let largeOfNumberRepeat = 0;
let numberOfRepeat = 0;
let totalNumberRepeat = 0

// base function

const addTwoTime = (str1, str2) => {
  const time1 = str1.split(":");
  const time2 = str2.split(":");
  const time3 = time1.map((num) => parseInt(num));
  const time4 = time2.map((num) => parseInt(num));
  const timeResult = [0, 0, 0];

  if (time3[2] + time4[2] >= 60) {
    timeResult[1] = 1;
    timeResult[2] = time3[2] + time4[2] - 60;
  } else {
    timeResult[2] = time3[2] + time4[2];
  }
  if (time3[1] + time4[1] + timeResult[1] >= 60) {
    timeResult[0] = 1;
    timeResult[1] = time3[1] + time4[1] + timeResult[1] - 60;
  } else {
    timeResult[1] = time3[1] + time4[1] + timeResult[1];
  }
  if (time3[0] + time4[0] + timeResult[0] >= 24) {
    timeResult[0] = time3[0] + time4[0] + timeResult[0] - 24;
  } else {
    timeResult[0] = time3[0] + time4[0] + timeResult[0];
  }
  return timeResult.join(":");
};

const convertNumberToTime = (num) => {
  const secondsPerOnce = 45;
  num %= 10000;
  const stoneTime = "07:00:06";
  const result = new Date(num * secondsPerOnce * 1000)
    .toISOString()
    .slice(11, 19);
  return addTwoTime(stoneTime, result);
};

const isSameNumber = (num1, num2) => {
  if (num1 <= 49 && num2 <= 49) return true;
  else if (num1 > 49 && num2 > 49) {
    return true;
  } else return false;
};




const mainFn = (num1, title = '') => {
  
  let result = new Object();
  // Tong so da nhap
  if (allNumbers.length > 1000) {
    allNumbers.shift()
  }

  let titleNum = parseInt(title)

  if (titleNum % 10000 == 0){
    largeOfNumberRepeat = 0
    result.largeOfNumberRepeat = largeOfNumberRepeat
    result.totalNumberRepeat = totalNumberRepeat
    totalNumberRepeat = 0
    listOfNumberRepeat.length = 0
  }

  

  allNumbers.push(num1);
  if (allNumbers.length > 12) {
    if (
      !isSameNumber(
        allNumbers[allNumbers.length - 1],
        allNumbers[allNumbers.length - 11]
      )
    ) {
      numberOfRepeat++;
      if (numberOfRepeat == 5 && listOfNumberRepeat[listOfNumberRepeat.length - 1] <= 4) {
        result.message = 'Zô đánh bạn ơi!'
      }else if (numberOfRepeat == 5 && listOfNumberRepeat[listOfNumberRepeat.length - 1] > 4) {
        result.message = 'Thua roi do'
      }

      if (listOfNumberRepeat[listOfNumberRepeat.length - 1] > 4 && numberOfRepeat <= 4){
        if(numberOfRepeat == 1){
          result.message = 'Đánh x3'
        }else if(numberOfRepeat == 2){
          result.message = 'Đánh x8'
        }else if(numberOfRepeat == 3){
          result.message = 'Đánh x20'
        }else if(numberOfRepeat == 4){
          result.message = 'Đánh x40'
        }
      }
    } else {
      if (numberOfRepeat > 4 && listOfNumberRepeat[listOfNumberRepeat.length - 1] > 4) {
        totalNumberRepeat = totalNumberRepeat - 72
        result.isSuccess = false
        result.totalNumberRepeat = totalNumberRepeat
      }else if (numberOfRepeat > 4 && listOfNumberRepeat[listOfNumberRepeat.length - 1] <= 4) {
        result.message = 'Đánh được rồi đó. Đánh x1'
      }

      if (listOfNumberRepeat[listOfNumberRepeat.length - 1] > 4 && numberOfRepeat <= 4){
        if (numberOfRepeat == 0){
            totalNumberRepeat = totalNumberRepeat + 1
        }else if (numberOfRepeat == 1){
            totalNumberRepeat = totalNumberRepeat + 2
        }else if (numberOfRepeat == 2){
            totalNumberRepeat = totalNumberRepeat + 4
        }else if (numberOfRepeat == 3){
            totalNumberRepeat = totalNumberRepeat + 8
        }else if (numberOfRepeat == 4){
            totalNumberRepeat = totalNumberRepeat + 8
        }

        result.isSuccess = true
        result.totalNumberRepeat = totalNumberRepeat
      }
      listOfNumberRepeat.push(numberOfRepeat)

      numberOfRepeat = 0;
    }

    if (numberOfRepeat > largeOfNumberRepeat) {
      largeOfNumberRepeat = numberOfRepeat;
    }
  }
  return result
};


let prevTitle = '0'

const handleChangeData = (data => {
    if (prevTitle != data.title){
      prevTitle = data.title
      let num = parseInt(data.number.slice(-2)).toString()
      console.log(data.title)
      return mainFn(num, data.title)
    }

  })

module.exports = handleChangeData