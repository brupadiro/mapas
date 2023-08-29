import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#695d53", // Color primario
            secondary: colors.grey.darken1, // Color secundario
            accent: colors.shades.black, // Color de acento
            error: colors.red.accent3 // Color de error
          },
          dark: {
            primary: colors.blue.lighten3,
            secondary: colors.grey.lighten4,
            accent: colors.shades.white,
            error: colors.red.accent3
          }
        }
      }    

});
