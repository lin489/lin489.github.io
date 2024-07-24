window.targetDatasource;
window.newEntity;

var properties = {
    "地块类":"",
    "县区":"",
    "乡村":"",
    "所属":"",
    "面积":0,
    "坡向":"",
    "坡度":"",
    "树木":"",
    "租赁周期":"",
    "播种时间":"",
    "参龄":"",
    "采收时间":"",
}

layui.use('form', function () {
    var form = layui.form;
    //监听提交
    form.on('submit(formDataEditInfo)', function (data) {
        lockJiAnPick = true;
        properties.县区 = (data.field.县区);
        properties.乡村 = (data.field.乡村);
        properties.所属 = (data.field.所属);
        properties.面积 = ( parseFloat(data.field.面积));
        properties.坡向= (data.field.坡向);
        properties.坡度= (data.field.坡度);
        properties.树木= (data.field.树木);
        console.log(properties);
        // let strIndexStart = text.search("\"FID\""+":"+pick.id._properties._FID._value);
        // let strIndexEnd = strIndexStart +1;

        // for(let i = strIndexEnd;i<=text.length;strIndexEnd++){
        //    if(text.charAt(strIndexEnd)=="}"){
        //             console.log(strIndexEnd);
        //             let str = text.substring(strIndexStart, strIndexEnd);
        //             let newStr;
        //             if(str.search("\"name\""+":")!=-1){
        //                 newStr = str.replace("\"name\""+":"+ "\""+ json.features[pick.id._properties._FID._value].properties.name + "\"","\"name\""+":"+ "\""+ pick.id._properties._name._value+ "\"")
        //             }else{
        //                 // console.log(",\"name\""+":"+ "\""+ pick.id._properties._name._value+ "\"");
        //                 newStr = str + ",\"name\""+":"+ "\""+ data.field.name+ "\"";
        //             }
        //             if(str.search("\"owner\""+":")!=-1){
        //                 newStr = newStr.replace("\"owner\""+":"+ "\""+json.features[pick.id._properties._FID._value].properties.owner+ "\"","\"owner\""+":" + "\""+pick.id._properties._owner._value+ "\"")
        //             }else{
        //                 newStr = newStr.replace("}",",\"owner\""+":" + "\""+data.field.owner+ "\"}")
        //             }
        //             if(str.search("\"area\""+":")!=-1){
        //                 newStr = newStr.replace("\"area\""+":"+json.features[pick.id._properties._FID._value].properties.area,"\"area\""+":"+ pick.id._properties._area._value)
        //             }else{
        //                 newStr = newStr.replace("}",",\"area\""+":"+ data.field.area+ "}")  
        //             }
        //             if(str.search("\"plant\""+":")!=-1){
        //                 newStr = newStr.replace("\"plant\""+":"+ "\""+json.features[pick.id._properties._FID._value].properties.plant+ "\"","\"plant\""+":"+ "\""+pick.id._properties._plant._value+ "\"")
        //             }else{
        //                 newStr = newStr.replace("}",",\"plant\""+":"+ "\""+data.field.plant+ "\"}")
        //             }
        //             if(str.search("\"land\""+":")!=-1){
        //                 newStr = newStr.replace("\"land\""+":"+ "\""+json.features[pick.id._properties._FID._value].properties.land+ "\"","\"land\""+":"+ "\""+ pick.id._properties._land._value+ "\"");
        //             }else{
        //                 newStr = newStr.replace("}",",\"land\""+":"+ "\""+ data.field.land+ "\"}");
        //             }          
        //             console.log(pick.id._properties.area);
        //             console.log(newStr);
        //             text = text.replace(str,newStr);
        //         break;
        //     }
        // }

        pickEntity._properties.县区 = properties.县区;
        pickEntity._properties.乡村 = properties.乡村;
        pickEntity._properties.所属 = properties.所属;
        pickEntity._properties.面积 = properties.面积;
        pickEntity._properties.坡向 = properties.坡向;
        pickEntity._properties.坡度 = properties.坡度;
        pickEntity._properties.树木 = properties.树木;

        HideEditPanel()
        return false;
    });
});
layui.use('form', function () {
    var form = layui.form;
    //监听提交
    form.on('submit(formDataEditInfo_garden)', function (data) {
        lockJiAnPick = true;
        properties.县区 = (data.field.县区);
        properties.乡村 = (data.field.乡村);
        properties.所属 = (data.field.所属);
        properties.面积 = ( parseFloat(data.field.面积));
        properties.租赁周期= (data.field.租赁周期);
        properties.播种时间= (data.field.播种时间);
        properties.参龄= (data.field.参龄);
        properties.采收时间= (data.field.采收时间);
        console.log(properties);
        pickEntity._properties.县区 = properties.县区;
        pickEntity._properties.乡村 = properties.乡村;
        pickEntity._properties.所属 = properties.所属;
        pickEntity._properties.面积 = properties.面积;
        pickEntity._properties.租赁周期 = properties.租赁周期;
        pickEntity._properties.播种时间 = properties.播种时间;
        pickEntity._properties.参龄 = properties.参龄;
        pickEntity._properties.采收时间 = properties.采收时间;
        HideEditPanel_Garden()
        return false;
    });
});

function AddProperties(area){
    properties.面积 = area;
    lockJiAnPick = false;
    newEntity._properties = properties;
    newEntity._properties.地块类 = '林下参';
    document.getElementById("info01").innerText = '';
    document.getElementById("info02").innerText = '';
    document.getElementById("info03").innerText = '';
    document.getElementById("info04").innerText = area + ' (㎡)';
    document.getElementById("info05").innerText = '';
    document.getElementById("info06").innerText = '';
    document.getElementById("info07").innerText = '';
    ShowEditPanel();
}

