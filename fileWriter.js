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
    	ExtPlane.client.subscribe('sim/flightmodel/forces/fnrml_prop');
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
  	
  	ExtPlane.client.subscribe('sim/cockpit/electrical/night_vision_on');
  	ExtPlane.client.subscribe('sim/operation/override/override_joystick');
  	ExtPlane.client.subscribe('sim/joystick/yoke_pitch_ratio');
  	ExtPlane.client.subscribe('sim/joystick/yoke_roll_ratio');
  	ExtPlane.client.subscribe('sim/joystick/yoke_heading_ratio');
  	
 
 	ExtPlane.client.subscribe('sim/flightmodel/engine/ENGN_thro');
 	//ExtPlane.client.subscribe('sim/cockpit/autopilot/current_altitude');
 	//ExtPlane.client.subscribe('sim/cockpit2/autopilot/altitude_hold_ft');
  	ExtPlane.client.subscribe('sim/cockpit/autopilot/autopilot_mode');
  	ExtPlane.client.subscribe('sim/cockpit/autopilot/altitude');
  	ExtPlane.client.subscribe('sim/cockpit/autopilot/airspeed');
  	//ExtPlane.client.subscribe('sim/cockpit2/autopilot/altitude_hold_armed');
  	//ExtPlane.client.subscribe('sim/operation/override/override_flight_control');
  	ExtPlane.client.subscribe('sim/cockpit/autopilot/vertical_velocity');
  	ExtPlane.client.subscribe('sim/cockpit/autopilot/autopilot_state');
  	
  	
	
	// Handle all data-ref changes
	var current_pitch_ratio = 0;
	var increasing = 1;
	
	ExtPlane.on('data-ref', function(data_ref, value){
		//this.client.set('sim/cockpit/electrical/night_vision_on', 1);
		this.client.set('sim/operation/override/override_joystick', 1);

		this.client.set('sim/joystick/yoke_pitch_ratio', 1);
		this.client.set('sim/joystick/yoke_roll_ratio', .5);
		this.client.set('sim/joystick/yoke_heading_ratio', .5);

		
		if (data_ref == 'sim/flightmodel/forces/fnrml_aero')		data[0] = value;
    		if (data_ref == 'sim/flightmodel/forces/faxil_aero')		data[1] = value;
    		if (data_ref == 'sim/flightmodel/forces/fnrml_prop')		data[2] = value;
   		if (data_ref == 'sim/flightmodel/misc/cl_overall')		data[3] = value;
   		if (data_ref == 'sim/flightmodel/misc/cd_overall')		data[4] = value;
  		if (data_ref == 'sim/flightmodel/position/local_x')		data[5] = value;
  		if (data_ref == 'sim/flightmodel/position/local_y')		data[6] = value;
  		if (data_ref == 'sim/flightmodel/position/local_z')		data[7] = value;
  		if (data_ref == 'sim/flightmodel/position/true_phi')		data[8] = value;
  		if (data_ref == 'sim/flightmodel/position/true_psi')		data[9] = value;
  		if (data_ref == 'sim/flightmodel/position/local_vx')		data[10] = value;
  		if (data_ref == 'sim/flightmodel/position/local_vy')		data[11] = value;
  		if (data_ref == 'sim/flightmodel/position/local_vz')		data[12] = value;
  		if (data_ref == 'sim/flightmodel/position/alpha')		data[13] = value;
  		if (data_ref == 'sim/flightmodel/position/groundspeed')		data[14] = value;
  		if (data_ref == 'sim/flightmodel/position/true_airspeed')	data[15] = value;
  		

		fs.writeFile('nodeOutput.txt', 
		"sim/flightmodel/forces/fnrml_aero, "		+ data[0] + "\n" +
    		"sim/flightmodel/forces/faxil_aero, "		+ data[1] + "\n" +
    		"sim/flightmodel/forces/fnrml_prop, "		+ data[2] + "\n" +
   		"sim/flightmodel/misc/cl_overall, "		+ data[3] + "\n" +
   		"sim/flightmodel/misc/cd_overall, "		+ data[4] + "\n" +
  		"sim/flightmodel/position/local_x, "		+ data[5] + "\n" +
  		"sim/flightmodel/position/local_y, "		+ data[6] + "\n" +
  		"sim/flightmodel/position/local_z, "		+ data[7] + "\n" +
  		"sim/flightmodel/position/true_phi, "		+ data[8] + "\n" +
  		"sim/flightmodel/position/true_psi, "		+ data[9] + "\n" +
  		"sim/flightmodel/position/local_vx, "		+ data[10] + "\n" +
  		"sim/flightmodel/position/local_vy, "		+ data[11] + "\n" +
  		"sim/flightmodel/position/local_vz, "		+ data[12] + "\n" +
  		"sim/flightmodel/position/alpha, "		+ data[13] + "\n" +
  		"sim/flightmodel/position/groundspeed, "	+ data[14] + "\n" +
  		"sim/flightmodel/position/true_airspeed, "	+ data[15] + "\n"
 
		, function (err) {
  			if (err) return console.log(err);
  				//console.log('file complete\n');
			});

	});

	
});
