window.JiAnMode = '';
var inJiAn = false;
var lastParams;
var focusMode = false;
var index = -1;
var focusEChart;
var forestGardenRateEchart;
var offset_0 = 0;
var forestOwnerEchart;
var offset_1 = 10;
var forestLevelEchart;
var offset_2 = 20;
var forestSlopeEchart;
var offset_3 = 30;
var forestAspectEchart;
var offset_4 = 40;
var JiAnGardenAgeEchart;
var offset_5 = 50;
var JiAnLevelEchart;
var offset_6 = 60;
var JiAnSlopeEchart
var offset_7 = 70;
var JiAnAspectEchart;
var offset_8 = 80;
var offset_9 = 90;
UIInit();
Chart();
doProhibit()
viewer0.camera.moveEnd.addEventListener(() => {
  let cameraPosition = viewer0.scene.camera.positionCartographic;
  let longitude = Cesium.Math.toDegrees(cameraPosition.longitude).toFixed(6);
  let latitude = Cesium.Math.toDegrees(cameraPosition.latitude).toFixed(6);
  let height = cameraPosition.height.toFixed(4);
  console.log(height);
  if (inJiAn && height >= 170000) {
    if (JiAnMode == 'Forest') {
      ForestDistrictMode();
    } else if (JiAnMode == 'Garden') {
      GardenDistrictMode()
    } else {
      Home()
    }

    inJiAn = false;
  }
});
function doProhibit() {
  if (window.Event)
    document.captureEvents(Event.MOUSEUP);

  function nocontextmenu() {
    event.cancelBubble = true
    event.returnvalue = false;
    return false;
  }

  function norightclick(e) {
    if (window.Event) {
      if (e.which == 2 || e.which == 3)
        return false;
    } else if (event.button == 2 || event.button == 3) {
      event.cancelBubble = true
      event.returnvalue = false;
      return false;
    }
  }
  document.oncontextmenu = nocontextmenu;  // for IE5+ 
  document.onmousedown = norightclick;  //
}




function UIInit() {
  document.getElementById("webMapServiceLoad").style.display = 'none';
  document.getElementById("dataINFO").style.display = 'none';
  document.getElementById("dataINFO_garden").style.display = 'none';

  document.getElementById("AddData").style.display = 'none';
  document.getElementById("editData").style.display = 'none';
  document.getElementById("editData").style.display = 'none';
  document.getElementById("webMapTileServiceLoad").style.display = 'none';
  document.getElementById("districtFunction").style.display = 'none';
  document.getElementById("forestDistrictFunction").style.display = 'none';
  document.getElementById("gardenDistrictFunction").style.display = 'none';
  document.getElementById("UIPanel_left_forest").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_garden").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_JiAn").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_JiAnGarden").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_Analysis").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_Select").style.display = 'none';
  document.getElementById("gardenSelect").style.display = 'none';
  document.getElementById("rightClick").style.display = 'none';
  document.getElementById("tifFunction").style.display = 'none';


  // document.addEventListener('mousedown', function (mousedown) {
  //   if (document.getElementById("districtFunction").style.display == 'block'){
  //     document.getElementById("districtFunction").style.display = 'none';
  //     console.log('关闭')
  //   }
  //     if (document.getElementById("forestDistrictFunction").style.display == 'block'){
  //       document.getElementById("forestDistrictFunction").style.display = 'none';
  //       console.log(2222)
  //     }

  //     if (document.getElementById("gardenDistrictFunction").style.display == 'block'){
  //       document.getElementById("gardenDistrictFunction").style.display = 'none';
  //       console.log(3333)
  //     }
  // });
}

function ManageDistrict() {
  console.log("点击")
  if (document.getElementById("districtFunction").style.display == 'none') {
    document.getElementById("districtFunction").style.display = 'block';
    document.getElementById("forestDistrictFunction").style.display = 'none';
    document.getElementById("gardenDistrictFunction").style.display = 'none';
    document.getElementById("tifFunction").style.display = 'none';
  } else {
    document.getElementById("districtFunction").style.display = 'none';
  }
}

function AddDistrict() {
  document.getElementById("districtFunction").style.display = 'none';
  HideAllLeftPanel()
  document.getElementById("AddData").style.display = 'block';
}

function SelectDistrict() {
  document.getElementById("districtFunction").style.display = 'none';
  HideAllLeftPanel()
  document.getElementById("UIPanel_left_Select").style.display = 'Block';
  LoadAllRenShenShp()
}

function AnalyseDistrict() {
  document.getElementById("districtFunction").style.display = 'none';
  HideAllLeftPanel()
  //CreateTableData()
  NotFinish()
}

function AllDistrictMode() {
  JiAnMode = 'All';
  ShowDefaultChart();
  LoadAllRenShenShp();
  viewer0.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
    orientation: {
      heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
      pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
      roll: 0 // 视口翻滚角度
    }
  });
  document.getElementById("districtFunction").style.display = 'none';
}

function ForestDistrictMode() {
  if (document.getElementById("forestDistrictFunction").style.display == 'none') {
    // document.getElementById("forestDistrictFunction").style.display = 'block';
    ShowForestChart();
    document.getElementById("districtFunction").style.display = 'none';
    document.getElementById("gardenDistrictFunction").style.display = 'none';
    viewer0.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
      orientation: {
        heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
        pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
        roll: 0 // 视口翻滚角度
      }
    });
    JiAnMode = 'Forest';
    LoadForestShp();

  } else {
    document.getElementById("forestDistrictFunction").style.display = 'none';
  }
}

