morpheus.HeatMapToolBar = function(controller) {
	this.controller = controller;
	this.rowSearchResultModelIndices = [];
	this.columnSearchResultModelIndices = [];
	var _this = this;
	var $el = $('<div name="toolbar" class=" hidden-print container-fluid">'
			+ '<div class="row"><div name="toolbarSearch" class="col-xs-12"></div></div>'
			+ '<div class="row"><div name="toolbarButtons" class="col-xs-12" style="border-bottom: 1px solid #e7e7e7;padding-bottom:4px; margin-bottom:14px;"></div></div>'
			+ '</div>');
	var searchHtml = [];
	var $search = $('<form name="searchForm" class="form form-inline" role="search"></form>');
	$search.on('submit', function(e) {
		e.preventDefault();
	});
	// search rows
	if (controller.options.toolbar.searchRows) {
		searchHtml.push('<div class="form-group">');
		searchHtml.push('<div class="input-group input-group-sm">'); // group
		searchHtml.push('<div class="input-group-btn">');
		searchHtml
				.push('<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" title="Search rows. Quote search term for exact match. Narrow search with field: modifier. Exclude matches using - modifier. Use min..max to perform a range search.">Rows</span> <span class="caret"></span></button>');
		searchHtml.push('<ul name="rowSearchOptions" class="dropdown-menu">');
		searchHtml.push('<li><a name="exact" href="#">Exact Match</a></li>');
		searchHtml
				.push('<li class="active"><a name="contains" href="#">Contains</a></li>');
		searchHtml.push('</ul>');
		searchHtml.push('</div>'); // input-group-btn
		searchHtml
				.push('<input type="text" style="width:240px;padding-right:25px;" class="form-control input-sm" autocomplete="off" name="searchRows">');
		searchHtml.push('</div>');
		searchHtml.push('<div class="form-group">');
		searchHtml.push('<span name="rowSearchDiv" style="display:none;">');
		searchHtml
				.push('<h6 name="searchResultsRows" style="display: inline;"></h6>');
		searchHtml
				.push('<button name="previousRowMatch" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Previous"><i class="fa fa-chevron-up"></i></button>');
		searchHtml
				.push('<button name="nextRowMatch" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Next"><i class="fa fa-chevron-down"></i></button>');
		searchHtml
				.push('<button name="rowMatchesToTop" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Matches To Top"><i class="fa fa-level-up"></i></button>');
		searchHtml.push('</span>');
		searchHtml.push('</div>');

	}
	if (controller.options.toolbar.searchColumns) {
		searchHtml
				.push('<div class="form-group" style="margin-right:18px;"></div>'); // spacer
		// search columns
		searchHtml.push('<div class="form-group">');
		searchHtml.push('<div class="input-group input-group-sm">'); // group
		searchHtml.push('<div class="input-group-btn">');
		searchHtml
				.push('<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" title="Search columns. Quote search term for exact match. Narrow search with field: modifier. Exclude matches using - modifier. Use min..max to perform a range search.">Columns</span> <span class="caret"></span></button>');
		searchHtml
				.push('<ul name="columnSearchOptions" class="dropdown-menu">');
		searchHtml.push('<li><a name="exact" href="#">Exact Match</a></li>');
		searchHtml
				.push('<li class="active"><a name="contains" href="#">Contains</a></li>');
		searchHtml.push('</ul>');
		searchHtml.push('</div>'); // input-group-btn

		searchHtml
				.push('<input type="text" style="width:240px;padding-right:25px;" class="form-control input-sm" autocapitalize="off" autocomplete="off" name="searchColumns"></div>');
		searchHtml.push('</div>');
		searchHtml.push('<div class="form-group" style="margin-left:4px;">');
		searchHtml
				.push('<h6 name="searchResultsColumns" style="display: inline;"></h6>');
		searchHtml.push('<span name="columnSearchDiv" style="display:none;">');
		searchHtml
				.push('<button name="previousColumnMatch" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Previous"><i class="fa fa-chevron-up"></i></button>');
		searchHtml
				.push('<button name="nextColumnMatch" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Next"><i class="fa fa-chevron-down"></i></button>');
		searchHtml
				.push('<button name="columnMatchesToTop" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Matches To Top"><i class="fa fa-level-up"></i></button>');
		searchHtml.push('</span>');
		searchHtml.push('</div>');
	}

	// search values
	searchHtml
			.push('<div name="searchValuesDiv" class="form-group" style="margin-left:18px;">');
	searchHtml
			.push('<div class="input-group input-group-sm"><span class="input-group-addon">Values</span><input type="text" style="width:240px;padding-right:25px;" class="form-control input-sm" autocapitalize="off" autocomplete="off" name="searchValues"></div>');
	searchHtml.push('</div>');
	searchHtml.push('<div class="form-group" style="margin-left:4px;">');
	searchHtml
			.push('<h6 name="searchResultsValues" style="display: inline;"></h6>');
	searchHtml.push('</div>');

	// row dendrogram
	searchHtml
			.push('<div style="display: none;  margin-left:18px;" name="searchRowDendrogramWrapper" class="form-group">');
	searchHtml
			.push('<div class="input-group input-group-sm"><span class="input-group-addon">Row Dendrogram</span><input type="text" style="width:240px;" class="form-control input-sm" autocapitalize="off" autocomplete="off" name="searchRowDendrogram"></div>');
	searchHtml
			.push('<h6 name="searchResultsRowDendrogram" style="display: inline;"></h6>');
	searchHtml.push('</div>');
	// column dendrogram
	searchHtml
			.push('<div style="display: none; margin-left:18px;" name="searchColumnDendrogramWrapper" class="form-group">');
	searchHtml
			.push('<div class="input-group input-group-sm"><span class="input-group-addon">Column Dendrogram</span><input type="text" style="width:240px;" class="form-control input-sm" autocapitalize="off" autocomplete="off" name="searchColumnDendrogram"></div>');
	searchHtml
			.push('<h6 name="searchResultsColumnDendrogram" style="display: inline;"></h6>');
	searchHtml.push('</div>');
	// dimensions
	searchHtml.push('<div class="form-group" name="datasetInfoGroup">');
	searchHtml
			.push('<h6 style="display: inline; margin-left:30px;" name="dim"></h6>');
	searchHtml
			.push('<h6 style="display: inline; margin-left:30px;" name="selection"></h6>');
	searchHtml.push('</div>');
	searchHtml.push('<div name="right" class="form-group pull-right">');

	// searchHtml
	// .push('<div id="hangout-div"></div>');
	// searchHtml
	// .push('<button onclick="TogetherJS(this); return false;" type="button"
	// class="btn btn-default btn-xs" title="Collaboration"><i class="fa
	// fa-users"></button></i>');
	// searchHtml.push('<span style="margin-left:6px;"></span>');
	// searchHtml
	// .push('<button name="tutorial" type="button" class="btn btn-default
	// btn-xs" title="Tutorial"><i class="fa
	// fa-question-circle"></button></i>');
	searchHtml.push('</div>');
	$(searchHtml.join('')).appendTo($search);
	if (!controller.options.toolbar.searchValues) {
		$search.find('[name=searchValuesDiv]').css('display', 'none');
	}
	if (controller.options.tour) {
		var $tour = $('<button type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Take a tour"><i class="fa fa-plane"></i></button>');
		$tour.prependTo($search.find('[name=right]'));
		$tour.on('click', function(e) {
			e.preventDefault();
			controller.options.tour(controller);
		});
	}
	if (controller.options.$help) {
		controller.options.$help.appendTo($search.find('[name=right]'));
	}
	var $tools = $('<form name="tools" class="form-inline" role="form"></form>');
	$tools.on('submit', function(e) {
		e.preventDefault();
	});

	var $toolbarForm = $('<form name="view" class="form-inline" role="form"></form>');
	$toolbarForm.on('submit', function(e) {
		e.preventDefault();
	});
	var toolbarHtml = [];
	// zoom
	if (controller.options.toolbar.zoom) {
		toolbarHtml.push('<div class="form-group">');
		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Zoom Out (-)" name="out"><span class="fa fa-minus"></span></button>');
		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Zoom In (+)" name="in"><span class="fa fa-plus"></span></button>');
		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Fit To Window" name="fit"><span class="fa fa-compress"></span></button>');
		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs" data-toggle="tooltip" title="Reset Zoom" name="resetZoom">100%</button>');
	}
	toolbarHtml.push('<div class="morpheus-button-divider"></div>');
	if (controller.options.toolbar.sort) {
		toolbarHtml
				.push('<button data-toggle="tooltip" title="Sort" name="sort" type="button" class="btn btn-default btn-xs"><span class="fa fa-sort-alpha-asc"></span></button>');
	}
	if (controller.options.toolbar.options) {
		toolbarHtml
				.push('<button name="options" data-toggle="tooltip" title="Options" type="button" class="btn btn-default btn-xs"><span class="fa fa-cog"></span></button>');

	}
	toolbarHtml.push('<div class="morpheus-button-divider"></div>');
	if (controller.options.toolbar.saveImage) {
		toolbarHtml
				.push('<button name="saveImage" data-toggle="tooltip" title="Save Image (Ctrl+S)" type="button" class="btn btn-default btn-xs"><span class="fa fa-file-image-o"></span></button>');
	}
	if (controller.options.toolbar.saveDataset) {
		toolbarHtml
				.push('<button name="saveDataset" data-toggle="tooltip" title="Save Dataset (Ctrl+Shift+S)" type="button" class="btn btn-default btn-xs"><span class="fa fa-floppy-o"></span></button>');
	}
	if (controller.options.toolbar.openFile) {
		toolbarHtml
				.push('<button name="openFile" data-toggle="tooltip" title="Open File (Ctrl+O)" type="button" class="btn btn-default btn-xs"><span class="fa fa-folder-open-o"></span></button>');
	}
	toolbarHtml.push('<div class="morpheus-button-divider"></div>');
	if (controller.options.toolbar.filter) {
		toolbarHtml
				.push('<button name="filterButton" data-toggle="tooltip" title="Filter" type="button" class="btn btn-default btn-xs"><span class="fa fa-filter"></span></button>');
	}
	if (typeof Plotly !== 'undefined') {
		toolbarHtml
				.push('<button name="chart" data-toggle="tooltip" title="Chart" type="button" class="btn btn-default btn-xs"><span class="fa fa-line-chart"></span></button>');

	}
	var tools = [ {
		tool : new morpheus.HClusterTool()
	}, {
		tool : new morpheus.MarkerSelection()
	}, {
		tool : new morpheus.NearestNeighbors()
	}, {
		tool : new morpheus.NewHeatMapTool(),
	}, null, {
		tool : new morpheus.AdjustDataTool()
	}, {
		tool : new morpheus.CollapseDatasetTool()
	}, {
		tool : new morpheus.CreateAnnotation()
	}, {
		tool : new morpheus.TransposeTool()
	}, {
		tool : new morpheus.WordCloudTool()
	} ]; // DevAPI, {
	this.getToolByName = function(name) {
		for (var i = 0; i < tools.length; i++) {
			if (tools[i] && tools[i].tool.toString
					&& tools[i].tool.toString() === name) {
				return tools[i].tool;
			}
		}
		throw name + ' not found';
	};
	if (controller.options.toolbar.tools) {
		toolbarHtml.push('<div class="btn-group">');
		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><span title="Tools" data-toggle="tooltip" class="fa fa-wrench"></span> <span class="fa fa-caret-down"></span></button>');
		toolbarHtml.push('<ul name="tools" class="dropdown-menu" role="menu">');

		for (var i = 0; i < tools.length; i++) {
			if (tools[i] == null) {
				toolbarHtml
						.push('<li role="presentation" class="divider"></li>');
			} else if (tools[i].action) {
				toolbarHtml.push('<li><a name="' + i + '" href="#">'
						+ tools[i].name + '</a></li>');
			} else {
				toolbarHtml.push('<li><a name="' + i + '" href="#">'
						+ tools[i].tool.toString() + '</a></li>');
			}
		}
		toolbarHtml.push('</ul></div>');
	}

	toolbarHtml.push('<div class="morpheus-button-divider"></div>');
	// legend
	if (controller.options.toolbar.colorKey) {
		toolbarHtml.push('<div class="btn-group">');

		toolbarHtml
				.push('<button type="button" class="btn btn-default btn-xs" data-toggle="dropdown"><span title="Color Key" data-toggle="tooltip" class="fa fa-key"></span></button>');
		toolbarHtml.push('<ul name="key" class="dropdown-menu" role="menu">');
		toolbarHtml.push('<li name="keyContent"></li>');
		toolbarHtml.push('</ul>');
		toolbarHtml.push('</div>');
	}
	// fixed info

	var tipWidth = 400;
	if (typeof window !== 'undefined') {
		tipWidth = window.screen.width - 400;
	}
	toolbarHtml
			.push('<div style="position:relative;display:inline;margin-left:12px;"><div name="tip" class="morpheus-tip" style="width:'
					+ tipWidth + 'px;min-width:400px;"></div></div>');
	toolbarHtml.push('</div>');
	$search.appendTo($el.find('[name=toolbarSearch]'));
	$(toolbarHtml.join('')).appendTo($toolbarForm);
	$toolbarForm.appendTo($el.find('[name=toolbarButtons]'));
	$el.prependTo(controller.$el);
	// gapi.hangout.render('hangout-div', {
	// 'widget_size' : '72',
	// 'render' : 'createhangout'
	// });
	var $tools = $el.find('[name=tools]');
	this.$tip = $el.find('[name=tip]');
	$tools.on('click', 'li > a', function(e) {
		e.preventDefault();
		var index = parseInt($(this).attr('name'));
		if (tools[index].tool) {
			morpheus.HeatMap.showTool(tools[index].tool, controller);
		} else {
			tools[index].action();
		}
	});
	this.defaultRowMatchMode = 'contains';
	this.defaultColumnMatchMode = 'contains';
	var $rowSearchOptions = $el.find('[name=rowSearchOptions]');
	$rowSearchOptions.on('click', 'li > a', function(e) {
		e.preventDefault();
		_this.defaultRowMatchMode = $(this).attr('name');
		$rowSearchOptions.find('li').removeClass('active');
		$(this).parent('li').addClass('active');
		_this.search(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'rowSearchMatchMode'
		});
	});
	var $columnSearchOptions = $el.find('[name=columnSearchOptions]');
	$columnSearchOptions.on('click', 'li > a', function(e) {
		e.preventDefault();
		_this.defaultColumnMatchMode = $(this).attr('name');
		$columnSearchOptions.find('li').removeClass('active');
		$(this).parent('li').addClass('active');
		_this.search(false);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'columnSearchMatchMode'
		});
	});

	var filterModal = [];
	var filterLabelId = _.uniqueId('morpheus');
	filterModal
			.push('<div class="modal fade" tabindex="1" role="dialog" aria-labelledby="'
					+ filterLabelId + '">');
	filterModal.push('<div class="modal-dialog" role="document">');
	filterModal.push('<div class="modal-content">');
	filterModal.push('<div class="modal-header">');
	filterModal
			.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	filterModal.push('<h4 class="modal-title" id="' + filterLabelId
			+ '">Filter</h4>');
	filterModal.push('</div>');
	filterModal.push('<div class="modal-body">');
	filterModal.push('');
	filterModal.push('</div>');
	filterModal.push('</div>');
	filterModal.push('</div>');
	filterModal.push('</div>');
	var $filterModal = $(filterModal.join(''));
	$filterModal.on('mousewheel', function(e) {
		e.stopPropagation();
	});
	var $filter = $('<div></div>');
	$filter.appendTo($filterModal.find('.modal-body'));
	$filterModal.appendTo($el);
	var filterHtml = [];
	filterHtml
			.push('<div class="radio"><label><input type="radio" name="rowsOrColumns" value="rows" checked>Rows</label></div> ');
	filterHtml
			.push('<div class="radio"><label><input type="radio" name="rowsOrColumns" value="columns">Columns</label></div>');

	var $filterChooser = $(filterHtml.join(''));
	$filterChooser.appendTo($filter);
	var columnFilterUI = new morpheus.FilterUI(controller.getProject(), true);
	var rowFilterUI = new morpheus.FilterUI(controller.getProject(), false);
	controller.getProject().getRowFilter().on('focus', function(e) {
		$filterChooser.find('[value=rows]').prop('checked', true);
		columnFilterUI.$div.hide();
		rowFilterUI.$div.show();
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'rowFilter'
		});

	});
	controller.getProject().getColumnFilter().on('focus', function(e) {
		$filterChooser.find('[value=columns]').prop('checked', true);
		columnFilterUI.$div.show();
		rowFilterUI.$div.hide();
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'columnFilter'
		});
	});
	rowFilterUI.$div.appendTo($filter);
	columnFilterUI.$div.appendTo($filter);
	columnFilterUI.$div.css('display', 'none');
	var $filterRadio = $filterChooser.find('[name=rowsOrColumns]');
	$filterRadio.on('change', function(e) {
		var val = $filterRadio.filter(':checked').val();
		if (val === 'columns') {
			columnFilterUI.$div.show();
			rowFilterUI.$div.hide();
		} else {
			columnFilterUI.$div.hide();
			rowFilterUI.$div.show();
		}
		e.preventDefault();
	});
	$el.find('[name=filterButton]').on('click', function() {
		$filterModal.modal('show');
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'filter'
		});
	});
	$el.find('[data-toggle="tooltip"]').tooltip({
		placement : 'bottom',
		container : 'body',
		trigger : 'hover'
	}).on('click', function() {
		$(this).tooltip('hide');
	});
	var $key = $el.find('[name=key]');
	var $keyContent = $el.find('[name=keyContent]');
	$key.dropdown().parent().on('show.bs.dropdown', function() {
		new morpheus.HeatMapColorSchemeLegend(controller, $keyContent);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'colorKey'
		});
	});
	$el.find('[name=openFile]').on('click', function() {
		morpheus.HeatMap.showTool(new morpheus.OpenFileTool({
			customUrls : controller._customUrls
		}), controller);
	});
	$el.find('[name=saveImage]').on('click', function() {
		morpheus.HeatMap.showTool(new morpheus.SaveImageTool(), controller);
	});
	$el.find('[name=saveDataset]').on('click', function() {
		morpheus.HeatMap.showTool(new morpheus.SaveDatasetTool(), controller);
	});
	$el.find('[name=chart]').on(
			'click',
			function() {
				new morpheus.ChartTool2({
					project : controller.getProject(),
					getVisibleTrackNames : _.bind(
							controller.getVisibleTrackNames, controller)
				});
				morpheus.Util.trackEvent({
					eventCategory : 'ToolBar',
					eventAction : 'chart'
				});
			});

	var _this = this;
	$el
			.find('[name=tutorial]')
			.on(
					'click',
					function() {
						window
								.open('http://www.broadinstitute.org/cancer/software/morpheus/tutorial.html');
						morpheus.Util.trackEvent({
							eventCategory : 'ToolBar',
							eventAction : 'tutorial'
						});
					});

	this.$previousColumnMatch = $el.find('[name=previousColumnMatch]');
	this.$nextColumnMatch = $el.find('[name=nextColumnMatch]');
	this.$previousRowMatch = $el.find('[name=previousRowMatch]');
	this.$nextRowMatch = $el.find('[name=nextRowMatch]');
	this.$dimensionsLabel = $el.find('[name=dim]');
	this.$columnTextField = $el.find('[name=searchColumns]');
	this.$valueTextField = $el.find('[name=searchValues]');
	this.$selectionLabel = $el.find('[name=selection]');
	this.$rowTextField = $el.find('[name=searchRows]');
	this.$columnMatchesToTop = $el.find('[name=columnMatchesToTop]');
	this.$rowMatchesToTop = $el.find('[name=rowMatchesToTop]');
	this.$rowSearchDiv = $el.find('[name=rowSearchDiv]');
	this.$columnSearchDiv = $el.find('[name=columnSearchDiv]');
	this.$searchRowDendrogramWrapper = $el
			.find('[name=searchRowDendrogramWrapper]');
	this.$searchRowDendrogram = $el.find('[name=searchRowDendrogram]');
	this.$searchResultsRowDendrogram = $el
			.find('[name=searchResultsRowDendrogram]');
	this.$searchColumnDendrogramWrapper = $el
			.find('[name=searchColumnDendrogramWrapper]');
	this.$searchColumnDendrogram = $el.find('[name=searchColumnDendrogram]');
	this.$searchResultsColumnDendrogram = $el
			.find('[name=searchResultsColumnDendrogram]');
	controller.on('dendrogramAnnotated', function(e) {
		(e.isColumns ? _this.$searchColumnDendrogramWrapper
				: _this.$searchRowDendrogramWrapper).show();
	});
	controller.on('dendrogramChanged', function(e) {
		(e.isColumns ? _this.$searchColumnDendrogramWrapper
				: _this.$searchRowDendrogramWrapper).hide();
	});
	var project = controller.getProject();

	morpheus.Util.autosuggest({
		$el : this.$rowTextField,
		filter : function(terms, cb) {
			var indices = [];
			var meta = project.getSortedFilteredDataset().getRowMetadata();
			controller.getVisibleTrackNames(false).forEach(function(name) {
				indices.push(morpheus.MetadataUtil.indexOf(meta, name));
			});
			meta = new morpheus.MetadataModelColumnView(meta, indices);
			morpheus.MetadataUtil.autocomplete(meta)(terms, cb);
		},
		select : function() {
			_this.search(true);
		}
	});

	this.$rowTextField.on('keyup', _.debounce(function(e) {
		if (e.which === 13) {
			e.preventDefault();
		}
		_this.search(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'searchRows'
		});
	}, 500));
	morpheus.Util.autosuggest({
		$el : this.$columnTextField,
		filter : function(terms, cb) {
			var indices = [];
			var meta = project.getSortedFilteredDataset().getColumnMetadata();
			controller.getVisibleTrackNames(true).forEach(function(name) {
				indices.push(morpheus.MetadataUtil.indexOf(meta, name));
			});
			meta = new morpheus.MetadataModelColumnView(meta, indices);
			morpheus.MetadataUtil.autocomplete(meta)(terms, cb);
		},
		select : function() {
			_this.search(false);
		}
	});
	this.$columnTextField.on('keyup', _.debounce(function(e) {
		if (e.which === 13) {
			e.preventDefault();
		}
		_this.search(false);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'searchColumns'
		});
	}, 500));

	// TODO combine search with autocomplete
	this.$searchRowDendrogram.on('keyup', _.debounce(function(e) {
		if (e.which === 13) {
			// _this.$searchRowDendrogram.autocomplete('close');
			e.preventDefault();
		}
		_this.searchDendrogram(false);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'searchRowDendrogram'
		});
	}, 500));
	this.$searchColumnDendrogram.on('keyup', _.debounce(function(e) {
		if (e.which === 13) {
			// _this.$searchColumnDendrogram.autocomplete('close');
			e.preventDefault();
		}
		_this.searchDendrogram(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'searchColumnDendrogram'
		});
	}, 500));

	morpheus.Util.autocomplete(this.$valueTextField, function(term, cb) {
		var values = new morpheus.Set();
		morpheus.DatasetUtil.searchValues(project.getSortedFilteredDataset(), $
				.trim(_this.$valueTextField.val()), function(value, i, j) {
			values.add(value);
			if (values.size() === 3) {
				return false;
			}
		});

		cb(values.values().map(function(val) {
			return {
				value : val
			};
		}));

	}, function() {

	});
	this.$valueTextField.on('keyup', _.debounce(function(e) {
		if (e.which === 13) {
			_this.$valueTextField.autocomplete('close');
			e.preventDefault();
		}
		var $searchResultsLabel = _this.$el.find('[name=searchResultsValues]');

		var text = $.trim(_this.$valueTextField.val());
		if (text === '') {
			$searchResultsLabel.html('');
			project.getElementSelectionModel().setViewIndices(null);
		} else {
			var viewIndices = new morpheus.Set();
			morpheus.DatasetUtil.searchValues(project
					.getSortedFilteredDataset(), text, function(value, i, j) {
				viewIndices.add(new morpheus.Identifier([ i, j ]));
			});
			project.getElementSelectionModel().setViewIndices(viewIndices);
			$searchResultsLabel.html(viewIndices.size() + ' match'
					+ (viewIndices.size() === 1 ? '' : 'es'));
		}

	}, 500));

	$toolbarForm.on('submit', function(e) {
		e.preventDefault();
	});
	$toolbarForm.on('click', '[name=in]', function(e) {
		e.preventDefault();
		controller.zoom(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'zoomIn'
		});
	});
	$toolbarForm.on('click', '[name=out]', function(e) {
		e.preventDefault();
		controller.zoom(false);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'zoomOut'
		});
	});
	$toolbarForm.on('click', '[name=options]', function(e) {
		e.preventDefault();
		controller.showOptions();
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'options'
		});
	});
	$toolbarForm.on('click', '[name=sort]', function(e) {
		e.preventDefault();
		new morpheus.SortDialog(project);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'sort'
		});
	});
	$toolbarForm.on('click', '[name=fit]', function(e) {
		e.preventDefault();
		controller.fitToWindow(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'fit'
		});
	});
	$toolbarForm.on('click', '[name=resetZoom]', function(e) {
		e.preventDefault();
		controller.resetZoom();
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'resetZoom'
		});
	});
	this.$el = $el;
	var updateFilterStatus = function() {
		if (controller.getProject().getRowFilter().isEnabled()
				|| controller.getProject().getColumnFilter().isEnabled()) {
			_this.$el.find('[name=filterButton]').addClass('btn-primary');
		} else {
			_this.$el.find('[name=filterButton]').removeClass('btn-primary');
		}

	};
	updateFilterStatus();

	this.$columnMatchesToTop
			.on(
					'click',
					function(e) {
						e.preventDefault();
						var $this = $(this);
						$this.toggleClass('btn-primary');
						var sortKeys = project.getColumnSortKeys();
						// clear existing sort keys except dendrogram
						sortKeys = sortKeys
								.filter(function(key) {
									return (key instanceof morpheus.SpecifiedModelSortOrder && key.name === 'dendrogram');
								});
						if ($this.hasClass('btn-primary')) {
							var key = new morpheus.MatchesOnTopSortKey(project,
									_this.columnSearchResultModelIndices,
									'matches on top');
							sortKeys.splice(0, 0, key);
							controller.scrollLeft(0);
						}
						_this.searching = true;
						project.setColumnSortKeys(sortKeys, true);
						_this._updateSearchIndices(true);
						_this.searching = false;
						morpheus.Util.trackEvent({
							eventCategory : 'ToolBar',
							eventAction : 'columnMatchesToTop'
						});
					});
	this.$rowMatchesToTop
			.on(
					'click',
					function(e) {
						e.preventDefault();
						var $this = $(this);
						$this.toggleClass('btn-primary');
						var sortKeys = project.getRowSortKeys();
						// clear existing sort keys except
						// dendrogram
						sortKeys = sortKeys
								.filter(function(key) {
									return (key instanceof morpheus.SpecifiedModelSortOrder && key.name === 'dendrogram');
								});
						if ($this.hasClass('btn-primary')) {
							var key = new morpheus.MatchesOnTopSortKey(project,
									_this.rowSearchResultModelIndices,
									'matches on top');
							sortKeys.splice(0, 0, key);
							controller.scrollTop(0);
						}
						_this.searching = true;
						project.setRowSortKeys(sortKeys, true);
						_this._updateSearchIndices(false);
						_this.searching = false;
						morpheus.Util.trackEvent({
							eventCategory : 'ToolBar',
							eventAction : 'rowMatchesToTop'
						});
					});
	project.on('rowSortOrderChanged.morpheus', function(e) {
		if (_this.searching) {
			return;
		}
		_this._updateSearchIndices(false);
		_this.$rowMatchesToTop.removeClass('btn-primary');
	});

	project.on('columnSortOrderChanged.morpheus', function(e) {
		if (_this.searching) {
			return;
		}
		_this._updateSearchIndices(true);
		_this.$columnMatchesToTop.removeClass('btn-primary');
	});

	controller.getProject().on('rowFilterChanged.morpheus', function(e) {
		_this.search(true);
		updateFilterStatus();
	});
	controller.getProject().on('columnFilterChanged.morpheus', function(e) {
		_this.search(false);
		updateFilterStatus();
	});
	controller.getProject().on('datasetChanged.morpheus', function() {
		_this.search(true);
		_this.search(false);
		updateFilterStatus();
	});
	controller.getProject().getRowSelectionModel().on(
			'selectionChanged.morpheus', function() {
				_this.updateSelectionLabel();
			});
	controller.getProject().getColumnSelectionModel().on(
			'selectionChanged.morpheus', function() {
				_this.updateSelectionLabel();
			});
	this.rowSearchResultViewIndicesSorted = null;
	this.currentRowSearchIndex = 0;
	this.columnSearchResultViewIndicesSorted = null;
	this.currentColumnSearchIndex = -1;
	this.$previousColumnMatch
			.on(
					'click',
					function() {
						_this.currentColumnSearchIndex--;
						if (_this.currentColumnSearchIndex < 0) {
							_this.currentColumnSearchIndex = _this.columnSearchResultViewIndicesSorted.length - 1;
						}
						controller
								.scrollLeft(controller
										.getHeatMapElementComponent()
										.getColumnPositions()
										.getPosition(
												_this.columnSearchResultViewIndicesSorted[_this.currentColumnSearchIndex]));
						morpheus.Util.trackEvent({
							eventCategory : 'ToolBar',
							eventAction : 'previousColumnMatch'
						});
					});
	this.$previousRowMatch
			.on(
					'click',
					function() {
						_this.currentRowSearchIndex--;
						if (_this.currentRowSearchIndex < 0) {
							_this.currentRowSearchIndex = _this.rowSearchResultViewIndicesSorted.length - 1;
						}
						controller
								.scrollTop(controller
										.getHeatMapElementComponent()
										.getRowPositions()
										.getPosition(
												_this.rowSearchResultViewIndicesSorted[_this.currentRowSearchIndex]));
						morpheus.Util.trackEvent({
							eventCategory : 'ToolBar',
							eventAction : 'previousRowMatch'
						});
					});
	this.$nextColumnMatch.on('click', function() {
		_this.next(true);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'nextColumnMatch'
		});

	});
	this.$nextRowMatch.on('click', function() {
		_this.next(false);
		morpheus.Util.trackEvent({
			eventCategory : 'ToolBar',
			eventAction : 'nextRowMatch'
		});
	});
	this.updateDimensionsLabel();
	this.updateSelectionLabel();
};
morpheus.HeatMapToolBar.HIGHLIGHT_SEARCH_MODE = 0;
morpheus.HeatMapToolBar.FILTER_SEARCH_MODE = 1;
morpheus.HeatMapToolBar.MATCHES_TO_TOP_SEARCH_MODE = 2;
morpheus.HeatMapToolBar.SELECT_MATCHES_SEARCH_MODE = 3;
morpheus.HeatMapToolBar.prototype = {
	quickColumnFilter : false,
	searching : false,
	rowSearchMode : morpheus.HeatMapToolBar.SELECT_MATCHES_SEARCH_MODE,
	columnSearchMode : morpheus.HeatMapToolBar.SELECT_MATCHES_SEARCH_MODE,
	_updateSearchIndices : function(isColumns) {
		var project = this.controller.getProject();
		if (isColumns) {
			var viewIndices = [];
			var modelIndices = this.columnSearchResultModelIndices;
			for (var i = 0, length = modelIndices.length; i < length; i++) {
				var index = project
						.convertModelColumnIndexToView(modelIndices[i]);
				if (index !== -1) {
					viewIndices.push(index);
				}
			}
			viewIndices.sort(function(a, b) {
				return a < b ? -1 : 1;
			});
			this.columnSearchResultViewIndicesSorted = viewIndices;
			this.currentColumnSearchIndex = -1;
		} else {
			var viewIndices = [];
			var modelIndices = this.rowSearchResultModelIndices;
			for (var i = 0, length = modelIndices.length; i < length; i++) {
				var index = project.convertModelRowIndexToView(modelIndices[i]);
				if (index !== -1) {
					viewIndices.push(index);
				}
			}
			viewIndices.sort(function(a, b) {
				return a < b ? -1 : 1;
			});
			this.rowSearchResultViewIndicesSorted = viewIndices;
			this.currentRowSearchIndex = -1;
		}
	},
	next : function(isColumns) {
		var controller = this.controller;
		if (isColumns) {
			this.currentColumnSearchIndex++;
			if (this.currentColumnSearchIndex >= this.columnSearchResultViewIndicesSorted.length) {
				this.currentColumnSearchIndex = 0;
			}
			controller
					.scrollLeft(controller
							.getHeatMapElementComponent()
							.getColumnPositions()
							.getPosition(
									this.columnSearchResultViewIndicesSorted[this.currentColumnSearchIndex]));
		} else {
			this.currentRowSearchIndex++;
			if (this.currentRowSearchIndex >= this.rowSearchResultViewIndicesSorted.length) {
				this.currentRowSearchIndex = 0;
			}
			controller
					.scrollTop(controller
							.getHeatMapElementComponent()
							.getRowPositions()
							.getPosition(
									this.rowSearchResultViewIndicesSorted[this.currentRowSearchIndex]));
		}
	},
	setSearchText : function(options) {
		var $tf = options.isColumns ? this.$columnTextField
				: this.$rowTextField;
		var existing = options.append ? $.trim($tf.val()) : '';
		if (existing !== '') {
			existing += ' ';
		}
		if (options.onTop) {
			options.isColumns ? this.$columnMatchesToTop
					.addClass('btn-primary') : this.$rowMatchesToTop
					.addClass('btn-primary');

		}
		$tf.val(existing + options.text);
		this.search(!options.isColumns);
		if (options.scrollTo) {
			this.next(options.isColumns);
			// click next
		}
	},
	updateDimensionsLabel : function() {
		var p = this.controller.getProject();
		var d = p.getFullDataset();
		var f = p.getSortedFilteredDataset();
		var text = 'showing ' + morpheus.Util.intFormat(f.getRowCount())
				+ ' of ' + morpheus.Util.intFormat(d.getRowCount()) + ' rows, '
				+ morpheus.Util.intFormat(f.getColumnCount()) + ' of '
				+ morpheus.Util.intFormat(d.getColumnCount()) + ' columns';
		this.$dimensionsLabel.html(text);
	},
	updateSelectionLabel : function() {
		var nc = this.controller.getProject().getColumnSelectionModel().count();
		var nr = this.controller.getProject().getRowSelectionModel().count();
		var text = [];
		text.push(morpheus.Util.intFormat(nr) + ' row');
		if (nr !== 1) {
			text.push('s');
		}
		text.push(' selected, ');
		text.push(morpheus.Util.intFormat(nc) + ' column');
		if (nc !== 1) {
			text.push('s');
		}
		text.push(' selected');
		this.$selectionLabel.html(text.join(''));
	},
	searchDendrogram : function(isColumns) {
		var text = $.trim(isColumns ? this.$searchColumnDendrogram.val()
				: this.$searchRowDendrogram.val());
		var dendrogram = isColumns ? this.controller.columnDendrogram
				: this.controller.rowDendrogram;
		var $searchResults = isColumns ? this.$searchResultsColumnDendrogram
				: this.$searchResultsRowDendrogram;
		var matches = morpheus.AbstractDendrogram.search(
				dendrogram.tree.rootNode, text);
		if (matches === -1) {
			$searchResults.html('');
		} else {
			$searchResults.html(matches + ' match'
					+ (matches === 1 ? '' : 'es'));
		}
		if (matches <= 0) {
			var positions = isColumns ? this.controller
					.getHeatMapElementComponent().getColumnPositions()
					: this.controller.getHeatMapElementComponent()
							.getRowPositions();
			positions.setSquishedIndices(null);
			if (isColumns) {
				this.controller.getProject().setGroupColumns([], true);
			} else {
				this.controller.getProject().setGroupRows([], true);
			}
			positions.setSize(isColumns ? this.controller.getFitColumnSize()
					: this.controller.getFitRowSize());
		} else {
			morpheus.AbstractDendrogram.squishNonSearchedNodes(this.controller,
					isColumns);
		}
		this.controller.updateDataset(); // need to update spaces for group
		// by
		this.controller.revalidate();
	},
	search : function(isRows) {
		this.searching = true;
		var isMatchesOnTop = isRows ? this.$rowMatchesToTop
				.hasClass('btn-primary') : this.$columnMatchesToTop
				.hasClass('btn-primary');
		var controller = this.controller;
		var project = controller.getProject();

		var sortKeys = isRows ? project.getRowSortKeys() : project
				.getColumnSortKeys();
		var keyIndex = -1;
		for (var i = 0; i < sortKeys.length; i++) {
			if (sortKeys[i].toString() === 'matches on top') {
				keyIndex = i;
				break;
			}
		}
		if (keyIndex !== -1) {
			sortKeys.splice(keyIndex, 1);
		}

		var dataset = project.getSortedFilteredDataset();
		var $searchResultsLabel = this.$el.find('[name=searchResults'
				+ (isRows ? 'Rows' : 'Columns') + ']');
		var searchText = !isRows ? $.trim(this.$columnTextField.val()) : $
				.trim(this.$rowTextField.val());

		var metadata = isRows ? dataset.getRowMetadata() : dataset
				.getColumnMetadata();
		var visibleIndices = [];
		controller.getVisibleTrackNames(!isRows).forEach(function(name) {
			visibleIndices.push(morpheus.MetadataUtil.indexOf(metadata, name));
		});
		metadata = new morpheus.MetadataModelColumnView(metadata,
				visibleIndices);

		var searchResultViewIndices = morpheus.MetadataUtil.search({
			model : metadata,
			text : searchText,
			isColumns : !isRows,
			defaultMatchMode : isRows ? this.defaultRowMatchMode
					: this.defaultColumnMatchMode
		});
		if (searchText === '') {
			$searchResultsLabel.html('');
			if (isRows) {
				this.$rowSearchDiv.hide();
			} else {
				this.$columnSearchDiv.hide();
			}

		} else {
			$searchResultsLabel.html(searchResultViewIndices.length + ' match'
					+ (searchResultViewIndices.length === 1 ? '' : 'es'));
			if (isRows) {
				this.$rowSearchDiv.show();
			} else {
				this.$columnSearchDiv.show();
			}

		}

		var searchResultsModelIndices = [];
		if (searchResultViewIndices != null) {
			for (var i = 0, length = searchResultViewIndices.length; i < length; i++) {
				var viewIndex = searchResultViewIndices[i];
				searchResultsModelIndices.push(isRows ? project
						.convertViewRowIndexToModel(viewIndex) : project
						.convertViewColumnIndexToModel(viewIndex));
			}
		}

		if (searchResultViewIndices !== null && isMatchesOnTop) {
			var key = new morpheus.MatchesOnTopSortKey(project,
					searchResultsModelIndices, 'matches on top');
			sortKeys = sortKeys.filter(function(key) {
				return !(key instanceof morpheus.MatchesOnTopSortKey);
			});
			searchResultViewIndices = key.indices; // matching indices
			// are now on top
			// add to beginning of sort keys
			sortKeys.splice(0, 0, key);
			if (isRows) {
				project.setRowSortKeys(sortKeys, false);
			} else {
				project.setColumnSortKeys(sortKeys, false);
			}
		}
		var searchResultsViewIndicesSet = new morpheus.Set();
		if (searchResultViewIndices != null) {
			for (var i = 0, length = searchResultViewIndices.length; i < length; i++) {
				var viewIndex = searchResultViewIndices[i];
				searchResultsViewIndicesSet.add(viewIndex);
			}
		}
		if (searchResultViewIndices == null) {
			searchResultViewIndices = [];
		}

		if (isRows) {
			this.rowSearchResultModelIndices = searchResultsModelIndices;
			this.rowSearchResultViewIndicesSorted = searchResultViewIndices
					.sort(function(a, b) {
						return a < b ? -1 : 1;
					});
			this.currentRowSearchIndex = -1;

		} else {
			this.columnSearchResultModelIndices = searchResultsModelIndices;
			this.columnSearchResultViewIndicesSorted = searchResultViewIndices
					.sort(function(a, b) {
						return a < b ? -1 : 1;
					});
			this.currentColumnSearchIndex = -1;

		}
		// update selection
		(!isRows ? project.getColumnSelectionModel() : project
				.getRowSelectionModel()).setViewIndices(
				searchResultsViewIndicesSet, true);

		if (isMatchesOnTop) { // resort
			if (isRows) {
				project.setRowSortKeys(morpheus.SortKey.keepExistingSortKeys(
						sortKeys, project.getRowSortKeys()), true);
			} else {
				project.setColumnSortKeys(morpheus.SortKey
						.keepExistingSortKeys(sortKeys, project
								.getColumnSortKeys()), true);
			}
		}
		this.updateDimensionsLabel();
		this.updateSelectionLabel();
		this.searching = false;

	}
};
