// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const buttonToWeb = 'To Website';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function openLink(highlightedWord, cursorSelection, button){
	const highlightedSlashed = highlightedWord.replace(/\./g, "/")

	if (cursorSelection == button) {
		const websiteToOpen = "https://first.wpi.edu/wpilib/allwpilib/docs/release/java/" + highlightedSlashed + ".html"
		vscode.env.openExternal(vscode.Uri.parse(websiteToOpen))
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Open Import Statement" is now active!');

	let disposable = vscode.commands.registerCommand('open-import-statement.openImportStatement', function () {
		vscode.window.showInformationMessage('Hello! Select your whole import statement (e.g. "edu.wpi.first.math.controller.PIDController") and run the extention');

		// Gets selection and defines it as a variable
		const editor = vscode.window.activeTextEditor;
		const cursorSelection = editor.selection;
		if (cursorSelection && !cursorSelection.isEmpty) {
			const selectionRange = new vscode.Range(cursorSelection.start.line, cursorSelection.start.character, cursorSelection.end.line, cursorSelection.end.character);
			const highlightedWord = editor.document.getText(selectionRange);

			// Creates a button for that import's documentation link
			vscode.window.showInformationMessage("Here:", buttonToWeb).then(cursorSelection => {openLink(highlightedWord, cursorSelection, buttonToWeb)});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
