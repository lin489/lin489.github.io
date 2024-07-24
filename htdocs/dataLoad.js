//GeoServer地址
window.geoserverURL = 'http://frp-add.top:27797';
//KMZ加载参数
var options = {
    camera: viewer0.scene.camera,
    canvas: viewer0.scene.canvas,
    clampToGround: true
};

var allShpLoadState = false;

var TongHuaMapLoadState_2023 = false;
var TongHuaMapList_2023 = [];
var TongHuaMapLoadState_2022 = false;
var TongHuaMapList_2022 = [];
var  hadChangeColor = false;
/**
 * 默认加载数据
 */
function DefaultDataLoad() {

    Cesium.GeoJsonDataSource.load('geojson/通化区划.geojson', {
        clampToGround: true,
        fill: Cesium.Color.PINK.withAlpha(0)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/通化区划.geojson';
            viewer0.dataSources.add(datasource);
            AddNode('通化区划', 'geojson/通化区划.geojson');
            entities = datasource.entities.values;
            console.log(entities)
            entities.forEach(entity => {
                var positions = entity.polygon.hierarchy._value.positions;

                datasource.entities.add({
                    name: 'boderLine',
                    polyline: {
                        positions: positions,
                        width: 2,
                        material: Cesium.Color.BLACK.withAlpha(0.8),
                        clampToGround: true
                    },
                })

                // 多边形的坐标集合(如果已经获取到了，就跳过这一步)
                var polygon_point_arr = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                // 保存转换后的点数组，这个格式必须按照 turf 的要求来
                let turf_arr = [[]];
                // 坐标转换
                polygon_point_arr.forEach(val => {
                    let polyObj = {}
                    // 空间坐标转世界坐标(弧度) 同 Cesium.Cartographic.fromCartesian
                    let cartographic = viewer0.scene.globe.ellipsoid.cartesianToCartographic(val)
                    // 弧度转为角度（经纬度）
                    polyObj.lon = Cesium.Math.toDegrees(cartographic.longitude)
                    polyObj.lat = Cesium.Math.toDegrees(cartographic.latitude)
                    turf_arr[0].push([polyObj.lon, polyObj.lat])
                })
                // turf 需要将整个点闭合，所以最后一个点必须和起点重合。
                turf_arr[0].push(turf_arr[0][0])
                let turf_position = turf.polygon(turf_arr)
                let turf_position_point = turf.centerOfMass(turf_position)
                // 设置点标记坐标

                const labelEntity = new Cesium.Entity({
                    position: Cesium.Cartesian3.fromDegrees(turf_position_point.geometry.coordinates[0], turf_position_point.geometry.coordinates[1], 0),
                    name: '',
                    label: {
                        text: entity._properties._Name,
                        scale: 0.6,
                        fillColor: Cesium.Color.AQUA,
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//对齐方式
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 800000)
                    }
                });
                datasource.entities.add(labelEntity);
            })
        });
    Cesium.GeoJsonDataSource.load('geojson/通化蒙版.geojson', {
        clampToGround: true,
        fill: Cesium.Color.GREY.withAlpha(0.5)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/通化蒙版.geojson';
            viewer0.dataSources.add(datasource);
            AddNode('通化蒙版', 'geojson/通化蒙版.geojson');
        });

    Cesium.GeoJsonDataSource.load('geojson/集安.geojson', {
        clampToGround: true,
        fill: Cesium.Color.GREY.withAlpha(0.05)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/集安.geojson';
            viewer0.dataSources.add(datasource);
            AddNode('集安', 'geojson/集安.geojson');
        });
    // LoadWMS(geoserverURL + '/geoserver/renshen/wms', 'renshen:TongHuaMap', '通化影像');

    // viewer0.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(125.545288, 42.035861, 40000),
    //     duration: 2,
    //     orientation: {
    //         heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
    //         pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
    //         roll: 0 // 视口翻滚角度
    //     }
    // });
    AllDistrictMode()
}

