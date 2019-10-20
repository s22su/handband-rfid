# HOW TO get it working

1. `cd ~/go/src` or `cd $GOPATH/src` depending on your setup
1. `git clone https://github.com/s22su/handband-rfid.git`
1. `cd handband-rfid`
1. `cp database/handband.example.db database/handband.db`
1. `dep ensure`
1. `npm install`
1. `bower install`
1. `npm run jsbuild`
1. `go build`
1. run `./handband-rfid`
1. go to [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser and enjoy
