/**
 * @param options.$el
 * @param options.items
 * @param options.columns
 */
morpheus.Table = function(options) {
	options = morpheus.Table.createOptions(options);
	this.options = options;
	if (!options.width) {
		options.width = options.$el.attr('class');
	}
	var _this = this;
	// var viewports = [ 'xs', 'sm', 'md', 'lg' ];
	// var widthTokens = options.width != null ? options.width.split(' ') : [];
	// var spec = {};
	// var widthFound = false;
	// widthTokens.forEach(function(t) {
	// if (t.indexOf('col-') === 0) {
	// var viewport = t.substring(4, 6);
	// var fraction = parseFloat(t.substring(7));
	// if (!isNaN(fraction)) {
	// spec[viewport] = fraction;
	// widthFound = true;
	// }
	// }
	// });

	var height = options.height;
	var $gridDiv = $('<div class="slick-table'
			+ (options.tableClass ? (' ' + options.tableClass) : '')
			+ '" style="width:' + options.fixedWidth + ';height:' + height
			+ '"></div>');

	this.$gridDiv = $gridDiv;
	$gridDiv.appendTo(options.$el);
	var columns = options.columns;
	this.columns = columns;
	var grid = new morpheus.Grid({
		gridOptions : {
			forceFitColumns : true,
			select : options.select,
			rowHeight : options.rowHeight,
			autoEdit : false,
			editable : false,
			autoHeight : options.height === 'auto',
			enableTextSelectionOnCells : true,
		},
		$el : $gridDiv,
		items : options.items,
		columns : columns
	});
	this.grid = grid;
	if (options.search) {
		var tableSearch = new morpheus.TableSearchUI();
		tableSearch.$el.prependTo(options.$el);
		tableSearch.setTable(this);
		this.tableSearch = tableSearch;
	}
	var collapsed = false;
	var resize = function() {
		if (!_this.options.responsive) {
			return;
		}
		var gridWidth;
		// if (widthFound) { // get size from fraction of window width
		// var width = document.body.clientWidth || $(window).width();
		// var viewportIndex = -1;
		// var viewportSize = morpheus.Util.viewPortSize();
		//
		// for (var i = viewports.length - 1; i >= 0; i--) {
		// if (viewportSize === viewports[i]) {
		// viewportIndex = i;
		// break;
		// }
		// }
		//
		// var fraction = 12;
		//
		// for (var i = viewportIndex; i >= 0; i--) {
		// var f = spec[viewports[i]];
		// if (f) {
		// fraction = f;
		// break;
		// }
		// }
		// fraction /= 12;
		// var gridWidth = parseInt(Math.floor(width * fraction - 30));
		//
		// } else {
		gridWidth = options.$el.width();
		// }

		$gridDiv.css('width', gridWidth + 'px');
		// if (options.responsiveHeight) {
		// var verticalPosition = _this.$gridDiv[0].getBoundingClientRect().top
		// + window.pageYOffset;
		// $gridDiv.css('height',
		// (document.body.clientHeight - verticalPosition) + 'px');
		// }
		if (!collapsed && gridWidth < options.collapseBreakpoint
				&& columns.length > 1) {
			collapsed = true;
			$gridDiv.addClass('slick-stacked');
			_this.grid.grid.getOptions().rowHeight = options.rowHeight
					* columns.length;
			// collapse
			_this.grid.grid
					.setColumns([ {
						id : 0,
						tooltip : function(item, value) {
							var html = [];
							for (var i = 0; i < columns.length; i++) {
								var text = columns[i].tooltip(item, columns[i]
										.getter(item));
								if (text != null && text !== '') {
									html.push(text);
								}
							}
							return html.join('<br />');
						},
						collapsed : true,
						getter : function(item) {
							return item;
						},
						formatter : function(row, cell, value, columnDef,
								dataContext) {
							var html = [];
							html
									.push('<div style="padding-top:2px;padding:bottom:2px;"">');
							if (options.rowHeader) { // e.g. render checkbox
								html.push(options.rowHeader(dataContext));
							}
							for (var i = 0; i < columns.length; i++) {
								if (i === 0) {
									html
											.push('<div style="font-weight:600;display:'
													+ (options.rowHeader ? 'inline-block'
															: 'block') + '">');
								} else {
									html.push('<div>');
								}

								var c = columns[i];
								var s = c.renderer(dataContext, c
										.getter(dataContext));
								html.push(s);
								html.push('</div>');
							}
							html.push('</div>');
							return html.join('');
						},
						sortable : false,
						name : ''
					} ]);
			$gridDiv.find('.slick-header').hide();
			_this.grid.grid.resizeCanvas();
			_this.grid.grid.invalidate();
		} else if (collapsed && gridWidth >= options.collapseBreakpoint) {
			$gridDiv.removeClass('slick-stacked');
			collapsed = false;
			if (options.showHeader) {
				$gridDiv.find('.slick-header').show();
			}
			_this.grid.grid.getOptions().rowHeight = options.rowHeight;
			_this.grid.grid.setColumns(columns);
			_this.grid.grid.resizeCanvas();
			if (options.select) {
				_this.grid.grid.setSelectedRows(_this.grid.grid
						.getSelectedRows());
			}
			_this.grid.grid.invalidate();
		} else {
			_this.grid.grid.resizeCanvas();
			_this.grid.grid.invalidate();
		}

	};
	if (!options.showHeader) {
		$gridDiv.find('.slick-header').hide();
	}
	if (options.responsive) {
		$(window).on('resize orientationchange', resize);
		$gridDiv.on('remove', function() {
			$(window).off('resize', resize);
		});
		resize();
	}
	this.resize = resize;
	if (options.columns.length > 1 && options.items != null
			&& options.items.length > 0) {
		this.setItems(options.items);
	}

};

