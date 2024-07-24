<?php
$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'POST') {
    $jsonString = file_get_contents('php://input');

    // 解析JSON数据
    $jsonData = json_decode($jsonString, true);
    if ($jsonData !== null) {
        // 修改JSON数据（这里只是一个简单的例子，你可能需要根据实际情况进行更复杂的处理）
        $jsonData["name"] = "jidwao";
        $updatedJsonString = json_encode($jsonData);
        echo json_encode(['message' =>  $updatedJsonString]);
        // 将修改后的数据写回到JSON文件
        $jsonFileName = 'data.json';
        file_put_contents($jsonFileName, json_encode($jsonData));

        // 返回成功的响应
        http_response_code(200);
        echo json_encode(['message' => 'JSON文件更新成功']);
    } else {
        // 返回无效数据的错误响应
        http_response_code(400);
        echo json_encode(['message' => '无效的JSON数据']);
    }

}
?>
