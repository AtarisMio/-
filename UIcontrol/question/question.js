
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
    var opts = $.extend({}, defaults, options), _this = this;
    /** 获取答案 */
    this.getAnswer = function(){
        opts.answer.lenght = 0;
        switch(opts.type){
            case 'single':
                opts.answer.push($(_this).find('input:checked').val());
                break;
            case 'multiple':
                $.each($(_this).find('input:checked'),function(index,element){
                    opts.answer.push(element.val());
                });
                break;
            case 'essay':
                opts.answer.push($(_this).find('input').val());
                break;
            default:
                break;
        }
        return opts.answer;
    }
    /** 设置答案 */
    this.setAnswer = function(){
        switch(opts.type){
            case 'single':
                $(_this).find('input[value='+opts.answer[0]+']').prop('checked',true)
                break;
            case 'multiple':
                $.each(opts.answer,function(index,element){
                    $(_this).find('input[value='+element+']').prop('checked',true)
                });
                break;
            case 'essay':
                $(_this).find('input').val(opts.answer[0])
                break;
            default:
                break;
        }
    }

    this.init = function(){
        $.ajax({
            url: 'UIcontrol/question/question.tmpl.html',
            type: 'get',
            success: function(data) {
                $(_this).html(data);
                $(_this).prop('id', 'q'+opts.id).addClass('question');
                if(!opts.show)
                    $(_this).hide();
                $(_this).find('.question_content').text(opts.title);
                if(opts.pic){
                    $(_this).find('.question_img img').prop('src', opts.pic);
                    $(_this).find('._tip2').text(opts.tip);
                }
                else{
                    $(_this).find('.question_img').hide();
                    $(_this).find('._tip1').text(opts.tip);
                }
                if(opts.type==="essay"){
                    $('.question_list').html('<li><input type="text" name="q'+opts.id+'" id="a'+opts.choice[0].id+'" data-condition='+element.condition+' /></li>');
                }
                else{
                    var str = "",type = 'radio';
                    if(opts.type === 'single')
                        type = 'radio';
                    else if(opts.type === 'multiple')
                        type = 'checkbox';
                    $.each(opts.choice, function(index, element) {
                        str+='<li><input type="'+type+'" name="q'+opts.id+'" id="a'+element.id+'" data-condition='+element.condition+' /><label for="a'+element.id+'">'+element.answer+'</label></li>'
                    });
                    $('.question_list').html(str);
                }
                $.each($(_this).find('input[data-condition]'), function(index, element_out) {
                    $(element_out).click(function(){
                        if($(this).prop('checked')){
                            $.each($(this).data('condition'), function(index, element_in) {
                                $('#q'+element_in).show();
                            });
                        }else{
                            $.each($(this).data('condition'), function(index, element_in) {
                                $('#q'+element_in).hide();
                            });
                        }
                    });
                });
            }
        });
        
    }
    this.init();
    
}