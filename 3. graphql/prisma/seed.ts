import Photon from "@generated/photon";

const photon = new Photon();

async function main() {
  await photon.heroes.create({
    data: {
      email: "captain.marvel@marvel.com",
      name: "Captain Marvel",
      movies: {
        create: {
          title: "Captain Marvel",
          description:
            "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.",
          released: true
        }
      }
    }
  });
  await photon.heroes.create({
    data: {
      email: "bob@marvel.com",
      name: "Bob",
      movies: {
        create: [
          {
            title: "Bob's World",
            released: true
          },
          {
            title: "Bob's World 2",
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