async function LoadAllRenShenShp(){

    if(!allShpLoadState){
        Cesium.GeoJsonDataSource.load('geojson/通化所有数据.geojson', {
            clampToGround: true,
            fill: Cesium.Color.YELLOW.withAlpha(0.8),

        })
            .then(function (datasource) {
                datasource._name = 'geojson/通化所有数据.geojson';
                viewer0.dataSources.add(datasource);
                entities = datasource.entities.values;
                // console.log(entities)

    
                entities.forEach(entity => {
                    var positions = entity.polygon.hierarchy._value.positions;
                    var lineEntity = datasource.entities.add({
                        name: 'boderLine',
                        polyline: {
                            positions: positions,
                            width: 1,
                            material: Cesium.Color.GREY.withAlpha(0.3),

                            // distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0, 300000)
                        },
                    })
                    
                    lineEntity.name = entity.id;
                    if(entity.properties.地块类 =='林下参'){
                        entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
                    }
                    else if(entity.properties.地块类 =='园参') {
                        entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
                    }
    
    
                })
                forestShpLoadState = true;
                AddNode('人参', 'geojson/通化所有数据.geojson');
            });
            allShpLoadState = true;
    }else{
        if(hadChangeColor){
            await ChangeAllShpColor();
        }

    }

}


async function LoadForestShp(){
    if(hadChangeColor){
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
    
                datasource.entities._entities._array.forEach(entity => {
                        try{
                            if(entity.properties.地块类 == '林下参'){
                                entity.show = true;
                            }else{
                                entity.show = false;
                            }             
                        }
                        catch{}
                });
            }
        });
    }else{
         await ChangeForestShpColor();
    }
}

function ChangeAllShpColor(){
    return new Promise((resolve) => {
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                datasource.entities._entities._array.forEach(entity => {
                    try{
                        if(entity.properties.地块类 =='林下参'){
                            entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);
                        }
                    }
                    catch{}
                    hadChangeColor = false;
                    entity.show = true;
            });
            }
        });
      });
}

function ChangeForestShpColor(){
    return new Promise((resolve) => {
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/通化所有数据.geojson') {
                var color_1 = new Cesium.Color(0.857, 0.207, 0.191, 1)
                var color_2 = new Cesium.Color(0.683, 0.816, 0.222, 1);
                var color_3 = new Cesium.Color(0.378, 0.625, 0.656, 1);

                datasource.entities._entities._array.forEach(entity => {
                        try{
                            if(entity.properties.地块类 == '林下参'){
                                entity.show = true;

                            }else{
                                entity.show = false;
                            }

                                if(entity.properties.分级 == '通天'){
                                    //entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
                                    entity.polygon.material = color_1;

                                }else if(entity.properties.分级 == '通地'){
                                    //entity.polygon.material = Cesium.Color.GREY.withAlpha(0.8);
                                    entity.polygon.material = color_2;
                                    
                                }else if(entity.properties.分级 == '通人'){
                                    //entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.8);
                                    entity.polygon.material = color_3;
                                    
                                }     

                        }
                        catch{}
                });
                    hadChangeColor = true;   
            }
        });
      });
}


function LoadGardenShp() {
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
                try{
                    if(entity.properties.地块类 == '园参'){
                        entity.show = true;
                        
                    }else{
                        entity.show = false;
                    }

                    // if(entity.properties.分级 == '通天'){
                    //     //entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
                    //     entity.polygon.material = new Cesium.Color(0.89, 0.2, 0.19, 0.9);
                    // }else if(entity.properties.分级 == '通地'){
                    //     //entity.polygon.material = Cesium.Color.GREY.withAlpha(0.8);
                    //     entity.polygon.material = new Cesium.Color(0.183, 0.269, 0.328, 0.9);
                    // }else if(entity.properties.分级 == '通人'){
                    //     //entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.8);
                    //     entity.polygon.material =new Cesium.Color(0.378, 0.625, 0.656, 0.9);
                    // }
                }
                catch{}
        });
        }
    });
}

/**
 * 加载林分图
 */
