export default {
	generate(extraString) {
		const ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const ID_LENGTH = 12;
	
		var generatedChars = '';
		for(var i = 0; i < ID_LENGTH; i++) {
			generatedChars += ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length));
		}
	
		if(extraString !== undefined && extraString !== '') {
			generatedChars = extraString + generatedChars;
		}
	
		return generatedChars;
	}
}
// This ID generator generates 12 pseudorandom characters from the string of characters above
// For each task/note/project, I append the name or some characters from them to make a unique ID of 16 characters