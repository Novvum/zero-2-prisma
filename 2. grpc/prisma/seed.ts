import Photon from '@generated/photon';

const photon = new Photon();

async function main() {
	const capmarvel = await photon.heroes.create({
		data: {
			email: 'captain.marvel@marvel.com',
			name: 'Captain Marvel',
			movies: {
				create: {
					title: 'Captain Marvel',
					description:
						"Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.",
					released: true
				}
			}
		}
	});
	const ironman = await photon.heroes.create({
		data: {
			email: 'stark@starkindustries.com',
			name: 'Iron Man',
			movies: {
				create: {
					title: 'Iron Man',
					description:
						'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
					released: true
				}
			}
		}
	});
	console.log('Stored!', { ironman, capmarvel });
	return { ironman, capmarvel };
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await photon.disconnect();
	});
