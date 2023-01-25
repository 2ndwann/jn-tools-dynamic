const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const express = require("express");
const expressSanitizer = require('express-sanitizer');
const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(expressSanitizer());

app.get("/", (req, res) => {
	res.render('index');
});

// Translate feature
app.get("/translator", (req, res) => {
	if (req.sanitize(req.query.inputText)) {
		// Attempt to translate from Weskethian
		async function getResponse () {
			let response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: "Convert this text to a fantasy dialect of English, known as Weskethian Commonspeak.\n\nExample:\n“I’m a farmer.”\n“The mill is working.”\n“He told me the mill is running.”\n“Yes, I'm happy.”\n“That dog isn't clever!”\n“The mill wasn’t running yesterday.”\n\nOutput: \n“I’o’a farmer.”\n“The mill oyes working.”\n“He told me the mill oad running.”\n“Yes, i’o happy.”\n“That dog oyn’t clever!”\n“The mill oadn’t running yesterday.”\n\nAdditional vocabulary examples:\nRun (noun) ⇔ Small river,\nSageon (adjective, but can also be a noun) ⇔ Extremely old, but not ancient or prehistoric.\n      Example: “This wine is sageon!”\nSithe (noun)⇔ A distance of four chunks; 64 blocks.\nHalf (noun) ⇔ A distance of a little more than one block. \nHorse (noun) ⇔ A horse in Weskethian Commonspeak is slightly different than horses in English, as they mean all 4-legged animals that you can ride on. This means donkeys and mules are also “horses”. However horse may also refer to real horses if used in a sentence with donkeys and mules.\nSanking (noun) ⇔ A formal gathering, meeting or assembly (exception domestic council meeting such as Wesketh Council Meeting), where diplomacy between factions is discussed\nWyrcann (noun) ⇔ the construction, crafting, making, forging or production\nWyrn (verb) ⇔ To craft, make, forge, construct or produce.\nAiel/Aieles (proper noun) ⇔ The ones who lived in Norholt before the hobbits (the ildras)\nThe Gard (proper noun) ⇔ The entire world of Jehvnar. (Within the horizon of Wesketh) \nAacn (noun) ⇔ An oak\nMisril (noun) ⇔ Mithril\nQuarr (noun) ⇔ A mine or quarry.\nSigil (noun) ⇔ A very fine or valuable gem.\nGlorest (adjective) ⇔ Something old and immovable that is very prideful. (e.g. A mountain)\nFyrnes (adjective) ⇔ Extremely old, ancient and prehistoric. Something that has always oad.\nMirige (noun) ⇔ Someone sweet, kind or pleasant. \nWintered (noun) ⇔ Someone old, but still living. \nRufe (noun) ⇔ Red and golden\nFormous (adjective) ⇔  Beautiful, especially in a shining fasion.\nSmiking (adjective) ⇔ Beautiful. \nMoise (noun) ⇔ One of the three seasons in wesketh. Equivalent to spring and early/mid summer. \nMoin (idiom) ⇔ hey or good day\nOu ⇔ \ninformal: Can mean I, you (singular), he, she or it\nFormal: “the”, Ou Gard, Ou moisy mornin (Always capitalized)\nOum (pronoun) ⇔ Yours/Your/Its; possessive pronoun\nOume (pronoun) ⇔ Accusative and Dative of Ou. (me, her, him, us, them)\nGelba (noun) ⇔ yellow\nAgena (noun) ⇔ old\nThred (verb)  ⇔ to think. To thred alike means to be on the same page.\nPip (noun) ⇔ apple. Pip tree is an apple tree. One may say pips and pears.\nEn (conjunction) ⇔ and\t\nHoobit (idiom) ⇔ bless you\nMirigity (noun)  ⇔ The state of being Mirige\nGelfre (adj)  ⇔ Generous\nGelfrity (noun)  ⇔ Generosity\nRetta (noun)  ⇔ Letter\nRuthred (noun) ⇔ (Royal Game of Ur) \nAlternative : Thrufe (South Riding)\nArcoiean (adj) ⇔ Magic/Arcane\nd’(art) ⇔ (informal) The\n\n\"" + req.sanitize(req.query.inputText) +"\"",
				temperature: 0,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0.2,
				presence_penalty: 0,
			});
			
			let translatedText = response.data.choices[0].text; // The translated text
			
			res.render('translator', {translatedText: translatedText, inputText: req.sanitize(req.query.inputText)});
		}		
		getResponse();
	} else {
		res.render('translator');
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));