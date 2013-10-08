APPCFG = {
	//
	// UI
	//
	
	// Enable embed mode: disable header on desktop 
	// Can also be set through url parameter ?embed
	EMBED: false,
	
	// Header Logo
	HEADER_LOGO_URL: "resources/logo.png",
	HEADER_LOGO_TARGET: "http://www.gbs.co.nz/",
	// Header top right link
	HEADER_LINK_TEXT: "A GBS Story Map",
	HEADER_LINK_URL: "http://www.gbs.co.nz/",
	// Control display of Facebook and Twitter links
	HEADER_SOCIAL: {
		facebook: true,
		twitter: true,
		bitly: {
			enable: true,
			login: "esristorymaps",
			key: "R_14fc9f92e48f7c78c21db32bd01f7014"
		}
	},
	
	// Header, Picture Panel and Carousel colors
	COLORS: ["#444", "#797979", "#c2c2c2"],
	
	// Map popup colors
	POPUP_BACKGROUND_COLOR: "#444444", 
	POPUP_BORDER_COLOR: "#444444",
	POPUP_ARROW_COLOR: "#444444",
	
	MINIMUM_MAP_WIDTH: 450,
	TIMEOUT_VIEWER_LOAD: 12000,
	TIMEOUT_VIEWER_REQUEST: 8000,
	TIMEOUT_BUILDER_REQUEST: 20000,
	
	//
	// DATA
	//
	
	// Case insensitive prioritized list of fields name to be used
	FIELDS_CANDIDATE: {
		objectid: ['__objectid', 'objectid', 'id', 'fid'],
		name: ['name', 'title', 'name-short', 'name-long'],
		description: ['description', 'caption', 'snippet', 'comment'],
		color: ['icon_color', 'color', 'style'],
		pic_url: ['pic_url', 'url', 'pic', 'picture'],
		thumb_url: ['thumb_url', 'thumb', 'thumbnail']
	},
	
	// Pin has to be numbered from 1 to that value
	MAX_ALLOWED_POINTS: 99,
	// Ordered list of pin configuration (has to be lower case)
	PIN_CFG: {
		r: {
			iconPath: 'resources/markers/red/NumberIcon',
			// A css class that define the color to be used for the Desktop carousel and builder organize popup
			cssClass: 'number-red'
		},
		b: {
			iconPath: 'resources/markers/blue/NumberIconb',
			cssClass: 'number-blue'
		},
		g: {
			iconPath: 'resources/markers/green/NumberIcong',
			cssClass: 'number-green'
		},
		p: {
			iconPath: 'resources/markers/purple/IconPurple',
			cssClass: 'number-purple'
		}
	},
	// Default color
	PIN_DEFAULT_CFG: 'r',
	// Pin states
	ICON_CFG: {
		normal: {
			width: 22, 
			height: 28, 
			offsetX: 3,
			offsetY: 8,
			// Normal state has to define the clip information for mobile components
			clipRules: "clip: rect(0px, 22px, 22px, 0px); left: 13px; top: 13px; height:40px; width: 32px;"
		},
		hover: {
			width: 24,
			height: 30,
			offsetX: 3,
			offsetY: 8
		},
		selected: {
			width: 32,
			height: 40,
			offsetX: 3,
			offsetY: 11
		}
	},
	
	//
	// Builder
	//

	// Control the authorized data source (for initialization and import screen)
	AUTHORIZED_IMPORT_SOURCE: {
		// featureService is set to false in the app when the Map Tour is hosted 
		// on a Portal for ArcGIS instance 10.2 as that feature isn't supported yet
		featureService: true,
		flickr: true,
		facebook: true,
		picasa: true
	},
	
	// Online photo sharing services connection parameters
	FLICKR_API_KEY: "750b36a2ac65a72e03cf9cef06d79f45",
	// The Facebook ID is only valid on arcgis.com domain
	// If used on another domain, user will have an error in the Facebook popup after login
	// To use Facebook import on Portal for ArcGIS, create your own ID at https://developers.facebook.com/ 
	// or set AUTHORIZED_IMPORT_SOURCE.facebook to false
	FACEBOOK_APP_ID: "471023926309627",
	
	COLOR_SCHEMES:  [
		// COLORS is added as the first item at runtime
		{name: "Black", headerColor: "#000", middleColor: "#797979", footerColor: "#c2c2c2"},
		{name: "Blue", headerColor: "#0e3867", middleColor: "#5d6f89", footerColor: "#9096a9"},
		{name: "Green", headerColor: "#1a3606", middleColor: "#737c6c", footerColor: "#a8b09e"}
	],
	// Optional array of server that will leverage CORS (for developement or specific cross domain deployment)
	CORS_SERVER: ["glazou.esri.com:7777", "monoprice.esri.com", "story.maps.arcgis.com", "active.mapsdevext.arcgis.com"],
	
	// Edit those to set a custom sharing or proxy URL
	// You have to edit those only if your webmap is deployed on Portal for ArcGIS instance and if you are not deploying the template on the Portal webserver
	// If you are using ArcGIS Online or deploying the template on a Portal instance, you don't have to edit those URL
	DEFAULT_SHARING_URL: "//www.arcgis.com/sharing/content/items",
	//DEFAULT_SHARING_URL: "//portal.internal.com/arcgis/sharing/content/items",
	DEFAULT_PROXY_URL: "//www.arcgis.com/sharing/proxy"
	//DEFAULT_PROXY_URL: "//portal.internal.com/arcgis/sharing/proxy"
};