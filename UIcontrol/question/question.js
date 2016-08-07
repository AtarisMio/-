var opts = [];
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
    opts[opt.id] = opt;
    /** 获取答案 */
    this.getAnswer = function(){
        opt.answer.lenght = 0;
        switch(opt.type){
            case 'single':
                opt.answer.push($(_this).find('input:checked').val());
                break;
            case 'multiple':
                $.each($(_this).find('input:checked'),function(index,element){
                    opt.answer.push(element.val());
                });
                break;
            case 'essay':
                opt.answer.push($(_this).find('input').val());
                break;
            default:
                break;
        }
        return opt.answer;
    }
    /** 设置答案 */
    this.setAnswer = function(){
        switch(opt.type){
            case 'single':
                $(_this).find('input[value='+opt.answer[0]+']').prop('checked',true)
                break;
            case 'multiple':
                $.each(opt.answer,function(index,element){
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
        $.ajax({
            url: 'UIcontrol/question/question.tmpl.html',
            type: 'get',
            success: function(data) {
                $(_this).html(data);
                $(_this).prop('id', 'q'+opt.id).addClass('question');
                if(opt.show=='false')
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
                    $(_this).find('.question_list').html('<li><input type="text" name="q'+opt.id+'" id="a'+opt.choice[0].id+'" data-condition='+element.condition+' /></li>');
                }
                else{
                    var str = "",type = 'radio';
                    if(opt.type === 'single')
                        type = 'radio';
                    else if(opt.type === 'multiple')
                        type = 'checkbox';
                    $.each(opt.choice, function(index, element) {
                        str+='<li><input type="'+type+'" name="q'+opt.id+'" id="a'+element.id+'" data-condition='+JSON.stringify(element.condition)+' /><label for="a'+element.id+'">'+element.answer+'</label></li>'
                    });
                    $(_this).find('.question_list').html(str);
                }
                $.each($(_this).find('input[data-condition]'), function(index, element_out) {
                    $(element_out).click(function(){
                        $.each($(_this).find('input[data-condition]'),function(index, _element){
                            $.each($(_element).data('condition'),function(index, _c){
                                $('#q'+_c).hide();
                            });
                        });
                        if($(this).prop('checked')){
                            $.each($(this).data('condition'), function(index, element_in) {
                                $('#q'+element_in).show();
                            });
                        }
                        if ($(this).prop('type') === 'radio') {
                            try{
                                var elements = $(_this).next();
                                if(elements.length > 0)
                                    $('.content').animate({scrollTop:$(elements[0]).offset().top - $('.content>:first-child').offset().top});
                            }catch(e){
                                console.log(e);
                            }
                        }
                    });
                });
            }
        });
        
    }
    this.init();
    
}