
//functions
function daka(){
    sleep(2000);
    home();
    sleep(1000);
    desc('钉钉').findOne().click();
    sleep(30000);
    if(text("暂不更新").exists()){
        while(!click('暂不更新'));
        sleep(3000);
    }else{
        sleep(3000);
    }                
    if(text('打卡群').exists()){
        while(!click('打卡群'));
    }else{
        return false;
    }
    sleep(5000);
    if(text("群签到").exists()){
        while(!click("群签到"));
    }else{
        return false;
    }
    sleep(20000);
    if(text('不签到').exists()){
        while(!click('不签到'));
        sleep(1000);
        return false;
    }
    sleep(1000);
    if(text('正在定位...').exists()){
        return false;  
    }else{
        text('健康码颜色').findOne().click();
        sleep(1000);
        text('绿色').findOne().click();
        sleep(1000);   
        swipe(80,825,80,300,1000);
        sleep(1000);   
        click('今日是否有发烧（高于37.3℃）、咳嗽等症状？');
        sleep(1000);   
        text('否').findOne().click();
        sleep(1000);   
        click('14天内是否到过涉疫区和中高风险地区？');
        sleep(1000);   
        text('否').findOne().click();
        sleep(1000);   
        click('今日是否有跨省流动？');
        sleep(1000);   
        text('否').findOne().click();
        sleep(1000);   
        var sign = click('签到');
        sleep(5000);
    }
    sleep(3000);
    if(sign == true){
        back();
        sleep(1000);
        back();
        sleep(1000);
        return true;
    }else{
        return false;
    }
}

function timSend(a,b,c,d){
    sleep(2000);
    home();
    sleep(1000);
    desc('TIM').findOne(2000).click();
    sleep(6000);
    if(id('epu').exists()){ 
        sleep(1000);
        id('epu').findOne().parent().click();
    }else{
        return false;
    }
    sleep(2000);
    if(id('input').exists()){
        var nowtime = new Date();
        id('input').findOne().setText('打卡'+a+'\n钉钉:'+b+'次\t'+'TIM:'+c+'次\n'+'Power:'+d+'\n'+nowtime);
    }else{
        return false;
    }
    sleep(2000);
    var fasong = click('发送');
    sleep(2000);
    if(fasong==true){
        return true;
    }else{
        return false;
    }
}

//run
sleep(10000);
if(device.isScreenOn()){
    sleep(3000);
    home();
    sleep(2000);
    swipe(500,10,500,1000,1500);
    sleep(3000);
    while(!click('关闭闹钟'));
    sleep(5000);
    home();
    //desc('设置').findOne().click();
    //sleep(1000);
    //while(!click('WLAN'))
    //sleep(5000);
}


var signresult;
var sendresult;
var power = device.getBattery()
for(var i=1;i<=10;i++){
    var signresult = daka();
    sleep(1000);
    if(i==10&&signresult==false){
        sleep(2000);
        for(var j=1;j<=3;j++){
            sleep(1500);
            sendresult = timSend('\t!失败!\t',i,j,power);
            if(sendresult!=true){
                sleep(1500);
                back();
            }else{
                sleep(1500);
                home();
                break;
                }
            }
        sleep(2000);
    }else if(signresult == true){
        sleep(2000);
        for(var j=1;j<=3;j++){
            sleep(1500);
            sendresult = timSend('完成',i,j,power);
            if(sendresult!=true){
                sleep(1500);
                back();
            }else{
                sleep(1500);
                home();
                break;
                }
            }
        sleep(2000);
        break;
    }else{
        sleep(3000);
        back();
        sleep(3000);
        back();
        sleep(3000);
        back();
        sleep(10000);
    }
}
