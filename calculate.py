def calc(F, V):

	import math

	betafile = open("C:\\cygwin_64\\home\\JadenCho\\ardupilot\\build\\sitl\\bin\\buffer.bin", "r")

	datafile = open("C:\\cygwin_64\\home\\JadenCho\\x-plane_calc\\nodeOutput.txt", "r")

	b = betafile.readline()
	d = datafile.readlines()

	beta = float(b)

	if d == [] or b == []:
		Ft = F
		Vt = V
	else:

		gspeedstrl = d[0]
		Yvelstrl = d[1]
		force_upstrl = d[2]

		gspeedstr = gspeedstrl.split(', ')
		Yvelstr = Yvelstrl.split(', ')
		force_upstr = force_upstrl.split(', ')

		gspeed = gspeedstr[1].split('\n')
		Yvel = Yvelstr[1].split('\n')
		force_up = force_upstr[1].split('\n')

		truegspeed = float(gspeed[0])
		trueYvel = float(Yvel[0])
		trueforce_up = float(force_up[0])

		#print(truegspeed)
		#print(trueYvel)
		#print(trueforce_up)
		#print(beta)

		Ft = trueforce_up/math.sin(beta) #Units of N = Kg/ms^2

		Vt = truegspeed/math.cos(beta) #Units of m/s

	#print(Ft)
	#print(Vt)

	power = abs(Ft)*abs(Vt) #Units of Watts

	xlist = [power, Ft, Vt]

	return xlist

#if __name__ == "__main__":
#	main()
