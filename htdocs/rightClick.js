var cesiumContainer = document.querySelector("#cesiumContainer");

var ellipsoid = viewer0.scene.globe.ellipsoid;

var eText = [
    {
        text: "显示此处经纬度",
        type: 'longlat'
    },
    {
        text: "开启深度监测",
        type: 'opendepth',
    },
    {
        text: "关闭深度监测",
        type: 'closedepth',
    },
    {
        text: "初始视角",
        type: "firstperspective",
    }];


// 禁用浏览器右键菜单
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
doProhibit()

loadRightClick();
function loadRightClick() {
    var Handler = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);
    Handler.setInputAction(function (e) {

        // 判断点击位置是否有实体
       
        
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
loadUI(e.position, entity._contextmenuItems, type)
/**
 * 右键点击html
 * @params {object} pos 屏幕坐标对象｛x:122,y:444｝
 * @params {object} textArr 渲染文本数组对象
 * @params {string} type 实体类型 undefined：空白区域
 */
function loadUI(pos, textArr, type) {
    var con, lis = '';
    if (textArr != undefined && type != undefined) {
        for (var i = 0; i < textArr.length; i++) {
            lis += `<li class="li-item" data-index="20">
                        <a href="javascript:rightliClick( '${textArr[i].type}' )" >${textArr[i].text}</a>
                    </li>`
        }
    } else {
        var terrainStatus = viewer0.scene.globe.depthTestAgainstTerrain;
        for (var i = 0; i < eText.length; i++) {
            if (terrainStatus) {
                if (eText[i].type == 'opendepth') { continue }
            } else {
                if (eText[i].type == 'closedepth') { continue }
            }
            lis += `<li class="li-item" data-index="20">
                        <a href="javascript:rightliClick( '${eText[i].type}' )">${eText[i].text}</a>
                    </li>`
        }
    }
    con = `<ul class="contextmenu-ul">${lis}</ul>`
    var divs = document.querySelectorAll(".contextmenu");
    if (divs.length != 0) {
        cesiumContainer.removeChild(divs[0])
    }
    div = document.createElement('div')
    div.className = "contextmenu"
    div.style.top = pos.y + 'px'
    div.style.left = pos.x + 'px'
    div.style.position = 'fixed'
    div.innerHTML = con;
    cesiumContainer.append(div)
    console.log(div);
}

function rightliClick(type) {
    var divs = document.querySelectorAll(".contextmenu")
    cesiumContainer.removeChild(divs[0]);
    switch (type) {
        case 'longlat':
            alert('F12 Console latObj:')
            console.log("latObj:", latObj)
            break;
        case 'opendepth':
            viewer0.scene.globe.depthTestAgainstTerrain = true;
            break;
        case 'closedepth':
            viewer0.scene.globe.depthTestAgainstTerrain = false;
            break;
        case 'firstperspective':
            flyToSatrt()
            break;
        case 'cesiumObj':
            var entity = viewer0.entities.getById(entitiesId);
            if (entity != undefined) {
                viewer0.entities.remove(entity)
            }
            break;
        case '3dtiles':
            tileset.show = false;
            break;
    }
}

