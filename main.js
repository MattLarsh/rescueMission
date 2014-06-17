var startGame = function(){
  (function () {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();

  var svgNS = "http://www.w3.org/2000/svg";
  var structure = {};
  var weapon = {};
  structure.top = 'right';
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
  var boardObjectsArr = [boardObj1,boardObj2,boardObj3,boardObj4,boardTopObj1,boardObj5,boardObj6,boardObj7,boardObj8,boardTopObj3,boardObj9,boardObj10,boardObj11,boardTopObj4,boardObj12,boardObj13,boardTopObj5,boardObj14,boardTopObj6];

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

  function createElipseElement(cx,cy,rx,ry,color) {
    var newElipse = document.createElementNS(svgNS,"ellipse");
    newElipse.setAttributeNS(null,"cx",cx);  
    newElipse.setAttributeNS(null,"cy",cy);    
    newElipse.setAttributeNS(null,"rx",rx);  
    newElipse.setAttributeNS(null,"ry",ry);    
    newElipse.setAttributeNS(null,"fill",color);   
    document.getElementById("field").appendChild(newElipse);
    return newElipse;
  }
  var hostage = {};
  //Start blood
  var bloodEleArr = [];

  for(var i=0;i<200;i++){
    bloodEleArr[i] = createElipseElement(894,95,5,5,'red');
  }
  var bloodObjArr = [];
  for(var i=0;i<200;i++){
    bloodObjArr[i] = createElipseObj(bloodEleArr[i]);
  }
  function hostageBlood(){
    var x;
    var y;
    for(var i=0;i<bloodObjArr.length;i++){
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
      bloodObjArr[i].dx = x * Math.random();
      bloodObjArr[i].dy = y * Math.random();
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
  hostage.rightEyeColorEle = createElipseElement(906,95,1.5,1.5,'#1E181A');
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
    for(var i=0;i<hostageRoundObjects.length;i++){
      if(Math.random() > 0.5){
        x = 7;
      }
      else{
        x = -7;
      }
      hostageRoundObjects[i].dx = x * Math.random();
      hostageRoundObjects[i].dy = x * Math.random();
    }
    for(var i=0;i<hostageLineObjects.length;i++){
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
    for(var i=0;i<bloodEleArr.length;i++){
      bloodEleArr[i].remove();
    }
    hostageRoundObjects = [];
    bloodObjArr = [];
    hostageLineObjects = [];
  }
  // setTimeout(explodeHostage,2000);
  // setTimeout(hostageBlood,2000);
  
  var d = 5;
  var e = 10;
  var view = field.viewBox.baseVal;
  function structureHit1(){
    boardObjectsArr[0].dx1 = 2;
    boardObjectsArr[1].dx1 = 0.5;
    boardObjectsArr[2].dx1 = 1.2;
    boardObjectsArr[3].dx1 = 1.3;
    boardObjectsArr[4].dx1 = -1;
    boardObjectsArr[4].dx2 = -1;
    boardObjectsArr[5].dx1 = 2.2;
    boardObjectsArr[5].dx2 = 2.2;
    boardObjectsArr[6].dx1 = -3;
    boardObjectsArr[7].dx1 = 1.3;
    boardObjectsArr[8].dx1 = -1;
    boardObjectsArr[9].dx1 = 1;
    boardObjectsArr[9].dx2 = 1;
    boardObjectsArr[10].dx1 = 1.25;
    boardObjectsArr[11].dx1 = -2;
    boardObjectsArr[12].dx1 = 1.45;
    boardObjectsArr[13].dx1 = 1.25;
    boardObjectsArr[13].dx2 = 1.25;
    boardObjectsArr[14].dx1 = -2;
    boardObjectsArr[15].dx1 = -1.4;
    boardObjectsArr[16].dx1 = 1.4;
    boardObjectsArr[16].dx2 = 1.4;
    boardObjectsArr[17].dx2 = 2;
    boardObjectsArr[18].dx1 = 2;
    boardObjectsArr[18].dx2 = 2;
    for(var i=0;i<hostageLineObjects.length;i++){
      hostageLineObjects[i].dx1 = 2;
      hostageLineObjects[i].dx2 = 2;
    }
    for(var i=0;i<hostageRoundObjects.length;i++){
      hostageRoundObjects[i].dx = 2;
    }
    
  }
  function structureHitTop1(){
    structure.top = 'left';
    
    if(structure.top === 'left'){
      boardObjectsArr[17].dx2 = -2;
      boardObjectsArr[18].dx1 = -2;
      boardObjectsArr[18].dx2 = -2;
      for(var i=0;i<hostageLineObjects.length;i++){
        hostageLineObjects[i].dx1 = -2;
        hostageLineObjects[i].dx2 = -2;
      }
      for(var i=0;i<hostageRoundObjects.length;i++){
        hostageRoundObjects[i].dx = -2;
      }
    }
    if(boardObjectsArr[17].x2 < 892){
      structure.top = 'center';
      structure.hit = 14;
      boardReset();
      // explodeHostage();
      // hostageBlood();
    }
  }
  
  function boardReset(){
    for(var i=0;i<boardObjectsArr.length;i++){
        boardObjectsArr[i].dx1 = 0;
        boardObjectsArr[i].dx2 = 0;
        boardObjectsArr[i].dy1 = 0;
        boardObjectsArr[i].dy2 = 0;
      }
    for(var i=0;i<hostageLineObjects.length;i++){
      hostageLineObjects[i].dx1 = 0;
      hostageLineObjects[i].dx2 = 0;
    }
    for(var i=0;i<hostageRoundObjects.length;i++){
      hostageRoundObjects[i].dx = 0;
    }
  }
  // Begin of Weapon Weapon Weapon ///////////
  

 
  function fireBall(){
    ballObjects[weapon.whichBall].dx = 10;
    
  }
  var smallBallArr = [];
  var ballObjArr = [];
  function buildSmallBalls(){
    for(var i=0;i<25;i++){
      smallBallArr[i] = createElipseElement(816,500,3,3,'white');
    }
    
    for(var i=0;i<25;i++){
      ballObjArr[i] = createElipseObj(smallBallArr[i]);
    }
  }

  function ballExplode(){
    var x;
    var y;
    for(var i=0;i<ballObjArr.length;i++){
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
      ballObjArr[i].dx = x * Math.random();
      ballObjArr[i].dy = y * Math.random();
    }
  }
  function removeBall(){
    ballEleArr[weapon.whichBall].remove();
  }
  function removeSmallBalls(){
    for(var i=0;i<smallBallArr.length;i++){
      smallBallArr[i].remove();
    }
  }
  function trigger(){
    var trigger  = createElipseElement(55,500,20,15,'red');
    trigger.onclick = function(){
      fireBall();
    }
  }
  trigger();
  var ball1 = createBallElement(200,500,12.5,'white');
  var ball2 = createBallElement(175,500,12.5,'white');
  weapon.whichBall = 0;
  var ball1Obj = createBallObj(ball1);
  var ball2Obj = createBallObj(ball2);
  var ballObjects = [ball1Obj,ball2Obj];
  var ballEleArr = [ball1,ball2]
  // End of Weapon Weapon Weapon ///////////////
  // fireBall();
  structure.hit = 0;

  var viewWidth = view.width;
  var viewHeight = view.height;
  var animate = function(){
    for(var i=0;i<hostageRoundObjects.length;i++){
      hostageRoundObjects[i].cx += hostageRoundObjects[i].dx;
      hostageRoundObjects[i].cy += hostageRoundObjects[i].dy;
    }
    
    for(var i=0;i<hostageLineObjects.length;i++){
      hostageLineObjects[i].x1 += hostageLineObjects[i].dx1;
      hostageLineObjects[i].x2 += hostageLineObjects[i].dx2;
    }
    for(var i=0;i<bloodObjArr.length;i++){
      bloodObjArr[i].cx += bloodObjArr[i].dx;
      bloodObjArr[i].cy += bloodObjArr[i].dy;
    }
    for(var i=0;i<ballObjArr.length;i++){
      ballObjArr[i].cx += ballObjArr[i].dx;
      ballObjArr[i].cy += ballObjArr[i].dy;
    }
    for(var i=0;i<boardObjectsArr.length;i++){
      boardObjectsArr[i].x1 += boardObjectsArr[i].dx1;
      boardObjectsArr[i].x2 += boardObjectsArr[i].dx2;
      boardObjectsArr[i].y1 += boardObjectsArr[i].dy1;
      boardObjectsArr[i].y2 += boardObjectsArr[i].dy2;
    }
    for(var i=0;i<ballObjects.length;i++){
      ballObjects[i].cx += ballObjects[i].dx;

    }
    if(ballObjects[weapon.whichBall] != undefined){
      if(ballObjects[weapon.whichBall].cx > 820){

        structure.hit = 1;
        buildSmallBalls();
        removeBall();
        weapon.whichBall++;
        ballExplode();
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
    
   
    
    
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

};

startGame();



