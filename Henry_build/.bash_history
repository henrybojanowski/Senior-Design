pwd
cd Documents
ls
cd .. 
ls
cd hboja/
ls
git clone https://github.com/ardupilot/ardupilot.git
cd ardupilot/
git submodule update --init --recursive
./waf list_boards
./waf configure --board MatekF765-Wing
pwd
ls
cd ardupilot/
ls
git clone https://github.com/ardupilot/ardupilot.git
git clone https://github.com/ardupilot/ardupilot.git
cd ardupilot/
git submodule update --init --recursive
pip install future
/usr/bin/python3.6 -m pip install --upgrade pip
clear
pip install future
./waf list_boards
./waf configure --board MatekF765-Wing
./waf plane
./waf configure --board sitl
./waf plane