function ShowDefaultChart() {
  HideAllLeftPanel()
  document.getElementById("UIPanel_left").style.visibility = 'visible';
  ChangePropertiesTableData(1)
}

function ShowForestShp() {
  LoadForestShp();
  document.getElementById("districtFunction").style.display = 'none';
}

function ShowForestChart() {
  HideAllLeftPanel();
  document.getElementById("UIPanel_left_forest").style.visibility = 'visible';


  ChangePropertiesTableData(2)
}

function GardenDistrictMode() {
  if (document.getElementById("gardenDistrictFunction").style.display == 'none') {
    // document.getElementById("gardenDistrictFunction").style.display = 'block';
    ShowGardenChart()
    document.getElementById("districtFunction").style.display = 'none';
    document.getElementById("forestDistrictFunction").style.display = 'none';
    viewer0.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
      orientation: {
        heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
        pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
        roll: 0 // 视口翻滚角度
      }
    });
    JiAnMode = 'Garden';
    LoadGardenShp();
  } else {
    document.getElementById("gardenDistrictFunction").style.display = 'none';
  }
}

function ShowGardenShp() {
  LoadGardenShp();
  document.getElementById("districtFunction").style.display = 'none';
}

function ShowGardenChart() {
  HideAllLeftPanel()
  document.getElementById("UIPanel_left_garden").style.visibility = 'visible';
  ChangePropertiesTableData(4)
}

function ShowJiAnForestChart() {
  HideAllLeftPanel();
  document.getElementById("UIPanel_left_JiAn").style.visibility = 'visible';


  ChangePropertiesTableData(3)
}

function ShowJiAnGardenChart() {
  HideAllLeftPanel()
  document.getElementById("UIPanel_left_JiAnGarden").style.visibility = 'visible';
  ChangePropertiesTableData(5)
}

function ShowAnalysisGardenChart() {
  HideAllLeftPanel()
  document.getElementById("UIPanel_left_Analysis").style.visibility = 'visible';
  ShowAnalysisGardenShp();
  ChangePropertiesTableData(6)
}

function ShowAnalysisGardenShp() {
  LoadGardenAnalyseShp();
}

function ShowTifFunction(){
  if (document.getElementById("tifFunction").style.display == 'none') {
    document.getElementById("districtFunction").style.display = 'none';
    document.getElementById("forestDistrictFunction").style.display = 'none';
    document.getElementById("gardenDistrictFunction").style.display = 'none';
    document.getElementById("tifFunction").style.display = 'block';
    
  } else {
    document.getElementById("tifFunction").style.display = 'none';
  }

}

function HideAllLeftPanel() {

  document.getElementById("UIPanel_left").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_forest").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_garden").style.visibility = 'hidden';
  document.getElementById("dataINFO").style.display = 'none';
  document.getElementById("dataINFO_garden").style.display = 'none';
  document.getElementById("AddData").style.display = 'none';
  document.getElementById("UIPanel_left_Analysis").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_JiAn").style.visibility = 'hidden';
  document.getElementById("UIPanel_left_Select").style.display = 'none';
  document.getElementById("UIPanel_left_JiAnGarden").style.visibility = 'hidden';
  document.getElementById("editData").style.display = 'none';
  document.getElementById("editData_garden").style.display = 'none';
}

function Home() {
//screenShot()
  //相机位置初始化
  viewer0.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(125.954696, 41.805546, 403000),
    orientation: {
      heading: Cesium.Math.toRadians(0), // 水平旋转  -正北方向
      pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
      roll: 0 // 视口翻滚角度
    }
  });
  AllDistrictMode()
  document.getElementById("districtFunction").style.display = 'none';
}

function ShowDataInfoPanel() {
  HideAllLeftPanel()
  
  document.getElementById("dataINFO").style.display = 'block';
}

function ShowGardenDataInfoPanel(){
  HideAllLeftPanel()
  
  document.getElementById("dataINFO_garden").style.display = 'block';
}

function RetreatPanel() {
  if (inJiAn) {
    if (JiAnMode == 'Forest') {
      ShowJiAnForestChart()
    } else if (JiAnMode == 'Garden') {
      ShowJiAnGardenChart()
    } else {
      ShowDefaultChart()
    }
  } else {
    if (JiAnMode == 'Forest') {
      ShowForestChart()
    } else if (JiAnMode == 'Garden') {
      ShowGardenChart()
    } else {
      ShowDefaultChart()
    }
  }
}

function UndoPitch(){
  forestGardenRateEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  forestGardenRateEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  forestOwnerEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  forestOwnerEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  forestOwnerEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });

  forestLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  forestLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  forestLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });

  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 3,
  });
  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 4,
  });
  forestSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 5,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 3,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 4,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 5,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 6,
  });
  forestAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 7,
  });
  JiAnGardenAgeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 7,
  });
  JiAnLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  JiAnLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  JiAnLevelEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 3,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 4,
  });
  JiAnSlopeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 5,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 3,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 4,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 5,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 6,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 7,
  });
  JiAnAspectEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 8,
  });
  JiAnGardenAgeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 0,
  });
  JiAnGardenAgeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 1,
  });
  JiAnGardenAgeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 2,
  });
  JiAnGardenAgeEchart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: 3,
  });

}