function LoadForestJson() {
    Cesium.GeoJsonDataSource.load('geojson/林分图.geojson', {
        clampToGround: true,
        fill: Cesium.Color.GREEN.withAlpha(0.9)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/林分图.geojson';
            viewer0.dataSources.add(datasource);
            AddNode('林分图', 'geojson/林分图.geojson');
            viewer0.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(125.665197, 41.987551, 16000),
                orientation: {
                    heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
                    pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                    roll: 0 // 视口翻滚角度
                }
            });
        });
}

function LoadTongHuaTif_2023() {

    if (TongHuaMapLoadState_2023 == false) {
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_1', '通化影像1'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_2', '通化影像2'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_3', '通化影像3'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_4', '通化影像4'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_5', '通化影像5'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_6', '通化影像6'));
        TongHuaMapList_2023.push(LoadWMS(geoserverURL + "/geoserver/renshen/wms", 'renshen:tonghuaquanyu_7', '通化影像7'));

        TongHuaMapLoadState_2023 = true;
    }
    else {
        TongHuaMapList_2023.forEach(element => {
            element.show = true;
        });
    }
}

function HideTongHuaTif() {

    if (TongHuaMapLoadState_2023 == true) {
        TongHuaMapList_2023.forEach(element => {

            element.show = false;
        });
    }
    if (TongHuaMapLoadState_2022 == true) {
        TongHuaMapList_2022.forEach(element => {

            element.show = false;
        });
    }
}

function LoadDongChangShp() {
    Cesium.GeoJsonDataSource.load('geojson/东昌区林下参.geojson', {
        clampToGround: true,
        fill: Cesium.Color.YELLOW.withAlpha(0.9)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/东昌区林下参.geojson';
            viewer0.dataSources.add(datasource);
            AddNode('东昌区林下参', 'geojson/东昌区林下参.geojson');
        });
}

function LoadJiAnForestShp() {
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.034696, 41.185546, 153000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
    ShowJiAnForestChart();

    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
                try{
                    if(entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市'){
                        entity.show = true;
                    }else{
                        entity.show = false;
                    }
                }
                catch{}
        });
        }
    });
}

function LoadJiAnGardenShp(){
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.034696, 41.185546, 153000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
                try{
                    if(entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市'){
                        entity.show = true;
                    }else{
                        entity.show = false;
                    }
                }
                catch{}
        });
        }
    });
    ShowJiAnGardenChart();
}

function LoadJiAnShp(){
    viewer0.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(126.034696, 41.185546, 153000),
        orientation: {
            heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
            pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
            roll: 0 // 视口翻滚角度
        }
    });
    viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
                try{
                    if(entity.properties.县区 == '集安市'){
                        entity.show = true;
                    }else{
                        entity.show = false;
                    }
                }
                catch{}
        });
        }
    });
}

function LoadGardenAnalyseShp() {
    if (gardenAnalyseShpLoadState) {
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/属性表/园参识别属性表.geojson') {
                datasource.show = true;
            }
        });
        return;
    }

    Cesium.GeoJsonDataSource.load('geojson/属性表/园参识别属性表.geojson', {
        clampToGround: true,
        fill: Cesium.Color.YELLOW.withAlpha(0.8)
    })
        .then(function (datasource) {
            datasource._name = 'geojson/属性表/园参识别属性表.geojson';
            viewer0.dataSources.add(datasource);
            entities = datasource.entities.values;
            // console.log(entities)
            entities.forEach(entity => {

                // 设置点标记坐标  
                entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.8);

            })
            gardenAnalyseShpLoadState = true;
            AddNode('园参识别属性表', 'geojson/属性表/园参识别属性表.geojson');
        });

}

function HideGardenAnalyseShp() {
    if (gardenAnalyseShpLoadState) {
        viewer0.dataSources._dataSources.forEach(datasource => {
            if (datasource._name == 'geojson/属性表/园参识别属性表.geojson') {
                datasource.show = false;
            }
        });
    }
}


function SetDataDisplay(){
    switch(arguments.length){
    
    }
}