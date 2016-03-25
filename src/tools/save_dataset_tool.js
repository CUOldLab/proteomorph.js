morpheus.SaveDatasetTool = function() {
};
morpheus.SaveDatasetTool.prototype = {
	toString : function() {
		return 'Save Dataset';
	},
	gui : function() {
		return [
			{
				name : 'file_name',
				type : 'text',
				help : '<a target="_blank" href="http://support.lincscloud.org/hc/en-us/articles/202105453-GCT-Gene-Cluster-Text-Format-">GCT 1.3</a>'
							+ ' or <a target="_blank" href="http://www.broadinstitute.org/cancer/software/genepattern/gp_guides/file-formats/sections/gct">GCT 1.2</a> file name',
				required : true
			}, {
				name : 'file_format',
				type : 'radio',
				options : [ {
					name : 'GCT version 1.2',
					value : '1.2'
				}, {
					name : 'GCT version 1.3',
					value : '1.3'
				} ],
				value : '1.3',
				required : true
			} ];
	},
	execute : function(options) {
		var project = options.project;
		var format = options.input.file_format;
		var fileName = options.input.file_name;
		var controller = options.controller;
		var dataset = project.getSortedFilteredDataset();

		var text = (format === '1.2') ? new morpheus.GctWriter12()
				.write(dataset) : new morpheus.GctWriter().write(dataset);

		var blob = new Blob([ text ], {
			type : 'text/plain;charset=charset=utf-8'
		});
		if (!morpheus.Util.endsWith(fileName.toLowerCase(), '.gct')) {
			fileName += '.gct';
		}
		saveAs(blob, fileName, true);
	}
};