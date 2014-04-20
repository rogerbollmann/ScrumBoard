ScrumBoard

Beschreibung:
Für das Scrum Board werden Backbone.js und Node.js eingesetzt. Die Tests werden automatisiert durch Jasmine ausgeführt und dargestellt. Mit dem Scrum Board ist es möglich ein neuen Task zu erstellen und zu editieren. (leider funktioniert nur das editieren vom Titel, jedoch hat es mal für alle funktioniert). Zusätzlich können die einzelnen Tasks auch gelöscht werden mit dem Lösch-Element. Dazu können die Tasks, wenn sie in Bearbeitung sind nach "In Progress" und falls sie fertig sind nach "Completed" verschoben werden und wieder zurück.

Verwendung von Komponenten

Backbone.js:
Backbone wird für das clientseitige erstellen von Model-View-Controller verwendet. Wobei in Backbone heissen diese Model-View-Collection. Dazu wurde Underscore und jQuery als Dependency verwendet.

REST API:
Ich habe die Vorhandene REST API auf meine Task angepasst und man kann nun mit /tasks die JSON Objekte anschauen. Die Rest API wird verwendet um alle Task anzuzeigen.

Jasmine:
Um tests durchzuführen wird Jasmine verwendet.

Bootstrap:
CSS Framework




Ausbaumöglichkeiten:

Nach ca. 15 Stunden Arbeit habe ich mich nicht mehr mit WebSocket beschäftigen. Ich habe die vorhandene Todo-App von Ihnen verwendet und darum ist nun auch die ganze Logik im Index.js. Dazu konnte ich nun auch nicht mehr die Zeit aufbringen, um mich mit require.js auseinander zusetzen, damit ich den Code nun schön aufteilen könnte. Dazu möchte ich noch erwähnen, dass ich mich nicht besonders auf das Design konzentriert habe.