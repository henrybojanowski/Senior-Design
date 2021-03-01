var ExtPlaneJs = require('extplanejs');
var fs = require('fs')
var ExtPlane = new ExtPlaneJs({
    host: '127.0.0.1',
    port: 51000,
    broadcast: true
});

ExtPlane.on('loaded', function(){

	ExtPlane.client.interval(0.33);

	// Subscribe to the airspeed
	ExtPlane.client.subscribe('sim/flightmodel/forces/fside_aero');
	ExtPlane.client.subscribe('sim/flightmodel/forces/fnrml_aero');
	ExtPlane.client.subscribe('sim/flightmodel/forces/faxil_aero');
	// Handle all data-ref changes
	ExtPlane.on('data-ref', function(data_ref, value){
		//EXAMPLE FUNCTION: if the speed is over 200kts turn on night vision
		if(data_ref == 'sim/flightmodel/forces/fside_aero' )
			console.log('Sideways forces: '+value*.224809+' lb ');
		else if(data_ref == 'sim/flightmodel/forces/fnrml_aero' )
			console.log('Upward forces: '+value*.224809+' lb ');
		else if(data_ref == 'sim/flightmodel/forces/faxil_aero' )
			console.log('Backward forces: '+value*.224809+' lb ');
		let writeStream = fs.createWriteStream('C:\\FlyJus\\dev\\ardupilot\\build\\sitl\\bin\\bufferJava.bin');
        writeStream.write(data_ref+' - '+value);
        writeStream.on('finish', () =>{
            console.log('wrote all data');
        });

	});

	
});
