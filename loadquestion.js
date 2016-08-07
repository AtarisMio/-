function parseQuestion(json){
    _.map(json,function(value){
        value.pic = value.specialTipsPath;
        _.map(value.answers,function(val){
            delete val.subjectId,delete val.content, delete val.ordinaryLink, delete val.accurateLink, delete val.depthLink, delete val.nolink, delete val.diseaseRisk, delete val.riskFactors, delete val.disease;
            val.condition = val.condition.split('+');
        });
        value.choice = value.answers, value.show = value.isShow;
        delete value.sort,delete value.parentId,delete value.condition, delete value.specialTipsPath, delete value.answers, delete value.isShow;
        $('.content').append('<div></div>').find('div').last().question(value);
    });
    json.length=0;
}
function getData(dataType){
    $.ajax({
        url: '1.json',
        data: dataType,
        type: 'get',
        success: function(data){
            if(data.state=='0'){
                parseQuestion(data.data);
            }
        }
    });
}