morpheus.Table.defaultRenderer = function(item, value) {
	if (_.isNumber(value)) {
		return morpheus.Util.nf(value);
	} else if (morpheus.Util.isArray(value)) {
		var s = [];
		for (var i = 0, length = value.length; i < length; i++) {
			if (i > 0) {
				s.push(', ');
			}
			var val = value[i];
			s.push(value[i]);
		}
		return s.join('');
	} else {
		return '' + value;
	}
};

morpheus.Table.prototype = {

	setHeight : function(height) {
		this.options.height = height;
		if (height === 'auto') {
			this.$gridDiv.css('height', '');
			this.grid.grid.getOptions().autoHeight = true;
			this.grid.grid.setOptions(this.grid.grid.getOptions());

		} else {
			this.$gridDiv.css('height', height);
		}
		this.grid.grid.resizeCanvas();
		if (height === 'auto') {
			var height = this.getItems().length * this.options.rowHeight
					+ this.options.rowHeight;
			this.$gridDiv.find('.slick-viewport').css('height', height + 'px');
		}
		this.grid.grid.invalidate();

	},
	setSearchVisible : function(visible) {
		if (this.tableSearch) {
			if (!visible) {
				this.tableSearch.$el.hide();
			} else {
				this.tableSearch.$el.show();
			}
		}
	},
	search : function(text) {
		if (text === '') {
			this.grid.setFilter(null);
		} else {
			var columns = this.columns.filter(function(c) {
				return c.searchable;
			});
			var columnNameToColumn = new morpheus.Map();
			var columnNames = columns.map(function(c) {
				return c.name;
			});
			for (var i = 0; i < columnNames.length; i++) {
				columnNameToColumn.set(columnNames[i], columns[i]);
			}
			var tokens = morpheus.Util.getAutocompleteTokens(text);
			var predicates = morpheus.Util.createSearchPredicates({
				tokens : tokens,
				fields : columnNames
			});
			var filteredPredicates = [];
			for (var i = 0, npredicates = predicates.length; i < npredicates; i++) {
				var predicate = predicates[i];
				var filterColumnName = predicate.getField();
				if (filterColumnName != null) {
					var column = columnNameToColumn.get(filterColumnName);
					if (column) {
						predicate.column = column;
						filteredPredicates.push(predicate);
					}
				} else {
					filteredPredicates.push(predicate);
				}
			}
			predicates = filteredPredicates;

			this.grid
					.setFilter(function(item) {
						for (var p = 0; p < npredicates; p++) {
							var predicate = predicates[p];
							var searchColumns;
							if (predicate.column) {
								searchColumns = [ predicate.column ];
							} else {
								searchColumns = columns;
							}
							for (var j = 0, ncolumns = searchColumns.length; j < ncolumns; j++) {
								var value = searchColumns[j].getter(item);
								if (morpheus.Util.isArray(value)) {
									var nvalues = value.length;
									for (var i = 0; i < nvalues; i++) {
										if (predicate.accept(value[i])) {
											return true;
										}
									}
								} else {
									var predicate = predicates[p];
									if (predicate.accept(value)) {
										return true;
									}
								}
							}

						}

						return false;
					});
		}
	},
	getSelectedRows : function() {
		return this.grid.getSelectedRows();
	},
	getSelectedItems : function() {
		return this.grid.getSelectedItems();
	},
	getSelectedItem : function() {
		return this.grid.getSelectedItem();
	},
	setSelectedRows : function(rows) {
		this.grid.setSelectedRows(rows);
	},
	getItems : function(items) {
		return this.grid.getItems();
	},
	getAllItemCount : function() {
		return this.grid.getAllItemCount();
	},
	getFilteredItemCount : function() {
		return this.grid.getFilteredItemCount();
	},
	setFilter : function(f) {
		this.grid.setFilter(f);
	},
	setItems : function(items) {
		this.grid.setItems(items);
		this.grid.redraw();
		// TODO update height?
	},
	redraw : function() {
		this.grid.redraw();
	},
	/**
	 * @param evtStr
	 *            selectionChanged
	 */
	on : function(evtStr, handler) {
		this.grid.on(evtStr, handler);
	},
	off : function(evtStr, handler) {
		this.grid.off(evtStr, handler);
	},
	trigger : function(evtStr) {
		this.grid.trigger(evtStr);
	}
};

