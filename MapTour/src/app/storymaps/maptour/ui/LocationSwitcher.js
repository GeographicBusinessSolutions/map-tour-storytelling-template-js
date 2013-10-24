define(["esri/geometry",
        "dojo/topic"
        ],
		function(Geometry, topic){
	/**
	 * LocationSwitcher
	 * @class LocationSwitcher
	 *
	 * UI component that allows map to switch locations
	 *
	 */
	return function LocationSwitcher(selector)
	{
        // move this into config
        var LOCATIONS = [
            {
                label: "Auckland",
                extent: {
                    xmin: 1740000,
                    ymin: 5891288,
                    xmax: 1775500,
                    ymax: 5934402
                },
                startRecord: 0
            },
            {
                label: "Hamilton",
                extent: {
                    xmin: 1792510,
                    ymin: 5810746,
                    xmax: 1808326,
                    ymax: 5821204
                },
                startRecord: 80
            },
            {
                label: "Wellington",
                extent: {
                    xmin: 1746555,
                    ymin: 5423633,
                    xmax: 1766041,
                    ymax: 5448378
                },
                startRecord: 99
            },
            {
                label: "Christchurch",
                extent: {
                    xmin: 1559821,
                    ymin: 5177172,
                    xmax: 1577847,
                    ymax: 5193705
                },
                startRecord: 71
            },
            {
                label: "Dunedin",
                extent: {
                    xmin: 1404077,
                    ymin: 4913699,
                    xmax: 1408197,
                    ymax: 4918263
                },
                startRecord: 76
            }
        ];

        var locationArray;

        function comboboxChange() {

            var locationIndex = $(this).val();
            var thisLocation = locationArray[locationIndex];

             var extentVal = thisLocation.extent;
             extentVal.spatialReference = app.map.spatialReference;
             var extent = new Geometry.Extent(extentVal);

             console.log(extent.toJson());
             console.log(app.map.extent.toJson());

             topic.publish("CORE_UPDATE_EXTENT", extent);

            // when changing region, also set the selected record
            if (thisLocation.hasOwnProperty('startRecord')) {
                var i = thisLocation.startRecord;
                topic.publish("CAROUSEL_CLICK", i);
            }

        }

		function init()
		{
            locationArray = LOCATIONS;

            // create combobox from config
            var combobox = $("<select id='locationSwitcher'></select>");

            $.each(locationArray, function (index, location) {
                var option = $("<option />");
                option.attr("value", index);
                option.html(location.label);
                combobox.append(option);
            });
            // add change listener to set map extent
            console.log(locationArray);
            combobox.change(comboboxChange);

            var wrapper = $(selector);
            wrapper.append(combobox);

		}

		function update()
		{

		}

		return {
			init: init,
			update: update
		};
	};
});