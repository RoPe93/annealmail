/*
The contents of this file are subject to the Mozilla Public
License Version 1.1 (the "MPL"); you may not use this file
except in compliance with the MPL. You may obtain a copy of
the MPL at http://www.mozilla.org/MPL/

Software distributed under the MPL is distributed on an "AS
IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
implied. See the MPL for the specific language governing
rights and limitations under the MPL.

The Original Code is Enigmail.

The Initial Developer of the Original Code is Ramalingam Saravanan.
Portions created by Ramalingam Saravanan <svn@xmlterm.org> are
Copyright (C) 2001 Ramalingam Saravanan. All Rights Reserved.

Contributor(s):
Patrick Brunschwig <patrick.brunschwig@gmx.net>

Alternatively, the contents of this file may be used under the
terms of the GNU General Public License (the "GPL"), in which case
the provisions of the GPL are applicable instead of
those above. If you wish to allow use of your version of this
file only under the terms of the GPL and not to allow
others to use your version of this file under the MPL, indicate
your decision by deleting the provisions above and replace them
with the notice and other provisions required by the GPL.
If you do not delete the provisions above, a recipient
may use your version of this file under either the MPL or the
GPL.
*/

// Uses: chrome://enigmail/content/enigmailCommon.js

// Initialize enigmailCommon
EnigInitCommon("columnOverlay");

var EnigmailColumnHandler = {
   getCellText:         function(row, col) {
      //get the message's header so that we can extract the reply to field
      var key = gDBView.getKeyAt(row);
      var hdr = gDBView.db.GetMsgHdrForKey(key);
      return this.getCellTextForHdr(hdr);
   },
   getSortStringForRow: function(hdr) {return this.getCellTextForHdr(hdr);},
   isString:            function() {return true;},
   getCellProperties:   function(row, col, props){},
   getRowProperties:    function(row, props){},
   getImageSrc:         function(row, col) {return null;},
   getSortLongForRow:   function(hdr) {return 0;},
   getCellTextForHdr:   function(hdr) {
      var statusFlags = hdr.getUint32Property("enigmail");
      if ((statusFlags & nsIEnigmail.GOOD_SIGNATURE) &&
          (statusFlags & nsIEnigmail.DECRYPTION_OKAY))
        return this.signedEncTxt;
      else if (statusFlags & nsIEnigmail.GOOD_SIGNATURE)
        return this.signedTxt;
      else if (statusFlags & nsIEnigmail.DECRYPTION_OKAY)
        return this.encryptedTxt;
      else
        return "";
   },
   signedTxt:           EnigGetString("msgViewColumn.signed"),
   signedEncTxt:        EnigGetString("msgViewColumn.signedEncrypted"),
   encryptedTxt:        EnigGetString("msgViewColumn.encrypted")
};

window.addEventListener("load", enigmailColumnOvlOnLoaded, false);

function enigmailColumnOvlOnLoaded() {
  var ObserverService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
  ObserverService.addObserver(EnigmailCreateDbObserver, "MsgCreateDBView", false);
}

var EnigmailCreateDbObserver = {
  // Components.interfaces.nsIObserver
  observe: function(aMsgFolder, aTopic, aData)
  {
     enigmailAddCustomColumnHandler();
  }
}

function enigmailAddCustomColumnHandler() {

   gDBView.addColumnHandler("enigmailStatusCol", EnigmailColumnHandler);
}
