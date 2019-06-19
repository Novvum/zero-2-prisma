const PROTO_PATH = __dirname + '/../service.proto';

import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
});
const { mcu } = grpc.loadPackageDefinition(packageDefinition) as any;

function main() {
	const client = new mcu.MCU(
		'localhost:50051',
		grpc.credentials.createInsecure()
	);

	client.filterMovies(
		{ searchString: 'Captain Marvel' },
		(err: any, response: any) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(response);
		}
	);
}

main();