function Chart() {

  //通化人参种植面积分析
  var tonghuaOption = {
    title: {
      text: '通化人参种植面积分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'
      , subtext: '单位：万亩'

    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}：{c} 万亩'
    },
    legend: {
      data: ['面积']
    },
    xAxis: {
      data: ["集安市", "辉南县", "柳河县", "通化县", "东昌区", "二道江区", "高新区", "港务区"],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    }],
    series: [{
      name: '园参',
      type: 'bar',
      data: [3.222, 0.4989, 1.4173, 2.771822, 0.1, 0.2645, 0, 0.1167],
      itemStyle: {
        normal: {
          color: '#92c0d6'
        }
      }
    },
    {
      name: '林下参',
      type: 'bar',
      data: [15.8113, 1.1969, 3.9181, 8.2267, 0.2765, 0.7262, 0.0629, 0.446],
      itemStyle: {
        normal: {
          color: '#feb883'
        }
      }

    }
    ]
    // ,grid:{
    //   top:"15%",
    //   left:"2%",
    //   right:"2%",
    //   bottom:"2%",
    //   containLabel:true
    // }
  };
  var tonghuaEchart = echarts.init(document.getElementById('tonghuaEchart'));
  tonghuaEchart.setOption(tonghuaOption);
  tonghuaEchart.on('click', function (params) {

    console.log(params)

  });


  //林下参/园参面积占比分析
  forestGardenRateOption = {
    title: {
      text: '林下参/园参种植面积占比分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    color: ['#afd139', '#c23531'],
    tooltip: {
      trigger: 'item',
      formatter: '{c} 亩'
    },
    
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 302186, name: '林下参 78.2%' },
          { value: 83912, name: '园参 21.8%' },
        ],
        label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        
      }
    ]
  };
  forestGardenRateEchart = echarts.init(document.getElementById('forestGardenRateEchart'));
  forestGardenRateEchart.setOption(forestGardenRateOption);
  forestGardenRateEchart.on('click', function (params) {
    if(focusEChart != forestGardenRateEchart){
      viewer0.dataSources._dataSources.forEach(datasource => {
      datasource.entities._entities._array.forEach(entity => {
        entity.show = true;
      });
    });
    }
    if (params.name == '林下参 78.2%') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            if (entity.name == undefined) {
              try {
                if (entity.properties.地块类 == '林下参') {
                  entity.show = true;
                } else {
                  //console.log(params.event.target.id +','+lastParams)
                  if (params.dataIndex + offset_0 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }
              }
              catch { }
            } else {
              // try{
              //   if(datasource.entities._entities._array[entity.name].properties.地块类 == '林下参'){
              //     entity.polyline.material = Cesium.Color.WHITE.withAlpha(0.9);
              //   }else{
              //     entity.polyline.material =Cesium.Color.GREY.withAlpha(0.3)
              //   }
              // }catch{}
            }
          });
        }
      });

    } else if (params.name == '园参 21.8%') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '园参') {

                entity.show = true;
              } else {
                if (params.dataIndex + offset_0 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;

                }
              }
            }
            catch { }
          });
        }
      });
    }
    UndoPitch()

    focusEChart = forestGardenRateEchart;
    if (!focusMode || params.dataIndex + offset_0 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_0 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_0;
  })


  //林下参种植所有权占比分析
  forestOwnerOption = {
    title: {
      text: '林下参种植所有权占比分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 462, name: '国有 15.8%' },
          { value: 854, name: '集体 29.2%' },
          { value: 1603, name: '个人 54.9%' },

        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  forestOwnerEchart = echarts.init(document.getElementById('forestOwnerEchart'));
  forestOwnerEchart.setOption(forestOwnerOption);
  forestOwnerEchart.on('click', function (params) {

    if(focusEChart != forestOwnerEchart){
      viewer0.dataSources._dataSources.forEach(datasource => {
        datasource.entities._entities._array.forEach(entity => {
          entity.show = true;
        });
      });
    }

    // 此处一般写：click事件触发后的回调，来完成额外的功能
    if (params.name == '国有 15.8%') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.所属 == '国有') {
                entity.show = true;

              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_1 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }
            }
            catch { }
          });
        }
      });
    } else if (params.name == '集体 29.2%') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.所属 == '集体') {
                entity.show = true;
              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_1 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }
            }
            catch { }
          });
        }
      });
    } else if (params.name == '个人 54.9%') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.所属 == '个人') {
                entity.show = true;
              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_1 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }
            }
            catch { }
          });
        }
      });
    }
    UndoPitch()

    focusEChart = forestOwnerEchart;
    if (!focusMode || params.dataIndex + offset_1 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_1 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_1;
  });

  //园参种植所有权占比分析
  gardenOwnerOption = {
    title: {
      text: '园参种植所有权占比分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 2.2267, name: '国有 21%' },
          { value: 7.94417325, name: '集体 78%' },

        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  var gardenOwnerEchart = echarts.init(document.getElementById('gardenOwnerEchart'));
  gardenOwnerEchart.setOption(gardenOwnerOption)
  gardenOwnerEchart.on('click', function (params) {

    // 此处一般写：click事件触发后的回调，来完成额外的功能
    layui.use('form', function () {
      layer.msg('暂无数据');
    });
    // if (params.name == '国有 21%') {
    //   viewer0.dataSources._dataSources.forEach(datasource => {
    //     if (datasource._name == 'geojson/通化所有数据.geojson') {
    //       datasource.entities._entities._array.forEach(entity => {
    //         try {
    //           if (entity.properties.地块类 == '园参' && entity.properties.所属 == '国有') {
    //             entity.show = true;
    //           } else if (entity.properties.地块类 == '园参') {
    //             if (params.event.target.id == lastParams) {
    //               entity.show = (entity.show == true) ? false : true;
    //             } else {
    //               entity.show = false;
    //             }
    //           } else {
    //             entity.show = false;
    //           }
    //         }
    //         catch { }
    //       });
    //     }
    //   });
    // } else if (params.name == '集体 78%') {
    //   viewer0.dataSources._dataSources.forEach(datasource => {
    //     if (datasource._name == 'geojson/通化所有数据.geojson') {
    //       datasource.entities._entities._array.forEach(entity => {
    //         try {
    //           if (entity.properties.地块类 == '园参' && entity.properties.所属 == '集体') {
    //             entity.show = true;
    //           } else if (entity.properties.地块类 == '园参') {
    //             if (params.event.target.id == lastParams) {
    //               entity.show = (entity.show == true) ? false : true;
    //             } else {
    //               entity.show = false;
    //             }
    //           } else {
    //             entity.show = false;
    //           }
    //         }
    //         catch { }
    //       });
    //     }
    //   });
    // }

    lastParams = params.event.target.id;
  });


  //林下参种植面积分析
  var forestOption = {
    title: {
      text: '林下参种植面积分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'
      , subtext: '单位：万亩'
    },
    tooltip: {      
      trigger: 'item',
      formatter: '{b}：{c} 万亩'
    },
    legend: {
      data: ['面积']
    },
    xAxis: {
      data: ["集安市", "辉南县", "柳河县", "通化县", "东昌区", "二道江区", "高新区", "港务区"],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    }],
    series: [
      {
        name: '林下参',
        type: 'bar',
        data: [15.8113, 1.1969, 3.9181, 8.2267, 0.2765, 0.7262, 0.0629, 0.446],
        itemStyle: {
          normal: {
            color: '#feb883'
          }
        }

      }
    ]
  };
  echarts.init(document.getElementById('forestEchart')).setOption(forestOption);

  //林下参种植分级分析
  // var forestOwnerOption_1 = {
  //   title: {
  //     text: '林下参种植所有权占比分析',
  //     left: 'center',
  //     textStyle: {
  //       color: '#b7ddef',//字体颜色
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     data: [

  //     ]
  //   },
  //   series: [
  //     {
  //       name: '占比',
  //       type: 'pie',
  //       radius: '80%',
  //       data: [
  //         { value: 462, name: '国有 15.8%' },
  //         { value: 854, name: '集体 29.2%' },
  //         { value: 1603, name: '个人 54.9%' },
  //       ], label: {
  //         position: 'inner',
  //         fontSize: 14
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.8)'
  //         }
  //       }
  //     }
  //   ]
  // };

  // var forestOwnerEchart_1 = echarts.init(document.getElementById('forestOwnerEchart_1'));
  // forestOwnerEchart_1.setOption(forestOwnerOption_1);
  // forestOwnerEchart_1.on('click', function (params){
  //  lastParams = params;
  //   // 此处一般写：click事件触发后的回调，来完成额外的功能
  //   if(params.name == '国有 15.8%' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.所属 == '国有'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }else if(params.name == '集体 29.2%' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.所属 == '集体'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }else if(params.name == '个人 54.9%' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.所属 == '个人'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }
  // });

  //林下参种植分级分析
  var forestLevelOption = {
    title: {
      text: '林下参种植分级分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    color: ['#c23531', '#afd139', '#61a0a8'],
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
      color: '#ffffff'
      },
      formatter:function(params){
        console.log(params)
        switch(params){
          case'通天':
          return '东、北、东北坡'
          break;
          case'通地':
          return '东南、南坡'
          break;
          case'通人':
          return '西、西南、西北坡'
          break;
        }
      }
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 1300, name: '通天' },
          { value: 917, name: '通地' },
          { value: 817, name: '通人' },
        ], label: {
          position: 'inner',
          fontSize: 14,
          formatter: '{b} {d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  forestLevelEchart = echarts.init(document.getElementById('forestLevelEchart'));
  forestLevelEchart.setOption(forestLevelOption);
  forestLevelEchart.on('click', function (params) {

    if (params.name == '通天') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.分级 == '通天') {
                entity.show = true;
              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_2 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }

            }
            catch { }
          });
        }
      });
    } else if (params.name == '通地') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.分级 == '通地') {
                entity.show = true;
              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_2 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }
            }
            catch { }
          });
        }
      });
    } else if (params.name == '通人') {
      viewer0.dataSources._dataSources.forEach(datasource => {
        if (datasource._name == 'geojson/通化所有数据.geojson') {
          datasource.entities._entities._array.forEach(entity => {
            try {
              if (entity.properties.地块类 == '林下参' && entity.properties.分级 == '通人') {
                entity.show = true;
              } else if (entity.properties.地块类 == '林下参') {
                if (params.dataIndex + offset_2 == index) {
                  entity.show = (entity.show == true) ? false : true;
                } else {
                  entity.show = false;
                }
              } else {
                entity.show = false;
              }
            }
            catch { }
          });
        }
      });
    }
    UndoPitch()
    focusEChart = forestLevelEchart;
    if (!focusMode || params.dataIndex + offset_2 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_2 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_2;
  });


  //林下参坡度分析
  var forestSlopeOption = {
    title: {
      text: '林下参坡度分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 632, name: '陡' },
          { value: 3, name: '险' },
          { value: 602, name: '缓' },
          { value: 36, name: '急' },
          { value: 106, name: '平' },
          { value: 991, name: '斜' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  forestSlopeEchart = echarts.init(document.getElementById('forestSlopeEchart'));
  forestSlopeEchart.setOption(forestSlopeOption);
  forestSlopeEchart.on('click', function (params) {

    switch (params.name) {
      case '陡':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '陡') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '险':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '险') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '缓':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '缓') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '急':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '急') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '平':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '平') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '斜':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡度 == '斜') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_3 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
    }
    UndoPitch()
    focusEChart = forestSlopeEchart;
    if (!focusMode || params.dataIndex + offset_3 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_3 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_3;
  });

  //林下参坡向分析
  var forestAspectOption = {
    title: {
      text: '林下参坡向分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    color: ['#c23531','#c23531', '#afd139','#afd139', '#61a0a8','#61a0a8','#61a0a8','#c23531'],
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 368, name: '东北' },
          { value: 280, name: '东' },
          { value: 246, name: '东南' },
          { value: 478, name: '南' },
          { value: 284, name: '西南' },
          { value: 357, name: '西' },
          { value: 193, name: '西北' },
          { value: 652, name: '北' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  forestAspectEchart = echarts.init(document.getElementById('forestAspectEchart'))
  forestAspectEchart.setOption(forestAspectOption);
  forestAspectEchart.on('click', function (params) {

    switch (params.name) {
      case '东北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '东北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '东':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '东') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '东南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '东南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '西南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '西') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '西北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.坡向 == '北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参') {
                  if (params.dataIndex + offset_4 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
    }
    UndoPitch()
    focusEChart = forestAspectEchart;
    if (!focusMode || params.dataIndex + offset_4 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_4 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_4;
  });
  //林下参种植树木类型占比分析
  // var forestSpeciesOption = {
  //   title: {
  //     text: '林下参种植树木类型占比分析',
  //     left: 'center',
  //     textStyle: {
  //       color: '#b7ddef',//字体颜色
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     data: []
  //   },
  //   series: [
  //     {
  //       name: '占比',
  //       type: 'pie',
  //       radius: '60%',
  //       data: [
  //         { value: 305, name: '阔叶林' },
  //         { value: 2, name: '水曲柳' },
  //         { value: 27, name: '柞树' },
  //         { value: 125, name: ' 针阔混' },
  //         { value: 17, name: ' 针叶混' },
  //         { value: 31, name: '纯林' },
  //         { value: 1, name: '椴树林' },
  //         { value: 98, name: '红松林' },
  //         { value: 22, name: '胡桃楸' },
  //         { value: 285, name: '混交林' },
  //         { value: 6, name: '经济林' },
  //         { value: 556, name: '阔叶混' },
  //         { value: 230, name: '落叶松' },
  //         { value: 18, name: '其它灌' },
  //         { value: 72, name: '其它阔' },
  //         { value: 5, name: '其它阔叶林' },
  //         { value: 9, name: '杨树林' },
  //         { value: 7, name: '云杉林' },
  //         { value: 92, name: '柞树林' },
  //         { value: 11, name: '樟子松 ' },
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.8)'
  //         }
  //       }
  //     }
  //   ]
  // };
  // echarts.init(document.getElementById('forestSpeciesEchart')).setOption(forestSpeciesOption);

  //园参种植面积分析
  var gardenAreaOption = {
    title: {
      text: '园参种植面积分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'
      , subtext: '单位：万亩'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}：{c} 万亩'
    },
    legend: {
      data: ['面积']
    },
    xAxis: {
      data: ["集安市", "辉南县", "柳河县", "通化县", "东昌区", "二道江区", "高新区", "港务区"],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    }],
    series: [
      {
        name: '园参',
        type: 'bar',
        data: [3.222, 0.4989, 1.4173, 2.771822, 0.1, 0.2645, 0, 0.1167],
        itemStyle: {
          normal: {
            color: '#feb883'
          }
        }

      }
    ]
  };
  echarts.init(document.getElementById('gardenAreaEchart')).setOption(gardenAreaOption);

  //园参产量分析
  var gardenYieldOption = {
    title: {
      text: '园参产量分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 亩'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 0, name: '集安市' },
          { value: 2853217, name: '辉南县' },
          { value: 18865224, name: '柳河县' },
          { value: 9729575, name: '通化县' },
          { value: 0, name: '东昌区' },
          { value: 70800, name: '二道江区' },
          { value: 0, name: '高新区' },
          { value: 68600, name: '港务区' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  echarts.init(document.getElementById('gardenYieldEchart')).setOption(gardenYieldOption);

  // //园参所有权占比分析
  // var gardenOwnerOption = {
  //   title: {
  //     text: '园参所有权占比分析',
  //     left: 'center',
  //     textStyle: {
  //       color: '#b7ddef',//字体颜色
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     data: [

  //     ]
  //   },
  //   series: [
  //     {
  //       name: '占比',
  //       type: 'pie',
  //       radius: '70%',
  //       data: [
  //         { value: 7.94417325, name: '集体' },
  //         { value: 2.2267, name: '国有' },
  //       ]
  //       , label: {
  //         position: 'inner',
  //         fontSize: 14
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.8)'
  //         }
  //       }
  //     }
  //   ]
  // };
  echarts.init(document.getElementById('gardenOwnerEchart_1')).setOption(gardenOwnerOption);

  //园参土地类型分析
  var gardenDistrictKindOption = {
    title: {
      text: '园参土地类型分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} %'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 44.98, name: '耕地' },
          { value: 56.6117325, name: '园地' },
          { value: 1.03, name: '草地' },

        ],
        label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  echarts.init(document.getElementById('gardenDistrictKindEchart')).setOption(gardenDistrictKindOption);

  //集安园参种植面积分析
  var JiAnGardenOption = {
    title: {
      text: '集安园参种植面积分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'
      , subtext: '单位：平方米'
    },
    tooltip: {},
    legend: {
      data: ['面积']
    },
    xAxis: {
      data: ["朱仙村", "长川村", "榆林村", "永泉村", "迎水村", "杨木林村", "向阳村", "下套村", "下解放村", "下活龙村", "通天村", "通沟村", "太平村", "台上村", "双兴村", "石青村", "石砄村", "石湖村", "上活龙村", "山城村", "泉眼村", "青石村", "江口村", "建疆村", "甲乙村", "榆林镇政府", "移民局", "水利局", "第二参场", "黄柏村", "花甸村", "红星村", "蒿子沟村", "海关村",
        "果树村", "复兴村", "地沟村", "大甸子村", "财源村", "北屯村"],
      axisLabel: {
        formatter: function (value) {
          var ret = "";//拼接加\n返回的类目项  
          var maxLength = 1;//每项显示文字个数  
          var valLength = value.length;//X轴类目项的文字个数  
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
          if (rowN > 1)//如果类目项的文字大于5,  
          {
            for (var i = 0; i < rowN; i++) {
              var temp = "";//每次截取的字符串  
              var start = i * maxLength;//开始截取的位置  
              var end = start + maxLength;//结束截取的位置  
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
              temp = value.substring(start, end) + "\n";
              ret += temp; //凭借最终的字符串  
            }
            return ret;
          }
          else {
            return value;
          }
        },
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    }],
    series: [
      {
        name: '园参',
        type: 'bar',
        data: [232482.4007, 662611.9729, 122066.6363, 34626.16711, 705143.8843, 80734.11389, 240503.8601, 155894.5717, 430499.4303, 36351.9679, 38996.60522, 243315.7934, 86872.28972, 249331.2192, 12201.28917, 59380.90706, 70609.9134, 192648.2722, 149238.7801, 66691.38048, 87464.05802, 227033.1483, 518093.1659, 342249.7107, 86215.00382, 38575.18836, 61087.9772, 60052.41117, 623636.3081, 211668.7335, 237306.5107, 222980.0593, 610712.0887, 58615.79323, 1255795.474, 26810.83471, 1193832.864, 198581.1228, 74919.88531, 79558.39944],
        itemStyle: {
          normal: {
            color: '#92c0d6'
          }
        }
      },
    ]
  };
  echarts.init(document.getElementById('JiAnGardenEchart')).setOption(JiAnGardenOption);

  //集安园参年龄分析
  var JiAnGardenAgeOption = {
    title: {
      text: '集安园参年龄分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 亩'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 2927915.891, name: '两年参' },
          { value: 1193521.031, name: '三年参' },
          { value: 277325.4578, name: '四年参' },
          { value: 5686627.813, name: '五年参' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  JiAnGardenAgeEchart = echarts.init(document.getElementById('JiAnGardenAgeEchart'))
  JiAnGardenAgeEchart.setOption(JiAnGardenAgeOption);
  JiAnGardenAgeEchart.on('click', function (params) {
    switch (params.name) {
      case '两年参':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市' && entity.properties.参龄 == 2022) {
                  entity.show = true;
                } else if(entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_5 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        })
        break;
      case '三年参':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市' && entity.properties.参龄 == 2021) {
                  entity.show = true;
                } else if(entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_5 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        })
        break;
      case '四年参':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市' && entity.properties.参龄 == 2020) {
                  entity.show = true;
                } else if(entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_5 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        })
        break;
      case '五年参':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市' && entity.properties.参龄 == 2019) {
                  entity.show = true;
                } else if(entity.properties.地块类 == '园参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_5 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        })
        break;
    }
    UndoPitch()
    focusEChart = JiAnGardenAgeEchart;
    if (!focusMode || params.dataIndex + offset_5 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_5 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_5;
  });

  //集安园参土地类型分析
  var JiAnGardenDistrictKindOption = {
    title: {
      text: '集安园参土地类型分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 亩'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 7595532.442, name: '果园' },
          { value: 2489857.75, name: '其他园地' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  echarts.init(document.getElementById('JiAnGardenDistrictKindEchart')).setOption(JiAnGardenDistrictKindOption);

  //集安园参通天通地通人分析
  var JiAnGardenTongOption = {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 43, name: '通天 43%' },
          { value: 28, name: '通地 28%' },
          { value: 29, name: '通人 29%' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  //echarts.init(document.getElementById('JiAnGardenTongEchart')).setOption(JiAnGardenTongOption);


  //集安市林下参种植面积分析
  var JiAnOption = {
    title: {
      text: '集安市林下参种植面积分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'
      , subtext: '单位：万亩'
    },
    tooltip: {
      
    },
    legend: {
      data: ['面积']
    },
    xAxis: {
      data: ["凉水朝鲜族乡 ", "麻线乡", "城东街道", "通胜街道", "台上镇", "清河镇", "太王镇", "榆林镇", "青石镇", "财源镇", "大路镇", "头道镇", "花甸镇", "双岔林场", "热闹林场", "大青沟林场", "头道林场", "榆林林场", "太王林场"],
      axisLabel: {
        formatter: function (value) {
          var ret = "";//拼接加\n返回的类目项  
          var maxLength = 1;//每项显示文字个数  
          var valLength = value.length;//X轴类目项的文字个数  
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
          if (rowN > 1)//如果类目项的文字大于5,  
          {
            for (var i = 0; i < rowN; i++) {
              var temp = "";//每次截取的字符串  
              var start = i * maxLength;//开始截取的位置  
              var end = start + maxLength;//结束截取的位置  
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
              temp = value.substring(start, end) + "\n";
              ret += temp; //凭借最终的字符串  
            }
            return ret;
          }
          else {
            return value;
          }
        },
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    }],
    series: [
      {
        name: '林下参',
        type: 'bar',
        data: [0.4629, 0.8262, 0.0135, 0.15, 0.6399, 2.1188, 0.5032, 0.7567, 1.0276, 0.4661, 3.1144, 0.1793, 0.2712, 0.361, 0.0504, 4.592, 0.028, , 0.1589, 0.0912],
        itemStyle: {
          normal: {
            color: '#feb883'
          }
        }

      }
    ]
  };
  echarts.init(document.getElementById('JiAnEchart')).setOption(JiAnOption);

  //集安市林下参种植所有权占比分析_1
  // var JiAnOwnerOption_1 = {
  //   title: {
  //     text: '集安市林下参种植所有权占比分析',
  //     left: 'center',
  //     textStyle: {
  //       color: '#b7ddef',//字体颜色
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     data: [

  //     ]
  //   },
  //   series: [
  //     {
  //       name: '占比',
  //       type: 'pie',
  //       radius: '80%',
  //       data: [
  //         { value: 622, name: '个人' },
  //         { value: 281, name: '国有' },
  //         { value: 414, name: '集体' },
  //       ], label: {
  //         position: 'inner',
  //         fontSize: 14
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.8)'
  //         }
  //       }
  //     }
  //   ]
  // };

  // var JiAnOwnerEchart_1 = echarts.init(document.getElementById('JiAnOwnerEchart_1'))
  // JiAnOwnerEchart_1.setOption(JiAnOwnerOption_1);
  // JiAnOwnerEchart_1.on('click', function (params){
  //  lastParams = params;
  //   // 此处一般写：click事件触发后的回调，来完成额外的功能
  //   if(params.name == '国有' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.所属 == '国有'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }else if(params.name == '集体' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.所属 == '集体'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }else if(params.name == '个人' ){
  //     viewer0.dataSources._dataSources.forEach(datasource => {
  //       if (datasource._name == 'geojson/通化所有数据.geojson') {
  //           datasource.entities._entities._array.forEach(entity => {
  //               try{
  //                   if(entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.所属 == '个人'){
  //                       entity.show = true;
  //                   }else{
  //                       if(params.event.target.id == lastParams){
  //   entity.show =  (entity.show == true) ? false:true;
  // }else{
  //   entity.show = false;
  // }
  //                   }
  //               }
  //               catch{}
  //       });
  //       }
  //   });
  //   }
  // });

  //集安市林下参分级分析
  var JiAnLevelOption = {
    title: {
      text: '集安市林下参分级分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    color: ['#c23531', '#afd139', '#61a0a8'],
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      orient: 'vertical',
    left: 'left',
    textStyle: {
      color: '#ffffff'
    },
    formatter:function(params){
      console.log(params)
      switch(params){
        case'通天':
        return '东、北、东北坡'
        break;
        case'通地':
        return '东南、南坡'
        break;
        case'通人':
        return '西、西南、西北坡'
        break;
      }
    }
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 584, name: '通天' },
          { value: 461, name: '通地' },
          { value: 305, name: '通人' },
        ], label: {
          position: 'inner',
          fontSize: 14,
          formatter: '{b} {d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  JiAnLevelEchart = echarts.init(document.getElementById('JiAnLevelEchart'));
  JiAnLevelEchart.setOption(JiAnLevelOption);
  JiAnLevelEchart.on('click', function (params) {

    // 此处一般写：click事件触发后的回调，来完成额外的功能
    console.log(params)
    switch (params.name) {
      case '通天':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.分级 == '通天') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_6 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '通地':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.分级 == '通地') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_6 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '通人':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.分级 == '通人') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_6 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
    }
    UndoPitch()
    focusEChart = JiAnLevelEchart;
    if (!focusMode || params.dataIndex + offset_6 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_6 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_6;
  });

  //集安市林下参坡度分析
  var JiAnSlopeOption = {
    title: {
      text: '集安市林下参坡度分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 382, name: '陡' },
          { value: 3, name: '险' },
          { value: 219, name: '缓' },
          { value: 36, name: '急' },
          { value: 35, name: '平' },
          { value: 564, name: '斜' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };

  JiAnSlopeEchart = echarts.init(document.getElementById('JiAnSlopeEchart'));
  JiAnSlopeEchart.setOption(JiAnSlopeOption);
  JiAnSlopeEchart.on('click', function (params) {

    // 此处一般写：click事件触发后的回调，来完成额外的功能
    switch (params.name) {
      case '陡':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '陡') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '险':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '险') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '缓':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '缓') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '急':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '急') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '平':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '平') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '斜':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡度 == '斜') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_7 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
    }
    UndoPitch()
    focusEChart = JiAnSlopeEchart;
    if (!focusMode || params.dataIndex + offset_7 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_7 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_7;
  });

  //集安市林下参坡向分析
  var JiAnAspectOption = {
    title: {
      text: '集安市林下参坡向分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    color: ['#c23531','#c23531', '#afd139','#afd139', '#61a0a8', '#61a0a8', '#61a0a8','#7ed1f1','#c23531'],
    tooltip: {
      trigger: 'item',
      formatter: '{c} 个'
    },
    legend: {
      data: [

      ]
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 141, name: '东北' },
          { value: 149, name: '东' },
          { value: 107, name: '东南' },
          { value: 271, name: '南' },
          { value: 83, name: '西南' },
          { value: 79, name: '西' },
          { value: 93, name: '西北' },
          { value: 11, name: '无坡' },
          { value: 294, name: '北' },
        ], label: {
          position: 'inner',
          fontSize: 14
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };

  JiAnAspectEchart = echarts.init(document.getElementById('JiAnAspectEchart'))
  JiAnAspectEchart.setOption(JiAnAspectOption);
  JiAnAspectEchart.on('click', function (params) {

    switch (params.name) {
      case '东北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '东北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '东':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '东') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '东南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '东南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西南':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '西南') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '西') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '西北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '西北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '北':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '北') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                } else {
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
      case '无坡':
        viewer0.dataSources._dataSources.forEach(datasource => {
          if (datasource._name == 'geojson/通化所有数据.geojson') {
            datasource.entities._entities._array.forEach(entity => {
              try {
                if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市' && entity.properties.坡向 == '无坡') {
                  entity.show = true;
                } else if (entity.properties.地块类 == '林下参' && entity.properties.县区 == '集安市') {
                  if (params.dataIndex + offset_8 == index) {
                    entity.show = (entity.show == true) ? false : true;
                  } else {
                    entity.show = false;
                  }
                }else{
                  entity.show = false;
                }
              }
              catch { }
            });
          }
        });
        break;
    }
    UndoPitch()
    focusEChart = JiAnAspectEchart;
    if (!focusMode || params.dataIndex + offset_8 != index) {
      focusEChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      focusMode = true;
    }else if(focusMode && params.dataIndex + offset_8 == index){
      focusMode = false;
    }
    index = params.dataIndex + offset_8;
  });

  //集安市林下参种植树木类型占比分析
  // var JiAnSpeciesOption = {
  //   title: {
  //     text: '集安市林下参种植树木类型占比分析',
  //     left: 'center',
  //     textStyle: {
  //       color: '#b7ddef',//字体颜色
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     data: []
  //   },
  //   series: [
  //     {
  //       name: '占比',
  //       type: 'pie',
  //       radius: '60%',
  //       data: [
  //         { value: 1, name: '椴树林' },
  //         { value: 53, name: '红松林' },
  //         { value: 15, name: '胡桃楸' },
  //         { value: 2, name: '胡桃楸林' },
  //         { value: 5, name: '经济林' },
  //         { value: 490, name: '阔叶混' },
  //         { value: 102, name: '落叶松' },
  //         { value: 29, name: '落叶松林' },
  //         { value: 16, name: '其它灌' },
  //         { value: 72, name: '其它阔' },
  //         { value: 5, name: '其它阔叶林' },
  //         { value: 7, name: '杨树林' },
  //         { value: 2, name: '云杉林' },
  //         { value: 56, name: '柞树林' },
  //         { value: 2, name: '樟子松 ' },
  //         { value: 77, name: ' 针阔混' },
  //         { value: 4, name: ' 针叶混' },
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.8)'
  //         }
  //       }
  //     }
  //   ]
  // };
  // echarts.init(document.getElementById('JiAnSpeciesEchart')).setOption(JiAnSpeciesOption);


  //识别园参地块数分析
  var analysisGardenAmountOption = {
    title: {
      text: '识别园参地块数分析'
      , textStyle: {
        fontSize: 20,//字体大小
        color: '#b7ddef',//字体颜色
      }, left: 'center'

    },
    tooltip: {},
    legend: {
      data: ['数目']
    },
    xAxis: {
      data: ["东昌区 ", "辉南县", "集安市", "二江道区", "柳河县", "通化县",],
      axisLabel: {
        // formatter: function (value) {
        //   var ret = "";//拼接加\n返回的类目项  
        //   var maxLength = 1;//每项显示文字个数  
        //   var valLength = value.length;//X轴类目项的文字个数  
        //   var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
        //   if (rowN > 1)//如果类目项的文字大于5,  
        //   {
        //     for (var i = 0; i < rowN; i++) {
        //       var temp = "";//每次截取的字符串  
        //       var start = i * maxLength;//开始截取的位置  
        //       var end = start + maxLength;//结束截取的位置  
        //       //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
        //       temp = value.substring(start, end) + "\n";
        //       ret += temp; //凭借最终的字符串  
        //     }
        //     return ret;
        //   }
        //   else {
        //     return value;
        //   }
        // },
        show: true,
        textStyle: {
          color: '#ffffff'
        },
        interval: 0,
      }
    },
    yAxis: {},
    series: [
      {
        name: '识别园参地块数',
        type: 'bar',
        data: [104, 70, 2438, 55, 487, 2359],
        itemStyle: {
          normal: {
            color: '#feb883'
          }
        }

      }
    ]
  };
  echarts.init(document.getElementById('analysisGardenAmountEchart')).setOption(analysisGardenAmountOption);


  //识别园参种植面积占比分析
  var analysisGardenAreaOption = {
    title: {
      text: '识别园参种植面积占比分析',
      left: 'center',
      textStyle: {
        color: '#b7ddef',//字体颜色
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#ffffff',//字体颜色
      }
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 728.567005645752, name: '东昌区' },
          { value: 2790.06410009766, name: '辉南县' },
          { value: 18304.5723174362, name: '集安市' },
          { value: 816.169234725952, name: '二江道区' },
          { value: 8612.67249659728, name: ' 柳河县' },
          { value: 22348.2220658341, name: '通化县' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 14,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    ]
  };
  echarts.init(document.getElementById('analysisGardenAreaEchart')).setOption(analysisGardenAreaOption);

}
