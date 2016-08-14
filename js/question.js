var opts = {}, theme="", questionTemplete = '<p class="question_content"></p><p class="question_tip _tip1"></p><div class="question_split"><img src="img/border_top.png" alt=""></div><ul class="question_list"></ul><div class="question_img"><img src="" alt=""></div><p class="question_tip _tip2"></p>';
$.fn.question = function(options){
    var defaults = {
        id: NaN,
        title: "",
        type: "single",
        tip: "",
        pic: "",
        answer: [],
        choice: [],
        show: false
    }
    var opt = $.extend({}, defaults, options), _this = this;
    opts[''+opt.id] = opt;
    /** 设置答案 */
    this.setAnswer = function(){
        if(opt.answer.length==0)
            return;
        switch(opt.type){
            case 'single':
                $(_this).find('input[value='+opt.answer[0]+']').prop('checked',true)
                break;
            case 'multiple':
                _.each(opt.answer,function(element){
                    $(_this).find('input[value='+element+']').prop('checked',true)
                });
                break;
            case 'essay':
                $(_this).find('input').val(opt.answer[0])
                break;
            default:
                break;
        }
    }

    this.init = function(){
        $(_this).html(questionTemplete);
        $(_this).prop('id', 'q'+opt.id).addClass('question');
        if(opt.show === 'false' || opt.show === false)
            $(_this).hide();
        $(_this).find('.question_content').text(opt.title);
        if(opt.pic){
            $(_this).find('.question_img img').prop('src', opt.pic);
            $(_this).find('._tip2').text(opt.tip);
        }
        else{
            $(_this).find('.question_img').hide();
            $(_this).find('._tip1').text(opt.tip);
        }
        if(opt.type==="essay"){
            $(_this).find('.question_list').html('<li><input type="text" name="q'+opt.id+'" id="a'+opt.id+'" /></li>');
        }
        else{
            var str = "",type = 'radio';
            if(opt.type === 'single')
                type = 'radio';
            else if(opt.type === 'multiple' || opt.type === 't_multiple' )
                type = 'checkbox';
            _.each(opt.choice, function(element) {
                str+='<li><input type="'+type+'" name="q'+opt.id+'" id="a'+element.id+'" data-condition='+JSON.stringify(element.condition)+' value="'+element.id+'" /><label for="a'+element.id+'">'+element.answer+'</label></li>'
            });
            $(_this).find('.question_list').html(str);
        }
        _this.setAnswer()
        _.each($(_this).find('input'), function(element_out) {
            $(element_out).click(function(){
                opt.answer.length = 0;
                switch(opt.type){
                    case 'single':
                        opt.answer.push($(_this).find('input:checked').val());
                        break;
                    case 'multiple':
                    case 't_multiple':
                        _.each($(_this).find('input:checked'),function(element){
                            opt.answer.push($(element).val());
                        });
                        break;
                    case 'essay':
                        opt.answer.push($(_this).find('input').val());
                        break;
                    default:
                        break;
                }
                _.each($(_this).find('input[data-condition]').filter(function(a){return !$(this).prop('checked')}),function(_element){
                    _.each($(_element).data('condition'),function(_c){
                        $('#q'+_c).hide();
                    });
                });
                _.each($('input[data-condition]').filter(function(a){return $(this).prop('checked')}),function(_element){
                    _.each($(_element).data('condition'),function(_c){
                        $('#q'+_c).show();
                    });
                });
                if ($(this).prop('type') === 'radio') {
                    try{
                        var elements = $(_this).next();
                        if(elements.length > 0)
                            $('.content').animate({scrollTop:$(elements[0]).offset().top - $('.content>:first-child').offset().top});
                    }catch(e){
                        console.log(e);
                    }
                }
                localStorage.setItem(theme,JSON.stringify(opts));
            });
        });
    }
    this.init();
    
}
$.fn.getAnswer = function(){
    var answer = {};
    answer.subject = $(this).prop('id').substr(1);
    answer.type = opts[answer.subject].type;
    if(opts[answer.subject].answer.length===0)
        return {};
    answer.answer = opts[answer.subject].answer.join('+');
    return answer;
}