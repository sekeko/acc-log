const DEVICE_PATH = 'COM11';
const serial = chrome.serial;
const keys = [39,48,4,160,0,15,147,18,160,209,51,224,3,208,0,223,0];

/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function(buf) {
	var bufView = new Uint8Array(buf);

    switch(getCurrentDisplayName()){
        case "login":
            var numCedula = getValue(0,0,9,bufView);
            loginUser(numCedula);
            break;
        case "accesslog":
            break;
                }
	var numCedula = getValue(0,0,9,bufView);
	var primerApellido = getValue(9,9,26,bufView);
	var segundoApellido = getValue(1,35,26,bufView);
	var nombreCompleto = getValue(10,61,30,bufView);
	var genero = getValue(6,91,1,bufView);
	var fechaNacimiento = getValue(7,92,8,bufView);
	var fechaVencimiento = getValue(15,100,8,bufView);
	
};

var getNumeroCedula = function(bufView){
	var retunrNCedula = "";
	
	for (var i=0; i < 9; i++){
		retunrNCedula += String.fromCharCode( bufView[i] ^ keys[i] );
	}
	return retunrNCedula;
}

var getValue = function(startKeyIndex, startIndex, length, bufView){
	var returnValue = "";
	
	for (var i=0; i < length; i++){
		returnValue += String.fromCharCode( bufView[startIndex] ^ keys[startKeyIndex] );
		startKeyIndex++;
		startIndex++;
		if (startKeyIndex > 16){
			startKeyIndex = 0;
		}
	}
	return returnValue;
}

var toBinString = function (arr) {
    var uarr = new Uint8Array(arr);
    var strings = [], chunksize = 0xffff;
    // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
    for (var i=0; i*chunksize < uarr.length; i++){
        strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
    }
    return strings.join('');
}

var decodeCRcedula = function(array){
	
	var cedula, sAux ;
	
	for (var i = 0; i < array.length; i += 2) { 
		var char = (bytes[i] << 8) | (bytes[i + 1] & 0xff);
		if (i<110){
				if(i<11){
				}
		}
		/*
		c = array[i];
		if (i<110){
			if(i<11){
				sAux += String.fromCharCode(c);
			}
		}*/
	}
	return sAux;
}

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function(str) {
  var encodedString = unescape(encodeURIComponent(str));
  var bytes = new Uint8Array(encodedString.length);
  for (var i = 0; i < encodedString.length; ++i) {
    bytes[i] = encodedString.charCodeAt(i);
  }
  return bytes.buffer;
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var SerialConnection = function() {
  this.connectionId = -1;
  this.lineBuffer = "";
  this.boundOnReceive = this.onReceive.bind(this);
  this.boundOnReceiveError = this.onReceiveError.bind(this);
  this.onConnect = new chrome.Event();
  this.onReadLine = new chrome.Event();
  this.onError = new chrome.Event();
};

SerialConnection.prototype.onConnectComplete = function(connectionInfo) {
  if (!connectionInfo) {
    log("Connection failed.");
    return;
  }
  this.connectionId = connectionInfo.connectionId;
  chrome.serial.onReceive.addListener(this.boundOnReceive);
  chrome.serial.onReceiveError.addListener(this.boundOnReceiveError);
  this.onConnect.dispatch();
};

SerialConnection.prototype.onReceive = function(receiveInfo) {
  if (receiveInfo.connectionId !== this.connectionId) {
    return;
  }

  this.lineBuffer += ab2str(receiveInfo.data);
/*
  var index;
  while ((index = this.lineBuffer.indexOf('\n')) >= 0) {
    var line = this.lineBuffer.substr(0, index + 1);
    this.onReadLine.dispatch(line);
    this.lineBuffer = this.lineBuffer.substr(index + 1);
  }
    */
};

SerialConnection.prototype.onReceiveError = function(errorInfo) {
  if (errorInfo.connectionId === this.connectionId) {
    this.onError.dispatch(errorInfo.error);
  }
};

SerialConnection.prototype.connect = function(path) {
  serial.connect(path, this.onConnectComplete.bind(this))
};

SerialConnection.prototype.send = function(msg) {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }
  serial.send(this.connectionId, str2ab(msg), function() {});
};

SerialConnection.prototype.disconnect = function() {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }
  serial.disconnect(this.connectionId, function() {});
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var connection = new SerialConnection();

connection.onConnect.addListener(function() {
  log('connected to: ' + DEVICE_PATH);
  //connection.send("hello arduino");
});

connection.onReadLine.addListener(function(line) {
  log('read line: ' + line);
});

connection.connect(DEVICE_PATH);

function log(msg) {
  //var buffer = document.querySelector('#buffer');
  //buffer.innerHTML += msg + '<br/>';
  console.log(msg);
}
/*
var is_on = false;
document.querySelector('button').addEventListener('click', function() {
  is_on = !is_on;
  connection.send(is_on ? 'y' : 'n');
});

*/