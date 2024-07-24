let currentNBT = "NBT01";
var options = {
    camera: viewer0.scene.camera,
    canvas: viewer0.scene.canvas,
    clampToGround: true
};

var fpsPanelStage = false;
var haveRenshenSample = false;

// KMZInput();
// GeoJsonInputListener();
var getStatisticTrigger = false;
Statistic();
// EditGeoJsonInputListener()
// 默认加载
// GeoJsonInput('geojson/MainData.geojson', 'MainData.geojson');
var mainDatasource;


PreviewImg('Img/林下参地块提取流程.jpg');
PreviewImg('Img/园参地块提取流程.jpg');
PreviewImg('Img/样本集.png');

// UI初始化



//KMZ数据加载监听
function KMZInput() {
    let kmzInput = document.getElementById("kmzInput");
    let kmz;
    kmzInput.addEventListener('change', function (event) {
        Cesium.KmlDataSource.load(URL.createObjectURL(kmzInput.files[0]), options).then(function (datasource) {

            datasource._name = kmzInput.files[0].name;
            viewer0.dataSources.add(datasource);
            kmz = datasource;
            AddNode(kmzInput.files[0].name, datasource._name);
            kmzInput.files[0].value = '';
        });
    });
}

/**
 * 将数据从Cesium中移除 支持datasource、imageryLayer
 */
window.DataRemove = function (Id) {
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == Id) {
            viewer0.dataSources.remove(datasource);
        }
    });
    viewer0.imageryLayers._layers.forEach(imagerylayer => {
        console.log(imagerylayer._imageryProvider);
        if (imagerylayer._imageryProvider._getFeatureInfoUrl + '/' + imagerylayer._imageryProvider._layers == Id) {
            viewer0.imageryLayers.remove(imagerylayer);
        }
    });
}

/**
 * Geojson数据加载监听
 */
function GeoJsonInputListener() {
    let geojsonInput = document.getElementById("geojsonInput");
    let geojson;

    geojsonInput.addEventListener('change', function (event) {

        Cesium.GeoJsonDataSource.load(URL.createObjectURL(geojsonInput.files[0]), {
            clampToGround: true,
            fill: Cesium.Color.fromRandom().withAlpha(0.7)
        })
            .then(function (datasource) {
                datasource._name = geojsonInput.files[0].name;
                viewer0.dataSources.add(datasource);
                geojson = datasource;
                console.log(geojsonInput.files);
                AddNode(geojsonInput.files[0].name, datasource._name);

                entities = datasource.entities.values;
                console.log(entities)
                entities.forEach(entity => {
                    var positions = entity.polygon.hierarchy._value.positions;

                    datasource.entities.add({
                        name: 'boderLine',
                        polyline: {
                            positions: positions,
                            width: 2,
                            material: Cesium.Color.BLACK.withAlpha(0.5),
                            clampToGround: true
                        }
                    })
                    // try {
                    //     var polygon_point_arr = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    //     // 保存转换后的点数组，这个格式必须按照 turf 的要求来
                    //     let turf_arr = [[]];
                    //     // 坐标转换
                    //     polygon_point_arr.forEach(val => {
                    //         let polyObj = {}
                    //         // 空间坐标转世界坐标(弧度) 同 Cesium.Cartographic.fromCartesian
                    //         let cartographic = viewer0.scene.globe.ellipsoid.cartesianToCartographic(val)
                    //         // 弧度转为角度（经纬度）
                    //         polyObj.lon = Cesium.Math.toDegrees(cartographic.longitude)
                    //         polyObj.lat = Cesium.Math.toDegrees(cartographic.latitude)
                    //         turf_arr[0].push([polyObj.lon, polyObj.lat])
                    //     })
                    //     // turf 需要将整个点闭合，所以最后一个点必须和起点重合。
                    //     turf_arr[0].push(turf_arr[0][0])
                    //     let turf_position = turf.polygon(turf_arr)
                    //     let turf_position_point = turf.centerOfMass(turf_position)
                    //     // 设置点标记坐标

                    //     const labelEntity = new Cesium.Entity({
                    //         position: Cesium.Cartesian3.fromDegrees(turf_position_point.geometry.coordinates[0], turf_position_point.geometry.coordinates[1], 0),
                    //         name: '',
                    //         label: {
                    //             text: entity._properties._name,
                    //             scale: 0.6,
                    //             fillColor: Cesium.Color.AQUA,
                    //             horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//对齐方式
                    //             verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    //         }
                    //     });
                    //     datasource.entities.add(labelEntity);
                    // } catch (error) {

                    // }
                    // 多边形的坐标集合(如果已经获取到了，就跳过这一步)

                })
                viewer0.flyTo(datasource)
                geojsonInput.files[0].value = '';

            });
    });
}

