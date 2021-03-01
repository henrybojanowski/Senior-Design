import matplotlib.pyplot as plt
import numpy as np
import re
# use ggplot style for more sophisticated visuals
plt.style.use('ggplot')

def live_plotter(x_vec,y1_data,line1,identifier='',pause_time=0.65):
    if line1==[]:
        # this is the call to matplotlib that allows dynamic plotting
        plt.ion()
        fig = plt.figure()
        ax = fig.add_subplot(111)
        # create a variable for the line so we can later update it
        line1, = ax.plot(x_vec,y1_data,'-o',alpha=0.8)        
        #update plot label/title
        plt.ylabel('Y Label')
        plt.title('Title: Beta Angle'.format(identifier))
        plt.show()
    
    # after the figure, axis, and line are created, we only need to update the y-data
    line1.set_ydata(y1_data)
    # adjust limits if new data goes beyond bounds
    if np.min(y1_data)<=line1.axes.get_ylim()[0] or np.max(y1_data)>=line1.axes.get_ylim()[1]:
        plt.ylim([np.min(y1_data)-np.std(y1_data),np.max(y1_data)+np.std(y1_data)])
    # this pauses the data so the figure/axis can catch up - the amount of pause can be altered above
    plt.pause(pause_time)
    
    # return line so we can update it again in the next iteration
    return line1

if __name__ == "__main__":
    size = 5
    x_vec = np.linspace(0,1,size+1)[0:-1]
    #print(x_vec)
    y_vec = np.zeros(len(x_vec))
    #print(y_vec)
    line1 = []

    while True:
        #rand_val = np.random.randn(1)
        file = open("C:\\FlyJus\\dev\\ardupilot\\build\\sitl\\bin\\buffer.bin", "r")
        s = file.readline()
        print(type(s))
        print(s)
        f = float(s)
        print(type(f))
        print(f)
        y_vec[-1] = f
        line1 = live_plotter(x_vec,y_vec,line1)
        y_vec = np.append(y_vec[1:],0.0)

        myfile = open('C:\\FlyJus\\dev\\ardupilot\\build\\sitl\\bin\\bufferJava.bin', "r")
        a = 'sim/flightmodel/forces/fnrml_aero'
        b = 'sim/flightmodel/forces/faxil_aero'
        c = 'sim/airfoils/afl_cl'
        d = 'sim/airfoils/afl_cd'
        e = 'sim/cockpit/autopilot/vertical_velocity'
        f = 'sim/flightmodel/misc/cl_overall'
        g = 'sim/flightmodel/misc/cd_overall'
        h = 'sim/flightmodel/position/local_x'
        ii = 'sim/flightmodel/position/local_y'
        jj = 'sim/flightmodel/position/local_z'
        k = 'sim/flightmodel/position/true_phi'
        l = 'sim/flightmodel/position/true_psi'
        m = 'sim/flightmodel/position/local_vx'
        n = 'sim/flightmodel/position/local_vy'
        o = 'sim/flightmodel/position/local_vz'
        p = 'sim/flightmodel/position/alpha'
        q = 'sim/flightmodel/position/groundspeed'
        r = 'sim/flightmodel/position/true_airspeed'

        #pre-allocate vectors for bufferJava (the data) and where datarefs stored
        dataarray = [] #for datarefs
        #betaarray = [] #for beta values
        fnrmal_match = []
        faxil_aero_match = []
        afl_cl_match = []
        afl_cd_match = []
        vertical_velocity_match = []
        cl_overall_match = []
        cd_overall_match = []
        local_x_match = []
        local_y_match = []
        local_z_match = []
        true_phi_match = []
        true_psi_match = []
        local_vx_match = []
        local_vy_match = []
        local_vz_match = []
        alpha_match = []
        groundspeed_match = []
        true_airspeed_match = []

        #temporarily store data in 'data' and we will append it to pre-allocated
        #dataarray
        data = myfile.readlines()
        for i in data:
            dataarray.append(i)
            #lets check which strings match the datarefs and append them to
            #corresponding pre-allocated vector
            if a == dataarray[0][0:len(a)]:
                fnrmal_match.append(dataarray)
                print(fnrmal_match)
            if b == dataarray[0][0:len(b)]:
                faxil_aero_match.append(dataarray)
                print(faxil_aero_match)
            if c == dataarray[0][0:len(c)]:
                afl_cl_match.append(dataarray)
                print(afl_cl_match)
            if d == dataarray[0][0:len(d)]:
                afl_cd_match.append(dataarray)
                print(afl_cd_match)
            if e == dataarray[0][0:len(e)]:
                vertical_velocity_match.append(dataarray)
                print(vertical_velocity_match)
            if f == dataarray[0][0:len(f)]:
                cl_overall_match.append(dataarray)
                print(cl_overall_match)
            if g == dataarray[0][0:len(g)]:
                cd_overall_match.append(dataarray)
                print(cd_overall_match)
            if h == dataarray[0][0:len(h)]:
                local_x_match.append(dataarray)
                print(local_x_match)
            if ii == dataarray[0][0:len(ii)]:
                local_y_match.append(dataarray)
                print(local_y_match)
            if jj == dataarray[0][0:len(jj)]:
                local_z_match.append(dataarray)
                print(local_z_match)
            if k == dataarray[0][0:len(k)]:
                true_phi_match.append(dataarray)
                print(true_phi_match)
            if l == dataarray[0][0:len(l)]:
                true_psi_match.append(dataarray)
                print(true_psi_match)
            if m == dataarray[0][0:len(m)]:
                local_vx_match.append(dataarray)
                print(local_vx_match)
            if n == dataarray[0][0:len(n)]:
                local_vy_match.append(dataarray)
                print(local_vy_match)
            if o == dataarray[0][0:len(o)]:
                local_vz_match.append(dataarray)
                print(local_vz_match)
            if p == dataarray[0][0:len(p)]:
                alpha_match.append(dataarray)
                print(alpha_match)
            if q == dataarray[0][0:len(q)]:
                groundspeed_match.append(dataarray)
                print(groundspeed_match)
            if r == dataarray[0][0:len(r)]:
                true_airspeed_match.append(dataarray)
                print(true_airspeed_match)