# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


DEPTH = ..

include $(DEPTH)/config/autoconf.mk

XPIDLSRCS     = \
                nsIAnnealMail.idl  \
                nsIEnigMsgCompFields.idl  \
                nsIEnigMimeService.idl    \
                nsIEnigMimeHeaderSink.idl \
                nsIEnigMimeReadCallback.idl

all:
	../util/xptgen $(PYTHON) ./external $(DEPTH)/util $(DIST) $(XPIDLSRCS) 
	

clean:
	rm -rf _xpidlgen 
	rm -f $(DEPTH)/build/components/annealmail.xpt
