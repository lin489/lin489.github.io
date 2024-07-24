var SelectMode = '林下参'

var forestProperties = {
    "县区":"",
    "乡村":"",
    "所属":"",
    "坡向":"",
    "坡度":"",
    "树木":"",
    "分级":"",

}
var gardenProperties = {
    "县区":"",
    "参龄":""
}


layui.use('form', function () {
    var form = layui.form;

    //监听提交
    form.on('submit(SelectForestData)', function (data) {

        forestProperties.县区 = (data.field.县区);
        forestProperties.乡村 = (data.field.乡村);
        forestProperties.所属 = (data.field.所属);
        forestProperties.坡向 = (data.field.坡向);
        forestProperties.坡度 = (data.field.坡度);
        forestProperties.树木 = (data.field.树木);
        forestProperties.分级 = (data.field.分级);
        console.log(forestProperties)
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                datasource.entities._entities._array.forEach(entity => {
                    try{
                        if(entity.properties.地块类 == '林下参'){
                            entity.show = true;
                        }else{
                            entity.show = false;
                        }
                        if(forestProperties.县区!=''&& entity.properties.县区!=forestProperties.县区){
                            entity.show =false;
                        }
                        if(forestProperties.乡村!=''&& entity.properties.乡村!=forestProperties.乡村){
                            entity.show =false;
                        }
                        if(forestProperties.所属!=''&& entity.properties.所属!=forestProperties.所属){
                            entity.show =false;
                        }
                        if(forestProperties.坡向!=''&& entity.properties.坡向!=forestProperties.坡向){
                            entity.show =false;
                        }
                        if(forestProperties.坡度!=''&& entity.properties.坡度!=forestProperties.坡度){
                            entity.show =false;
                        }
                        if(forestProperties.树木!=''&& entity.properties.树木!=forestProperties.树木){
                            entity.show =false;
                        }
                        if(forestProperties.分级!=''&& entity.properties.分级!=forestProperties.分级){
                            entity.show =false;
                        }

                    }
                    catch{}
                    
            });
            }
        });
        switch(data.field.县区){
            case '东昌区':
            viewer0.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(125.934696, 41.655546, 70000),
                orientation: {
                  heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                  pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                  roll: 0 // 视口翻滚角度
                }
              });
            break;
            case '二道江区':
                viewer0.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(126.104696, 41.785546, 70000),
                    orientation: {
                      heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                      pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                      roll: 0 // 视口翻滚角度
                    }
                  });
                break;
                case '通化县':
                    viewer0.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(125.884696, 41.685546, 160000),
                        orientation: {
                          heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                          pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                          roll: 0 // 视口翻滚角度
                        }
                      });
                    break;
                    case '辉南县':
                        viewer0.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(126.294696, 42.555546, 120000),
                            orientation: {
                              heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                              pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                              roll: 0 // 视口翻滚角度
                            }
                          });
                        break;
                        case '柳河县':
                            viewer0.camera.flyTo({
                                destination: Cesium.Cartesian3.fromDegrees(125.954696, 42.165546, 170000),
                                orientation: {
                                  heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                  pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                  roll: 0 // 视口翻滚角度
                                }
                              });
                            break;
                            case '集安市':
                                viewer0.camera.flyTo({
                                    destination: Cesium.Cartesian3.fromDegrees(126.034696, 41.185546, 153000),
                                    orientation: {
                                        heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                        pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                        roll: 0 // 视口翻滚角度
                                    }
                                });
                                break;
                                default:
                                    viewer0.camera.flyTo({
                                        destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
                                        orientation: {
                                          heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                          pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                          roll: 0 // 视口翻滚角度
                                        }
                                      });
                                    break;
        }

        return false;
    });
    var layer = layui.layer;
    // select 事件
    form.on('select(SelectForestCounty)', function(data){
      var elem = data.elem; // 获得 select 原始 DOM 对象
      var value = data.value; // 获得被选中的值
      var othis = data.othis; // 获得 select 元素被替换后的 jQuery 对象
      console.log(value)
      console.log(form)
      $("#forestSelect")[0].reset();

    $('#SelectForestCounty').val(value);
    layui.form.render();

    //   $("#SelectForestCounty").val(value);
    //   form.render("SelectForestCounty");
    });
});