function ShowEditPanel(){
    HideAllLeftPanel()
    if(pickEntity._properties.地块类 == '林下参'){
        document.getElementById("editData").style.display = 'Block';
        // console.log(document.getElementById("edit01").placeholder)
    
        let district = document.getElementById("info01").innerText;
        if(district ==' '){
            district = '未知';
        }
    
        let countryside = document.getElementById("info02").innerText;
        if(countryside ==' '){
            countryside = '未知';
        }
        let owner = document.getElementById("info03").innerText;
        if(owner ==' '){
            owner = '未知';
        }
        let area = document.getElementById("info04").innerText;
        area = area.slice(0,area.indexOf(' (㎡)'));
    
        let slope = document.getElementById("info05").innerText;
        if(slope ==' '){
            slope = '未知';
        }
        let aspect = document.getElementById("info06").innerText;
        if(aspect ==' '){
            aspect = '未知';
        }
    
        let tree = document.getElementById("info07").innerText;
        if(tree ==' '){
            tree = '未知';
        }
        document.getElementById("edit01").value = district;
        document.getElementById("edit02").value = countryside;
        document.getElementById("edit03").value = owner;
        document.getElementById("edit04").value = area;
        document.getElementById("edit05").value = slope;
        document.getElementById("edit06").value = aspect;
        document.getElementById("edit07").value = tree;
    
        document.getElementById("edit01").setAttribute("placeholder",district);
        document.getElementById("edit02").setAttribute("placeholder",countryside);
        document.getElementById("edit03").setAttribute("placeholder",owner);
        document.getElementById("edit04").setAttribute("placeholder",area);
        document.getElementById("edit05").setAttribute("placeholder",slope);
        document.getElementById("edit06").setAttribute("placeholder",aspect);
        document.getElementById("edit07").setAttribute("placeholder",tree);
    }else{
        document.getElementById("editData_garden").style.display = 'Block';
        // console.log(document.getElementById("edit01").placeholder)
    
        let district = document.getElementById("info01_garden").innerText;
        if(district ==' '){
            district = '未知';
        }
    
        let countryside = document.getElementById("info02_garden").innerText;
        if(countryside ==' '){
            countryside = '未知';
        }
        let owner = document.getElementById("info03_garden").innerText;
        if(owner ==' '){
            owner = '未知';
        }
        let area = document.getElementById("info04_garden").innerText;
        area = area.slice(0,area.indexOf(' (㎡)'));
    
        let lendTime = document.getElementById("info05_garden").innerText;
        if(lendTime ==' '){
            lendTime = '未知';
        }
        let sowTime = document.getElementById("info06_garden").innerText;
        if(sowTime ==' '){
            sowTime = '未知';
        }
    
        let rsAge = document.getElementById("info07_garden").innerText;
        if(rsAge ==' '){
            rsAge = '未知';
        }
        let harvestTime = document.getElementById("info08_garden").innerText;
        if(harvestTime ==' '){
            harvestTime = '未知';
        }
        document.getElementById("edit01_garden").value = district;
        document.getElementById("edit02_garden").value = countryside;
        document.getElementById("edit03_garden").value = owner;
        document.getElementById("edit04_garden").value = area;
        document.getElementById("edit05_garden").value = lendTime;
        document.getElementById("edit06_garden").value = sowTime;
        document.getElementById("edit07_garden").value = rsAge;
        document.getElementById("edit07_garden").value = harvestTime;

        document.getElementById("edit01_garden").setAttribute("placeholder",district);
        document.getElementById("edit02_garden").setAttribute("placeholder",countryside);
        document.getElementById("edit03_garden").setAttribute("placeholder",owner);
        document.getElementById("edit04_garden").setAttribute("placeholder",area);
        document.getElementById("edit05_garden").setAttribute("placeholder",lendTime);
        document.getElementById("edit06_garden").setAttribute("placeholder",sowTime);
        document.getElementById("edit07_garden").setAttribute("placeholder",rsAge);
        document.getElementById("edit07_garden").setAttribute("placeholder",harvestTime);
    }
}
function HideEditPanel(){
    HideAllLeftPanel()
    document.getElementById("dataINFO").style.display = 'block';
    document.getElementById("info01").innerText = pickEntity._properties.县区;
    document.getElementById("info02").innerText = pickEntity._properties.乡村;
    document.getElementById("info03").innerText = pickEntity._properties.所属;
    document.getElementById("info04").innerText = parseFloat(pickEntity._properties.面积).toFixed(6) + ' (㎡)';
    document.getElementById("info05").innerText = pickEntity._properties.坡向;
    document.getElementById("info06").innerText = pickEntity._properties.坡度;
    document.getElementById("info07").innerText = pickEntity._properties.树木;
}

function HideEditPanel_Garden(){
    HideAllLeftPanel()
    document.getElementById("dataINFO_garden").style.display = 'block';
    document.getElementById("info01_garden").innerText = pickEntity._properties.县区;
    document.getElementById("info02_garden").innerText = pickEntity._properties.乡村;
    document.getElementById("info03_garden").innerText = pickEntity._properties.所属;
    document.getElementById("info04_garden").innerText = parseFloat(pickEntity._properties.面积).toFixed(6) + ' (㎡)';
    document.getElementById("info05_garden").innerText = pickEntity._properties.租赁周期;
    document.getElementById("info06_garden").innerText = pickEntity._properties.播种时间;
    document.getElementById("info07_garden").innerText = pickEntity._properties.参龄;
    document.getElementById("info08_garden").innerText = pickEntity._properties.采收时间;
}