morpheus.Table.createOptions = function(options) {
	options = $.extend(true, {}, {
		items : [],
		height : '564px',
		collapseBreakpoint : 500,
		showHeader : true,
		select : true,
		rowHeader : null,
		responsive : true,
		fixedWidth : '320px'
	}, options);

	if (!options.columns) {
		options.columns = [ {
			name : ''
		} ];
	}
	var columns = [];
	options.columns.forEach(function(c, i) {
		var column = $.extend(true, {}, {
			id : i,
			tooltip : function(dataContext, value) {
				return morpheus.Table.defaultRenderer(dataContext, value);
			},
			formatter : function(row, cell, value, columnDef, dataContext) {
				return column.renderer(dataContext, value);
			},
			comparator : function(a, b) {
				var aNaN = (a == null || _.isNumber(a) && isNaN(a));
				var bNaN = (b == null || _.isNumber(b) && isNaN(b));
				if (aNaN && bNaN) {
					return 0;
				}
				if (aNaN) {
					return 1;
				}
				if (bNaN) {
					return -1;
				}
				if (a.toLowerCase) {
					a = a.toLowerCase();
				}
				if (b.toLowerCase) {
					b = b.toLowerCase();
				}

				return (a === b ? 0 : (a < b ? -1 : 1));
			},
			sortable : true,
			searchable : true,
			width : null,
			name : c.name,
			renderer : morpheus.Table.defaultRenderer
		}, c);

		if (!column.getter) {
			column.getter = column.field == null ? function(item) {
				return item;
			} : function(item) {
				return item[c.field];
			};
		}
		if (options.rowHeader && i === 0) {
			column.formatter = function(row, cell, value, columnDef,
					dataContext) {
				return options.rowHeader(dataContext)
						+ column.renderer(dataContext, value);
			};
		}
		columns.push(column);
	});

	options.columns = columns;
	if (options.columns.length === 1) {
		options.tableClass = 'slick-table-compact';
	} else {
		options.tableClass = 'slick-striped-table';// 'slick-bordered-table';
	}
	if (!options.rowHeight) {
		options.rowHeight = options.tableClass === 'slick-table-compact' ? 18
				: 20;
	}
	return options;
};

