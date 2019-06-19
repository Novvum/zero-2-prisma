import chalk from 'chalk';
const PROTO_PATH = __dirname + '/../service.proto';

import Photon from '@generated/photon';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const photon = new Photon({ debug: true });

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
});
const { mcu } = grpc.loadPackageDefinition(packageDefinition) as any;

// async function characters(call: any, callback: any) {
// 	const { id } = call.request;
// 	const character = await photon.characters.findOne({
// 		where: {
// 			id
// 		}
// 	});
// 	callback(null, character);
// }

// async function movie(call: any, callback: any) {
// 	const movies = await photon.movies.findMany({
// 		where: { film: 'Avengers' }
// 	});
// 	callback(null, { movies });
// }

async function filterMovies(call: any, callback: any) {
	const { searchString } = call.request;
	console.log(searchString);
	const filteredMovies = await photon.movies.findMany({
		where: {
			title: {
				contains: searchString
			}
		}
	});
	callback(null, { filteredMovies });
}

async function filterHeroes(call: any, callback: any) {
	const { searchString } = call.request;
	console.log(searchString);
	const filteredHeroes = await photon.heroes.findMany({
		where: {
			name: {
				contains: searchString
			}
		}
	});
	console.log(filteredHeroes);
	callback(null, { filteredHeroes });
}
const server = new grpc.Server();
server.addService(mcu.MCU.service, {
	filterMovies,
	filterHeroes
});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
const message = `
The gRPC server is being started on ${chalk.bold(
	`0.0.0.0:50051`
)}. You now can invoke any client script by its name, e.g.:

${chalk.bold(`$ npm run filterMovies`)}
or
${chalk.bold(`$ npm run filterHeroes`)}

See ${chalk.bold(
	`package.json`
)} for a list of all available scripts or use ${chalk.bold(
	`BloomRPC`
)} if you prefer a GUI client (download: ${chalk.bold(
	`https://github.com/uw-labs/bloomrpc`
)}).
`;
console.log(message);
server.start();