function EditGeoJsonInputListener() {
    let geojsonInput = document.getElementById("editGeojsonInput");
    let geojson;

    geojsonInput.addEventListener('change', function (event) {

        Cesium.GeoJsonDataSource.load(URL.createObjectURL(geojsonInput.files[0]), {
            clampToGround: true,
            fill: Cesium.Color.YELLOW
        })
            .then(function (datasource) {
                datasource._name = geojsonInput.files[0].name;
                viewer0.dataSources.add(datasource);
                geojson = datasource;
                console.log(geojson);
                LoadEditData(URL.createObjectURL(geojsonInput.files[0]));
                SetEditGeojsonEntityCollectionId(geojson._entityCollection._id);
                AddNode(geojsonInput.files[0].name, datasource._name);
                geojsonInput.files[0].value = '';
            });
    });
}

//Geojson数据默认加载
function GeoJsonInput(url, name) {
    Cesium.GeoJsonDataSource.load(url, {
        clampToGround: true,
        fill: Cesium.Color.YELLOW
    })
        .then(function (datasource) {
            datasource._name = name;
            viewer0.dataSources.add(datasource);
            mainDatasource = datasource;
            AddNode(name, datasource._name);
        });
}

//关闭WMS加载面板
function CloseWebMapServicePanel() {
    document.getElementById("webMapServiceLoad").style.display = 'none';
}
//显示WMS加载面板
function ShowWebMapServicePanel() {

    document.getElementById("webMapServiceLoad").style.display = 'block';
}

//关闭WMTS加载面板
function CloseWebTileServicePanel() {
    document.getElementById("webMapTileServiceLoad").style.display = 'none';
}
//显示WMTS加载面板
function ShowWebTileServicePanel() {

    document.getElementById("webMapTileServiceLoad").style.display = 'block';
}

layui.use('form', function () {
    var form = layui.form;

    //监听提交
    form.on('submit(formWebMapService)', function (data) {
        var wmslayer = new Cesium.WebMapServiceImageryProvider({
            url: data.field.url,
            layers: data.field.layer,
            parameters: {
                transparent: true,
                format: "image/png",
                srs: "EPSG:4326",
                styles: "",
            },
        });
        viewer0.imageryLayers.addImageryProvider(wmslayer);

        AddNode(data.field.layer, data.field.url + '/' + data.field.layer);
        return false;
    });
});
layui.use('form', function () {
    var form = layui.form;
    //监听提交
    form.on('submit(formWebTileMapService)', function (data) {
        let wmtsImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: data.field.url,
            layer: data.field.layer,
            style: "",
            // tileMatrixLabels :data.field.tileMatrixLabels,
            tileMatrixSetID: "EPSG:4326",
            tilingScheme: new Cesium.WebMercatorTilingScheme(),  // 当想要加载EPSG:4326瓦片服务时，只需要创建一个GeographicTilingScheme对象即可
        });

        viewer0.imageryLayers.addImageryProvider(wmtsImageryProvider);
        AddNode(data.field.layer, data.field.url + '/' + data.field.layer);
        return false;
    });
});

// layui.use('form', function () {
//     var form = layui.form;
//     //监听提交
//     form.on('submit(formCesiumWebTileMapService)', function (data) {
//         //一期影像服务加载 Cesiumlab影像服务
//         var rect1;
//         //一期影像数据链接 一段 B1
//         var layerUrl_B1 = 'http://localhost:9003/image/wmts/x7VWWw6J/{z}/{x}/{y}';
//         rect1 = Cesium.Rectangle.fromRadians(1.8411605653921568,
//             0.42353868158440233, 
//             1.852281593472672,
//             0.4270326992689055)
//         var provider = viewer0.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
//             url: data.field.url,
//             rectangle: rect1,
//             //minimumLevel:0,
//             //maximumLevel:16
//         }));
//         AddNode(data.field.url, data.field.url);
//         return false;
//     });
// });


// 更改FPS显示
function changeFPSPanel() {
    if (fpsPanelStage) {
        viewer0.scene.debugShowFramesPerSecond = false;
        fpsPanelStage = false;
    } else {
        viewer0.scene.debugShowFramesPerSecond = true;
        fpsPanelStage = true;
    }
}

