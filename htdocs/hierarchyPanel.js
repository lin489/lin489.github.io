window.hierarchyTree;
var treeInit;
CloseHierarchyPanel()
//层级管理树
layui.use('tree', function () {
    hierarchyTree = layui.tree;
    var jsonData = [];

    //渲染
    var inst1 = hierarchyTree.render({
        elem: '#hierarchyTree'  //绑定元素
        , id: 'demoId'
        , data: jsonData
        , showCheckbox: true
        , edit: ['update', 'del']
        , click: function (obj) {
            viewer0.imageryLayers._layers.forEach(imagerylayer => {
                console.log(imagerylayer._imageryProvider._getFeatureInfoUrl + '/' + imagerylayer._imageryProvider._layers);
                console.log(obj.data.id);
                if (imagerylayer._imageryProvider._getFeatureInfoUrl + '/' + imagerylayer._imageryProvider._layers == obj.data.id) {
                    viewer0.imageryLayers.raiseToTop(imagerylayer);
                }
            });
            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == obj.data.id) {
                    viewer0.flyTo(datasource);

                }
            });
        }
        , oncheck: function (obj) {
            // console.log(obj.data); //得到当前点击的节点数据
            // console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
            // console.log(obj.elem); //得到当前节点元素

            viewer0.dataSources._dataSources.forEach(datasource => {
                if (datasource._name == obj.data.id) {
                    datasource.show = obj.checked;

                }
            });

            viewer0.imageryLayers._layers.forEach(imagerylayer => {
                console.log(imagerylayer._imageryProvider._getFeatureInfoUrl + '/' + imagerylayer._imageryProvider._layers);
                console.log(obj.data.id);
                if (imagerylayer._imageryProvider._getFeatureInfoUrl + '/' + imagerylayer._imageryProvider._layers == obj.data.id) {
                    imagerylayer.show = obj.checked;
                }
            });

            jsonData.forEach(elem => {
                if (elem.id == obj.data.id) {
                    elem.checked = obj.checked;
                }
            });
        }
        , operate: function (obj) {
            var type = obj.type; //得到操作类型：add、edit、del
            var data = obj.data; //得到当前节点的数据
            var elem = obj.elem; //得到当前节点元素

            //Ajax 操作
            var id = data.id; //得到节点索引
            if (type === 'update') { //修改节点
                console.log(elem.find('.layui-tree-txt').html()); //得到修改后的内容
            }
            else if (type === 'del') { //删除节点
                DataRemove(data.id);
                for (let i = 0; i < jsonData.length; i++) {
                    if (jsonData[i].id == data.id) {
                        jsonData.splice(i, 1);
                    }
                }
            };
        }
    });


    window.AddNode = function () {
        let titleText, id, checked = true;
        switch (arguments.length) {
            case 2:
                titleText = arguments[0];
                id = arguments[1];
                break;
            case 3:
                titleText = arguments[0];
                id = arguments[1];
                checked = arguments[2]
                break;
        }
        let obj = { title: titleText, id: id, checked: checked };
        jsonData.push(obj);
        console.log(jsonData);
        hierarchyTree.reload('demoId', {
            data: jsonData
        });
    }

    window.CancelCheckNode = function () {
        id = arguments[0];

        jsonData.forEach(element => {
            if (element.id == id) {
                element.checked = false;
            }
        });
        hierarchyTree.reload('demoId', {
            data: jsonData
        });
    }

    DefaultDataLoad();
});

//关闭层级管理面板
function CloseHierarchyPanel() {
    document.getElementById("hierarchyPanel").style.display = 'none';
}

//显示层级管理面板
function ShowHierarchyPanel() {
    document.getElementById("hierarchyPanel").style.display = 'block';
}
