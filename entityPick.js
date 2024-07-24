
/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
var editGeojsonEntityCollectionId;
var text = '';
var json = '';
var previousPick;
var previousPickColor;
window.pick;
window.lockJiAnPick = false;
window.pickEntity;
let heightEntity = null;

//单击拾取事件
let handler = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);//处理用户输入事件
handler.setInputAction(function (event) {       // 设置左键点击事件
    var picks = viewer0.scene.drillPick(event.position);
    picks.forEach(pick => {
        if (Cesium.defined(pick)) {// 判断是否获取到了 pick 
            if (typeof pick.id._properties.乡村 === 'undefined') {
                // document.getElementById("dataINFO").style.display = 'none';
            } else {
                if (pick.id.polygon.material._color._value.alpha > 0.5) {
                    HighLightEntity(pick.id)
                }
                console.log(pick)
                
                var rightClickDiv = document.getElementById("rightClick");
                rightClickDiv.style.display = 'block';
                rightClickDiv.style.top = event.position.y+100 + 'px'
                rightClickDiv.style.left = event.position.x + 'px'
                console.log(rightClickDiv.style.top+","+rightClickDiv.style.left )
                this.pick = pick;
                pickEntity = pick.id;

            }
        } else {
            document.getElementById("dataINFO").style.display = 'none';
        }
    });

}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

function LoadDataInfoPanel() {
    document.getElementById("rightClick").style.display = 'none';
    console.log(pickEntity._properties.地块类)
    if(pickEntity._properties.地块类 == '林下参'){
        ShowDataInfoPanel();
    try {
        document.getElementById("info01").innerText = pickEntity._properties.县区;
        document.getElementById("info02").innerText = pickEntity._properties.乡村;
        document.getElementById("info03").innerText = pickEntity._properties.所属;
        document.getElementById("info04").innerText = parseFloat(pickEntity._properties.面积).toFixed(6) + ' (㎡)';
        document.getElementById("info05").innerText = pickEntity._properties.坡向;
        document.getElementById("info06").innerText = pickEntity._properties.坡度;
        document.getElementById("info07").innerText = pickEntity._properties.树木;
    } catch (error) {
        console.log(error);
    }
    }else{
    
        ShowGardenDataInfoPanel();
        try {
            document.getElementById("info01_garden").innerText = pickEntity._properties.县区;
            document.getElementById("info02_garden").innerText = pickEntity._properties.乡村;
            document.getElementById("info03_garden").innerText = pickEntity._properties.所属;
            document.getElementById("info04_garden").innerText = parseFloat(pickEntity._properties.面积).toFixed(6) + ' (㎡)';
            document.getElementById("info05_garden").innerText = pickEntity._properties.租赁周期;
            document.getElementById("info06_garden").innerText = pickEntity._properties.播种时间;
            document.getElementById("info07_garden").innerText = pickEntity._properties.参龄;
            document.getElementById("info08_garden").innerText = pickEntity._properties.采收时间;
        } catch (error) {
            console.log(error);
        }
    
    }

}

function DeleteEntity(){
    console.log(pickEntity);
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson'||datasource._name == 'measureLayer') {
            datasource.entities.remove(pickEntity);
            document.getElementById("rightClick").style.display = 'none';
        }
    });

}

