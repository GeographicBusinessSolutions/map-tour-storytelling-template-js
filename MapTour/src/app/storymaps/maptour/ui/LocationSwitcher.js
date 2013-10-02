define(["esri/geometry"
        ],
		function(Geometry){
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
                    xmin: 19392146.085744467,
                    ymin: -4480672.864064483,
                    xmax: 19528509.74420527,
                    ymax: -4366934.565976096
                }
            },
            {
                label: "Wellington",
                extent: {
                    xmin: 19392035.11870227,
                    ymin: -5107967.074494227,
                    xmax: 19528398.777163073,
                    ymax: -4994228.77640584
                }
            }
        ];

        var locationArray;

        function comboboxChange() {

             var extentIndex = $(this).val();
             var extentVal = locationArray[extentIndex].extent;
             extentVal.spatialReference = app.map.spatialReference;
             var extent = new Geometry.Extent(extentVal);

             console.log(extent.toJson());
             console.log(app.map.extent.toJson());

             dojo.publish("CORE_UPDATE_EXTENT", extent);

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