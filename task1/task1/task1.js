  var resultObject = {};
  var sortedData = [];
  var result = []; //contains unique words
  var count_arr = []; //contains the count of a particular word corresponding to the result array

  function arrangeData() {
      resetData();
      splitAndConcatData();
      singleArr.sort();
      var j = -1,
          last = 0,
          count = 0;

      for (var i in singleArr) {
          if (singleArr[i] != last) {
              count = 1;
              j++;
              result.push(last = singleArr[i]);
              count_arr[j] = count;

          } else {
              count++;
              count_arr[j] = count;
          }
      }

      insertInAnObject();
      sortData();
      displayData();


  }

  function splitAndConcatData() {
      t1 = document.getElementById('text1').value.trim().split(/\s+/);
      t2 = document.getElementById('text2').value.trim().split(/\s+/);
      t3 = document.getElementById('text3').value.trim().split(/\s+/);
      t4 = document.getElementById('text4').value.trim().split(/\s+/);
      t5 = document.getElementById('text5').value.trim().split(/\s+/);
      singleArr = t1.concat(t2, t3, t4, t5);
  }
  function resetData(){
     resultObject = {};
     sortedData = [];
     result = [];
     count_arr = [];
  }
  
  function insertInAnObject() {
      for (var i = 0; i < result.length; i++) {
          resultObject[result[i]] = count_arr[i];
      }

  }

  function sortData() {
      for (var item in resultObject) {
          sortedData.push([item, resultObject[item]]);
      }
      sortedData.sort(function(a, b) {
          return b[1] - a[1];
      })
  }

  function displayData() {
      document.getElementById('result1').innerHTML = "Unique word count is " + sortedData.length + "<br><br>";
      content = "<table>";

      for (var i = 0; i < result.length; i++) {
          content += "<tr>" + "<td>" + sortedData[i][0] + "</td>" + "<td>" + sortedData[i][1] + "</td>" + "</tr>";



      }
      content += "</table>";
      document.getElementById('result1').innerHTML += content;
  }