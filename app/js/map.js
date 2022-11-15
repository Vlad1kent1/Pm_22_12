anychart.onDocumentReady(function () {
  // The data used in this sample can be obtained from the CDN
  // https://cdn.anychart.com/samples/maps-choropleth/world-governments-map/data.json
  anychart.data.loadJsonFile(
    'https://cdn.anychart.com/samples/maps-choropleth/world-governments-map/data.json',
    function (data) {
      var palette = anychart.palettes
        .distinctColors()
        .items([
          '#fff59d',
          '#fbc02d',
          '#ff8f00',
          '#ef6c00',
          '#bbdefb',
          '#64b5f6',
          '#42a5f5',
          '#1976d2',
          '#0097a7',
          '#00838f'
        ]);

      var governmentTypes = [
        'Single-party state',
        'Absolute monarchy',
        'Constitutional monarchy',
        'Presidential republic',
        'Parliamentary republic',
        'Presidential constitutional republic',
        'Parliamentary constitutional republic',
        'Semi-presidential republic',
        'Other'
        
      ];

      var dataSet = anychart.data.set(data);
      var countryGovernmentData = dataSet.mapAs();

      var filterConstructor = function (target) {
        return function (val) {
          if (target.toString() === 'Other') {
            return governmentTypes.indexOf(val) < 0;
          }
          return val === target;
        };
      };

      var map = anychart.map();
      map.palette(palette);

      var seriesCount = governmentTypes.length;
      for (var i = 0; i < seriesCount; i++) {
        var filteredData = countryGovernmentData.filter(
          'value',
          filterConstructor(governmentTypes[i])
        );
        var series = map.choropleth(filteredData);
        series
          .name(governmentTypes[i])
          .geoIdField('iso_a2')
          .stroke(anychart.color.darken(map.palette().itemAt(i)));
        series.hovered().fill(series.fill()).stroke(series.stroke());
      }

      map
        .geoData('anychart.maps.world')
        .labels(false)
        .interactivity({ selectionMode: 'none' });
      map
        .legend()
        .enabled(true)
        .position('right')
        .align('top')
        .itemsLayout('vertical')
        .padding(50, 0, 0, 20)
        .paginator(false);

      // set tooltip settings
      map
        .tooltip()
        .useHtml(true)
        .title({ fontColor: '#7c868e' })
        .titleFormat(function () {
          return this.name;
        })
        .format(function () {
          return (
            '<span style="color: #fff; font-size: 12px">' +
            this.value +
            '</span>'
          );
        });
      map
        .tooltip()
        .background()
        .enabled(true)
        .fill('#fff')
        .stroke('#c1c1c1')
        .corners(3)
        .cornerType('round');

      var legend = map.legend();
      var legendFlag = false;

      legend.listen('legendItemClick', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var clickedSeries = map.getSeries(e.itemIndex);
        var series;
        var i;
        if (clickedSeries.enabled() && legendFlag) {
          for (i = 0; i < seriesCount; i++) {
            if (i !== e.itemIndex) {
              series = map.getSeries(i);
              if (series) series.enabled(true);
            }
          }
          legendFlag = false;
        } else {
          for (i = 0; i < seriesCount; i++) {
            if (i !== e.itemIndex) {
              series = map.getSeries(i);
              if (series) series.enabled(false);
            }
          }
          legendFlag = true;
          clickedSeries.enabled(true);
        }
      });

      // create zoom controls
      var zoomController = anychart.ui.zoom();
      zoomController.render(map);

      // set container id for the chart
      map.container('container');
      // initiate chart drawing
      map.draw();
    }
  );
});