function GetMainDataSource() {
    return mainDatasource;
}

function LoadScene() {
    layui.use('form', function () {
        layer.msg('未完成');
    });
}
function SaveScene() {
    layui.use('form', function () {
        layer.msg('未完成');
    });
}

/**
 * 生成园参样本集
 */
function CreateSample() {
    let openImg = PreviewImg('Img/样本集.png', 0.5);
    // let imgArray = document.getElementsByClassName('layui-layer layui-layer-page')
    // imgArray[imgArray.length -1].style.left = 'calc(100% - '+imgArray[imgArray.length -1].style.width+')';
    // imgArray[imgArray.length -1].style.top = 20+'px';
    // let msgArray = document.getElementsByClassName('layui-layer layui-layer-dialog layui-layer-msg')
    // // msgArray[0].style.left = 'calc(100% - '+imgArray[imgArray.length -1].style.width+')';

    layui.use('layer', function () {
        let animLayer = layui.layer;
        let anim;
        anim = animLayer.msg('正在根据data\data_tonghua\人参数据集-生成数据', { icon: 16, shade: 0.01 });

        setTimeout(function () {
            let geojson;
            Cesium.GeoJsonDataSource.load('geojson/样本集.geojson', {
                clampToGround: true,
                fill: Cesium.Color.BLUE.withAlpha(0.8)
            })
                .then(function (datasource) {
                    datasource._name = 'geojson/样本集.geojson';
                    viewer0.dataSources.add(datasource);
                    geojson = datasource;
                    AddNode('样本集.geojson', 'geojson/样本集.geojson');
                    haveRenshenSample = true;
                    animLayer.close(anim);
                    animLayer.close(openImg);
                });
        }, 2000);
    });
}

/**
 * 园参大棚识别
 */
function AnalyseRenshen() {
    if (haveRenshenSample == false) {
        layui.use('layer', function () {
            layer.msg('请先进行样本集制作！');
        });
        return;
    }
    layui.use('layer', function () {
        let animLayer = layui.layer;
        let anim;
        animLayer.msg('正在识别', { icon: 16, shade: 0.01 });

        setTimeout(function () {
            let geojson;

            Cesium.GeoJsonDataSource.load('geojson/园参大棚.geojson', {
                clampToGround: true,
                fill: Cesium.Color.YELLOW.withAlpha(0.7)
            })
                .then(function (datasource) {
                    datasource._name = 'geojson/园参大棚.geojson';
                    viewer0.dataSources.add(datasource);
                    geojson = datasource;
                        ('园参大棚.geojson', 'geojson/园参大棚.geojson');
                    animLayer.close(anim);
                });
        }, 1800);

    });

}

/**
 * 林下参地块识别
 */
function AnalyseForsetRenshen() {

    layui.use('layer', function () {
        let animLayer = layui.layer;
        let anim;
        animLayer.msg('正在识别', { icon: 16, shade: 0.01 });


        setTimeout(function () {
            let geojson;

            Cesium.GeoJsonDataSource.load('geojson/林下参地.geojson', {
                clampToGround: true,
                fill: Cesium.Color.ORANGE.withAlpha(0.7)
            })
                .then(function (datasource) {
                    datasource._name = 'geojson/林下参地.geojson';
                    viewer0.dataSources.add(datasource);
                    geojson = datasource;
                    AddNode('林下参地.geojson', 'geojson/林下参地.geojson');
                    animLayer.close(anim);
                    viewer0.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(125.670197, 41.979551, 14000),
                        duration: 1,
                        orientation: {
                            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                            roll: 0 // 视口翻滚角度
                        }
                    });

                });


        }, 1800);

    });

}

function PreviewImg() {
    let src, scale = 1;
    switch (arguments.length) {
        case 1:
            src = arguments[0];
            break;
        case 2:
            src = arguments[0];
            scale = arguments[1];
            break;
        default:
            src = arguments[0];
            break;
    }
    let img = new Image();
    img.src = src;
    let height = img.height; //获取图片高度
    let width = img.width; //获取图片宽度
    if (height > 1000 || width > 800) {
        height = height / 1.5;
        width = width / 1.5;
    }
    height *= scale;
    width *= scale;
    console.log(img);
    if (img.complete) {
        var imgHtml = "<img src='" + src + "'style='width:" + width + "px;height:" + height + "px'/>";
        console.log(imgHtml);

        return layer.open({
            type: 1,
            offset: 'auto',
            area: [width + 'px', height + 'px'],
            shadeClose: true,//点击外围关闭弹窗
            scrollbar: true,//不现实滚动条
            title: false, //不显示标题
            content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function () {

            }
        });

    }

}

