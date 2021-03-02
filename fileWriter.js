var ExtPlaneJs = require('extplanejs');
fs = require('fs');

var ExtPlane = new ExtPlaneJs({
    host: '127.0.0.1',
    port: 51000,
    broadcast: true
});

var data = [];


ExtPlane.on('loaded', function(){

	ExtPlane.client.interval(0.33);

	// Subscribe to the airspeed
	ExtPlane.client.subscribe('sim/flightmodel/forces/fnrml_aero');
    ExtPlane.client.subscribe('sim/flightmodel/forces/faxil_aero');
    //ExtPlane.client.subscribe('sim/airfoils/afl_cl');
    //ExtPlane.client.subscribe('sim/airfoils/afl_cd');
    //ExtPlane.client.subscribe('sim/cockpit/autopilot/vertical_velocity');
    ExtPlane.client.subscribe('sim/flightmodel/misc/cl_overall');
    ExtPlane.client.subscribe('sim/flightmodel/misc/cd_overall');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_x');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_y');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_z');
    ExtPlane.client.subscribe('sim/flightmodel/position/true_phi');
    ExtPlane.client.subscribe('sim/flightmodel/position/true_psi');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_vx');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_vy');
    ExtPlane.client.subscribe('sim/flightmodel/position/local_vz');
    ExtPlane.client.subscribe('sim/flightmodel/position/alpha');
    ExtPlane.client.subscribe('sim/flightmodel/position/groundspeed');
    ExtPlane.client.subscribe('sim/flightmodel/position/true_airspeed');
	
	// Handle all data-ref changes
	ExtPlane.on('data-ref', function(data_ref, value){
		//EXAMPLE FUNCTION: if the speed is over 200kts turn on night vision
		//if(data_ref == 'sim/cockpit2/gauges/indicators/airspeed_kts_pilot' && value > 200)
		//	this.client.set('sim/cockpit/electrical/night_vision_on', 1);
		
		//else
		if (data_ref == 'sim/flightmodel/position/groundspeed') 	data[0] = value;
		if (data_ref == 'sim/flightmodel/position/local_vy') 		data[1] = value;
		
		fs.writeFile('nodeOutput.txt', 
		"sim/flightmodel/position/groundspeed, " + data[0] + "\n" +
		"sim/flightmodel/position/local_vy, " + data[1] + "\n"
		, function (err) {
  			if (err) return console.log(err);
  				console.log('file complete\n');
			});

	});

	
});
