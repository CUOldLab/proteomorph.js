morpheus.HeatMapTooltipProvider = function(heatMap, rowIndex, columnIndex,
		options, separator, quick) {
	var dataset = heatMap.project.getSortedFilteredDataset();
	var tipText = [];
	if (!quick) {
		if (options.value) { // key value pairs for custom tooltip
			_.each(options.value, function(pair) {
				if (tipText.length > 0) {
					tipText.push(separator);
				}
				tipText.push(pair.name);
				tipText.push(': <b>');
				if (_.isArray(pair.value)) {
					for (var i = 0; i < pair.value.length; i++) {
						if (i > 0) {
							tipText.push(', ');
						}
						tipText.push(pair.value[i]);
					}
				} else {
					tipText.push(pair.value);
				}
				tipText.push('</b>');
			});
		}
	}
	if (rowIndex !== -1 && columnIndex !== -1) {
		for (var i = 0, nseries = dataset.getSeriesCount(); i < nseries; i++) {
			morpheus.HeatMapTooltipProvider._matrixValueToString(dataset,
					rowIndex, columnIndex, i, tipText, separator,
					options.showSeriesNameInTooltip);
		}
		if (quick) {
			var quickRowTracks = heatMap.rowTracks.filter(function(t) {
				return t.settings.inlineTooltip;
			});
			morpheus.HeatMapTooltipProvider._tracksToString(options,
					quickRowTracks, dataset.getRowMetadata(), rowIndex,
					tipText, separator);

//			if (quickRowTracks.length > 0) {
//				tipText
//						.push('<div style="height:1px;background-color:LightGrey;"></div>');
//			}
			morpheus.HeatMapTooltipProvider._tracksToString(options,
					heatMap.columnTracks.filter(function(t) {
						return t.settings.inlineTooltip;
					}), dataset.getColumnMetadata(), columnIndex, tipText,
					separator);

		}
	}

	if (!quick) {
		if (rowIndex !== -1) {
			morpheus.HeatMapTooltipProvider._metadataToString(options,
					heatMap.rowTracks, dataset.getRowMetadata(), rowIndex,
					tipText, separator);
		}
		if (columnIndex !== -1) {
			morpheus.HeatMapTooltipProvider._metadataToString(options,
					heatMap.columnTracks, dataset.getColumnMetadata(),
					columnIndex, tipText, separator);
		}
	} else if (options.name != null) {
		var metadata = (rowIndex !== -1 ? dataset.getRowMetadata() : dataset
				.getColumnMetadata());
		var vector = metadata.getByName(options.name);
		var track = heatMap.getTrack(options.name, columnIndex !== -1);
		var colorByName = track != null ? track.settings.colorByField : null;
		var additionalVector = colorByName != null ? metadata
				.getByName(colorByName) : null;
		morpheus.HeatMapTooltipProvider.vectorToString(vector,
				rowIndex !== -1 ? rowIndex : columnIndex, tipText, separator,
				additionalVector);

	}
	var rowNodes = [];
	var columnNodes = [];
	var selectedRowNodes = [];
	var selectedColumnNodes = [];

	if (options.rowNodes) {
		rowNodes = options.rowNodes;
	}
	if (options.columnNodes) {
		columnNodes = options.columnNodes;
	}
	if (!quick) {
		if (heatMap.rowDendrogram) {
			selectedRowNodes = _
					.values(heatMap.rowDendrogram.selectedRootNodeIdToNode);
		}
		if (heatMap.columnDendrogram) {
			selectedColumnNodes = _
					.values(heatMap.columnDendrogram.selectedRootNodeIdToNode);
		}
		if (selectedRowNodes.length > 0 && rowNodes.length > 0) {
			var nodeIds = {};
			_.each(selectedRowNodes, function(n) {
				nodeIds[n.id] = true;
			});
			rowNodes = _.filter(rowNodes, function(n) {
				return nodeIds[n.id] === undefined;
			});
		}
		if (selectedColumnNodes.length > 0 && columnNodes.length > 0) {
			var nodeIds = {};
			_.each(selectedColumnNodes, function(n) {
				nodeIds[n.id] = true;
			});
			columnNodes = _.filter(columnNodes, function(n) {
				return nodeIds[n.id] === undefined;
			});
		}
	}
	morpheus.HeatMapTooltipProvider._nodesToString(tipText, rowNodes, null,
			separator);
	morpheus.HeatMapTooltipProvider._nodesToString(tipText, columnNodes, null,
			separator);
	if (!quick) {
		if (selectedRowNodes.length > 0) {
			morpheus.HeatMapTooltipProvider._nodesToString(tipText,
					selectedRowNodes, heatMap.rowDendrogram._selectedNodeColor,
					separator);
		}
		if (selectedColumnNodes.length > 0) {
			morpheus.HeatMapTooltipProvider._nodesToString(tipText,
					selectedColumnNodes,
					heatMap.columnDendrogram._selectedNodeColor, separator);
		}
	}
	return tipText.join('');
};