/**
 * 园参经度评价
 */
function PrecisionEvaluation_YuanShen() {

    layer.open({
        title: "园参地块识别精度评价",
        content: 'Overall Accuracy = 0.573958 ',
        icon: 1
    })
}
/**
 * 林参经度评价
 */
function PrecisionEvaluation_LinShen() {

    layer.open({
        title: "林下参地块识别精度评价",
        content: 'Overall Accuracy = 0.8',
        icon: 1
    })
}


/**
 * 加载WMS影像 
 * @param {string} url 第一个参数 Geoserver影像地址
 * @param {string} layer 第二个参数 Geoserver影像图层
 * @param {string} name 第三个参数（可选）将显示的影像名称
 * @param {boolean} show 第四个参数（可选）显示状态-默认为true
 * @returns cesiumLayer
 */
function LoadWMS() {
    let url, layer, wmslayer, name, show = true;
    switch (arguments.length) {
        case 2:
            url = arguments[0];
            layer = arguments[1];
            AddNode(layer, url + '/' + layer);
            break;
        case 3:
            url = arguments[0];
            layer = arguments[1];
            name = arguments[2];
            AddNode(name, url + '/' + layer);
            break;
        case 4:
            url = arguments[0];
            layer = arguments[1];
            name = arguments[2];
            show = arguments[3];
            AddNode(name, url + '/' + layer, show);
            break;
        default:
            break;
    }
    wmslayer = new Cesium.WebMapServiceImageryProvider({
        url: url,
        layers: layer,
        parameters: {
            transparent: true,
            format: "image/png",
            srs: "EPSG:4326",
            styles: "",
        },
    });
    let cesiumLayer = viewer0.imageryLayers.addImageryProvider(wmslayer);
    cesiumLayer.show = show;
    return cesiumLayer;
}

