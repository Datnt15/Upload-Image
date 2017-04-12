jQuery(function($) {
	//editables on first profile page
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
	
	
	// Chỉnh sửa họ và tên
	$('#fullname').editable({
        type: 'text',
        name: 'fullname' ,
        success: function(response, newValue) {
            update_main_data('fullname', newValue);
        }       
    });

	// Chỉnh sửa email
	$('#cv_email').editable({
        type: 'email',
        name: 'cv_email' ,
        success: function(response, newValue) {
            update_main_data('email', newValue);
        }       
    });

	// Chỉnh sửa số điện thoại
	$('#phone_1').editable({
        type: 'text',
        name: 'phone_1' ,
        success: function(response, newValue) {
            update_cv_data('phone', newValue);
        }       
    });


	$('#phone_2').editable({
        type: 'text',
        name: 'phone_2' ,
        success: function(response, newValue) {
            update_cv_data('phone2', newValue);
        }       
    });

	// Chỉnh sửa địa chỉ ở đây
	$('#cv_address').editable({
        type: 'text',
        name: 'cv_address' ,
        success: function(response, newValue) {
            update_cv_data('address', newValue);
        }       
    });

    // Chỉnh sửa nghề nghiệp ở đây nà
	$('#cv_major').editable({
        type: 'text',
        name: 'cv_major' ,
        success: function(response, newValue) {
            update_cv_data('major', newValue);
        }       
    });


	// Chỉnh sửa giới thiệu ngắn
	$('#cv_short_intro').editable({
        mode: 'inline',
        type: 'wysiwyg',
        name : 'cv_short_intro',
        wysiwyg : {
            css : {'max-width':'300px'}
        },
        success: function(response, newValue) {
        	update_cv_data('cv_short_intro', newValue);
        }
    });

	// Chỉnh sửa triết lý sống
	$('#cv_quote').editable({
        mode: 'inline',
        type: 'wysiwyg',
        name : 'cv_quote',
        wysiwyg : {
            css : {'max-width':'300px'}
        },
        success: function(response, newValue) {
        	update_cv_data('quote', newValue);
        }
    });

	// Chỉnh sửa giới thiệu qua về sở thích
	$('#hobbies_intro').editable({
        mode: 'inline',
        type: 'wysiwyg',
        name : 'hobbies_intro',
        wysiwyg : {
            css : {'max-width':'300px'}
        },
        success: function(response, newValue) {
        	update_cv_data('hobbies_intro', newValue);
        }
    });

	// Chỉnh sửa giới thiệu qua về sở thích
	$('#philosophy_intro').editable({
        mode: 'inline',
        type: 'wysiwyg',
        name : 'philosophy_intro',
        wysiwyg : {
            css : {'max-width':'300px'}
        },
        success: function(response, newValue) {
        	update_cv_data('philosophy_intro', newValue);
        }
    });


    // Thêm mới sở thích
	$('#add_new_hobbie').editable({
        type: 'text',
        name: 'add_new_hobbie',
        success: function(response, newValue) {
        	$("#hobbies").append('<li class="single_hobbie">' + newValue + '<span class="badge badge-important hide">x</span></li>');
            add_new_meta_data('hobbies', newValue);
            $('#add_new_hobbie').text("Thêm sở thích mới nào!");
        }       
    });

    // Thêm mới tính cách
	$('#add_new_philosophy').editable({
        type: 'text',
        name: 'add_new_philosophy',
        success: function(response, newValue) {
        	$("#philosophies").append('<li class="single_philosophy">' + newValue + '<span class="badge badge-important hide">x</span></li>');
            add_new_meta_data('philosophies', newValue);
            $('#add_new_philosophy').text("Thêm sở thích mới nào!");
        }       
    });


    // Thêm mới bằng cấp, chứng chỉ
	$('#add_new_diploma').editable({
        type: 'text',
        name: 'add_new_diploma',
        success: function(response, newValue) {
        	$("#diplomaes").append(`<div class="col-xs-6 col-sm-4 col-md-3">
                                    <div class="thumbnail search-thumbnail">
                                    	<span class="search-promotion label label-danger arrowed-in arrowed-in-right" data-diploma="`+newValue+`">
                                    		Xóa chứng chỉ
                                    	</span>
                                        <img class="media-object" src="assets/img/diploma_2.png" />
                                        <div class="caption">
                                            <div class="clearfix">
                                                <p>
                                                    `+newValue+`
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
            add_new_meta_data('diplomaes', newValue);
            $('#add_new_diploma').text("Thêm chứng chỉ mới!");
        }       
    });

    // Ẩn hiện nút xóa hobbie khi hover chuột qua
    $("#hobbies .single_hobbie").hover(function() {
    	$(this).find('span').toggleClass('hide');
    }, function() {
    	$(this).find('span').toggleClass('hide');
    });

    // Ẩn hiện nút xóa philosophy khi hover chuột qua
    $("#philosophies .single_philosophy").hover(function() {
    	$(this).find('span').toggleClass('hide');
    }, function() {
    	$(this).find('span').toggleClass('hide');
    });

    // Xóa một sở thích
    $("#hobbies").on('click', '.single_hobbie span', function(event) {
    	var hobbie = $(this).parent().clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text().trim();
    	$(this).parent().remove();
    	delete_meta_data("hobbies", hobbie);
    });

    // Xóa một tính cách
    $("#philosophies").on('click', '.single_philosophy span', function(event) {
    	var hobbie = $(this).parent().clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text().trim();
    	$(this).parent().remove();
    	delete_meta_data("philosophies", hobbie);
    });

    // Xóa một chứng chỉ
    $("#diplomaes").on('click', '.search-promotion.label.label-danger', function(event) {
    	var diploma = $(this).attr('data-diploma').trim();
    	$(this).parent().parent().remove();
    	delete_meta_data("diplomaes", diploma);
    });


    // Xóa một học bạ
    $("#Education .timeline-container").on('click', '.widget-toolbar a', function(event) {
    	var school_profile = $(this).attr('data-school').trim();
    	$(this).parent().parent().parent().parent().remove();
    	delete_meta_data("school_profiles", school_profile);
    });



    // Xóa một kinh nghiệm
    $("#expers .timeline-container").on('click', '.widget-toolbar a', function(event) {
    	var school_profile = $(this).attr('data-exper').trim();
    	$(this).parent().parent().parent().parent().remove();
    	delete_meta_data("expers", school_profile);
    });



    // Cập nhật thông tin phụ của user
    var update_cv_data = function (key, value){
    	$.post(
    		$('base').attr('href')+'student/update_cv_data', 
    		{
    			meta_key: key,
    			meta_value: value
    		}, 
    		function(data) {}
	    );
    };


    // Cập nhật thông tin chính của user
    var update_main_data = function (key, value){
    	$.post(
    		$('base').attr('href')+'student/update_main_data', 
    		{
    			meta_key: key,
    			meta_value: value
    		}, 
    		function(data) {}
	    );
    };


    // Thêm mới một thông tin phụ của user 
    var add_new_meta_data = function (key, value){
    	$.post(
    		$('base').attr('href')+'student/add_new_meta_data', 
    		{
    			meta_key: key,
    			meta_value: value
    		}, 
    		function(data) {}
	    );
    };


    // Xóa thông tin phụ của user
    var delete_meta_data = function (key, value){
    	$.post(
    		$('base').attr('href')+'student/delete_meta_data', 
    		{
    			meta_key: key,
    			meta_value: value
    		}, 
    		function(data) {}
	    );
    };

    // Toggle CV content
    $('ul.header_menu li span').on('click', function(e){
		$('.cv_content').addClass('hide');
		$($(this).attr('href')).removeClass('hide').fadeIn('slow');
	});


    // Skill styling
    $('.easy-pie-chart.percentage').each(function(){
		var barColor = $(this).data('color') || '#555';
		var trackColor = '#fff';
		var size = parseInt($(this).data('size')) || 72;
		$(this).easyPieChart({
			barColor: barColor,
			trackColor: trackColor,
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: parseInt(size/10),
			animate:false,
			size: size
		}).css('color', barColor);
	});

	// Date picker setting up
	$(".date-picker").datepicker({format: 'dd-mm-yyyy'});

	// Color picker
	$('#simple-colorpicker-1').ace_colorpicker();
	$( "#slider-eq > span" ).css(
		{
			width:'90%', 
			float:'left', 
			marginTop:'10px', 
			marginLeft: '10px'
		}
	).each(function() {
		// read initial values from markup and remove that
		$( this ).empty().slider({
			value: 0,
			range: "min",
			// min: 0,
			// max: 100,
			animate: true,
			slide: function(event, ui){
				var val = $(this).slider('value');
				if( !ui.handle.firstChild ) {
					$("<div class='tooltip right in' style='display:none;left:16px;top:-6px;'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>")
					.prependTo(ui.handle);
				}
				$(ui.handle.firstChild).show().children().eq(1).text(val);
				$("#percent").val(val);
			}
		}).find('span.ui-slider-handle').on('blur', function(){
			$(this.firstChild).hide();
		});
	});
	
	// Toggle button text
	$("button[data-toggle=collapse]").click(function () {
		var old_text = $(this).attr('data-text-default');
      	$(this).text(function(i, text){
          	return text === old_text ? "Hủy" : old_text;
      	});
		
   });

	// Thêm học bạ
	$("#add_school_profile_form").submit(function() {
		var form_data = $(this).serializeArray();
		add_new_meta_data('school_profiles', form_data[1].value + "_" + form_data[0].value);
		$("#Education .timeline-container").append(`<div class="timeline-items">
                    <div class="timeline-item clearfix">
                        <div class="timeline-info">
                            <i class="timeline-indicator ace-icon fa fa-graduation-cap btn btn-primary no-hover green"></i>
                        </div>

                        <div class="widget-box transparent">
                            <div class="widget-header widget-header-small">
                                <h5 class="widget-title smaller">`+form_data[1].value+`</h5>
                                <span class="widget-toolbar">
                                    <a data-school="`+form_data[1].value + "_" + form_data[0].value+`">
                                        <i class="ace-icon fa fa-times"></i>
                                    </a>     
                                </span>
                            </div>

                            <div class="widget-body">
                                <div class="widget-main">`+form_data[0].value+`</div>
                            </div>
                        </div>
                    </div>
                </div>`);
		$("#add_school_profile").collapse('toggle');
		return false;
	});

	// Thêm Kinh nghiệm
	$("#add_new_exper_form").submit(function() {
		var form_data = $(this).serializeArray();
		add_new_meta_data('expers', form_data[0].value + "_" + form_data[1].value);
		$("#expers .timeline-container").append(`<div class="timeline-items">
                    <div class="timeline-item clearfix">
                        <div class="timeline-info">
                            <i class="timeline-indicator ace-icon fa fa-bar-chart no-hover green"></i>
                        </div>

                        <div class="widget-box transparent">
                            <div class="widget-header widget-header-small">
                                <h5 class="widget-title smaller">`+form_data[0].value+`</h5>
                                <span class="widget-toolbar">
                                    <a data-exper="`+form_data[0].value + "_" + form_data[1].value+`">
                                        <i class="ace-icon fa fa-times"></i>
                                    </a>     
                                </span>
                            </div>

                            <div class="widget-body">
                                <div class="widget-main">`+form_data[1].value+`</div>
                            </div>
                        </div>
                    </div>
                </div>`);
		$("#add_new_exper").collapse('toggle');
		return false;
	});

	//typeahead.js
	//example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
	var substringMatcher = function() {
		var strs=[];
		$.post(
			$('base').attr('href')+'student/get_all_skills', 
			{ action : 'get_skills'}, 
			function(data) {
				strs = data.split(",");
			}
		);
		return function findMatches(q, cb) {

			var matches, substringRegex;
		 
			// an array that will be populated with substring matches
			matches = [];
		 
			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');
		 
			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					// the typeahead jQuery plugin expects suggestions to a
					// JavaScript object, refer to typeahead docs for more info
					matches.push({ value: str });
				}
			});

			cb(matches);
		}
	};

	$('input#skill_name').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	}, {
		displayKey: 'value',
		source: substringMatcher(),
		limit: 10
	}).parent('span.twitter-typeahead').css({
		display: 'block'
	});
	// End typeahead
	
	// 
	$("#add_new_skill_form").submit(function() {
		var form_data = $(this).serializeArray();
		$.post(
			$('base').attr('href')+'student/add_new_skill', 
			{ 
				action 		: 'add_new_skill',
				skill_name 	: form_data[0].value,
				percent 	: form_data[1].value,
				color 		: form_data[2].value
			}, 
			function(data) {
				$("#list_skills").append(`
					<div class="grid4 center">
		                <div class="easy-pie-chart percentage" data-percent="`+form_data[1].value+`" data-color="`+form_data[2].value+`">
		                    <span class="percent">`+form_data[1].value+`</span>%
		                </div>

		                <div class="space-2"></div>
		                `+form_data[0].value+`
		            </div>`);
				$("#add_new_skill").collapse('toggle');
				// Skill styling
			    $('.easy-pie-chart.percentage').each(function(){
					var barColor = $(this).data('color') || '#555';
					var trackColor = '#fff';
					var size = parseInt($(this).data('size')) || 72;
					$(this).easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: parseInt(size/10),
						animate:false,
						size: size
					}).css('color', barColor);
				});
				$("#add_new_skill_form")[0].reset();
			}
		);
		return false;
	});

	//to translate the daterange picker, please copy the "examples/daterange-fr.js" contents here before initialization
	$('input.date-range-picker').daterangepicker({
		'applyClass' : 'btn-sm btn-success',
		'cancelClass' : 'btn-sm btn-default',
		locale: {
			"separator": " => ",
			"applyLabel": 'Chọn',
			"cancelLabel": 'Hủy',
			"format": 'DD-MM-YYYY',
			"fromLabel": "Từ",
	        "toLabel": "Đến",
	        "customRangeLabel": "Tùy chọn",
	        "daysOfWeek": [
	            "CN",
	            "Hai",
	            "Ba",
	            "Tư",
	            "Năm",
	            "Sáu",
	            "Bảy"
	        ],
	        "monthNames": [
	            "Tháng Giêng",
	            "Tháng Hai",
	            "Tháng Ba",
	            "Tháng Tư",
	            "Tháng Năm",
	            "Tháng Sáu",
	            "Tháng Bảy",
	            "Tháng Tám",
	            "Tháng Chín",
	            "Tháng Mười",
	            "Tháng Mười Một",
	            "Tháng Chạp"
	        ],
	        "firstDay": 1
		}
	})
	.prev().on(ace.click_event, function(){
		$(this).next().focus();
	});

});