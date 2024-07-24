var geojsonUrl = 'geojson/东昌区林下参.geojson';
var jsonUrl = 'LayuiJson/TableJson.json';


// // 创建一个XMLHttpRequest对象
// var xhr = new XMLHttpRequest();

// // 指定请求方法和URL
// xhr.open('GET', geojsonUrl, true);

// // 监听请求加载完成的事件
// xhr.onload = function () {
//   if (xhr.status >= 200 && xhr.status < 300) {
//     // 解析JSON数据
//     var jsonData = JSON.parse(xhr.responseText);
//     console.log(jsonData)
//     // 修改JSON数据
//     // jsonData.features = [{"FID":1},{"FID":2}];

//     // 将修改后的数据转换回JSON字符串
//     var updatedJsonString = JSON.stringify(jsonData);

//     // 创建一个新的XMLHttpRequest对象用于发送修改后的数据到服务器
//     var updateRequest = new XMLHttpRequest();

//     // 指定请求方法和URL
//     updateRequest.open('Post', 'update_data.php', true);

//     // 设置请求头
//     updateRequest.setRequestHeader('Content-Type', 'application/json');

//     // 监听请求加载完成的事件
//     updateRequest.onload = function () {
//       if (updateRequest.status >= 200 && updateRequest.status < 300) {
//         console.log('JSON文件更新成功');
//       } else {
//         console.error('更新JSON文件时发生错误');
//       }
//     };

//     // 发送修改后的JSON数据到服务器
//     updateRequest.send(updatedJsonString);
//   } else {
//     console.error('加载JSON文件时发生错误');
//   }
// };
// console.log(1)
// 发送请求
// xhr.send();

var request = new XMLHttpRequest();
request.open("get", 'geojson/东昌区林下参.geojson');/*设置请求方法与路径*/
request.send(null);/*不发送数据到服务器*/
request.onload = function () {/*XHR对象获取到返回信息后执行*/
  if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
    let text = request.responseText;
    var jsonData = JSON.parse(xhr.responseText);
    jsonData.
    let newText = text.replaceAll("\"properties\":{", "");
    newText = newText.replaceAll("}},{\"", "},{\"");
    newText = newText.replace("}}]}", "}]}");
    console.log(newText);

  }
}