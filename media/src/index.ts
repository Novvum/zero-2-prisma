import { GraphQLServer } from 'graphql-yoga';
import { join } from 'path';
import { makeSchema, objectType, idArg, stringArg } from '@prisma/nexus';
import Photon from '@generated/photon';
import { Context } from './types';
import { nexusPrismaPlugin } from '@generated/nexus-prisma';

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
	photon: (ctx: Context) => ctx.photon
});

export const Artist = objectType({
	name: 'Artist',
	definition: (t) => {
		t.model.id();
		t.model.title();
		t.model.artist();
		t.model.year();
	}
});

export const Track = objectType({
	name: 'Track',
	definition: (t) => {
		t.model.id();
		t.model.name();
		t.model.album();
		t.model.mediaType();
		t.model.genre();
		t.model.composers();
		t.model.milliseconds();
		t.model.unitPrice();
		t.model.playlists();
	}
});

export const Genre = objectType({
	name: 'Genre',
	definition: (t) => {
		t.model.id();
		t.model.name();
		t.model.tracks();
	}
});

export const Album = objectType({
	name: 'Album',
	definition: (t) => {
		t.model.id();
		t.model.title();
		t.model.artist();
		t.model.year();
		t.model.tracks();
	}
});

const Query = objectType({
	name: 'Query',
	definition(t) {
		t.crud.findOneTrack({
			alias: 'track'
		});

		t.crud.findOneAlbum({
			alias: 'album'
		});

		t.crud.findOneArtist({
			alias: 'artist'
		});
	}
});

const Mutation = objectType({
	name: 'Mutation',
	definition(t) {
		t.boolean('_noop');
	}
});

const schema = makeSchema({
	types: [Query, Mutation, Track, Artist, Genre, Album, nexusPrisma],
	outputs: {
		typegen: join(__dirname, '../generated/nexus-typegen.ts'),
		schema: join(__dirname, '/schema.graphql')
	},
	typegenAutoConfig: {
		sources: [
			{
				source: '@generated/photon',
				alias: 'photon'
			},
			{
				source: join(__dirname, 'types.ts'),
				alias: 'ctx'
			}
		],
		contextType: 'ctx.Context'
	}
});

const server = new GraphQLServer({
	schema,
	context: { photon }
});

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`));
