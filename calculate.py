def calc():

	betafile = open("C:\\cygwin_64\\home\\JadenCho\\ardupilot\\build\\sitl\\bin\\buffer.bin", "r")

	datafile = open("C:\\cygwin_64\\home\\JadenCho\\x-plane_calc\\nodeOutput.txt", "r")

	b = betafile.readline()
	d = datafile.readlines()

	beta = float(b)

	gspeedstrl = d[0]
	Yvelstrl = d[1]

	gspeedstr = gspeedstrl.split(', ')
	Yvelstr = Yvelstrl.split(', ')

	gspeed = gspeedstr[1].split('\n')
	Yvel = Yvelstr[1].split('\n')

	truegspeed = float(gspeed[0])
	trueYvel = float(Yvel[0])

	print(truegspeed)
	print(trueYvel)

	xlist = [truegspeed, trueYvel, beta]

	return xlist

