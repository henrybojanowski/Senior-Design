from calculate import *
from plot import *
def main(x_vec, y_vec,line1, F, V):

	xlist = calc(F, V)
	line1 = live_plotter(x_vec, y_vec, line1)

	#print(xlist)

	plist = [line1, xlist]

	print("Power is: ", xlist[0])
	print("Force is: ", xlist[1])
	print("Velocity is: ", xlist[2])

	return plist

if __name__ == "__main__":
	size = 5
	x_vec = np.linspace(0,1,size+1)[0:-1]
	#print(x_vec)
	y_vec = np.zeros(len(x_vec))
	#print(y_vec)
	line1 = []
	plist = main(x_vec, y_vec, line1, 0, 0)
	
	while True:
		y_vec[-1] = plist[1][0]
		plist = main(x_vec, y_vec, plist[0], plist[1][1], plist[1][2])
		y_vec = np.append(y_vec[1:],0.0)
