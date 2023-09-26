const { faker } = require('@faker-js/faker');
('use strict');

const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];
const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert(
      'BoilerParts',
      [...Array(100)].map(() => {
        return {
          // firstName: 'John',
          // lastName: 'Doe',
          // email: 'example@example.com',
          // createdAt: new Date(),
          // updatedAt: new Date(),

          name: faker.lorem.sentence(2),
          boiler_manufacturer:
            boilerManufacturers[
              Math.floor(Math.random() * boilerManufacturers.length)
            ],
          price: faker.string.numeric(4),
          parts_manufacturer:
            partsManufacturers[
              Math.floor(Math.random() * partsManufacturers.length)
            ],
          vendor_code: faker.internet.password(),
          description: faker.lorem.sentence(10),
          images: JSON.stringify(
            [...Array(10)].map(
              () => `${faker.image.technics()}?random=${faker.datatype.uuid()}`,
            ),
          ),
          in_stock: faker.string.numeric(1),
          bestseller: faker.datatype.boolean(),
          new: faker.datatype.boolean(),
          popularity: faker.string.numeric(3),
          compatibility: faker.lorem.sentence(3),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('BoilerParts', null, {});
  },
};
