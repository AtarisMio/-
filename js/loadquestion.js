function parseQuestion(json){
    _.map(json,function(value){
        if(value.specialTipsPath!==undefined && value.specialTipsPath!==null)
            value.pic = value.specialTipsPath;
        if(value.isShow!==undefined && value.isShow!==null)
            value.show = value.isShow;
        if(value.answers!==undefined && value.answers!==null){
            _.map(value.answers,function(val){
                delete val.subjectId,delete val.content, delete val.ordinaryLink, delete val.accurateLink, delete val.depthLink, delete val.nolink, delete val.diseaseRisk, delete val.riskFactors, delete val.disease;
                val.condition = val.condition.split('+');
            });
            value.choice = value.answers;
        }

        delete value.sort,delete value.parentId,delete value.condition, delete value.specialTipsPath, delete value.answers, delete value.isShow;
        $('.content').append('<div></div>').find('div').last().question(value);
    });
    json.length=0;
}
function getData(dataType){
    theme = dataType;
    data = localStorage.getItem(dataType)
    if(data===null)
        $.ajax({
            // url: '1.json',//测试从json读取
            url: '/front/ques/index',
            data: dataType,
            type: 'get',
            success: function(data){
                if(data.state=='0'){
                    parseQuestion(data.data);
                }
            }
        });
    else{
        parseQuestion(JSON.parse(data));
    }
}