layui.use('form', function () {
    var form = layui.form;
    //监听提交
    form.on('submit(SelectGardenData)', function (data) {

        gardenProperties.县区 = (data.field.县区);
        gardenProperties.参龄 = (data.field.参龄);
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                datasource.entities._entities._array.forEach(entity => {
                    try{
                        if(entity.properties.地块类 == '园参'){
                            entity.show = true;
                        }else{
                            entity.show = false;
                        }
                        if(gardenProperties.县区!=''&& entity.properties.县区!=gardenProperties.县区){
                            entity.show =false;
                        }
                        if(gardenProperties.参龄!=''&& entity.properties.参龄!=gardenProperties.参龄){
                            entity.show =false;
                        }
                    }
                    catch{}
                    
            });
            }
        });
        switch(data.field.县区){
            case '东昌区':
            viewer0.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(125.934696, 41.655546, 70000),
                orientation: {
                  heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                  pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                  roll: 0 // 视口翻滚角度
                }
              });
            break;
            case '二道江区':
                viewer0.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(126.104696, 41.785546, 70000),
                    orientation: {
                      heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                      pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                      roll: 0 // 视口翻滚角度
                    }
                  });
                break;
                case '通化县':
                    viewer0.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(125.884696, 41.685546, 160000),
                        orientation: {
                          heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                          pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                          roll: 0 // 视口翻滚角度
                        }
                      });
                    break;
                    case '辉南县':
                        viewer0.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(126.294696, 42.555546, 120000),
                            orientation: {
                              heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                              pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                              roll: 0 // 视口翻滚角度
                            }
                          });
                        break;
                        case '柳河县':
                            viewer0.camera.flyTo({
                                destination: Cesium.Cartesian3.fromDegrees(125.954696, 42.165546, 170000),
                                orientation: {
                                  heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                  pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                  roll: 0 // 视口翻滚角度
                                }
                              });
                            break;
                            case '集安市':
                                viewer0.camera.flyTo({
                                    destination: Cesium.Cartesian3.fromDegrees(126.034696, 41.185546, 153000),
                                    orientation: {
                                        heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                        pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                        roll: 0 // 视口翻滚角度
                                    }
                                });
                                break;
                                default:
                                    viewer0.camera.flyTo({
                                        destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
                                        orientation: {
                                          heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                                          pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                                          roll: 0 // 视口翻滚角度
                                        }
                                      });
                                    break;
        }
        return false;
    });
});

function ChangeSelectMode(){
    if(SelectMode == '林下参'){
        document.getElementById("forestSelect").style.display = 'none';
        document.getElementById("gardenSelect").style.display = 'Block';
        SelectMode = '园参';

        document.getElementById("selectModeBtn").innerHTML = SelectMode;
        
        console.log(SelectMode);
    }else{
        document.getElementById("gardenSelect").style.display = 'none';
        document.getElementById("forestSelect").style.display = 'block';
        SelectMode = '林下参';
        document.getElementById("selectModeBtn").innerHTML = SelectMode;

    }
}


// layui.use('form', function () {
//     var form = layui.form;
//     //监听提交
//     form.on('submit(SelectForestData)', function (data) {
//         forestProperties.县区 = (data.field.县区);
//         forestProperties.乡村 = (data.field.乡村);
//         forestProperties.所属 = (data.field.所属);
//         forestProperties.坡向 = (data.field.坡向);
//         forestProperties.坡度 = (data.field.坡度);
//         forestProperties.树木 = (data.field.树木);
//         forestProperties.分级 = (data.field.分级);
//         console.log(forestProperties)
//         viewer0.dataSources._dataSources.forEach(datasource => {
//             if (datasource._name == 'geojson/通化所有数据.geojson') {
//                 datasource.entities._entities._array.forEach(entity => {
//                     try{
//                         if(entity.properties.地块类 == '林下参'){
//                           entity.polygon.material = Cesium.Color.RED.withAlpha(0.9);
//                         }else{
//                             entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
//                         }
//                         if(forestProperties.县区!=''&& entity.properties.县区!=forestProperties.县区){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.乡村!=''&& entity.properties.乡村!=forestProperties.乡村){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.所属!=''&& entity.properties.所属!=forestProperties.所属){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.坡向!=''&& entity.properties.坡向!=forestProperties.坡向){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.坡度!=''&& entity.properties.坡度!=forestProperties.坡度){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.树木!=''&& entity.properties.树木!=forestProperties.树木){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(forestProperties.分级!=''&& entity.properties.分级!=forestProperties.分级){
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }

//                     }
//                     catch{}
                    
//             });
//             }
//         });
//         return false;
//     });
// });

// layui.use('form', function () {
//     var form = layui.form;
//     //监听提交
//     form.on('submit(SelectGardenData)', function (data) {
//         gardenProperties.县区 = (data.field.县区);
//         console.log(gardenProperties)
//         viewer0.dataSources._dataSources.forEach(datasource => {
//             if (datasource._name == 'geojson/通化所有数据.geojson') {
//                 datasource.entities._entities._array.forEach(entity => {
//                     try{
//                         if(entity.properties.地块类 == '园参'){
//                            entity.polygon.material = Cesium.Color.RED.withAlpha(0.9);
//                         }else{
//                             entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
//                         }
//                         if(gardenProperties.县区!=''&& entity.properties.县区!=gardenProperties.县区){
//                             entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
//                         }
//                     }
//                     catch{}
                    
//             });
//             }
//         });
//         return false;
//     });
// });

// function ChangeSelectMode(){
//     if(SelectMode == '林下参'){
//         document.getElementById("forestSelect").style.display = 'none';
//         document.getElementById("gardenSelect").style.display = 'Block';
//         SelectMode = '园参';

//         document.getElementById("selectModeBtn").innerHTML = SelectMode;
        
//         console.log(SelectMode);
//     }else{
//         document.getElementById("gardenSelect").style.display = 'none';
//         document.getElementById("forestSelect").style.display = 'block';
//         SelectMode = '林下参';
//         document.getElementById("selectModeBtn").innerHTML = SelectMode;

//     }
// }
