window.tableJson = '';
var tableUrlRoot = 'TableJson/';
window.propertiesTable;

var tableJson_1 = 'TableJson/属性表/首页属性表.geojson';
var tableJson_2 = 'TableJson/属性表/林下参属性表.geojson'
var tableJson_3 = 'TableJson/属性表/林下参集安市属性表.geojson'
var tableJson_4 = 'TableJson/属性表/园参普查图斑属性表.geojson'
var tableJson_5 = 'TableJson/属性表/园参集安市普查图斑属性表.geojson'
var tableJson_6 = 'TableJson/属性表/园参识别属性表.geojson'

tableJson = tableJson_1;

var previousEntity;
LoadPropertiesTable();

function CreateTableData() {
    var request = new XMLHttpRequest();
    request.open("get", 'geojson/属性表/所有数据属性表.geojson');/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            let text = request.responseText;
            let json = JSON.parse(text);
            json.features.forEach(feature => {
                feature.geometry.coordinates = [];
            });
            text = JSON.stringify(json);
            let newText = text.replaceAll("\"properties\":{", "");
            newText = newText.replaceAll("}},{\"", "},{\"");
            newText = newText.replace("}}]}", "}]}");
            console.log(newText);
        }
    }
}


function LoadPropertiesTable() {
    layui.use('table', function () {
        var table = layui.table
        propertiesTable = table.render({
            elem: '#demo'
            , height: 420
            , id:'propertiesTable'
            , url: tableJson //数据接口
            , title: '属性表'
            , page: true
            ,limits: [10,25,50,100,200,300]
            , limit: 100
            , totalRow: false //开启合计行
            , height: '#tableContainer-0'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度
            , cols: [
                [ //表头
                    { field: '地块类', title: '地块类型', sort: true, align: 'center' }
                    , { field: '位置', title: '位置', sort: true, align: 'center' }
                    , { field: '面积', title: '面积 (㎡)', sort: true, align: 'center' }
                ]
            ]

            , parseData: function (res) { //res 即为原始返回的数据
                var result;
                // console.log(this);
                // console.log(JSON.stringify(res));
                if (this.page.curr) {
                    result = res.features.slice(this.limit * (this.page.curr - 1), this.limit * this.page.curr);
                } else {
                    result = res.features.slice(0, this.limit);
                }

                return {"code": 0, "msg": res.msg, "count": res.features.length, "data": result};
            }
            , done: function () {

                document.querySelectorAll(".layui-table").forEach(table => {
                    table.style.backgroundColor = '#00000000';
                    table.style.color = '#9dd8ef';
                    table.style.opacity = 1;
                });
                //   document.querySelectorAll(".layui-table td").forEach(table => {
                //     table.style.borderColor = '#0f2654';
                //   });  
                document.querySelectorAll(".layui-table th").forEach(table => {
                    table.style.borderColor = '#0f2654';
                });

                document.querySelectorAll(".layui-table-header").forEach(table => {
                    table.style.borderColor = '#0f2654';
                });


            }

        });
        table.on('row(test)', function(obj){
            var data = obj.data; // 获取当前行数据
            console.log(data)
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == 'geojson/通化所有数据.geojson') {
        
                    datasource.entities._entities._array.forEach(entity => {
                            try{
                                if(entity.properties.FID == data.ID){
                                    viewer0.flyTo(entity,{
                                        offset : {
                                            heading : Cesium.Math.toRadians(0.0),
                                            pitch : Cesium.Math.toRadians(-90),
                                        }
                                    });

                                    if (entity.polygon != null) {
                                        HighLightEntity(entity);
                                    }
    
                                    //ShowDataInfoPanel();
                                    
                                    try {
                                        document.getElementById("info01").innerText = entity._properties.县区;
                                        document.getElementById("info02").innerText = entity._properties.乡村;
                                        document.getElementById("info03").innerText = entity._properties.所属;
                                        document.getElementById("info04").innerText = parseFloat(entity._properties.面积).toFixed(6) + ' (㎡)';
                                        document.getElementById("info05").innerText = entity._properties.坡向;
                                        document.getElementById("info06").innerText = entity._properties.坡度;
                                        document.getElementById("info07").innerText = entity._properties.树木;
                                        
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                            catch{}
                    });
                }
            });
          });

    });

}

function ChangePropertiesTableData(num) {
    let previousTable = tableJson;
    switch (num) {
        case 1:
            tableJson = tableJson_1;
            document.getElementById('tableTitle').innerHTML = '普查属性表';          
            break;
        case 2:
            tableJson = tableJson_2;
            document.getElementById('tableTitle').innerHTML = '林下参属性表';
            break;
        case 3:
            tableJson = tableJson_3;
            document.getElementById('tableTitle').innerHTML = '林下参集安市属性表';
            break;
        case 4:
            tableJson = tableJson_4;
            document.getElementById('tableTitle').innerHTML = '园参普查图斑属性表';
            break;
        case 5:
            tableJson = tableJson_5;
            document.getElementById('tableTitle').innerHTML = '园参集安市普查图斑属性表';
            break;
        case 6:
            tableJson = tableJson_6;
            document.getElementById('tableTitle').innerHTML = '园参识别结果属性表';
            break;
        default:
            break;
    }
    if(previousTable!=tableJson){
        console.log(tableJson)
        layui.use('table', function () {
            var table = layui.table
            table.reloadData('propertiesTable',{ url: tableJson, })
            
        });

    }
}