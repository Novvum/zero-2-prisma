import Photon from "@generated/photon";

const photon = new Photon();

async function main() {
  await photon.heroes.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      movies: {
        create: {
          title: "Join us for Prisma Day 2019 in Berlin",
          released: true
        }
      }
    }
  });
  await photon.heroes.create({
    data: {
      email: "bob@prisma.io",
      name: "Bob",
      movies: {
        create: [
          {
            title: "Subscribe to GraphQL Weekly for community news",
            released: true
          },
          {
            title: "Follow Prisma on Twitter",
            released: false
          }
        ]
      }
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
