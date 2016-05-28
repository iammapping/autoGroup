var AutoGroup = require('./index');

var players = [
	{
		"player": "a",
		"score": 22
	},
	{
		"player": "b",
		"score": -9
	},
	{
		"player": "c",
		"score": 13
	},
	{
		"player": "d",
		"score": 17
	},
	{
		"player": "e",
		"score": 0
	},
	{
		"player": "f",
		"score": -11
	},
	{
		"player": "g",
		"score": -2
	}
];

// 分两组
console.log(JSON.stringify(new AutoGroup(players, 2).divide(), null, 2));

// 分三组
console.log(JSON.stringify(new AutoGroup(players, 3).divide(), null, 2));