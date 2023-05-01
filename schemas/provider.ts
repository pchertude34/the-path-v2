import PlaceInput from '../sanitycomponents/PlaceInput';

const animalSchema = {
  name: 'provider',
  type: 'document',
  title: 'Provider',
  fields: [
    {
      name: 'name',
      title: 'Provider Name',
      type: 'string',
    },
    {
      name: 'place',
      title: 'Place',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'placeId', title: 'Place ID', type: 'string' },
        { name: 'location', title: 'Location', type: 'geopoint' },
      ],
      components: {
        input: PlaceInput,
      },
    },
  ],
};

export default animalSchema;
