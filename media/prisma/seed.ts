import Photon from '@generated/photon';

const photon = new Photon();

async function main() {
	await photon.tracks.create({
		data: {
			name: 'Nightmare',
			genre: {
				create: {
					name: 'Alt Metal'
				}
			},
			album: {
				create: {
					artist: {
						create: {
							name: 'Avenged Sevenfold'
						}
					},
					title: 'Nightmare',
					year: 2010
				}
			},
			composers: {
				set: ['M. Shadows', 'Zach Vengence', 'Synyster Gates', 'Johnny Christ']
			},
			mediaType: 'mp3',
			milliseconds: 376000
		}
	});
	await photon.tracks.create({
		data: {
			name: 'Boy With Luv',
			genre: {
				create: {
					name: 'k-pop funk'
				}
			},
			album: {
				create: {
					artist: {
						create: {
							name: 'BTS'
						}
					},
					title: 'Map of the Soul: Persona',
					year: 2019
				}
			},
			composers: {
				set: [
					'Pdogg ',
					'RM ',
					'Melanie Joy ',
					'Fontana Michel ',
					'"Lindgren" Schulz ',
					'"Hitman" Bang ',
					'Suga ',
					'Emily Weisband ',
					'J-Hope ',
					'Ashley Frangipane'
				]
			},
			mediaType: 'mp3',
			milliseconds: 226200
		}
	});
	await photon.tracks.create({
		data: {
			name: 'My Way',
			genre: {
				create: {
					name: 'Traditional pop, Jazz'
				}
			},
			album: {
				create: {
					artist: {
						create: {
							name: 'Frank Sinatra'
						}
					},
					title: 'My Way',
					year: 1969
				}
			},
			composers: {
				set: ['Claude François', 'Jacques Revaux', 'Paul Anka']
			},
			mediaType: 'mp3',
			milliseconds: 275000
		}
	});
	await photon.employees.create({
		data: {
			FirstName: 'Raj',
			LastName: 'Singh',
			BirthDate: '1992-07-11T07:00:00.000Z',
			City: 'Irvine',
			Country: 'USA',
			Address: '123 Baker St',
			Email: 'batman@gmail.com',
			HireDate: '2015-07-04T07:00:00.000Z',
			PostalCode: '92614',
			State: 'CA',
			Title: 'Co-founder & CEO',
			Phone: '888 888 8888',
			Fax: '888 888 8888',
			customer: {
				create: {
					FirstName: 'Will',
					LastName: 'Taormina',
					Address: '',
					City: '',
					Company: '',
					Country: 'USA',
					Email: 'willlio@gmail.com',
					Fax: '',
					Phone: '',
					PostalCode: '',
					State: 'CA'
				}
			}
		}
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await photon.disconnect();
	});
