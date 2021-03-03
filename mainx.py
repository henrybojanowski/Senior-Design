from calculate import *
from plot import *
def main(x_vec, y_vec,line1):

	power = calc()
	line1 = live_plotter(x_vec, y_vec, line1)

	#print(xlist)

	plist = [line1, power]

	return plist

if __name__ == "__main__":
	size = 5
	x_vec = np.linspace(0,1,size+1)[0:-1]
	#print(x_vec)
	y_vec = np.zeros(len(x_vec))
	#print(y_vec)
	line1 = []
	plist = main(x_vec, y_vec, line1)
	
	while True:
		y_vec[-1] = plist[1]
		plist = main(x_vec, y_vec, plist[0])
		y_vec = np.append(y_vec[1:],0.0)