morpheus.TableSearchUI = function() {
	var _this = this;
	var html = [];
	html.push('<div name="searchDiv">');
	html.push('<form class="form">');
	html
			.push('<div class="form-group" style="max-width:525px; width:95%; margin:0px;">');

	html
			.push('<input name="search" type="text" class="form-control input-sm" placeholder="Search" autocomplete="off"></input>');

	html.push('<h6 name="searchResults" style="margin:0px;"></h6>');
	html.push('</div>');
	html.push('</form>');
	html.push('</div>');
	var $el = $(html.join(''));
	this.$el = $el;
	$el.find('form').on('submit', function(e) {
		e.preventDefault();
	});

	var $search = $el.find('[name=search]');
	var $searchResults = $el.find('[name=searchResults]');
	this.$searchResults = $searchResults;

	$search.on('keyup', _.debounce(function() {
		_this.table.search($.trim($(this).val()));
	}, 100));
	morpheus.Util
			.autosuggest({
				$el : $search,
				suggestWhenEmpty : false,
				filter : function(terms, response) {
					var q = $.trim(terms[terms.length - 1]);
					if (q === '') {
						response([]);
						return;
					}
					var set = new morpheus.Set();
					var regex = new RegExp('^' + q, 'i');
					var columns = _this.table.columns;
					var ncolumns = columns.length;
					var items = _this.table.getItems();
					var matches = [];
					for (var i = 0, nitems = items.length; i < nitems; i++) {
						var item = items[i];
						for (var j = 0; j < ncolumns; j++) {
							if (columns[j].searchable) {
								var field = columns[j].name;
								var showField = field && ncolumns > 1;
								var value = columns[j].getter(item);
								if (morpheus.Util.isArray(value)) {
									var nvalues = value.length;
									for (var k = 0; k < nvalues; k++) {
										var val = value[k];
										if (regex.test(val) && !set.has(val)) {
											set.add(val);
											matches
													.push({
														value : val,
														label : showField ? ('<span style="font-weight:300;">'
																+ field
																+ ':</span>'
																+ '<span style="font-weight:900;">'
																+ val + '</span>')
																: ('<span style="font-weight:900;">'
																		+ val + '</span>')
													});
										}
										if (matches.length === 10) {
											return response(matches);
										}
									}
								} else {
									if (regex.test(value) && !set.has(value)) {
										set.add(value);
										matches
												.push({
													value : value,
													label : showField ? ('<span style="font-weight:300;">'
															+ field
															+ ':</span>'
															+ '<span style="font-weight:900;">'
															+ value + '</span>')
															: ('<span style="font-weight:900;">'
																	+ value + '</span>')
												});
										if (matches.length === 10) {
											return response(matches);
										}
									}
								}
							}
						}
					}
					return response(matches);
				},
				select : function() {
					_this.table.search($.trim($search.val()));
				}
			});
};

morpheus.TableSearchUI.prototype = {
	updateSearchLabel : function() {
		var filteredCount = this.table.getFilteredItemCount();
		var text = '';
		if (filteredCount !== this.table.getAllItemCount()) {
			text += morpheus.Util.intFormat(filteredCount) + ' match'
					+ (filteredCount !== 1 ? 'es' : '');
		}
		this.$searchResults.html(text);
	},
	setTable : function(table) {
		this.table = table;
		var _this = this;
		if (!table.options.responsive) {
			this.$el.css('width', table.options.fixedWidth);
		}
		table.on('filter', function() {
			_this.updateSearchLabel();
		});

	}

};