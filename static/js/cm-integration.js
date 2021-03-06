var PCtoJS = function(){};
var PCexe = function(){};

function cmIntegration(){
	// Set codemirror instances
	var myCodeMirrorPC = CodeMirror.fromTextArea(
		document.getElementById("PCt"),
		{
			mode: 'javascript',
			lineNumbers: true,
			readOnly: false,
			theme: 'ambiance'
		}
	);
	var myCodeMirrorJS = CodeMirror.fromTextArea(
		document.getElementById("JSt"),
		{
			mode: 'javascript',
			lineNumbers: true,
			readOnly: false,
			theme: 'ambiance'
		}
	);
	var myCodeMirrorCONSOLE = CodeMirror.fromTextArea(
		document.getElementById("CONSOLEt"),
		{
			mode: 'javascript',
			lineNumbers: false,
			readOnly: true
		}
	);
	// Atach PC change event
	myCodeMirrorPC.on("change", function(cm, change) {
		myCodeMirrorJS.getDoc().setValue(compile(myCodeMirrorPC.getValue()));
	});
	window.cms = {
		pc: myCodeMirrorPC,
		js: myCodeMirrorJS,
		c: myCodeMirrorCONSOLE
	};

	// Wrapper para llamadas al compilador
	PCtoJS = function(){
		myCodeMirrorJS.getDoc().setValue(compile(myCodeMirrorPC.getValue()));
	};

	// Wrapper para ejecución via web
	PCexe = function(){
		jailrun(myCodeMirrorJS.getValue(),function(msg){
			myCodeMirrorCONSOLE.getDoc().setValue(myCodeMirrorCONSOLE.getValue()+JSON.stringify(msg, null, '\t')+"\n");
		});
	};

	myCodeMirrorPC.getDoc().setValue(document.getElementById("PCt").value);
	PCtoJS();
	PCexe();
}