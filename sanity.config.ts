import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { googleMapsInput } from '@sanity/google-maps-input';

export default defineConfig({
  name: 'default',
  title: 'studio',

  projectId: 'h7vye8yi',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    googleMapsInput({
      apiKey: 'AIzaSyAsIhhkgty6kH-bbeTQujYMXvzd-UzbJKo',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