morpheus.HeatMapTooltipProvider._matrixValueToString = function(dataset,
		rowIndex, columnIndex, seriesIndex, tipText, separator,
		showSeriesNameInTooltip) {
	var val = dataset.getValue(rowIndex, columnIndex, seriesIndex);
	if (val != null) {
		if (val.toObject || !_.isNumber(val)) {
			var obj = val.toObject ? val.toObject() : val;
			var keys = _.keys(obj);
			_.each(keys, function(key) {
				if (key !== '__v') { // special value key
					var v = morpheus.Util.formatObject(obj[key]);
					if (tipText.length > 0) {
						tipText.push(separator);
					}
					tipText.push(key);
					tipText.push(': <b>');
					tipText.push(v);
					tipText.push('</b>');
				}
			});
		} else {
			if (tipText.length > 0) {
				tipText.push(separator);
			}

			if (showSeriesNameInTooltip) {
				tipText.push(dataset.getName(seriesIndex));
				tipText.push(': ');
			}
			tipText.push('<b>');
			tipText.push(morpheus.Util.nf(val));
			tipText.push('</b>');
		}
	}
};

morpheus.HeatMapTooltipProvider.vectorToString = function(vector, index,
		tipText, separator, additionalVector) {
	var arrayValueToString = function(arrayFieldName, arrayVal) {
		if (arrayVal != null) {
			if (arrayFieldName != null) {
				if (tipText.length > 0) {
					tipText.push(separator);
				}
				tipText.push(arrayFieldName); // e.g. PC3
			}
			if (arrayVal.toObject) {
				tipText.push(' ');
				var obj = arrayVal.toObject();
				var keys = _.keys(obj);
				_.each(keys, function(key) {
					var subVal = obj[key];
					if (subVal != null && subVal != '') {
						if (tipText.length > 0) {
							tipText.push(separator);
						}
						tipText.push(key);
						tipText.push(': <b>');
						tipText.push(morpheus.Util.formatObject(subVal));
						tipText.push('</b>');
					}
				});
			} else {
				tipText.push(': <b>');
				tipText.push(morpheus.Util.formatObject(arrayVal));
				tipText.push('</b>');
			}

		}
	};
	if (vector != null) {
		var primaryVal = vector.getValue(index);
		if (primaryVal != null && primaryVal != '') {
			var primaryFields = vector.getProperties().get(
					morpheus.VectorKeys.FIELDS);
			if (primaryFields != null) {
				var visibleFieldIndices = vector.getProperties().get(
						morpheus.VectorKeys.VISIBLE_FIELDS);
				if (visibleFieldIndices === undefined) {
					visibleFieldIndices = morpheus.Util
							.seq(primaryFields.length);
				}
				var additionalFieldNames = additionalVector != null ? additionalVector
						.getProperties().get(morpheus.VectorKeys.FIELDS)
						: null;
				var additionalVal = additionalFieldNames != null ? additionalVector
						.getValue(index)
						: null;
				if (tipText.length > 0) {
					tipText.push(separator);
				}
				tipText.push(vector.getName());
				for (var j = 0; j < visibleFieldIndices.length; j++) {
					arrayValueToString(primaryFields[visibleFieldIndices[j]],
							primaryVal[visibleFieldIndices[j]]);
				}

				if (additionalVal != null) {
					if (tipText.length > 0) {
						tipText.push(separator);
					}
					tipText.push(additionalVector.getName());
					for (var j = 0; j < visibleFieldIndices.length; j++) {
						arrayValueToString(
								additionalFieldNames[visibleFieldIndices[j]],
								additionalVal[visibleFieldIndices[j]]);
					}

				}
			} else {
				if (tipText.length > 0) {
					tipText.push(separator);
				}
				tipText.push(vector.getName());
				tipText.push(': <b>');
				tipText.push(morpheus.Util.formatObject(primaryVal));
				tipText.push('</b>');
			}

		}
	}
};
morpheus.HeatMapTooltipProvider._tracksToString = function(options, tracks,
		metadata, index, tipText, separator) {
	for (var i = 0; i < tracks.length; i++) {
		var vector = metadata.getByName(tracks[i].name);
		morpheus.HeatMapTooltipProvider.vectorToString(vector, index, tipText,
				separator);

	}
};
morpheus.HeatMapTooltipProvider._metadataToString = function(options, tracks,
		metadata, index, tipText, separator) {
	var filtered = [];
	for (var i = 0, ntracks = tracks.length; i < ntracks; i++) {
		var track = tracks[i];
		if ((track.isVisible() && track.isShowTooltip())) {
			if (tracks[i].name === options.name) {
				filtered.splice(0, 0, track);
			} else {
				filtered.push(track);
			}

		}
	}

	// show the vector that we're mousing over 1st

	morpheus.HeatMapTooltipProvider._tracksToString(options, filtered,
			metadata, index, tipText, separator);

};
morpheus.HeatMapTooltipProvider._nodesToString = function(tipText, nodes,
		color, separator) {
	var renderField = function(name, value) {
		if (value != null) {
			if (tipText.length > 0) {
				tipText.push(separator);
			}
			if (color) {
				tipText.push('<span style="color:' + color + '">');
			}
			tipText.push(name);
			tipText.push(': <b>');
			if (_.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					if (i > 0) {
						tipText.push(', ');
					}
					tipText.push(morpheus.Util.formatObject(value[i]));
				}
			} else {
				tipText.push(morpheus.Util.formatObject(value));
			}
			tipText.push('</b>');
			if (color) {
				tipText.push('</span>');
			}
		}
	};
	_.each(nodes, function(node) {
		if (node.info) {
			for ( var name in node.info) {
				var value = node.info[name];
				renderField(name, value);
			}
		}
		renderField('depth', node.depth);
		var nLeafNodes = 1 + Math.abs(node.maxIndex - node.minIndex);
		if (nLeafNodes > 0) {
			renderField('# of leaf nodes', nLeafNodes);
			// renderField('height', node.height);
		}
	});
};