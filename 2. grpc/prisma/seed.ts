import Photon, { MovieCreateInput } from '@generated/photon';
import { mcu } from '../data/mcu';
import { characters } from '../data/characters';

const movies = mcu.map((movie) => {
	const char = [];
	movie.ironMan &&
		char.push({
			create: characters[0]
		});
	movie.thor && char.push(characters[1]);
	movie.hulk && char.push(characters[2]);
	movie.blackPanther && char.push(characters[3]);
	movie.captainMarvel && char.push(characters[4]);
	movie.blackWidow && char.push(characters[5]);
	movie.nickFury && char.push(characters[6]);
	movie.spiderman && char.push(characters[7]);
	movie.guardiansOfGalaxy && char.push(characters[8]);
	movie.thanos && char.push(characters[9]);
	movie.drStrange && char.push(characters[10]);
	movie.captainAmerica && char.push(characters[11]);
	let res: any = {};
	for (var i = 0; i < char.length; i++) {
		res.create = char[i];
	}
	const m = {
		film: movie.film,
		releaseYear: movie.releaseYear,
		budget: movie.budget,
		runningTime: movie.runningTime,
		domesticGross: movie.domesticGross,
		weekendGross: movie.weekendGross,
		overseasGross: movie.overseasGross,
		worldwideGross: movie.worldwideGross
	};

	return char.length > 1 ? { ...m, characters: res } : m;
});
const photon = new Photon();

async function main() {
	const fs = require('fs');
	await fs.writeFileSync('./newthing.json', JSON.stringify(movies));
	const films = await movies.map(
		async (data) =>
			await photon.movies.create({
				data
			})
	);
	console.log({ films });
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await photon.disconnect();
	});