let handler_1 = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);//处理用户输入事件
handler_1.setInputAction(function (event) {       // 设置左键点击事件
    // var pick = viewer0.scene.pick(event.position);
    // if (Cesium.defined(pick)) {// 判断是否获取到了 pick 
    //     //console.log(pick);
    //     if (typeof pick.id._properties.乡村 === 'undefined') {
    //         document.getElementById("dataINFO").style.display = 'none';
    //         HighLightEntity(null);
    //     } else {
    //     }
    // } else {
    //     document.getElementById("dataINFO").style.display = 'none';
    //     HighLightEntity(null);
    // }
    document.getElementById("rightClick").style.display = 'none';
    HighLightEntity(null);
    RetreatPanel();
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


//双击集安事件
let handler_2 = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);
handler_2.setInputAction(function (event) {
    var pick = viewer0.scene.pick(event.position);
    if (!lockJiAnPick && pick.id._name == '集安市') {
        if (JiAnMode == 'Forest') {
            LoadJiAnForestShp();
        } else if (JiAnMode == 'Garden') {
            LoadJiAnGardenShp();
        } else if (JiAnMode == 'All') {
            LoadJiAnShp();
        }
        inJiAn = true;
    }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


function HighLightEntity(entity) {
    if (previousPick != null) {
        previousPick.polygon.material = previousPickColor;
        previousPick = null;
        previousPickColor = null;
    }
    if (entity != null) {
        previousPickColor = entity.polygon.material;
        previousPick = entity;
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                if (heightEntity) {
                    datasource.entities.remove(heightEntity);
                }
                try {
                    heightEntity = datasource.entities.add({
                        polyline: {
                            positions: entity.polygon.hierarchy._value.positions,
                            width: 5,
                            material: new Cesium.PolylineGlowMaterialProperty({
                                glowPower: 0.5, // 一个数字属性，指定发光强度，占总线宽的百分比。
                                color: Cesium.Color.ORANGERED,
                            }),
                            clampToGround: true,
                        },
                    });
                } catch {

                }
                entity.polygon.material = Cesium.Color.RED.withAlpha(1);
            }
        });
    } else {
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                if (heightEntity) {
                    datasource.entities.remove(heightEntity);
                }
            }
        });

    }
}


//启用编辑
// function EditInfo() {
//     if(text!=''){
//         if(pick.id.entityCollection._id!=editGeojsonEntityCollectionId){
//             layui.use('form', function () {
//                 layer.msg('非选择所编辑的文件,请选择矢量-可编辑json文件作为所要修改的数据');
//                 console.log(text);
//                 console.log(pick.id.entityCollection._id);
//                 console.log(editGeojsonEntityCollectionId);
//           });
//           return;
//         }

//         document.getElementById("edit01").value = pick.id._properties.name;
//         document.getElementById("edit02").value = pick.id._properties.owner;
//         document.getElementById("edit03").value = pick.id._properties.area;
//         document.getElementById("edit04").value = pick.id._properties.plant;
//         if( document.getElementById("edit05").value== ''){
//             document.getElementById("edit05").value= '无';
//         }else{
//             document.getElementById("edit05").value = pick.id._properties.land;
//         }

//         document.getElementById("dataINFO").style.display = 'none';
//         document.getElementById("dataEdit").style.display = 'block';


//     }else{
//         LoadEditData(pick.id.entityCollection._owner._name);
//         editGeojsonEntityCollectionId = pick.id.entityCollection._id;

//         document.getElementById("edit01").value = pick.id._properties.name;
//         document.getElementById("edit02").value = pick.id._properties.owner;
//         document.getElementById("edit03").value = pick.id._properties.area;
//         document.getElementById("edit04").value = pick.id._properties.plant;
//         if( document.getElementById("edit05").value== ''){
//             document.getElementById("edit05").value= '无';
//         }else{
//             document.getElementById("edit05").value = pick.id._properties.land;
//         }

//         document.getElementById("dataINFO").style.display = 'none';
//         document.getElementById("dataEdit").style.display = 'block';

//         layui.use('form', function () {
//             layer.msg('已进入该数据的编辑模式，在选择保存数据之前无法编辑其他数据！');
//         });
//     }

// }
//编辑完成
function ShowInfo() {
    document.getElementById("dataINFO").style.display = 'block';
    document.getElementById("dataEdit").style.display = 'none';
}


//关闭数据面板
function CloseDataInfoPanel() {
    document.getElementById("dataINFO").style.display = 'none';
}

//显示信息面板
// function ShowDataInfoPanel() {
//     document.getElementById("dataINFO").style.display = 'block';
// }

//关闭编辑面板
function CloseInfoEditPanel() {
    document.getElementById("dataEdit").style.display = 'none';
}

function LoadEditData(url) {
    var request = new XMLHttpRequest();

    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            console.log(request.responseText);
            text = request.responseText;
            json = JSON.parse(text);
        }
    }
};

function SaveEdit() {

    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "jsondata.json");

}
function UndoEdit() {
    text = '';
    json = '';
    layui.use('form', function () {
        layer.msg('已退出');
    });
}

function NotFinish() {
    layui.use('form', function () {
        layer.msg('未完成');
    });
}
function NoData() {
    layui.use('form', function () {
        layer.msg('无数据');
    });
}

function SetEditGeojsonEntityCollectionId(id) {
    editGeojsonEntityCollectionId = id;
}