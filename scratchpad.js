/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
//var oldclear = map.clear
//console.log(oldclear)
function searchLine(name, stopName) {
  $('#lineList').hide();
  $('#dybusList').show();
  //dybusInfo = [];
  FromStop = '';
  ToStop = '';
  $('#fromStop').val(Lang['請由圖面站牌點選上車站']);
  $('#toStop').val(Lang['請由圖面站牌點選下車站']);
  //$('#dybusList').show(); clearInterval(runDybus);
  //var Data = new Array();
  //map.clear();
  map.reMap(4);
  AttributeID = name;
  $('#tb').html('');
  stopImg = GO_BACK == 0 ? stopImgGO : stopImgBACK;
  var busIDtoSeq = {
    '': ''
  };
  /*貼點*/
  var ajaxfun = function (response) {
    //alert(response);
    if (response == '_&' || response == '')
    return noInfo();
    $('#mapMenu').show();
    BusLine = name;
    //busPoint = response.split('_&')[1];
    //response = response.split('_&')[0];
    response = response.split('_|');
    for (i = 1; i < response.length; i++) {
      response[i] = response[i].split('_,');
    }
    var x = 0,
    y = 0,
    count = 0;
    //地圖氣泡框
    InfoWindow1 = map.InfoWindow(); //.InfoWindow({ content: windowLayout });
    var Layout = $('<div>').html($('#layout1').children().clone()); //include Dom of id(Layout)  in masterPage
    var tmp = Layout.html();
    
    for (i = 2; i < response.length; i++) {
      
      var mark = map.mark(response[i][3], response[i][4], (stopName == response[i][0] ? poiImg : stopImg));
      var StopIndex = (GO_BACK == 0 ? response[i][1] : i - 2);
      mark.label(response[i][0]);
      mark.number(StopIndex);
      //mark = mark.img();
      $(mark).attr('x', response[i][3]);
      $(mark).attr('y', response[i][4]);
      $(mark).attr('pname', response[i][0]);
      $(mark).attr('count', i - 2);
      $(mark).attr('StopIndex', StopIndex);
      $(mark).attr('stopID', response[i][6]);
      //busIDtoSeq
      busIDtoSeq[response[i][6]] = i - 2;
      markTmp[i - 2] = mark;
      var fun = function (mark) {
        var count = $(mark).attr('count');
        tmpMark = mark;
        //ShowMapMess(count);
/*
Exception: syntax error
@Scratchpad/1:1
*/
      }
      //map.listen(mark, 'mouseover', fun);

      map.listen(mark, 'click', fun);
      //map.listen(InfoWindow.Window, 'mouseout', fun1);
      //判斷點位如果為0,0 忽略
      if (response[i][3] != 0 && response[i][3] != '' && response[i][4] != 0 && response[i][4] != '') {
        y += response[i][3] - 0;
        x += response[i][4] - 0;
        count++;
      }
    }
    
      //地圖定位

    //map.setCenter(y / count, x / count);
    if (Pname != '') addPoint(Pname, Px, Py);

    //arrivalInfoLine(name, fun);
    //畫線 (shape file) ,function( [name:路線名稱],[SName:路線開始名稱],[EName:路線結束名稱],[goback:去返程],[color:路線顏色],[map:地圖])
    var pa = {
      name: name,
      SName: '',
      EName: '',
      goback: GO_BACK,
      color: GO_BACK == 0 ? '0000FF' : 'FF0000',
      map: map
    };
    //Tms.shapeFile(pa);
    var ajaxfun = function (response) { //lon/lat
      //alert(response);
      response = response.split(', ');
      for (var i = 0; i < response.length; i++) {
        response[i] = response[i].split(' ');
      }
      map.line(response, GO_BACK == 0 ? '0000FF' : 'FF0000');
    }
    var urls = 'Aspx/dybus/RoutePATH.aspx';
    var pa = {
      Name: encodeURI(BusLine),
      lang: PUrlStr
    };
    IK_AJAX(urls, pa, ajaxfun);
    //改道資訊
    //busMessage(name);
    //時刻
    var ajaxfun = function (response) {
      var html = ShowRoadMess(response);
      $('#ScheduleDiv').html(html);
    }
    var urls = 'Aspx/dybus/Schedule.aspx';
    var pa = {
      VALUE: encodeURI(BusLine),
      lang: PUrlStr
    };
    //IK_AJAX(urls, pa, ajaxfun);
  }
  var start = new Date();
  var ranv = (start.getMonth() + 1) + '0' + start.getDate() + '0' + start.getHours() + '0' + start.getMinutes() + '0' + start.getSeconds();

  var urls = 'Aspx/dybus/busLine.aspx';
  var pa = {
    ACTION: 44,
    ranv: ranv,
    Glid: escape(name),
    goback: GO_BACK,
    lang: PUrlStr,
    count: 'Y'
  };
  
  IK_AJAX(urls, pa, ajaxfun);

}


var routes = document.querySelectorAll("#lineList > table:nth-child(1) > tbody:nth-child(1) > tr > td > a");

for (routeLink of routes){
  //console.log(routeLink);
  routeLink.click()
}

document.querySelector("#content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)").remove()
document.querySelector("#content > div:nth-child(2) > table:nth-child(1)").style.width="100%";
