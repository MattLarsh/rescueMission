var startGame = function(){
  (function () {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();

  var svgNS = "http://www.w3.org/2000/svg";
  var structure = {};
  var weapon = {};
  
  function createLineElement(x1,x2,y1,y2,strWdth,color) {
    var newLine = document.createElementNS(svgNS,"line");
    newLine.setAttributeNS(null,"x1",x1);	
    newLine.setAttributeNS(null,"x2",x2);		
    newLine.setAttributeNS(null,"y1",y1);		
    newLine.setAttributeNS(null,"y2",y2);	
    newLine.setAttributeNS(null,"stroke",color);		
    newLine.setAttributeNS(null,"stroke-width", strWdth);
    document.getElementById("field").appendChild(newLine);
    return newLine;
  }
  function createRectElement(width,height,x,y,opacity,fill,rx) {
    var newRect = document.createElementNS(svgNS,"rect");
    newRect.setAttributeNS(null,"width",width); 
    newRect.setAttributeNS(null,"height",height);    
    newRect.setAttributeNS(null,"x",x);   
    newRect.setAttributeNS(null,"y",y);  
    newRect.setAttributeNS(null,"fill-opacity",opacity);    
    newRect.setAttributeNS(null,"fill",fill);
    newRect.setAttributeNS(null,"rx",rx);
    document.getElementById("field").appendChild(newRect);
    return newRect;
  }
  
  var boardEle1 = createLineElement(820,820,450,550,10,'brown');
  var boardEle2 = createLineElement(870,870,450,550,10,'brown');
  var boardEle3 = createLineElement(920,920,450,550,10,'brown');
  var boardEle4 = createLineElement(970,970,450,550,10,'brown');
  var boardEleTop1 = createLineElement(800,885,450,450,10,'brown');
  var boardEleTop2 = createLineElement(905,990,450,450,10,'brown');
  var boardEle5 = createLineElement(820,820,400,450,10,'brown');
  var boardEle6 = createLineElement(870,870,400,450,10,'brown');
  var boardEle7 = createLineElement(920,920,400,450,10,'brown');
  var boardEle8 = createLineElement(970,970,400,450,10,'brown');
  var boardEleTop3 = createLineElement(800,990,400,400,10,'brown');
  var boardEle9 = createLineElement(842.5,842.5,320,400,10,'brown');
  var boardEle10 = createLineElement(895,895,320,400,10,'brown');
  var boardEle11 = createLineElement(942.5,942.5,320,400,10,'brown');
  var boardEleTop4 = createLineElement(800,990,320,320,10,'brown');
  var boardEle12 = createLineElement(869,869,320,275,10,'brown');
  var boardEle13 = createLineElement(924,924,320,275,10,'brown');
  var boardEleTop5 = createLineElement(842.5,950,275,275,10,'brown');
  var boardEle14 = createLineElement(900,900,275,150,10,'brown');
  var boardEleTop6 = createLineElement(872.5,925,150,150,10,'brown');
  var createLineObject = function(e){
    var r = {};
    r.dx1 = 0;
    r.dx2 = 0;
    r.dy1 = 0;
    r.dy2 = 0;
    Object.defineProperty(r, 'x1', {
      get: function(){return e.x1.baseVal.value},
      set: function(val){e.x1.baseVal.value = val;}
    });
    Object.defineProperty(r, 'x2', {
      get: function(){return e.x2.baseVal.value},
      set: function(val){e.x2.baseVal.value = val;}
    });
    Object.defineProperty(r, 'y1', {
      get: function(){return e.y1.baseVal.value},
      set: function(val){e.y1.baseVal.value = val;}
    });
    Object.defineProperty(r, 'y2', {
      get: function(){return e.y2.baseVal.value},
      set: function(val){e.y2.baseVal.value = val;}
    });
    return r;
  };
  var boardObj1 = createLineObject(boardEle1);
  var boardObj2 = createLineObject(boardEle2);
  var boardObj3 = createLineObject(boardEle3);
  var boardObj4 = createLineObject(boardEle4);
  var boardTopObj1 = createLineObject(boardEleTop1);
  var boardTopObj2 = createLineObject(boardEleTop2);
  var boardObj5 = createLineObject(boardEle5);
  var boardObj6 = createLineObject(boardEle6);
  var boardObj7 = createLineObject(boardEle7);
  var boardObj8 = createLineObject(boardEle8);
  var boardTopObj3 = createLineObject(boardEleTop3);
  var boardObj9 = createLineObject(boardEle9);
  var boardObj10 = createLineObject(boardEle10);
  var boardObj11 = createLineObject(boardEle11);
  var boardTopObj4 = createLineObject(boardEleTop4);
  var boardObj12 = createLineObject(boardEle12);
  var boardObj13 = createLineObject(boardEle13);
  var boardTopObj5 = createLineObject(boardEleTop5);
  var boardObj14 = createLineObject(boardEle14);
  var boardTopObj6 = createLineObject(boardEleTop6);
  var boardObjectsArr = [boardObj1,boardObj2,boardObj3,boardObj4,boardTopObj1,boardTopObj2,boardObj5,boardObj6,boardObj7,boardObj8,boardTopObj3,boardObj9,boardObj10,boardObj11,boardTopObj4,boardObj12,boardObj13,boardTopObj5,boardObj14,boardTopObj6];

  function createBallElement(cx,cy,r,color) {
    var newBall = document.createElementNS(svgNS,"circle");
    newBall.setAttributeNS(null,"cx",cx);  
    newBall.setAttributeNS(null,"cy",cy);    
    newBall.setAttributeNS(null,"r",r);      
    newBall.setAttributeNS(null,"fill",color);   
    document.getElementById("field").appendChild(newBall);
    return newBall;
  }

  var createBallObj = function(e){
    var r = {};
    r.dx = 0;
    r.dy = 0;
    function update(){
      r.right = r.cx + r.r;
      r.left = r.cx - r.r;
      r.top = r.cy - r.r;
      r.bottom = r.cy + r.r;
    }
    Object.defineProperty(r, 'cx', {
      get: function(){return e.cx.baseVal.value},
      set: function(val){e.cx.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'cy', {
      get: function(){return e.cy.baseVal.value},
      set: function(val){e.cy.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'r', {
      get: function(){return e.r.baseVal.value},
      set: function(val){e.r.baseVal.value = val; update();}
    });
    update();
    return r;
  }

  var createElipseObj = function(e){
    var r = {};
    r.dx = 0;
    r.dy = 0;
    function update(){
      r.right = r.cx + r.r;
      r.left = r.cx - r.r;
      r.top = r.cy - r.r;
      r.bottom = r.cy + r.r;
    }
    Object.defineProperty(r, 'cx', {
      get: function(){return e.cx.baseVal.value},
      set: function(val){e.cx.baseVal.value = val; update();}
    });
    Object.defineProperty(r, 'cy', {
      get: function(){return e.cy.baseVal.value},
      set: function(val){e.cy.baseVal.value = val; update();}
    });

    update();

    return r;
  };

  function createElipseElement(cx,cy,rx,ry,color,opacity,stroke) {
    var newElipse = document.createElementNS(svgNS,"ellipse");
    newElipse.setAttributeNS(null,"cx",cx);  
    newElipse.setAttributeNS(null,"cy",cy);    
    newElipse.setAttributeNS(null,"rx",rx);  
    newElipse.setAttributeNS(null,"ry",ry);    
    newElipse.setAttributeNS(null,"fill",color);
    newElipse.setAttributeNS(null,"fill-opacity",opacity); 
    newElipse.setAttributeNS(null,"stroke",stroke);    
    document.getElementById("field").appendChild(newElipse);
    return newElipse;
  }
  function createTextElement(x,y,fontSize,textAnchor,opacity,color,text) {
    var newText = document.createElementNS(svgNS,"text");
    newText.setAttributeNS(null,"x",x);    
    newText.setAttributeNS(null,"y",y);  
    newText.setAttributeNS(null,"font-size",fontSize);
    newText.setAttributeNS(null,"text-anchor",textAnchor);
    newText.setAttributeNS(null,"fill-opacity",opacity);    
    newText.setAttributeNS(null,"fill",color);
    var textNode = document.createTextNode(text);
    newText.appendChild(textNode);
    document.getElementById("field").appendChild(newText);
    return newText
  }
  // <text x="50" y="10" style="writing-mode: tb; glyph-orientation-vertical: 0;
  //                             letter-spacing: -3;">
  //   Vertical
  // </text>
  
  var hostage = {};
  //Start blood
  var bloodEleArr = [];
  var bloodObjArr = [];
  function createBlood(eleArr,objArr,x,y){
    for(var i=0;i<200;i++){
      eleArr[i] = createElipseElement(x,y,5,5,'red');
    }
    for(var i=0;i<200;i++){
      objArr[i] = createElipseObj(eleArr[i]);
    }
    
  }
  function bloodExplosion(objArr){
    var x;
    var y;
    for(var i=0,len=objArr.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100;
      }
      else{
        x = -100;
      }
      if(Math.random() < 0.5){
        y = 100;
      }
      else{
        y = -100;
      }
      objArr[i].dx = x * Math.random();
      objArr[i].dy = y * Math.random();
    }
  }
  // End blood

  // Start of Hostage 
  
  hostage.torso1Ele = createLineElement(873,927,120,120,18,'#FFB1E5');
  hostage.torso2Ele = createLineElement(880,917,130,130,30,'#FFB1E5');
  hostage.headEle = createBallElement(900,100,25,'#FFE1CE');
  hostage.leftEyeEle = createElipseElement(894,97,8,10,'white');
  hostage.rightEyeEle = createElipseElement(906,97,8,10,'white');
  hostage.leftEyeColorEle = createElipseElement(894,95,1.5,1.5,'#1E181A');
  hostage.rightEyeColorEle = createElipseElement(907,95,1.5,1.5,'#1E181A');
  hostage.hair1Ele = createLineElement(858,905,104,70,15,'#FFFF01');
  hostage.hair2Ele = createLineElement(900,944,69,110,15,'#FFFF01');
  hostage.mouthEle = createElipseElement(902,112,4,4,'#1E181A');
  
  var hostageHeadObj = createBallObj(hostage.headEle);
  var hostageLeftEyeObj = createElipseObj(hostage.leftEyeEle);
  var hostageRightEyeObj = createElipseObj(hostage.rightEyeEle);
  var hostageLeftEyeColorObj = createElipseObj(hostage.leftEyeColorEle);
  var hostageRightEyeColorObj = createElipseObj(hostage.rightEyeColorEle);
  var hostageMouthObj = createElipseObj(hostage.mouthEle);
  var hostageTorso1Obj = createLineObject(hostage.torso1Ele);
  var hostageTorso2Obj = createLineObject(hostage.torso2Ele);
  var hostageHair1Obj = createLineObject(hostage.hair1Ele);
  var hostageHair2Obj = createLineObject(hostage.hair2Ele);

  var hostageLineObjects = [hostageHair2Obj,hostageHair1Obj,hostageTorso1Obj,hostageTorso2Obj];
  var hostageRoundObjects = [hostageMouthObj,hostageRightEyeColorObj,hostageLeftEyeColorObj,hostageHeadObj,hostageLeftEyeObj,hostageRightEyeObj];

  // End of hostage

  

  function explodeHostage(){
    var x;
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 14;
      }
      else{
        x = -14;
      }
      hostageRoundObjects[i].dx = x * Math.random();
      hostageRoundObjects[i].dy = x * Math.random();
    }
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100 * Math.random();
      }
      else{
        x = -100 * Math.random();
      }
      hostageLineObjects[i].dx1 = x;
      hostageLineObjects[i].dx2 = x;
    }
    setTimeout(removeHostage,2500);
  }
  
  function removeHostage(){
    for(var key in hostage){
      hostage[key].remove();
    }
    
    for(var i=0,len=bloodEleArr.length;i<len;i++){

      bloodEleArr[i].remove();
    }
    
  }
  
  
  var view = field.viewBox.baseVal;
  function structureHit1(){
    boardObjectsArr[0].dx1 = 2;
    boardObjectsArr[1].dx1 = 0.5;
    boardObjectsArr[2].dx1 = 1.2;
    boardObjectsArr[3].dx1 = 1.3;
    boardObjectsArr[4].dx1 = -1;
    boardObjectsArr[4].dx2 = -1;
    boardObjectsArr[6].dx1 = 2.2;
    boardObjectsArr[6].dx2 = 2.2;
    boardObjectsArr[7].dx1 = -3;
    boardObjectsArr[8].dx1 = 1.3;
    boardObjectsArr[9].dx1 = -1;
    boardObjectsArr[10].dx1 = 1;
    boardObjectsArr[10].dx2 = 1;
    boardObjectsArr[11].dx1 = 1.25;
    boardObjectsArr[12].dx1 = -2;
    boardObjectsArr[13].dx1 = 1.45;
    boardObjectsArr[14].dx1 = 1.25;
    boardObjectsArr[14].dx2 = 1.25;
    boardObjectsArr[15].dx1 = -2;
    boardObjectsArr[16].dx1 = -1.4;
    boardObjectsArr[17].dx1 = 1.4;
    boardObjectsArr[17].dx2 = 1.4;
    boardObjectsArr[18].dx2 = 2;
    boardObjectsArr[19].dx1 = 2;
    boardObjectsArr[19].dx2 = 2;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 2;
      hostageLineObjects[i].dx2 = 2;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 2;
    }
    
  }
  function structureHit2(){
    boardObjectsArr[0].dx1 = 8;
    boardObjectsArr[0].dx2 = 2;
    boardObjectsArr[0].dy1 = 2.5;
    boardObjectsArr[1].dx1 = 5;
    boardObjectsArr[1].dy1 = 2.5;
    boardObjectsArr[2].dx1 = -7.5;
    boardObjectsArr[2].dx2 = -0.25;
    boardObjectsArr[2].dy2 = -1;
    boardObjectsArr[2].dy1 = 1.25;
    boardObjectsArr[3].dx1 = -1;
    boardObjectsArr[4].dy1 = 3;
    boardObjectsArr[5].dx1 = 3;
    boardObjectsArr[5].dx2 = 3;
    boardObjectsArr[6].dy2 = 8;
    boardObjectsArr[6].dy1 = 8;
    boardObjectsArr[7].dy2 = 1.4;
    boardObjectsArr[7].dy1 = 1.4;
    boardObjectsArr[7].dx2 = -3;
    boardObjectsArr[7].dx1 = 0;
    boardObjectsArr[8].dy2 = 8;
    boardObjectsArr[8].dy1 = 8;
    boardObjectsArr[9].dx2 = 2;
    boardObjectsArr[9].dx1 = 2;
    boardObjectsArr[10].dy1 = 1.4;
    boardObjectsArr[11].dy2 = 1.4;
    boardObjectsArr[11].dy1 = 1.4;
    boardObjectsArr[11].dx2 = 1;
    boardObjectsArr[12].dy1 = 10;
    boardObjectsArr[12].dy2 = 10;
    boardObjectsArr[13].dy1 = 1;
    boardObjectsArr[13].dy2 = 1;
    boardObjectsArr[14].dy1 = 2;
    boardObjectsArr[14].dy2 = 0.75;
    boardObjectsArr[15].dy1 = 2;
    boardObjectsArr[15].dy2 = 2;
    boardObjectsArr[16].dy1 = 1.25;
    boardObjectsArr[16].dy2 = 1.25;
    boardObjectsArr[17].dy1 = 2;
    boardObjectsArr[17].dy2 = 1.25;
    boardObjectsArr[17].dx1 = -2;
    boardObjectsArr[17].dx2 = -2;
    boardObjectsArr[18].dy1 = 1.5;
    boardObjectsArr[18].dy2 = 1.25;
    boardObjectsArr[18].dx1 = 0;
    boardObjectsArr[18].dx2 = -3;
    boardObjectsArr[19].dy1 = 1.25;
    boardObjectsArr[19].dy2 = 1.25;
    boardObjectsArr[19].dx1 = -3;
    boardObjectsArr[19].dx2 = -3;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = -3;
      hostageLineObjects[i].dx2 = -3;
      hostageLineObjects[i].dy1 = 1.25;
      hostageLineObjects[i].dy2 = 1.25;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = -3;
      hostageRoundObjects[i].dy = 1.25;
    }
  }
  function structureHit3(){
    boardObjectsArr[2].dy1 = 10;
    boardObjectsArr[2].dx1 = -3;
    boardObjectsArr[3].dx1 = 12;
    boardObjectsArr[3].dy1 = 10;
    boardObjectsArr[12].dy1 = 10;
    boardObjectsArr[12].dx1 = 12;
    boardObjectsArr[4].dy1 = 10;
    boardObjectsArr[4].dy2 = 8;
    boardObjectsArr[5].dy1 = 11;
    boardObjectsArr[5].dy2 = 6;
    boardObjectsArr[7].dy1 = 12;
    boardObjectsArr[7].dy2 = 12;
    boardObjectsArr[9].dy1 = 12;
    boardObjectsArr[9].dy2 = 12;
    boardObjectsArr[10].dy1 = 12;
    boardObjectsArr[10].dy2 = 12;
    boardObjectsArr[11].dy1 = 20;
    boardObjectsArr[11].dy2 = 10;
    boardObjectsArr[11].dx1 = 21;
    boardObjectsArr[13].dy2 = 11;
    boardObjectsArr[13].dy1 = 20;
    boardObjectsArr[13].dx1 = 12;
    boardObjectsArr[14].dy2 = 20;
    boardObjectsArr[14].dy1 = 20;
    boardObjectsArr[15].dy2 = 21;
    boardObjectsArr[15].dy1 = 21;
    boardObjectsArr[16].dy2 = 21;
    boardObjectsArr[16].dy1 = 21;
    boardObjectsArr[16].dx2 = 4;
    boardObjectsArr[17].dy2 = 21;
    boardObjectsArr[17].dy1 = 21;
    boardObjectsArr[17].dx1 = -4;
    boardObjectsArr[17].dx2 = -4;
    boardObjectsArr[18].dx2 = 10;
    boardObjectsArr[19].dx1 = -4;
    boardObjectsArr[19].dx2 = -4;
    boardObjectsArr[19].dy1 = 42;
    boardObjectsArr[19].dy2 = 44;
    boardObjectsArr[18].dy1 = 30;
    boardObjectsArr[18].dy2 = 30;
  }
  function structureHitTop1(){
    boardObjectsArr[18].dx2 = -3;
    boardObjectsArr[19].dx1 = -3;
    boardObjectsArr[19].dx2 = -3;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = -3;
      hostageLineObjects[i].dx2 = -3;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = -3;
    }
    if(boardObjectsArr[18].x2 < 892){
      boardReset();
      structure.hit = 1.1;
    }
  }
  function structureHitTop2(){
    boardObjectsArr[18].dx2 = 10;
    boardObjectsArr[19].dx1 = 10;
    boardObjectsArr[19].dx2 = 10;
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 10;
      hostageLineObjects[i].dx2 = 10;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 10;
    }
    if(boardObjectsArr[19].x1 > 890){
      boardReset();
      structure.hit = 2.2;
    }
  }
  function princessFalling(){
    
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dy1 = 5;
      hostageLineObjects[i].dy2 = 5;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dy = 5;
    }
    
    if(hostageLineObjects[0].y1 > 315){
      createBlood(bloodEleArr,bloodObjArr,921,346)
      bloodExplosion(bloodObjArr)
      explodeHostage();
      structure.hit = 'done';
    }
  }
  
  function boardReset(){
    for(var i=0,len=boardObjectsArr.length;i<len;i++){
        boardObjectsArr[i].dx1 = 0;
        boardObjectsArr[i].dx2 = 0;
        boardObjectsArr[i].dy1 = 0;
        boardObjectsArr[i].dy2 = 0;
      }
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].dx1 = 0;
      hostageLineObjects[i].dx2 = 0;
      hostageLineObjects[i].dy1 = 0;
      hostageLineObjects[i].dy2 = 0;
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].dx = 0;
      hostageRoundObjects[i].dy = 0;
    }
  }
  function resetBadGuy(badGuyLineObjects,badGuyRoundObjects){
    for(var i=0,len=badGuyLineObjects.length;i<len;i++){
      badGuyLineObjects[i].dx1 = 0;
      badGuyLineObjects[i].dx2 = 0;
      badGuyLineObjects[i].dy1 = 0;
      badGuyLineObjects[i].dy2 = 0;
    }
    for(var i=0,len=badGuyRoundObjects.length;i<len;i++){
      badGuyRoundObjects[i].dx = 0;
      badGuyRoundObjects[i].dy = 0;
    }
  }

  var trampoline1Leg1Ele = createLineElement(690,690,525,545,2,'black');
  var trampoline1Leg2Ele = createLineElement(725,725,535,555,2,'black');
  var trampoline1Leg3Ele = createLineElement(760,760,525,545,2,'black');
  var trampoline1Ele = createElipseElement(725,525,40,10,'#4C4E4B',1,'blue');
  var trampoline2Leg1Ele = createLineElement(520,520,525,545,2,'black');
  var trampoline2Leg2Ele = createLineElement(555,555,535,555,2,'black');
  var trampoline2Leg3Ele = createLineElement(590,590,525,545,2,'black');
  var trampoline2Ele = createElipseElement(555,525,40,10,'#4C4E4B',1,'blue');
  var trampoline3Leg1Ele = createLineElement(350,350,525,545,2,'black');
  var trampoline3Leg2Ele = createLineElement(385,385,535,555,2,'black');
  var trampoline3Leg3Ele = createLineElement(420,420,525,545,2,'black');
  var trampoline3Ele = createElipseElement(385,525,40,10,'#4C4E4B',1,'blue');
  // Begin of Weapon Weapon Weapon ///////////
  
  function fireBall(){
    ballObjects[weapon.whichBall].dx = 10;
    
  }
  var smallBallEleArr = [];
  var smallBallObjArr = [];
  function buildSmallBalls(){
    for(var i=0;i<25;i++){
      smallBallEleArr[i] = createElipseElement(816,500,3,3,'white');
    }
    for(var i=0;i<25;i++){
      smallBallObjArr[i] = createElipseObj(smallBallEleArr[i]);
    }
  }

  function ballExplode(){
    var x;
    var y;
    for(var i=0;i<25;i++){
      if(Math.random() > 0.5){
        x = 20;
      }
      else{
        x = -20;
      }
      if(Math.random() < 0.5){
        y = 20;
      }
      else{
        y = -20;
      }
      smallBallObjArr[i].dx = x * Math.random();
      smallBallObjArr[i].dy = y * Math.random();
    }
  }
  function removeBall(){
    ballEleArr[0].remove();
    ballEleArr.shift();
    
  }
  function removeSmallBalls(){
    for(var i=0;i<smallBallEleArr.length;i++){
      smallBallEleArr[i].remove();
    }
  }
  
 
  
  function trigger(){
    var clearTrigger  = createRectElement(150,55,45,496,0,'#284F23',10);
    clearTrigger.onclick = function(){
      fireBall();
    }
  }
  // createRectElement(width,height,x,y,opacity,fill,rx)
  // createBallElement(cx,cy,r,color)
  
  var pipe = createRectElement(150,35,100,441.5,1,'#92BCC8',14);
  var pipe2 = createRectElement(35,85,100,441.5,1,'#92BCC8',5);
  var triggerColor2  = createRectElement(150,55,45,496,1,'#284F23',10);
  var heroStep = createRectElement(55,67.5,45.5,461.5,1,'#284F23',0);
  var red  = createElipseElement(125,525,55,17.5,'red',1,'white');
  var capOfGun = createElipseElement(238,460,12,18,'white',0.25,'black');
  var fire = createTextElement(100,532,25,'center',1,'white','Push');
  trigger();
  
  var ball1 = createBallElement(240,460,12.5,'white');
  var ball2 = createBallElement(212.5,460,12.5,'white');
  var ball3 = createBallElement(185.5,460,12.5,'white');
  weapon.whichBall = 0;
  var ball1Obj = createBallObj(ball1);
  var ball2Obj = createBallObj(ball2);
  var ball3Obj = createBallObj(ball3);
  var ballObjects = [ball1Obj,ball2Obj,ball3Obj];
  var ballEleArr = [ball1,ball2,ball3];
  
  // End of Weapon Weapon Weapon 
  // HERO 
  var hero = {};
  var heroStuff = {};
  heroStuff.bloodEleArr = [];
  heroStuff.bloodObjArr = [];
  heroStuff.status = 'alive';
  hero.torso1Ele = createLineElement(47,101,427.5,427.5,18,'#BD2C06');
  hero.torso2Ele = createLineElement(56,92,447.5,447.5,30,'#BD2C06');
  hero.headEle = createBallElement(75,410,25,'#FFE1CE');
  hero.leftEyeEle = createElipseElement(68,407,8,10,'white');
  hero.rightEyeEle = createElipseElement(82,407,8,10,'white');
  hero.leftEyeColorEle = createElipseElement(70,407,1.5,1.5,'#1E181A');
  hero.rightEyeColorEle = createElipseElement(85,407,1.5,1.5,'#1E181A');
  hero.mouthEle = createElipseElement(75,422,4,4,'#1E181A');
  hero.hair1Ele = createLineElement(55,50,388,418,7,'#D1A967');
  hero.hair2Ele = createLineElement(55,100,388,384,12,'#D1A967');

  var heroHeadObj = createBallObj(hero.headEle);
  var heroLeftEyeObj = createElipseObj(hero.leftEyeEle);
  var heroRightEyeObj = createElipseObj(hero.rightEyeEle);
  var heroLeftEyeColorObj = createElipseObj(hero.leftEyeColorEle);
  var heroRightEyeColorObj = createElipseObj(hero.rightEyeColorEle);
  var heroMouthObj = createElipseObj(hero.mouthEle)
  var heroTorso1Obj = createLineObject(hero.torso1Ele);
  var heroTorso2Obj = createLineObject(hero.torso2Ele);
  var heroHair1Obj = createLineObject(hero.hair1Ele);
  var heroHair2Obj = createLineObject(hero.hair2Ele);
  
  var heroRoundObjects = [heroMouthObj,heroLeftEyeColorObj,heroRightEyeColorObj,heroHeadObj,heroLeftEyeObj,heroRightEyeObj];

  var heroLineObjects = [heroHair2Obj,heroHair1Obj,heroTorso2Obj,heroTorso1Obj];
  
  // // End HERO 
  // Begin BadGuy Number 1 
  var badGuys = {};
  var badGuy1 = {};
  var badGuy1Objects = {};
  function createBadGuy1(){
    badGuy1.torso1Ele = createLineElement(700,754,100,100,18,'#DE5D25');
    badGuy1.torso2Ele = createLineElement(710,744,120,120.5,30,'#DE5D25');
    badGuy1.headEle = createBallElement(727.5,80,27,'#FFE1CE');
    badGuy1.leftEyeEle = createElipseElement(721,78,8,10,'white');
    badGuy1.rightEyeEle = createElipseElement(734,78,8,10,'white');
    badGuy1.leftEyeColorEle = createElipseElement(717,78,1.5,1.5,'red');
    badGuy1.rightEyeColorEle = createElipseElement(731,78,1.5,1.5,'red');
    badGuy1.hair1Ele = createLineElement(705,700,65,95,7,'#F1EFBE');
    badGuy1.hair2Ele = createLineElement(705,745,60,56,12,'#F1EFBE');
    badGuy1.hair3Ele = createLineElement(750,755,62,92,7,'#F1EFBE');
    badGuy1.mouthEle = createElipseElement(728,96,4,4,'#1E181A');
    badGuy1.rightEyeBrowEle = createLineElement(714,725,61,68,1.5,'black');
    badGuy1.leftEyeBrowEle = createLineElement(727,738,68,57,1.5,'black');
    badGuy1Objects.badGuy1HeadObj = createBallObj(badGuy1.headEle);
    badGuy1Objects.badGuy1LeftEyeObj = createElipseObj(badGuy1.leftEyeEle);
    badGuy1Objects.badGuy1RightEyeObj = createElipseObj(badGuy1.rightEyeEle);
    badGuy1Objects.badGuy1LeftEyeColorObj = createElipseObj(badGuy1.leftEyeColorEle);
    badGuy1Objects.badGuy1RightEyeColorObj = createElipseObj(badGuy1.rightEyeColorEle);
    badGuy1Objects.badGuy1MouthObj = createElipseObj(badGuy1.mouthEle);
    badGuy1Objects.badGuy1Torso1Obj = createLineObject(badGuy1.torso1Ele);
    badGuy1Objects.badGuy1Torso2Obj = createLineObject(badGuy1.torso2Ele);
    badGuy1Objects.badGuy1Hair1Obj = createLineObject(badGuy1.hair1Ele);
    badGuy1Objects.badGuy1Hair2Obj = createLineObject(badGuy1.hair2Ele);
    badGuy1Objects.badGuy1Hair1Obj = createLineObject(badGuy1.hair1Ele);
    badGuy1Objects.badGuy1Hair2Obj = createLineObject(badGuy1.hair2Ele);
    badGuy1Objects.badGuy1Hair3Obj = createLineObject(badGuy1.hair3Ele);
    badGuy1Objects.badGuy1RightEyeBrowObj = createLineObject(badGuy1.leftEyeBrowEle);
    badGuy1Objects.badGuy1LeftEyeBrowObj = createLineObject(badGuy1.rightEyeBrowEle);
    badGuys.create = 'one';
  }
  
  createBadGuy1()

  function explode(roundObjects,lineObjects,person){
    var x;
    for(var i=0,len=roundObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 14;
      }
      else{
        x = -14;
      }
      roundObjects[i].dx = x * Math.random();
      roundObjects[i].dy = x * Math.random();
    }
    for(var i=0,len=lineObjects.length;i<len;i++){
      if(Math.random() > 0.5){
        x = 100 * Math.random();
      }
      else{
        x = -100 * Math.random();
      }
      lineObjects[i].dx1 = x;
      lineObjects[i].dx2 = x;
    }
    setTimeout(remove,2500,person);

  }
  

  function remove(person){
    for(var key in person){
      person[key].remove();
    }
    
    for(var i=0;i<heroStuff.bloodEleArr.length;i++){
      heroStuff.bloodEleArr[i].remove();
    }
    heroStuff.status = 'dead'
  }

  var move1 = {};
  move1.badDir = 'down';
  move1.ySpeed = 4;
  move1.xSpeed = 0;
  move1.jump = 0;
  function badGuy1Movement(){
    if(badGuy1RoundObjects[0].cy > 470 && move1.badDir === 'down'){
      move1.ySpeed *= -1;
      move1.badDir = 'up'
      move1.jump++;
    }

    if(move1.jump === 2){
      move1.xSpeed = -6;
    }
    if(badGuy1RoundObjects[0].cx < 560){
      move1.xSpeed = 0;
    }
    if(move1.jump === 4){
      move1.xSpeed = -6;
    }
    if(badGuy1RoundObjects[0].cx < 390){
      move1.xSpeed = 0;
    }
    if(move1.jump === 6 && badGuy1RoundObjects[0].cx < 75){
      move1.xSpeed = -8;
      if(badGuy1RoundObjects[0].cy > 397){
        badGuys.create = 'won';
        setTimeout(moveBadGuy1Eyes,1000);
        resetBadGuy(badGuy1LineObjects,badGuy1RoundObjects);
        explode(heroRoundObjects,heroLineObjects,hero);
        createBlood(heroStuff.bloodEleArr,heroStuff.bloodObjArr,70,427);
        heroStuff.status = 'inTrouble';
        bloodExplosion(heroStuff.bloodObjArr);
        setTimeout(fireBall,1600);
        setTimeout(fireBall,2800);
        setTimeout(fireBall,4100);
        return;
      }
    }
    if(move1.jump === 6){
      move1.xSpeed = -8;
      
    }
    if(badGuy1RoundObjects[0].cx < 75){
      move1.xSpeed = 0;
    }
    if(badGuy1RoundObjects[0].cy > 120 ){
      move1.ySpeed += 0.25;
    }
    if(badGuy1RoundObjects[0].cy > 400 ){
      move1.ySpeed -= 0.25;
    }
    if(move1.jump === 7){
      
    }
    if(badGuy1RoundObjects[0].cy < 170 && move1.badDir === 'up'){
      move1.ySpeed *= -1;
      move1.ySpeed += 0.25;
      move1.badDir = 'down'
    }
    for(var i=0,len=badGuy1RoundObjects.length;i<len;i++){
      badGuy1RoundObjects[i].dy = move1.ySpeed;
      badGuy1RoundObjects[i].dx = move1.xSpeed;
    }
    for(var i=0,len=badGuy1LineObjects.length;i<len;i++){
      badGuy1LineObjects[i].dy1 = move1.ySpeed;
      badGuy1LineObjects[i].dy2 = move1.ySpeed;
      badGuy1LineObjects[i].dx1 = move1.xSpeed;
      badGuy1LineObjects[i].dx2 = move1.xSpeed;
    }
  }
  function moveBadGuy1Eyes(){
    badGuy1Objects.badGuy1LeftEyeColorObj.cx += 7;
    badGuy1Objects.badGuy1RightEyeColorObj.cx += 7;
  }


  

  var badGuy1LineObjects = [badGuy1Objects.badGuy1LeftEyeBrowObj,badGuy1Objects.badGuy1RightEyeBrowObj,badGuy1Objects.badGuy1Hair3Obj,badGuy1Objects.badGuy1Torso1Obj,badGuy1Objects.badGuy1Torso2Obj,badGuy1Objects.badGuy1Hair1Obj,badGuy1Objects.badGuy1Hair2Obj];
  var badGuy1RoundObjects = [badGuy1Objects.badGuy1HeadObj,badGuy1Objects.badGuy1LeftEyeObj,badGuy1Objects.badGuy1RightEyeObj,badGuy1Objects.badGuy1LeftEyeColorObj,badGuy1Objects.badGuy1RightEyeColorObj,badGuy1Objects.badGuy1MouthObj];
  // BadGuy Number 1 
  structure.hit = 0;

  var viewWidth = view.width;
  var viewHeight = view.height;
  
  
  function collideBallWith(ball,head,func) {
    if(ball.bottom > head.top && ball.top < head.bottom &&
       ball.right > head.left && ball.left < head.right) {
      if(badGuys.create === 'one'){
        resetBadGuy(badGuy1LineObjects,badGuy1RoundObjects);
        explode(badGuy1RoundObjects,badGuy1LineObjects,badGuy1);
        badGuys.create = 'oneDead';
        ballObjects.splice(weapon.whichBall,1);
        removeBall();
        
      }
      
    } 
    
    
      
   }
 
  badGuys.create = 'hi';
  var animate = function(){

    if(heroStuff.status === 'inTrouble'){
      for(var i=0,len=heroRoundObjects.length;i<len;i++){
        heroRoundObjects[i].cx += heroRoundObjects[i].dx;
        heroRoundObjects[i].cy += heroRoundObjects[i].dy;
      }
      for(var i=0,len=heroLineObjects.length;i<len;i++){
        heroLineObjects[i].x1 += heroLineObjects[i].dx1;
        heroLineObjects[i].x2 += heroLineObjects[i].dx2;
        heroLineObjects[i].y1 += heroLineObjects[i].dy1;
        heroLineObjects[i].y2 += heroLineObjects[i].dy2;
      }
    }
    if(badGuys.create === 'one' || 'oneDead'){
      for(var i=0,len=badGuy1RoundObjects.length;i<len;i++){
        badGuy1RoundObjects[i].cx += badGuy1RoundObjects[i].dx;
        badGuy1RoundObjects[i].cy += badGuy1RoundObjects[i].dy;
      }
      for(var i=0,len=badGuy1LineObjects.length;i<len;i++){
        badGuy1LineObjects[i].x1 += badGuy1LineObjects[i].dx1;
        badGuy1LineObjects[i].x2 += badGuy1LineObjects[i].dx2;
        badGuy1LineObjects[i].y1 += badGuy1LineObjects[i].dy1;
        badGuy1LineObjects[i].y2 += badGuy1LineObjects[i].dy2;
      }
    }
    for(var i=0,len=hostageRoundObjects.length;i<len;i++){
      hostageRoundObjects[i].cx += hostageRoundObjects[i].dx;
      hostageRoundObjects[i].cy += hostageRoundObjects[i].dy;
    }
    
    for(var i=0,len=hostageLineObjects.length;i<len;i++){
      hostageLineObjects[i].x1 += hostageLineObjects[i].dx1;
      hostageLineObjects[i].x2 += hostageLineObjects[i].dx2;
      hostageLineObjects[i].y1 += hostageLineObjects[i].dy1;
      hostageLineObjects[i].y2 += hostageLineObjects[i].dy2;
    }
   
    for(var i=0,len=bloodObjArr.length;i<len;i++){
      bloodObjArr[i].cx += bloodObjArr[i].dx;
      bloodObjArr[i].cy += bloodObjArr[i].dy;
    }
    for(var i=0,len=heroStuff.bloodObjArr.length;i<len;i++){
      heroStuff.bloodObjArr[i].cx += heroStuff.bloodObjArr[i].dx;
      heroStuff.bloodObjArr[i].cy += heroStuff.bloodObjArr[i].dy;
    }
    
    for(var i=0;i<smallBallObjArr.length;i++){
      smallBallObjArr[i].cx += smallBallObjArr[i].dx;
      smallBallObjArr[i].cy += smallBallObjArr[i].dy;
    }
    
    for(var i=0,len=boardObjectsArr.length;i<len;i++){
      boardObjectsArr[i].x1 += boardObjectsArr[i].dx1;
      boardObjectsArr[i].x2 += boardObjectsArr[i].dx2;
      boardObjectsArr[i].y1 += boardObjectsArr[i].dy1;
      boardObjectsArr[i].y2 += boardObjectsArr[i].dy2;
    }

    for(var i=0,len=ballObjects.length;i<len;i++){
      ballObjects[i].cx += ballObjects[i].dx;

    }
    if(ballObjects[0] != undefined ){
      if(ballObjects[0].cx > 820){
        structure.hit++;
        buildSmallBalls();
        removeBall();
        ballExplode();
        ballObjects.splice(0,1);
        setTimeout(removeSmallBalls,500);
      }
    }
    
    if(structure.hit === 1){
      if(boardObjectsArr[0].x1 < 840){
        structureHit1();
      }
      else{
        boardReset();
        structure.hit = 'top1';
      }
    }
    if(structure.hit === 'top1'){
      structureHitTop1();
    }
    
    if(structure.hit === 2.1){
      if(boardObjectsArr[0].x1 < 940){
        structureHit2();
      }
      else{
        boardReset();
        structure.hit = 'top2';
      }
    }
    if(structure.hit === 'top2'){
      structureHitTop2();
    }
    if(structure.hit === 3.2){
      if(boardObjectsArr[2].y1 < 520){
        structureHit3();
      }
      else{
        boardReset();
        structure.hit = 'pricessFalling';
      }
    }
    if(structure.hit === 'pricessFalling'){
      princessFalling();
    }
    if(badGuys.create === 'none'){
      // explode(badGuy1RoundObjects,badGuy1LineObjects,badGuy1);
      // badGuys.create = 'hi';
    }
    if(badGuys.create === 'one'){
      badGuy1Movement()
      collideBallWith(ball1Obj,badGuy1Objects.badGuy1HeadObj);
      collideBallWith(ball2Obj,badGuy1Objects.badGuy1HeadObj);
      collideBallWith(ball3Obj,badGuy1Objects.badGuy1HeadObj);
    }
    
    
    
    
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

};

startGame();



