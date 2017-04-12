jQuery(function($) {

	$('[data-rel=tooltip]').tooltip({container:'body'});
	$('[data-rel=popover]').popover({container:'body'});

	$('#id-input-file-3').ace_file_input({
		style: 'well',
		btn_choose: 'Drop files here or click to choose',
		btn_change: null,
		no_icon: 'ace-icon fa fa-cloud-upload',
		droppable: true,
		thumbnail: 'small',
		preview_error : function(filename, error_code) {
		}

	}).on('change', function(){
	});
	

	//dynamically change allowed formats by changing allowExt && allowMime function
	$('#id-file-format').removeAttr('checked').on('change', function() {
		var whitelist_ext, whitelist_mime;
		var btn_choose
		var no_icon
		if(this.checked) {
			btn_choose = "Drop images here or click to choose";
			no_icon = "ace-icon fa fa-picture-o";

			whitelist_ext = ["jpeg", "jpg", "png", "gif" , "bmp"];
			whitelist_mime = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"];
		}
		else {
			btn_choose = "Drop files here or click to choose";
			no_icon = "ace-icon fa fa-cloud-upload";
			
			whitelist_ext = null;//all extensions are acceptable
			whitelist_mime = null;//all mimes are acceptable
		}
		var file_input = $('#id-input-file-3');
		file_input
		.ace_file_input('update_settings',
		{
			'btn_choose': btn_choose,
			'no_icon': no_icon,
			'allowExt': whitelist_ext,
			'allowMime': whitelist_mime
		})
		file_input.ace_file_input('reset_input');
		
		file_input
		.off('file.error.ace')
		.on('file.error.ace', function(e, info) {
		});
	});
	
	var tag_input = $('#form-field-tags');
	try{
		tag_input.tag({
			placeholder:tag_input.attr('placeholder'),
			//enable typeahead by specifying the source array
			source: ace.vars['US_STATES'],//defined in ace.js >> ace.enable_search_ahead
			/**
			//or fetch data from database, fetch those that match "query"
			source: function(query, process) {
			  $.ajax({url: 'remote_source.php?q='+encodeURIComponent(query)})
			  .done(function(result_items){
				process(result_items);
			  });
			}
			*/
	  	})

		//programmatically add/remove a tag
		var $tag_obj = $('#form-field-tags').data('tag');
		$tag_obj.add('Nhập từ khóa vào đây');
		
		var index = $tag_obj.inValues('some tag');
		$tag_obj.remove(index);
	}
	catch(e) {
		//display a textarea for old IE, because it doesn't support this plugin or another one I tried!
		tag_input.after('<textarea id="'+tag_input.attr('id')+'" name="'+tag_input.attr('name')+'" rows="3">'+tag_input.val()+'</textarea>').remove();
		autosize($('#form-field-tags'));
	}

	try {
	  	Dropzone.autoDiscover = true;
	
	  	var myDropzone = new Dropzone('#dropzone', {
			    previewTemplate: $('#preview-template').html(),
			    
				thumbnailHeight: 120,
			    thumbnailWidth: 120,
			    maxFilesize: 0.5,
				
				// addRemoveLinks : true,
				// dictRemoveFile: 'Remove',
				
				dictDefaultMessage :
				'<span class="bigger-150 bolder">Drop files</span> to upload \
				<span class="smaller-80 grey">(or click)</span> <br /> \
				<i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>'
			,
			
		    thumbnail: function(file, dataUrl) {
		      	if (file.previewElement) {
			        $(file.previewElement).removeClass("dz-file-preview");
			        var images = $(file.previewElement).find("[data-dz-thumbnail]").each(function() {
						var thumbnailElement = this;
						thumbnailElement.alt = file.name;
						thumbnailElement.src = dataUrl;
					});
			        setTimeout(function() { $(file.previewElement).addClass("dz-image-preview"); }, 1);
		      	}
		    }
		});
	
	
	  //simulating upload progress
	  var minSteps = 6,
	      maxSteps = 60,
	      timeBetweenSteps = 100,
	      bytesPerStep = 100000;
	
	  myDropzone.uploadFiles = function(files) {
	    var self = this;
	
	    for (var i = 0; i < files.length; i++) {
	      var file = files[i];
	          totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
	
	      for (var step = 0; step < totalSteps; step++) {
	        var duration = timeBetweenSteps * (step + 1);
	        setTimeout(function(file, totalSteps, step) {
	          return function() {
	            file.upload = {
	              progress: 100 * (step + 1) / totalSteps,
	              total: file.size,
	              bytesSent: (step + 1) * file.size / totalSteps
	            };
	
	            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
	            if (file.upload.progress == 100) {
	              file.status = Dropzone.SUCCESS;
	              self.emit("success", file, 'success', null);
	              self.emit("complete", file);
	              self.processQueue();
	            }
	          };
	        }(file, totalSteps, step), duration);
	      }
	    }
	   }
	
	   
	   //remove dropzone instance when leaving this page in ajax mode
	   $(document).one('ajaxloadstart.page', function(e) {
			try {
				myDropzone.destroy();
			} catch(e) {}
	   });
	
	} catch(e) {
	  alert('Dropzone.js does not support older browsers!');
	}
	
});