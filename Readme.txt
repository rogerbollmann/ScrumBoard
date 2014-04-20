ScrumBoard

Beschreibung:
F�r das Scrum Board werden Backbone.js und Node.js eingesetzt. Die Tests werden automatisiert durch Jasmine ausgef�hrt und dargestellt. Mit dem Scrum Board ist es m�glich ein neuen Task zu erstellen und zu editieren. (leider funktioniert nur das editieren von Titel, jedoch hat es mal funktioniert). Zus�tzlich k�nnen die einzelnen Tasks auch gel�scht werden mit dem L�sch-Element. Dazu k�nnen die Tasks, wenn sie in Bearbeitung sind nach "In Progress" und falls sie fertig sind nach "Completed" verschoben werden und wieder zur�ck.

Backbone.js:
Backbone wird f�r das clientseitige erstellen von Model-View-Controller verwendet. Wobei in Backbone heissen diese Model-View-Collection.

REST API:
Ich habe die Vorhandene REST API auf meine Task angepasst und man kann nun mit /tasks die JSON Objekte anschauen.

Jasmine:
Um tests durchzuf�hren wird Jasmine verwendet.


Ausbaum�glichkeiten:
Nach ca. 20 Stunden arbeit wollte ich mich nicht mehr mit WebSocket besch�ftigen. Ich habe die vorhandene Todo-App von Ihnen verwendet und darum ist nun auch alles im Index.js. Dazu wollte ich nun auch nicht mehr die Zeit aufbringen um mich mit require.js auseinander setzen, damit ich den Code nun sch�n aufteilen k�nnte. Dazu m�chte ich noch erw�hnen, dass ich mich nicht besonders auf das Design konzentriert habe.