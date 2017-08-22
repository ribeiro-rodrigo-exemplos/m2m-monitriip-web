var HashHack = {
  PREFIX: '#hhMessage=',
  aCallbacks: [],
  sLastHash: '',

  handleInterval: function() {
    var sHash = window.location.hash,
      sDecodedHash, sMessage, i;

    if (sHash !== HashHack.sLastHash) {
      // is it valid
      sDecodedHash = decodeURIComponent(sHash);

      if (0 === sDecodedHash.indexOf(HashHack.PREFIX)) {
        sMessage = sDecodedHash.replace(HashHack.PREFIX, '');
        localStorage.token = sMessage; 
      }
    }
  },

  init: function() {
    HashHack.handleInterval();
  },

  onMessage: function(fnCallback) {
    HashHack.aCallbacks.push(fnCallback);
  }
};
HashHack.init();