function Statistic() {
    var previousPickColor;
    var previousPick;
    var totalArea;
    var blockCount;

    let getStatisticHandler = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);
    //使用时将getStatisticTrigger激活，左键调用。


    getStatisticHandler.setInputAction(function (event) {
        if (previousPick != null) {
            previousPick.id.entityCollection._entities._array.forEach(entity => {
                if (entity.polygon != null) {
                    entity.polygon.material = previousPickColor;
                }
            });
        }
        if (getStatisticTrigger) {
            totalArea = 0;
            blockCount = 0;
            pick = viewer0.scene.pick(event.position);
            if (Cesium.defined(pick)) {// 判断是否获取到了 pick 
                console.log(pick);
                previousPickColor = pick.id.polygon.material;
                pick.id.entityCollection._entities._array.forEach(entity => {
                    if (entity.polygon != null) {
                        if (entity._properties._area == null) {
                            return;
                        }
                        entity.polygon.material = Cesium.Color.RED.withAlpha(0.7);
                        blockCount++;
                        try {
                            totalArea += parseFloat(entity._properties._area);
                        } catch (error) { }
                    }
                });
                if (blockCount == 0) {
                    previousPick = pick;
                    layer.msg('未从该实体获取到信息，左键拾取取消');
                    getStatisticTrigger = false;
                    return;
                }

                totalArea = totalArea.toFixed(2)
                let areaPrecent = (100 * totalArea / 8938290.31).toFixed(2);
                const input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.value = '通化人参总地块数：488' + ' ' + '通化人参地块总面积：8,938,290.31 (㎡)' + ' ' + pick.id.entityCollection._owner._name.replace('geojson/', '').replace('.geojson', '') + '地块数：' + blockCount + ' ' + '总面积：' + totalArea + ' (㎡)' + ' ' + '面积占比：' + areaPrecent + '%' + ' '
                document.body.appendChild(input);
                input.setSelectionRange(0, 9999);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                layer.open({
                    title: '2022年：' + pick.id.entityCollection._owner._name.replace('geojson/', '').replace('.geojson', '') + " 的统计信息",
                    content: '通化人参总地块数：488' + '<br/>' + '通化人参地块总面积：8,938,290.31 (㎡)' + '<br/>' + pick.id.entityCollection._owner._name.replace('geojson/', '').replace('.geojson', '') + '地块数：' + blockCount + '<br/>' + '总面积：' + totalArea + ' (㎡)' + '<br/>'
                        + '面积占比：' + areaPrecent + '%' + '<br/>' + '(内容已复制到剪切板) ',
                    icon: 1
                })
                previousPick = pick;
                // HighlightPolygonEntity(pick);
            } else {
                layer.msg('未获取到信息，左键拾取取消');
            }
            getStatisticTrigger = false;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

function OutputStatistic(type) {
    if (type == 1) {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.value = '通化人参地块总面积：8,938,290.31 (㎡)';
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        layer.open({
            title: '2022年：' + '通化人参地块' + " 的统计信息",
            content: '通化人参地块总面积：8,938,290.31 (㎡)' + '<br/>' + '(内容已复制到剪切板) ',
            icon: 1
        })

    } else if (type == 2) {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.value = '通化林参地块总面积：4,429,923.15 (㎡)' + '49.56%';
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        layer.open({
            title: '2022年：' + '通化林参地块' + " 的统计信息",
            content: '通化林参地块总面积：4,429,923.15 (㎡)' + '<br/>' + '面积占比：' + '49.56%' + '<br/>' + '(内容已复制到剪切板) ',
            icon: 1
        })

    } else if (type == 3) {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.value = '通化园参大棚总面积：4,508,367.16 (㎡)' + ' 面积占比：' + '50.44%';
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        layer.open({
            title: '2022年：' + '通化园参大棚' + " 的统计信息",
            content: '通化园参大棚总面积：4,508,367.16 (㎡)' + '<br/>' + '面积占比：' + '50.44%' + '<br/>' + '(内容已复制到剪切板) ',
            icon: 1
        })

    } else { }

}

function EnableStatistic() {
    layer.msg('已经启用鼠标左键拾取功能，点击场景内多边形数据(人参地块)以获取详情统计信息。');
    getStatisticTrigger = true;
}

function DongChang() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '东昌区') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.00486, 41.662729, 50000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function ErDaoJiang() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '二道江区') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.166407, 41.760369, 35000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function GangWu() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '港务区') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.780929, 41.814581, 21000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function LiuHe() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '柳河县') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.925723, 42.301625, 120000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function TongHua() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '通化县') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.934003, 41.760442, 120000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function GaoXin() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '高新区') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.870443, 41.651768, 14000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function HuiNan() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '辉南县') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.342449, 42.53513, 100000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}
function JiAn() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '集安市') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.9);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.970001, 41.260848, 120000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}

function MeiHeKou() {
    ShowUIPanel()
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._县区 == '梅河口市') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(125.710016, 42.530878, 140000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
}

function LinXiaShen_JiTi() {
    
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._林木使 == '集体') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
}
function LinXiaShen_GeRen() {
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._林木使 == '个人') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
}
function LinXiaShen_QiTa() {
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/林下参.geojson') {
            datasource._entityCollection._entities._array.forEach(entity => {
                if (entity._properties._林木使 != '集体' && entity._properties._林木使 != '个人') {
                    entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                } else {
                    entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                }
            });
        }
    });
}

function Slope(gradient) {
    switch (gradient) {
        case 1:
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == 'geojson/林下参.geojson') {
                    datasource._entityCollection._entities._array.forEach(entity => {
                        if (entity._properties._坡度 == '平' ) {
                            entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                        } else {
                            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                        }
                    });
                }
            });
            break;
        case 2:
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == 'geojson/林下参.geojson') {
                    datasource._entityCollection._entities._array.forEach(entity => {
                        if (entity._properties._坡度 == '缓' ) {
                            entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                        } else {
                            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                        }
                    });
                }
            });
            break;
        case 3:
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == 'geojson/林下参.geojson') {
                    datasource._entityCollection._entities._array.forEach(entity => {
                        if (entity._properties._坡度 == '斜' ) {
                            entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                        } else {
                            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                        }
                    });
                }
            });
            break;
        case 4:
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == 'geojson/林下参.geojson') {
                    datasource._entityCollection._entities._array.forEach(entity => {
                        if (entity._properties._坡度 == '陡' ) {
                            entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7);
                        } else {
                            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7);
                        }
                    });
                }
            });
            break;
    }
}

function ShowUIPanel(){
    // document.getElementById("UIPanel").style.display = 'block';
}